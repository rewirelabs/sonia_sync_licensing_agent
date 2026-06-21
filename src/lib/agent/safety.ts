import { SafetyVerdict } from '../types';
import { RichSyncLine, LyricDoc } from '../connectors/types';
import { getAnthropicClient, isFableLive } from './orchestrator';
import { getRulesetForBrand } from '../core/ruleset';

export async function evaluateSafety(
  lyricDoc: LyricDoc,
  brandProfile: string,
  market: string
): Promise<SafetyVerdict[]> {
  if (!isFableLive()) {
    console.log('[Fable] Fixture mode: evaluating safety with mocks');
    const verdicts: SafetyVerdict[] = [];
    // Hardcoded mock logic for the German track 'Du Hast'
    if (lyricDoc.isrc === 'DEUM71501234') {
      const idx = lyricDoc.lines.findIndex(l => l.text.includes('Alkohol'));
      if (idx !== -1) {
        verdicts.push({
          idx,
          category: 'alcohol',
          severity: 'high', // 'family automotive' ruleset bumps it to high
          evidence: lyricDoc.lines[idx].text,
          translation: 'We drink a lot of alcohol and drive fast',
          timestampMs: lyricDoc.lines[idx].startMs
        });
      }
    }
    return verdicts;
  }

  const ruleset = getRulesetForBrand(brandProfile, market);
  const client = getAnthropicClient();
  const numberedLines = lyricDoc.lines.map((l, i) => `[${i}] ${l.text}`).join('\n');
  const rules = ruleset.map(r => `- ${r.name}: ${r.description} (Severity: ${r.defaultSeverity})`).join('\n');

  const prompt = `You are Fable, an expert brand-safety compliance AI.
Evaluate the following lyrics against this ruleset for market: ${market}.
Ruleset:
${rules}

Identify ANY problematic lines.
Respond ONLY with a valid JSON array of objects. If no issues, return an empty array [].
Schema for each object:
{
  "idx": number (the line index),
  "category": string (the category id),
  "severity": "low" | "med" | "high",
  "evidence": string (the original lyric line),
  "translation": string (an English translation of the line to explain the issue),
  "timestampMs": number (timestamp from the line object)
}

Lyrics (original language):
${numberedLines}`;

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
    const startIndex = content.indexOf('[');
    const endIndex = content.lastIndexOf(']');
    if (startIndex !== -1 && endIndex !== -1) {
      content = content.substring(startIndex, endIndex + 1);
    }
    const results = JSON.parse(content) as any[];
    
    // map timestamp manually if AI misses it
    return results.map(r => ({
      ...r,
      timestampMs: lyricDoc.lines[r.idx]?.startMs || 0
    }));
  } catch (e) {
    console.error('[Fable] Failed to evaluate safety', e);
    return [];
  }
}
