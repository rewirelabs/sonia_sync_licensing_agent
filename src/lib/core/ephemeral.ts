/**
 * HARD CONSTRAINT: EPHEMERAL DATA GUARD
 * 
 * Per Musixmatch Musicathon rules:
 * Lyrics, translations, richsync timings, and mood metadata are strictly EPHEMERAL.
 * They exist only in memory during the request lifecycle and are NEVER persisted to DB.
 * 
 * This module provides the in-memory cache/fetch mechanism for the current request.
 * If data is needed across requests, it MUST be re-fetched.
 */

import { LyricDoc } from '../connectors/types';
import { getMusixmatchLyricDoc } from '../connectors/musixmatch';

const ephemeralCache = new Map<string, LyricDoc>();

export async function getEphemeralLyricDoc(isrc: string): Promise<LyricDoc | null> {
  // In a real serverless env, this cache dies when the lambda dies.
  // For the local server, it stays in memory but is never written to disk/DB.
  if (ephemeralCache.has(isrc)) {
    return ephemeralCache.get(isrc) || null;
  }

  // Fetch live or from fixtures
  const doc = await getMusixmatchLyricDoc(isrc);
  if (doc) {
    ephemeralCache.set(isrc, doc);
  }
  
  return doc;
}
