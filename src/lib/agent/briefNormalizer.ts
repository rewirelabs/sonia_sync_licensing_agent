import { TargetArc } from '../types';
import { getAnthropicClient, isFableLive } from './orchestrator';

export async function normalizeBrief(briefText: string): Promise<TargetArc> {
  if (!isFableLive()) {
    console.log('[Fable] Fixture mode: returning mock TargetArc');
    return {
      shape: 'build',
      peakPositionPct: 0.8,
      vocalGender: 'any',
      themesIncluded: ['family', 'journey', 'open road'],
      themesExcluded: ['violence', 'drugs', 'explicit content'],
      targetMarkets: ['DACH', 'Italy'],
      languages: ['de', 'en', 'it'],
      targetDurationSec: 30,
      brandProfile: 'family automotive',
    };
  }

  const client = getAnthropicClient();
  const prompt = `You are Fable, an expert music supervisor AI.
Extract structured metadata from the following scene brief.
Respond ONLY with a valid JSON object matching this schema:
{
  "shape": "build" | "steady" | "peak_early" | "peak_late" | "pulse",
  "peakPositionPct": number (0.0 to 1.0),
  "vocalGender": "male" | "female" | "any",
  "themesIncluded": string[],
  "themesExcluded": string[],
  "targetMarkets": string[],
  "languages": string[],
  "targetDurationSec": number (usually 30),
  "brandProfile": string
}

Brief: "${briefText}"`;

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });
    let content = (response.content[0] as any).text.trim();
    if (content.startsWith('```')) {
      const match = content.match(/```(?:json)?\n([\s\S]*?)\n```/);
      if (match) content = match[1].trim();
    }
    const startIndex = content.indexOf('{');
    const endIndex = content.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
      content = content.substring(startIndex, endIndex + 1);
    }
    return JSON.parse(content) as TargetArc;
  } catch (e) {
    console.error('[Fable] Failed to normalize brief', e);
    throw new Error('Brief normalization failed');
  }
}
