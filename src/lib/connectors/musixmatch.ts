import fs from 'fs/promises';
import path from 'path';
import { LyricDoc, RichSyncLine } from './types';
import { isMusixmatchLive } from '../config/flags';

async function getFixtureRichSync(isrc: string): Promise<RichSyncLine[]> {
  try {
    const fixturePath = path.join(process.cwd(), 'fixtures', 'richsync', `${isrc}.json`);
    const data = await fs.readFile(fixturePath, 'utf-8');
    return JSON.parse(data) as RichSyncLine[];
  } catch (e) {
    console.warn(`[Musixmatch] No fixture found for ${isrc}. Returning empty array.`);
    return [];
  }
}

const MXM_BASE = 'https://api.musixmatch.com/ws/1.1';

async function fetchMxm(endpoint: string, params: Record<string, string>) {
  const url = new URL(`${MXM_BASE}${endpoint}`);
  url.searchParams.append('apikey', process.env.MUSIXMATCH_API_KEY!);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.append(k, v);
  }
  const res = await fetch(url.toString());
  const data = await res.json();
  if (data.message.header.status_code !== 200) {
    throw new Error(`MXM API error: ${data.message.header.status_code}`);
  }
  return data.message.body;
}

export async function findTrackIsrc(title: string, artist: string): Promise<string | null> {
  try {
    const trackBody = await fetchMxm('/matcher.track.get', {
      q_track: title,
      q_artist: artist
    });
    return trackBody.track.track_isrc || null;
  } catch (e) {
    console.error(`[Musixmatch] Failed to find ISRC for ${title} by ${artist}`, e);
    return null;
  }
}

export async function searchTracksByLyrics(keywords: string, lang: string): Promise<{ isrc: string, title: string, artist: string }[]> {
  try {
    const trackBody = await fetchMxm('/track.search', {
      q_lyrics: keywords,
      f_lyrics_language: lang || 'en',
      s_track_rating: 'desc',
      page_size: '20',
      f_has_lyrics: '1'
    });
    const trackList = trackBody.track_list;
    if (!trackList || trackList.length === 0) return [];

    return trackList.map((t: any) => ({
      isrc: t.track.track_isrc,
      title: t.track.track_name,
      artist: t.track.artist_name
    })).filter((t: any) => t.isrc != null);
  } catch (e) {
    console.error(`[Musixmatch] Failed to search tracks by lyrics "${keywords}"`, e);
    return [];
  }
}

export async function getMusixmatchLyricDoc(isrc: string): Promise<LyricDoc | null> {
  if (!isMusixmatchLive()) {
    console.log(`[Musixmatch] Fetching fixture data for ${isrc}`);
    const lines = await getFixtureRichSync(isrc);
    return {
      isrc,
      lines,
      mood: {
        valence: 0.2,
        energy: 0.8
      }
    };
  }

  try {
    // 1. Get Track
    const trackBody = await fetchMxm('/track.get', { track_isrc: isrc });
    const trackId = trackBody.track.track_id;

    // 2. Get Sync (Try Richsync, fallback to Subtitle)
    let lines: RichSyncLine[] = [];
    try {
      const syncBody = await fetchMxm('/track.richsync.get', { track_id: trackId.toString() });
      const richsyncList = JSON.parse(syncBody.richsync.richsync_body);
      lines = richsyncList.map((l: any) => ({
        startMs: l.ts * 1000,
        endMs: l.te * 1000,
        text: l.x,
      }));
    } catch (e) {
      console.log(`[Musixmatch] Richsync failed for ${isrc}, falling back to subtitle.`);
      try {
        const subBody = await fetchMxm('/track.subtitle.get', { track_id: trackId.toString() });
        const subList = JSON.parse(subBody.subtitle.subtitle_body);
        lines = subList.map((l: any) => ({
          startMs: l.time.total * 1000,
          endMs: (l.time.total + 5) * 1000, // naive endMs if not provided
          text: l.text,
        }));
      } catch (subErr) {
        console.error(`[Musixmatch] Subtitle also failed or parsing failed for ${isrc}. Skipping lyrics.`);
        return null;
      }
    }

    // 3. Get Mood (Optional)
    let mood;
    try {
      const moodBody = await fetchMxm('/track.lyrics.mood.get', { track_id: trackId.toString() });
      mood = {
        valence: moodBody.mood.valence,
        energy: moodBody.mood.energy
      };
    } catch (e) {
      // ignore
    }

    return {
      isrc,
      lines,
      mood
    };
  } catch (e) {
    console.error(`[Musixmatch] Live API failed for ${isrc}`, e);
    return null;
  }
}
