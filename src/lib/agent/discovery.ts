import { TargetArc } from '../types';
import { getAnthropicClient, isFableLive } from './orchestrator';

export interface DiscoveredSong {
  title: string;
  artist: string;
}

export async function discoverCandidates(targetArc: TargetArc): Promise<DiscoveredSong[]> {
  if (!isFableLive()) {
    return [
      { title: 'Shape of You', artist: 'Ed Sheeran' },
      { title: 'Blinding Lights', artist: 'The Weeknd' },
    ];
  }

  const client = getAnthropicClient();
  const prompt = `You are a world-class Music Supervisor.
I need you to suggest 5 real, well-known songs that perfectly fit this brief profile:
Themes: ${targetArc.themesIncluded.join(', ')}
Shape: ${targetArc.shape}
Vocal Gender: ${targetArc.vocalGender}
Target Markets: ${targetArc.targetMarkets?.join(', ')}

Respond ONLY with a valid JSON array of objects. No markdown.
Schema:
[
  { "title": "Song Title", "artist": "Artist Name" }
]`;

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
    return JSON.parse(content) as DiscoveredSong[];
  } catch (e) {
    console.error('[Fable] Failed to discover candidates', e);
    return [];
  }
}
