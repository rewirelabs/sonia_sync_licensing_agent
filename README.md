# SonIA — AI Sync Buddy

"She doesn't search. She listens."

SonIA is a brief-to-shortlist sync-licensing agent built for the Musixmatch Musicathon. It helps music supervisors go from a messy scene brief to a rank-ordered, licensable shortlist of tracks. It identifies the optimal ~30-second window, the "money line" of lyrics, and verifies brand safety across languages.

## Architecture

The system is built on a strict **two-layer architecture**:

### 1. The Floor (Always Active)
The core foundation powered entirely by Musixmatch. It is audio-free and provides metadata, lyrics, richsync (word-level timing), subtitle (line-level timing), translations, and mood. The Musixmatch layer drives the **Section Aligner**, which matches emotional arcs in lyrics against the user's brief.

### 2. The Ceiling (Feature Flagged)
Optional enrichment APIs that run at the end of the pipeline. Kept behind feature flags to ensure resilience.
- **Spotify**: Cover art and 30s audio previews (joined via ISRC).
- **Cyanite**: 15s audio sound curves blended with the lyric curve.
- **LALAL.AI**: Stems generation.
- **ElevenLabs**: Speech-to-text (brief intake) and Text-to-speech.

## Hard Constraints: No-Storage Rule
Per competition guidelines, **no Musixmatch data is persisted**. Lyrics, translations, richsync timings, and mood metadata are strictly **ephemeral**. They exist only in memory during the request lifecycle. 
- See `lib/core/ephemeral.ts` for the guard implementation.
- Our database (SQLite via Prisma) only stores derived AI metadata (`Brief`, `TargetArc`, `ShortlistItem`).

## Local Setup (Fixture-First)

SonIA degrades gracefully. If you run the app without API keys, it uses bundled `fixtures/` to simulate the full pipeline.

1. Install dependencies: `npm install`
2. Run database migrations: `npm run db:migrate`
3. Copy the env file: `cp .env.example .env` (Add keys if you want live mode, leave empty for fixture mode).
4. Start the dev server: `npm run dev`

### Feature Flags
In your `.env`, you can enable the ceiling layer:
- `FEATURE_SPOTIFY_ENRICHMENT=true`
- `FEATURE_CYANITE_SOUND_CURVE=true`
- `FEATURE_LALAL_STEMS=true`

*(Note: The public repository only contains this clean demo without internal ToolStar credentials).*
