export const flags = {
  spotifyEnrichment: process.env.FEATURE_SPOTIFY_ENRICHMENT === 'true',
  cyaniteSoundCurve: process.env.FEATURE_CYANITE_SOUND_CURVE === 'true',
  lalalStems: process.env.FEATURE_LALAL_STEMS === 'true',
  voiceSTT: process.env.FEATURE_VOICE_STT === 'true',
  voiceTTS: process.env.FEATURE_VOICE_TTS === 'true',
  dataMode: process.env.DATA_MODE || 'auto', // 'auto', 'live', 'fixture'
};

export function isMusixmatchLive() {
  if (flags.dataMode === 'fixture') return false;
  return !!process.env.MUSIXMATCH_API_KEY;
}
