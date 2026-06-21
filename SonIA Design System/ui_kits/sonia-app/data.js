/* SonIA — UI kit mock data. Jury-facing: EN labels, multilingual real-ish data.
   Every visual derives from this data ("il dato è la decorazione"). */
window.SONIA_DATA = (function () {
  // Normalized emotional curves (0–1 arousal/intensity), ~48 samples each.
  function curve(seed, peakAt, width) {
    const n = 48, out = [];
    for (let i = 0; i < n; i++) {
      const x = i / (n - 1);
      const base = 0.18 + 0.12 * Math.sin(x * 7 + seed) + 0.06 * Math.sin(x * 19 + seed * 2);
      const peak = Math.exp(-Math.pow((x - peakAt) / width, 2)) * 0.72;
      out.push(Math.max(0.05, Math.min(0.98, base + peak)));
    }
    return out;
  }

  const tracks = [
    {
      id: 't1', title: 'Glass Veins', artist: 'HÖRT', duration: '3:24', durSec: 204,
      language: 'EN', bpm: 128, match: 92, safety: 'clear',
      moods: ['mellow', 'warm', 'energetic'],
      curve: curve(1.2, 0.52, 0.13), window: [0.46, 0.62], windowLabel: '01:34–02:04',
      rationale: 'The chorus lifts from mellow to energetic exactly at 01:34 — the lyric "we break into light" lands on the emotional peak.',
      lyrics: [
        { t: 0.18, text: 'Slow morning, holding the line' },
        { t: 0.34, text: 'Counting the quiet in twos' },
        { t: 0.47, text: 'We break into light' },
        { t: 0.55, text: 'Everything moving at once' },
        { t: 0.70, text: 'Then the room goes still again' },
      ],
    },
    {
      id: 't2', title: 'Marea Bassa', artist: 'Nadia Conti', duration: '4:02', durSec: 242,
      language: 'IT', bpm: 96, match: 84, safety: 'clear',
      moods: ['calm', 'mellow'],
      curve: curve(3.7, 0.66, 0.16), window: [0.60, 0.76], windowLabel: '02:25–02:55',
      rationale: 'Stays calm through the verse, then a restrained swell at 02:25 — fits a reflective, unhurried scene.',
      lyrics: [
        { t: 0.2, text: 'La marea si ritira piano' },
        { t: 0.45, text: 'Lascia il sale sulle mani' },
        { t: 0.64, text: 'Torno dove non sapevo' },
        { t: 0.82, text: 'E resta solo il mare' },
      ],
    },
    {
      id: 't3', title: 'Static Bloom', artist: 'VELD', duration: '2:58', durSec: 178,
      language: 'EN', bpm: 140, match: 77, safety: 'review',
      moods: ['energetic', 'intense'],
      curve: curve(0.4, 0.40, 0.11), window: [0.34, 0.50], windowLabel: '01:01–01:31',
      rationale: 'High arousal throughout; the 01:01 drop is the most intense window. One lyric line flagged for review.',
      lyrics: [
        { t: 0.15, text: 'Wired to the floor again' },
        { t: 0.37, text: 'Burn it down, start over' },
        { t: 0.52, text: 'Nothing left to hold' },
        { t: 0.74, text: 'Static where the bloom was' },
      ],
    },
    {
      id: 't4', title: 'Hojas Secas', artist: 'Lumen Bajo', duration: '3:41', durSec: 221,
      language: 'ES', bpm: 110, match: 71, safety: 'clear',
      moods: ['warm', 'mellow'],
      curve: curve(2.1, 0.58, 0.15), window: [0.52, 0.68], windowLabel: '01:55–02:25',
      rationale: 'Warm mid-section with an organic build; a good neutral-positive bed under dialogue.',
      lyrics: [
        { t: 0.22, text: 'Hojas secas en la acera' },
        { t: 0.5, text: 'El sol baja despacio' },
        { t: 0.66, text: 'Todo vuelve a empezar' },
        { t: 0.85, text: 'Y la tarde se deshace' },
      ],
    },
    {
      id: 't5', title: 'Cathode', artist: 'Mira Okonkwo', duration: '5:10', durSec: 310,
      language: 'EN', bpm: 118, match: 63, safety: 'block',
      moods: ['intense', 'energetic'],
      curve: curve(4.9, 0.30, 0.10), window: [0.24, 0.40], windowLabel: '01:14–01:44',
      rationale: 'Strong early peak but blocked: master rights unavailable for sync in this territory.',
      lyrics: [
        { t: 0.12, text: 'Glow against the dark' },
        { t: 0.31, text: 'Hold the current steady' },
        { t: 0.58, text: 'Until the filament gives' },
        { t: 0.8, text: 'And the screen goes white' },
      ],
    },
  ];

  const brief = {
    raw: 'Late-night city rooftop, two friends reconcile after a long silence. Bittersweet turning hopeful. Around 30 seconds, building toward the end. English or Italian, nothing explicit.',
    facets: [
      { key: 'mood', label: 'bittersweet → hopeful', mood: 'mellow' },
      { key: 'energy', label: 'energy: building', mood: 'warm' },
      { key: 'duration', label: '~30s window', mood: 'calm' },
      { key: 'language', label: 'EN / IT', mood: 'calm' },
      { key: 'safety', label: 'no explicit', mood: 'calm' },
    ],
  };

  const history = [
    { id: 'h1', title: 'Rooftop reconcile', meta: '5 results · just now', active: true },
    { id: 'h2', title: 'Chase, neon, no vocals', meta: '12 results · 2h ago' },
    { id: 'h3', title: 'Closing credits, warm', meta: '8 results · yesterday' },
    { id: 'h4', title: 'Product film, minimal', meta: '6 results · Mon' },
  ];

  return { tracks, brief, history };
})();
