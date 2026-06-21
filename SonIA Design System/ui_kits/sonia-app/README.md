# SonIA — App UI kit

High-fidelity, click-through recreation of the SonIA product (the only product surface). Dark-only, engineering-grade. Composes the design-system primitives — it does **not** re-implement them.

## Run
Open `index.html`. It loads React + Babel, the generated `_ds_bundle.js`, the mock `data.js`, then the four screen files. The whole flow is interactive.

## Flow
1. **Brief composer** (`BriefComposer.jsx`) — describe the scene; SonIA returns a structured interpretation as editable mood chips. Empty state included. → *Find tracks*.
2. **Shortlist** (`Shortlist.jsx`) — structured brief chips at top, quick filters, `TrackCard` rows sorted by match. → click a card.
3. **Section Aligner** (`SectionAligner.jsx`, HERO) — the emotional curve filled with the spectrum gradient (taller = warmer/intense), time-synced lyrics marked at their instants, the optimal ~30s window bracketed in orange with a mono time label and SonIA's one-line rationale. Hover the timeline for a scrubber reading time × intensity × current line.
4. **App shell** (`AppShell.jsx`) — left rail (SonIA presence + brief history), center canvas, right context panel (track detail). Holds the view state.

## Components used
`Waveform`, `MoodChip`, `SafetyBadge`, `MatchRing`, `TrackCard`, `Button`, `IconButton`, `Input`, `Select` — all from `window.SonIADesignSystem_4b5948`.

## Notes
- All visuals derive from `data.js` (curves, lyrics, windows, scores) — "il dato è la decorazione".
- Mobile collapse is described in the brief but not built in this kit (flag for iteration).
