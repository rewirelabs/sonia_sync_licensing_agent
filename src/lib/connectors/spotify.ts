import { flags } from '../config/flags';

interface SpotifyEnrichment {
  coverUrl?: string;
  previewUrl?: string;
  spotifyId?: string;
}

export async function enrichWithSpotify(isrc: string): Promise<SpotifyEnrichment> {
  if (!flags.spotifyEnrichment) {
    return {};
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn('[Spotify] Missing credentials, skipping enrichment');
    return {};
  }

  try {
    // 1. Get Access Token
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });
    
    if (!tokenRes.ok) throw new Error('Spotify auth failed');
    const { access_token } = await tokenRes.json();

    // 2. Search by ISRC
    const searchRes = await fetch(`https://api.spotify.com/v1/search?type=track&q=isrc:${isrc}`, {
      headers: { 'Authorization': `Bearer ${access_token}` }
    });

    if (!searchRes.ok) throw new Error('Spotify search failed');
    const searchData = await searchRes.json();
    
    const track = searchData.tracks?.items?.[0];
    if (track) {
      return {
        coverUrl: track.album?.images?.[0]?.url,
        previewUrl: track.preview_url,
        spotifyId: track.id,
      };
    }
  } catch (e) {
    console.error('[Spotify] Enrichment failed for', isrc, e);
  }

  return {};
}
