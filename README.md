<div align="center">
  <img src="https://github.com/rewirelabs/sonia_ai_sync_buddy/raw/main/public/logo.png" alt="SonIA Logo" width="120" />
  <h1>SonIA — The AI Sync Buddy</h1>
  <p><em>"She doesn't search. She listens."</em></p>
  <p>An intelligent, context-aware sync-licensing assistant built for the <b>Musixmatch Musicathon</b>.</p>
</div>

---

## What is SonIA?

Music Supervisors in the advertising and film industry spend countless hours combing through catalogs to find the perfect track for a scene. Often, finding a song with the right "vibe" isn't enough: the lyrics must align with the narrative arc, the emotional climax must hit at exactly the right second, and the words must be rigorously checked for brand safety (no explicit language, drug references, or controversial themes).

**SonIA (Sync Intelligence Agent)** automates this entire pipeline. By taking a simple creative brief (e.g., *"A neon-lit car chase through Tokyo that ends in a tragic crash"*), SonIA orchestrates a multi-agent AI workflow that discovers, analyzes, and ranks the perfect tracks for your scene.

<!-- INSERT HERO IMAGE OR UI SCREENSHOT HERE -->
<!-- Example: <img src="./docs/hero.png" alt="SonIA Interface" width="100%" /> -->

## How It Works (The Pipeline)

SonIA uses a federated search and analysis pipeline, leaning heavily on Musixmatch's lyrical database as the core intelligence layer:

1. **Intake & Discovery**: Claude reads the user's brief, deduces the narrative shape, and generates hyper-specific Lyrical Keywords.
2. **Semantic Discovery**: Instead of relying on generic metadata tags, SonIA uses these AI-extracted keywords to query the Musixmatch database directly (`/track.search`), ensuring tracks are found based on what they actually say.
3. **The "Money Line" Alignment**: For each candidate, SonIA fetches the `RichSync` lyrics. Using Musixmatch's word-by-word timestamp data, it maps the emotional intensity of the lyrics over time, finding the exact 30-second window where the narrative peaks (the "Money Line").
4. **Brand Safety**: Before a track is ever suggested, SonIA reads the Musixmatch lyrics line-by-line (`/track.subtitle.get`) through a rigorous AI ruleset, ensuring total compliance with global broadcasting standards.
5. **AI Rationale Generation**: The Top 10 tracks are finalized, and Claude writes a custom, persuasive pitch for why each track was chosen, acting as a virtual Music Supervisor.
6. **Enrichment (The Ceiling)**: External APIs like Spotify (for audio previews) and LALAL.AI (for on-demand stem extraction) decorate the final results.

<!-- INSERT PIPELINE/ARCHITECTURE DIAGRAM HERE -->
<!-- Example: <img src="./docs/pipeline.png" alt="SonIA Pipeline" width="100%" /> -->

## Hard Constraints: No-Storage Rule

Per competition and API guidelines, **no Musixmatch data is persisted**. 
Lyrics, translations, richsync timings, and mood metadata are strictly **ephemeral**. They exist only in memory during the request lifecycle. 
Our local SQLite database only stores derived, aggregate AI metadata (e.g., fit scores, user briefs, and generated rationales). See `src/lib/core/ephemeral.ts` for the guard implementation.

## Local Setup

SonIA degrades gracefully. If you run the app without API keys, it uses a bundled `fixtures/` fallback mode to simulate the full pipeline, allowing judges to test the UX without needing live credentials.

### Prerequisites
- Node.js 18+
- API Keys for Musixmatch, Anthropic (Claude), Spotify, Cyanite (optional), and LALAL.ai (optional).

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/rewirelabs/sonia_ai_sync_buddy.git
cd sonia_ai_sync_buddy

# 2. Install dependencies
npm install

# 3. Setup the local database (SQLite)
npm run db:migrate

# 4. Configure Environment Variables
cp .env.example .env
# Open .env and insert your API keys

# 5. Start the development server
npm run dev
```

## Tech Stack
- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Vanilla CSS + Tailwind
- **Database**: LibSQL / SQLite (via Prisma)
- **AI/LLM**: Anthropic Claude Opus
- **Core API**: Musixmatch

---
*Built by **Rewire Labs** for the Musixmatch Musicathon 2026.*
