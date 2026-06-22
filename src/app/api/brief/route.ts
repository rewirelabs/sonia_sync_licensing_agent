import { NextResponse } from 'next/server';
import { normalizeBrief } from '@/lib/agent/briefNormalizer';
import { getEphemeralLyricDoc } from '@/lib/core/ephemeral';
import { scoreLyricCurve } from '@/lib/agent/lyricCurve';
import { alignSection } from '@/lib/core/sectionAligner';
import { evaluateSafety } from '@/lib/agent/safety';
import { rankTracks, RankedTrack } from '@/lib/core/ranker';
import { enrichWithSpotify } from '@/lib/connectors/spotify';
import fs from 'fs/promises';
import path from 'path';
import { Track } from '@/lib/connectors/types';
import { prisma } from '@/lib/db';
import { discoverCandidates } from '@/lib/agent/discovery';
import { findTrackIsrc } from '@/lib/connectors/musixmatch';
import { isMusixmatchLive } from '@/lib/config/flags';
import { getCyaniteCurve, searchCyaniteByFreeText } from '@/lib/connectors/cyanite';

async function getAvailableTracks(): Promise<Track[]> {
  try {
    const fixturePath = path.join(process.cwd(), 'fixtures', 'tracks.json');
    const data = await fs.readFile(fixturePath, 'utf-8');
    return JSON.parse(data) as Track[];
  } catch (e) {
    console.error('Error loading available tracks', e);
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const briefText = body.brief;
    const overrides = body.overrides || {};
    
    if (!briefText) {
      return NextResponse.json({ error: 'Brief text is required' }, { status: 400 });
    }

    // 1. Normalize Brief
    const targetArc = await normalizeBrief(briefText);
    
    // Apply explicit UI overrides over Claude's generated targetArc
    Object.assign(targetArc, overrides);

    const lang = targetArc.languages[0] || 'en';

    // 2. Fetch tracks candidates (Federated Search)
    let tracks: Track[] = [];
    if (isMusixmatchLive()) {
      const discoveryResult = await discoverCandidates(targetArc);
      
      console.log(`[Discovery] Claude suggested ${discoveryResult.tracks.length} tracks.`);
      // A. Process Claude's suggestions
      for (const sug of discoveryResult.tracks) {
        const isrc = await findTrackIsrc(sug.title, sug.artist);
        if (isrc && !tracks.some(t => t.isrc === isrc)) {
          tracks.push({
            isrc,
            title: sug.title,
            artist: sug.artist,
            durationMs: 180000,
            lang
          });
        }
      }

      // C. Process Cyanite Free Text Search
      console.log(`[Discovery] Cyanite searching free text for brief themes...`);
      const cyaniteTracks = await searchCyaniteByFreeText(briefText);
      const { getSpotifyTrackMetadata } = await import('@/lib/connectors/spotify');
      for (const ct of cyaniteTracks) {
        const meta = await getSpotifyTrackMetadata(ct.spotifyId);
        if (meta && meta.isrc && !tracks.some(t => t.isrc === meta.isrc)) {
          tracks.push({
            isrc: meta.isrc,
            title: meta.title,
            artist: meta.artist,
            durationMs: 180000,
            lang
          });
        }
      }

    } else {
      tracks = await getAvailableTracks(); // fallback
    }
    
    const rankedCandidates: RankedTrack[] = [];

    // Process each track
    for (const track of tracks) {
      // 3. Ephemeral Lyric Doc
      const doc = await getEphemeralLyricDoc(track.isrc);
      if (!doc || doc.lines.length === 0) continue;

      // 4. Spotify Enrichment (we need real duration before aligning)
      const enrichment = await enrichWithSpotify(track.isrc);
      const realDurationMs = (enrichment as any).durationMs || track.durationMs || 180000;

      // 5. Score Lyric Curve
      const scores = await scoreLyricCurve(doc.lines, targetArc);

      // 6. Align Section (Hero)
      const alignment = alignSection(doc.lines, scores, targetArc, realDurationMs);

      // 7. Safety check
      const market = targetArc.targetMarkets?.[0] || 'Global';
      const safetyVerdicts = await evaluateSafety(doc, targetArc.brandProfile, market);

      // Determine overall safety
      let safetyLevel = 'safe';
      if (safetyVerdicts.some(v => v.severity === 'high')) safetyLevel = 'unsafe';
      else if (safetyVerdicts.some(v => v.severity === 'med')) safetyLevel = 'caution';

      // 7. Spotify Enrichment (Ceiling)
      const enrichment = await enrichWithSpotify(track.isrc);

      rankedCandidates.push({
        ...track,
        durationMs: realDurationMs,
        alignment,
        safetyVerdicts,
        safetyLevel,
        curve: scores.map(s => s.intensity),
        ...enrichment
      } as any);
    }

    // 7. Rank
    const shortlist = rankTracks(rankedCandidates);

    // 8. Save derivatives to DB (NO MUSIXMATCH DATA is saved here, only our metadata)
    const dbBrief = await prisma.brief.create({
      data: {
        rawInput: briefText,
        lang: targetArc.languages[0] || 'en',
      }
    });

    await prisma.targetArc.create({
      data: {
        briefId: dbBrief.id,
        shape: targetArc.shape,
        peakPositionPct: targetArc.peakPositionPct,
        vocalGender: targetArc.vocalGender,
        themesIncluded: JSON.stringify(targetArc.themesIncluded),
        themesExcluded: JSON.stringify(targetArc.themesExcluded),
        targetMarkets: JSON.stringify(targetArc.targetMarkets),
        languages: JSON.stringify(targetArc.languages),
        targetDurationSec: targetArc.targetDurationSec,
        brandProfile: targetArc.brandProfile,
      }
    });

    for (const track of shortlist) {
      await prisma.shortlistItem.create({
        data: {
          briefId: dbBrief.id,
          isrc: track.isrc,
          spotifyId: track.spotifyId,
          title: track.title,
          artist: track.artist,
          fitScore: track.alignment.fitScore,
          fitRationale: track.alignment.fitRationale,
          recommendedWindowStartMs: track.alignment.startMs,
          recommendedWindowEndMs: track.alignment.endMs,
          moneyLineTimestampMs: track.alignment.moneyLineTimestampMs,
          safetyVerdict: track.safetyLevel || 'safe',
          coverUrl: track.coverUrl,
          previewUrl: track.previewUrl
        }
      });
    }

    return NextResponse.json({
      targetArc,
      shortlist
    });
  } catch (error: any) {
    console.error('Pipeline error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
