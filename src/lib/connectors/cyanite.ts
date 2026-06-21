import { flags } from '../config/flags';

export async function getCyaniteCurve(spotifyId: string) {
  if (!flags.cyaniteSoundCurve) {
    return null;
  }

  // TODO: Cyanite Implementation
  // 1. Enqueue track to Cyanite using spotifyId
  // 2. Poll for completion
  // 3. Fetch 15s interval analysis curve
  
  console.warn('[Cyanite] Not fully implemented yet for', spotifyId);
  return null;
}
