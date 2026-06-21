---
name: sonia-design
description: Use this skill to generate well-branded interfaces and assets for SonIA, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Dark-only.** One rule above all: *"il dato è la decorazione"* — every colored/animated pixel derives from a real signal. No decorative gradients or accents.
- **Fonts:** Space Grotesk (display), Inter (body/UI), JetBrains Mono (all measures — timestamps, durations, windows, scores, BPM). Loaded via `tokens/fonts.css` (Google Fonts CDN).
- **Color:** anthracite chassis (`#14161B`/`#1C1F26`/`#242832`); orange `#FF6A2C` = CTA/active only; cyan `#2DD4BF` = focus/technical micro-accent; emotional spectrum calm→intense is data viz; brand-safety never color-alone (always icon+label).
- **Signature elements (use these, don't invent new motifs):** the emotional spectrum gradient, the waveform mark, the Section Aligner.
- **Tone:** expert music supervisor — concise, declarative, data-justified. No emoji, no enthusiasm.
- **Radii:** 6–10px content; pill (999px) reserved for SonIA conversational bubbles only.
- **Icons:** inline SVG, 1.5–1.75px rounded stroke, `currentColor`. No emoji/icon-fonts.

## Files
- `styles.css` — link this one file for all tokens + fonts.
- `tokens/` — color, type, spacing, motion, font tokens.
- `components/` — React primitives (Button, IconButton, Input, Select, Waveform, MoodChip, SafetyBadge, MatchRing, TrackCard). Each has a `.prompt.md` with usage.
- `ui_kits/sonia-app/` — full interactive app recreation (Brief → Shortlist → Section Aligner shell).
- `guidelines/` — foundation specimen cards.
