# SonIA Architecture

SonIA is built on a strict "two-layer" architectural principle to ensure resilience and compliance during the Musicathon.

## Layer 1: The Floor (Always Active)

This layer is entirely powered by Musixmatch and forms the core of the **Section Aligner** hero feature. It is **audio-free**, meaning we don't need audio files to perform the analysis.

1. **Brief Normalizer**: Natural language brief -> Structured `TargetArc` (Anthropic).
2. **Track Discovery**: `q_lyrics` + filters to find candidates.
3. **Lyric Fetch**: `track.richsync.get` (word-level) or `track.subtitle.get` (line-level) + `track.lyrics.mood.get`.
4. **Lyric Curve**: AI scores every line for intensity, valence, and theme fit.
5. **Section Aligner**: Sliding window over the curve to find the optimal ~30s match and the "money line".
6. **Safety Engine**: Line-by-line evaluation against brand rulesets + `track.lyrics.translation.get` for cross-language safety.

### Ephemeral Constraint
Musixmatch data MUST NOT BE STORED.
- Lyrics, timings, translations, and mood live only in memory (`lib/core/ephemeral.ts`).
- Prisma database only stores our derivatives (`Brief`, `TargetArc`, `ShortlistItem`).

## Layer 2: The Ceiling (Feature Flagged)

These enrichments run only at the end of the pipeline and are disabled by default.
- **Spotify Enrichment**: ISRC lookup to fetch `coverUrl` and `preview_url`.
- **Cyanite**: Sound curve analysis. Blended with the lyric curve if enabled.
- **LALAL.AI**: On-demand stem separation for the winning track.
- **ElevenLabs**: STT for brief intake, TTS for conversational responses.
