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
import { isMusixmatchLive, flags } from '@/lib/config/flags';
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

      // B. Process Musixmatch's semantic search using Claude's keywords
      if (discoveryResult.lyricalKeywords) {
        console.log(`[Discovery] Musixmatch searching for keywords: "${discoveryResult.lyricalKeywords}"`);
        const { searchTracksByLyrics } = await import('@/lib/connectors/musixmatch');
        const mxmTracks = await searchTracksByLyrics(discoveryResult.lyricalKeywords, lang);
        for (const mt of mxmTracks) {
          if (!tracks.some(t => t.isrc === mt.isrc)) {
            tracks.push({
              isrc: mt.isrc,
              title: mt.title,
              artist: mt.artist,
              durationMs: 180000,
              lang
            });
          }
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


      let finalCurve = scores.map(s => s.intensity);
      if (flags.cyaniteSoundCurve && (enrichment as any).spotifyId) {
        try {
          const audioCurve = await getCyaniteCurve((enrichment as any).spotifyId);
          if (audioCurve && audioCurve.length > 0) {
            finalCurve = audioCurve;
          }
        } catch(e) {
          console.error('[Cyanite] Audio analysis failed, using lyric curve fallback.');
        }
      }

      rankedCandidates.push({
        ...track,
        durationMs: realDurationMs,
        alignment,
        safetyVerdicts,
        safetyLevel,
        curve: finalCurve,
        ...enrichment
      } as any);
    }

    // Fallback if all discovered tracks failed to get lyrics from Musixmatch
    if (rankedCandidates.length === 0) {
      console.log(`[Discovery] No tracks had valid lyrics. Falling back to fixture tracks.`);
      const fallbackTracks = await getAvailableTracks();
      for (const track of fallbackTracks) {
        const doc = await getEphemeralLyricDoc(track.isrc);
        if (!doc || doc.lines.length === 0) continue;
        const enrichment = await enrichWithSpotify(track.isrc);
        const realDurationMs = (enrichment as any).durationMs || track.durationMs || 180000;
        const scores = await scoreLyricCurve(doc.lines, targetArc);
        const alignment = alignSection(doc.lines, scores, targetArc, realDurationMs);
        const market = targetArc.targetMarkets?.[0] || 'Global';
        const safetyVerdicts = await evaluateSafety(doc, targetArc.brandProfile, market);
        let safetyLevel = 'safe';
        if (safetyVerdicts.some(v => v.severity === 'high')) safetyLevel = 'unsafe';
        else if (safetyVerdicts.some(v => v.severity === 'med')) safetyLevel = 'caution';
        let finalCurveFallback = scores.map(s => s.intensity);
        if (flags.cyaniteSoundCurve && (enrichment as any).spotifyId) {
          try {
            const audioCurve = await getCyaniteCurve((enrichment as any).spotifyId);
            if (audioCurve && audioCurve.length > 0) {
              finalCurveFallback = audioCurve;
            }
          } catch(e) {
            console.error('[Cyanite] Audio analysis failed, using lyric curve fallback.');
          }
        }

        rankedCandidates.push({
          ...track,
          durationMs: realDurationMs,
          alignment,
          safetyVerdicts,
          safetyLevel,
          curve: finalCurveFallback,
          ...enrichment
        } as any);
      }
    }

    // 7. Rank
    const shortlist = rankTracks(rankedCandidates).slice(0, 10);

    // 7.5 Generate AI Rationales
    const { generateRationales } = await import('@/lib/agent/rationale');
    const mappedRationales = await generateRationales(briefText, shortlist.map(t => ({
      isrc: t.isrc,
      title: t.title,
      artist: t.artist,
      moneyLine: t.alignment.moneyLine || '',
      fitScore: t.alignment.fitScore,
      lang: t.lang || targetArc.languages[0] || 'en'
    })));

    for (const track of shortlist) {
      if (mappedRationales[track.isrc]) {
        track.alignment.fitRationale = mappedRationales[track.isrc];
      }
    }

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
      brief: briefText,
      targetArc,
      shortlist
    });
  } catch (error: any) {
    console.error('Pipeline error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
