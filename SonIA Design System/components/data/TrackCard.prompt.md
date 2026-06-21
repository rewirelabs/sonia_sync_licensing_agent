The canonical shortlist result row. Assembles artwork, title (Space Grotesk), mono metadata, mood chips, a mini-sparkline of the emotional curve with the 30s window bracketed in orange, a brand-safety badge and the match ring.

```jsx
<TrackCard
  title="Glass Veins" artist="HÖRT" duration="3:24" language="EN" bpm={128}
  moods={['mellow','warm']} match={87} safety="clear"
  windowLabel="01:12–01:42" onOpen={openAligner} />
```

Composes MoodChip + SafetyBadge + MatchRing — don't rebuild those inside it. `curve` (0–1 samples) and `window` ([start,end] fractions) drive the sparkline.
