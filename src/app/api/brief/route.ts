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
    if (!briefText) {
      return NextResponse.json({ error: 'Brief text is required' }, { status: 400 });
    }

    // 1. Normalize Brief
    const targetArc = await normalizeBrief(briefText);

    // 2. Fetch tracks candidates
    let tracks: Track[] = [];
    if (isMusixmatchLive()) {
      const suggestions = await discoverCandidates(targetArc);
      for (const sug of suggestions) {
        const isrc = await findTrackIsrc(sug.title, sug.artist);
        if (isrc) {
          tracks.push({
            isrc,
            title: sug.title,
            artist: sug.artist,
            durationMs: 180000, // default mock duration if unknown
            lang: targetArc.languages[0] || 'en'
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

      // 4. Score Lyric Curve
      const scores = await scoreLyricCurve(doc.lines, targetArc);

      // 5. Align Section (Hero)
      const alignment = alignSection(doc.lines, scores, targetArc, track.durationMs);

      // 6. Safety check
      // We pass the market from targetArc if available
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
        alignment,
        safetyVerdicts,
        safetyLevel,
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
