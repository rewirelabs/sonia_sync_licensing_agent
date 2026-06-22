import { LineScore, TargetArc } from '../types';
import { RichSyncLine } from '../connectors/types';
import { getAnthropicClient, isFableLive } from './orchestrator';

export async function scoreLyricCurve(lines: RichSyncLine[], targetArc: TargetArc): Promise<LineScore[]> {
  if (!isFableLive()) {
    console.log('[Fable] Fixture mode: returning mock lyric curve');
    return lines.map((line, idx) => {
      // Mock curve: linear build
      const intensity = Math.min((idx + 1) / lines.length, 1);
      return {
        idx,
        intensity,
        valence: 0.5,
        themeFit: Math.random(),
        isMoneyCandidate: intensity > 0.8 && Math.random() > 0.5,
      };
    });
  }

  const client = getAnthropicClient();
  const numberedLines = lines.map((l, i) => `[${i}] ${l.text}`).join('\n');
  
  const systemPrompt = `You are Fable, an expert music supervisor AI.
Analyze the following lyrics against this target brief profile:
Themes: ${targetArc.themesIncluded.join(', ')}
Shape: ${targetArc.shape}

For EACH line, provide a score. Respond ONLY with a valid JSON array of arrays (no markdown, no text).
Schema for each inner array (keep it incredibly dense):
[
  idx (number),
  intensity (0.0 to 1.0),
  valence (-1.0 to 1.0),
  themeFit (0.0 to 1.0),
  isMoneyCandidate (0 or 1)
]`;

  const userPrompt = `Lyrics:
${numberedLines}`;

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4096,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" }
        }
      ],
      messages: [{ role: 'user', content: userPrompt }],
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
    const parsed = JSON.parse(content) as any[];
    return parsed.map(arr => ({
      idx: arr[0],
      intensity: arr[1],
      valence: arr[2],
      themeFit: arr[3],
      isMoneyCandidate: arr[4] === 1,
    })) as LineScore[];
  } catch (e) {
    console.error('[Fable] Failed to score lyric curve', e);
    // Fallback if AI fails to parse
    return lines.map((l, idx) => ({
      idx,
      intensity: 0.5,
      valence: 0,
      themeFit: 0.5,
      isMoneyCandidate: false
    }));
  }
}
