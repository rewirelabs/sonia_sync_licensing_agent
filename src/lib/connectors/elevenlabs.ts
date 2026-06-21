import { flags } from '../config/flags';

export async function transcribeAudio(audioBuffer: Buffer) {
  if (!flags.voiceSTT) {
    return null;
  }
  console.warn('[ElevenLabs] STT Not fully implemented yet');
  return null;
}

export async function generateSpeech(text: string) {
  if (!flags.voiceTTS) {
    return null;
  }
  console.warn('[ElevenLabs] TTS Not fully implemented yet');
  return null;
}
