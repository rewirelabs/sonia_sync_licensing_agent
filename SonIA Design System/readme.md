# SonIA — Design System

> **SonIA** is a brief-to-shortlist sync-licensing agent for music supervisors. You describe a scene brief; SonIA returns a ranked shortlist of tracks with the optimal ~30-second sync window already located. The hero feature, the **Section Aligner**, overlays Musixmatch time-synced lyrics with Cyanite emotional curves to surface that window. Dark-only, engineering-grade — a professional's instrument, not a cute chatbot.

This repository is the canonical visual system: tokens, fonts, reusable React primitives, foundation specimens, and a full app UI kit.

## Sources
- `uploads/SonIA_Brief_Claude_Design.md` — the master brief (Italian; jury-facing output in EN with real multilingual data).
- `uploads/sonia-tokens.css` — the original token canon (mirrored into `tokens/`).
- `uploads/sonia-foundations.html` — the original foundations board.

There is no external Figma or codebase; this system is built from the brief + token canon above.

---

## The one rule — "il dato è la decorazione" (the data is the decoration)
Everything colored or animated on screen derives from a **real signal**: the emotional curve, lyric mood, match score, or brand-safety state. No invented gradients or accents for atmosphere. The chassis is quiet anthracite (Rewire backbone). SonIA's signature lives in exactly three elements: the **emotional spectrum**, the **waveform mark**, and the **Section Aligner**.

---

## CONTENT FUNDAMENTALS — how SonIA writes
SonIA is an expert music supervisor: concise, competent, anticipatory. She states findings, never performs enthusiasm.

- **Voice / person:** SonIA speaks *about the work and the data*, rarely about herself. Microcopy is declarative — "The chorus lifts from mellow to energetic at 01:34," not "I found a great match for you!" When she addresses the user it is imperative and brief ("Describe the scene.").
- **Tone:** engineering-grade, dry, confident. Every claim is justified by data ("sorted by match", "blocked: master rights unavailable in this territory").
- **No emoji. Ever.** No exclamation marks, no "happy to help", no filler.
- **Casing:** Sentence case for prose and headings. UPPERCASE only for short mono eyebrow labels (`SECTION ALIGNER · LYRIC × EMOTION`). Mono is used for all measures: timestamps `01:34–02:04`, durations `3:24`, BPM `128`, scores `87`, languages `IT/EN`.
- **Numbers are data, not decoration** — show a number only when it is a real measure (match, BPM, window, intensity %).
- **Labels in English** (jury-facing); track titles / lyrics stay in their real language (EN / IT / ES).
- **Examples:**
  - Empty state: "Describe the scene. Mood, energy, duration, language: SonIA does the rest."
  - Heading: "Top match · 30s window aligned to the chorus"
  - Rationale: "Stays calm through the verse, then a restrained swell at 02:25 — fits a reflective, unhurried scene."

---

## VISUAL FOUNDATIONS

**Color.** Dark-only. The frame is anthracite: `#14161B` base → `#1C1F26` surfaces → `#242832` elevated, borders `#2E333D`/`#3A4150`. Text `#F4F5F7` / `#A6ADB8` / `#6B7280`. **Orange `#FF6A2C` is reserved for primary CTAs and active states only** (hover `#FF7E47`, press `#E85A20`). **Cyan `#2DD4BF`** is the micro-accent: focus rings, links, technical detail — used sparingly. The **emotional spectrum** (calm `#4C6EF5` → mellow `#2DD4BF` → warm `#FACC15` → energetic `#FF6A2C` → intense `#F0386B`) is data viz, mapping intensity; brand orange lives *inside* it (energetic) so CTA and chart speak one language. Brand-safety: clear `#34D399` / review `#FBBF24` / block `#F0386B` — never color alone, always icon + label.

**Type.** Display/headings **Space Grotesk** (geometric, technical; 600/700, tracking −0.01 to −0.02em). Body/UI **Inter** (400/500/600, line-height 1.5). Data/measures **JetBrains Mono** (400/500, tracking +0.02em) for every timestamp, duration, window, score, BPM, language.

**Spacing & layout.** 4px grid (`--space-1` = 4 … `--space-16` = 64). High density — a pro tool. The app is a three-column shell: fixed left rail (232px) · fluid center canvas · fixed right context panel (288px). Fixed chrome, scrolling canvas.

**Radii.** Content 6–10px (`sm` 6 inputs/chips/badges, `md` 10 cards/panels, `lg` 14 dialogs). **The pill (999px) is reserved exclusively for SonIA's conversational bubbles** — nothing else.

**Backgrounds.** Flat anthracite. No imagery, no photo washes, no decorative gradients. The *only* gradients allowed are the emotional spectrum and the match ring — both data-driven. Album artwork is the one place real imagery appears; absent that, a spectrum-tinted placeholder.

**Borders & elevation.** 1px hairline borders do most of the structural work (`--border`, lifting to `--border-strong` on hover). Elevation is restrained: cards are nearly flat (`--shadow-card`), only popovers/tooltips lift (`--shadow-pop`, `0 8px 24px rgba(0,0,0,.45)`). No glow except the cyan focus ring.

**Cards.** Surface `#1C1F26`, 1px `--border`, radius 10px, minimal shadow. Hover raises the border to `--border-strong`; no scale, no colored shadow.

**Animation.** Quiet by default — the system holds still until a signal arrives. The **only ambient animation is the waveform mark** (its state encoded by color + motion period: idle flat, listening slow, thinking medium-cyan, speaking fast-orange). Transitions are short and disciplined: `--dur-micro` 120ms, `--dur-std` 200ms, `--dur-enter` 320ms, all on `cubic-bezier(0.2,0,0,1)`. No bounces, no infinite decorative loops.

**Hover / press.** Hover = subtle border lift (`--border-strong`) or a 4%-white overlay; buttons shift to the hover tint. Press = the darker action tint + a 0.98 scale on buttons. Focus = cyan ring (`box-shadow 0 0 0 3px cyan@22%`). Active toggles use the cyan ring + 12% cyan tint.

**Transparency & blur.** Used sparingly: low-opacity color-mix fills for chips/badges (12–16% of the hue) and the overlay scrim. No frosted-glass blur in the chassis.

---

## ICONOGRAPHY
- **No icon font, no PNG icons, no emoji, no Unicode glyphs as icons.** Icons are inline SVG, 14–20px, **1.5–1.75px stroke**, `round` caps and joins, drawn in `currentColor` so they inherit the control's text color (muted secondary by default, cyan when active, orange on primary buttons).
- The system ships a small, purpose-built set (search, play, filter, chevron, plus/new, back, save) authored directly in the components — matched in weight and geometry to Space Grotesk's technical feel. Keep any additions to that same stroke weight and rounded terminals.
- If you need a broader set, use **Lucide** (same 1.5px rounded-stroke language) from CDN and keep sizing/stroke consistent. *(Substitution — flag if used.)*
- The **brand-safety glyphs are semantic, not decorative**: check (clear), triangle-bang (review), no-entry (block). They always travel with a text label.
- The **waveform mark** is the brand's primary "icon": bars in `currentColor`/state color; never replace it with a generic music note.

---

## INDEX — what's in this system

**Root**
- `styles.css` — global entry point (the only file consumers link); `@import`s every token + font file.
- `readme.md` — this guide. `SKILL.md` — Agent-Skills-compatible wrapper.

**`tokens/`** — `colors.css`, `typography.css`, `spacing.css`, `motion.css`, `fonts.css` (webfonts).

**`components/`** (namespace `window.SonIADesignSystem_4b5948`)
- `core/` — **Button** (primary/secondary/tertiary), **IconButton**.
- `forms/` — **Input** (text/mono, cyan focus), **Select**.
- `data/` — the signature set: **Waveform** (the mark, 4 states), **MoodChip**, **SafetyBadge**, **MatchRing**, **TrackCard** (assembles them).

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**`ui_kits/sonia-app/`** — the full interactive app: Brief composer → Shortlist → Section Aligner, in the three-column app shell. See its `README.md`.

**`uploads/`** — original source brief, tokens, and foundations board.
