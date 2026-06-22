import { TargetArc } from '../types';
import { getAnthropicClient, isFableLive } from './orchestrator';

export interface DiscoveredSong {
  title: string;
  artist: string;
}

export interface DiscoveryResult {
  tracks: DiscoveredSong[];
  lyricalKeywords: string;
}

export async function discoverCandidates(targetArc: TargetArc): Promise<DiscoveryResult> {
  if (!isFableLive()) {
    return {
      tracks: [
        { title: 'Shape of You', artist: 'Ed Sheeran' },
        { title: 'Blinding Lights', artist: 'The Weeknd' },
      ],
      lyricalKeywords: "falling in love, running fast"
    };
  }

  const client = getAnthropicClient();
  const systemPrompt = `You are Fable, an avant-garde music supervisor AI.
The user will provide a brief. You must discover exactly 5 distinct tracks that are PERFECT for this brief.
IMPORTANT: AVOID OBVIOUS OR OVERPLAYED TRACKS. No "Happy" by Pharrell, no generic stock music. Look for deep cuts, indie gems, and tracks that elevate the scene.

Return ONLY a valid JSON object matching this schema, no markdown, no text:
{
  "tracks": [
    { "title": "string", "artist": "string" }
  ],
  "lyricalKeywords": "string (a comma-separated list of poetic, mood-driven phrases and exact lyrical snippets that would perfectly match the brief, to be used for semantic search)"
}`;

  const userPrompt = `Brief details:
Languages: ${targetArc.languages.join(', ')}
Themes: ${targetArc.themesIncluded.join(', ')}
Excluded Themes: ${targetArc.themesExcluded.join(', ')}
Shape: ${targetArc.shape}
Brand Profile: ${targetArc.brandProfile || 'Generic'}`;

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
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
    const startIndex = content.indexOf('{');
    const endIndex = content.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
      content = content.substring(startIndex, endIndex + 1);
    }
    return JSON.parse(content) as DiscoveryResult;
  } catch (e) {
    console.error('[Fable] Failed to discover candidates', e);
    return { tracks: [], lyricalKeywords: "" };
  }
}
