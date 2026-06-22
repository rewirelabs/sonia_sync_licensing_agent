<div align="center">
  <img src="https://github.com/rewirelabs/sonia_ai_sync_buddy/raw/main/public/logo.png" alt="SonIA Logo" width="120" />
  <h1>SonIA — The AI Sync Buddy</h1>
  <p><em>"She doesn't search. She listens."</em></p>
  <p>An intelligent, context-aware sync-licensing assistant built for the <b>Musixmatch Musicathon</b>.</p>
</div>

---

## 🎵 What is SonIA?

Music Supervisors in the advertising and film industry spend countless hours combing through catalogs to find the perfect track for a scene. Often, finding a song with the right "vibe" isn't enough: the lyrics must align with the narrative arc, the emotional climax must hit at exactly the right second, and the words must be rigorously checked for brand safety (no explicit language, drug references, or controversial themes).

**SonIA (Sync Intelligence Agent)** automates this entire pipeline. 

By taking a simple creative brief (e.g., *"A neon-lit car chase through Tokyo that ends in a tragic crash"*), SonIA orchestrates a multi-agent AI workflow that leans heavily on **Musixmatch's unparalleled lyrical database** to discover, analyze, and rank the perfect tracks for your scene.

## 🧠 The Centrality of Musixmatch

Musixmatch is the absolute core of SonIA's intelligence. Without it, SonIA would be blind and deaf to the narrative of the music. 

SonIA leverages the Musixmatch API for:
1. **Semantic Discovery (`/track.search`)**: Instead of relying on metadata tags, SonIA uses AI-extracted *Lyrical Keywords* to search the Musixmatch database directly, ensuring tracks are found based on what they actually *say*.
2. **The "Money Line" Alignment (`/track.richsync.get`)**: SonIA uses Musixmatch's word-by-word timestamp data to map the emotional intensity of the lyrics over time, finding the exact 30-second window where the narrative peaks (the "Money Line").
3. **Brand Safety (`/track.subtitle.get`)**: Before a track is ever suggested, SonIA reads the Musixmatch lyrics line-by-line through a rigorous AI ruleset, ensuring total compliance with global broadcasting standards.

## ⚙️ How It Works (The Pipeline)

SonIA uses a federated search and analysis pipeline:

1. **Intake & Discovery**: Claude reads the user's brief, deduces the narrative shape (e.g., "build", "peak_early"), and generates hyper-specific Lyrical Keywords.
2. **Musixmatch Fetch**: The keywords are sent to Musixmatch to retrieve the most lyrically relevant tracks and their ISRCs.
3. **Ephemeral Lyrical Analysis**: For each candidate, SonIA fetches the `RichSync` lyrics. The lyrics are mapped to an emotional curve. *(Note: All Musixmatch data is strictly ephemeral and held in memory only for the duration of the analysis, complying with licensing constraints).*
4. **Ranking & The Window**: SonIA identifies the "Sync Window" (the optimal 30 seconds) and the "Money Line" for each track, scoring them based on how well the lyric curve matches the requested narrative arc.
5. **AI Rationale Generation**: The Top 10 tracks are finalized, and Claude writes a custom, persuasive pitch for *why* each track was chosen, acting as a virtual Music Supervisor.
6. **Enrichment (The Ceiling)**: External APIs like Spotify (for audio previews) and LALAL.AI (for on-demand stem extraction) decorate the final results.

## 🚀 Local Setup

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

## 🔒 Hard Constraints: No-Storage Rule

Per competition and API guidelines, **no Musixmatch data is persisted**. 
Lyrics, translations, richsync timings, and mood metadata are strictly **ephemeral**. They exist only in memory during the request lifecycle. 
Our local SQLite database only stores derived, aggregate AI metadata (e.g., fit scores, user briefs, and generated rationales). See `src/lib/core/ephemeral.ts` for the guard implementation.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Vanilla CSS + Tailwind
- **Database**: LibSQL / SQLite (via Prisma)
- **AI/LLM**: Anthropic Claude Opus
- **Core API**: Musixmatch

---
*Built with ❤️ for the Musixmatch Musicathon 2026.*
