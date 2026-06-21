import { flags } from '../config/flags';

export async function splitStems(isrc: string) {
  if (!flags.lalalStems) {
    return null;
  }

  // TODO: LALAL.AI Implementation
  // 1. Upload audio preview
  // 2. Request stem split
  // 3. Save stem URLs
  
  console.warn('[LALAL] Not fully implemented yet for', isrc);
  return null;
}
