/* SonIA — Section Aligner (HERO). Overlays the emotional curve (filled with
   the spectrum gradient) with time-synced lyrics, and brackets the optimal
   ~30s window. Hover scrubber reads instant × intensity × current line. */
(function () {
  const { Waveform, SafetyBadge, MatchRing, Button } = window.SonIADesignSystem_4b5948;

  function fmt(sec) {
    const m = Math.floor(sec / 60), s = Math.round(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  function intensityWord(v) {
    if (v < 0.25) return 'calm';
    if (v < 0.45) return 'mellow';
    if (v < 0.65) return 'warm';
    if (v < 0.82) return 'energetic';
    return 'intense';
  }

  function SectionAligner({ track, onBack }) {
    const W = 1000, H = 280, padL = 16, padR = 16, top = 18, bottom = 38;
    const plotW = W - padL - padR, plotH = H - top - bottom;
    const [hoverX, setHoverX] = React.useState(null);
    const svgRef = React.useRef(null);

    const c = track.curve;
    const n = c.length;
    const xAt = (frac) => padL + frac * plotW;
    const fracAt = (i) => i / (n - 1);
    const yAt = (v) => top + (1 - v) * plotH;

    // area path
    let line = '';
    c.forEach((v, i) => { line += `${i === 0 ? 'M' : 'L'}${xAt(fracAt(i)).toFixed(1)},${yAt(v).toFixed(1)} `; });
    const area = `${line} L${xAt(1).toFixed(1)},${yAt(0).toFixed(1)} L${xAt(0).toFixed(1)},${yAt(0).toFixed(1)} Z`;

    const win = track.window;
    const winX0 = xAt(win[0]), winX1 = xAt(win[1]);

    function onMove(e) {
      const rect = svgRef.current.getBoundingClientRect();
      const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setHoverX(frac);
    }
    // value at fraction (interp)
    function valAt(frac) {
      const idx = frac * (n - 1);
      const lo = Math.floor(idx), hi = Math.min(n - 1, lo + 1);
      const t = idx - lo;
      return c[lo] * (1 - t) + c[hi] * t;
    }
    const hoverSec = hoverX != null ? hoverX * track.durSec : null;
    const hoverVal = hoverX != null ? valAt(hoverX) : null;
    const hoverLine = hoverX != null
      ? [...track.lyrics].reverse().find((l) => l.t <= hoverX)
      : null;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border)' }}>
          {onBack && (
            <button onClick={onBack} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Back to shortlist">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3L5 8l5 5" /></svg>
            </button>
          )}
          <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-sm)', background: 'var(--spectrum)', border: '1px solid var(--border)', flex: 'none' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, letterSpacing: '-.01em', color: 'var(--text-primary)' }}>{track.title}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', marginTop: 3, letterSpacing: '.02em' }}>{track.artist} · {track.duration} · {track.language} · {track.bpm} BPM</div>
          </div>
          <SafetyBadge state={track.safety} />
          <MatchRing value={track.match} size={52} stroke={5} />
        </div>

        {/* timeline */}
        <div style={{ flex: 1, padding: 'var(--space-6)', overflow: 'auto', minHeight: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Section Aligner · lyric × emotion</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              <span style={{ width: 18, height: 6, borderRadius: 3, background: 'var(--spectrum)' }} /> emotional curve (Cyanite)
            </div>
          </div>

          <div style={{ position: 'relative', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
            <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}
              onMouseMove={onMove} onMouseLeave={() => setHoverX(null)}>
              <defs>
                <linearGradient id="specV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F0386B" />
                  <stop offset="22%" stopColor="#FF6A2C" />
                  <stop offset="48%" stopColor="#FACC15" />
                  <stop offset="74%" stopColor="#2DD4BF" />
                  <stop offset="100%" stopColor="#4C6EF5" />
                </linearGradient>
                <clipPath id="areaClip"><path d={area} /></clipPath>
              </defs>

              {/* gridlines */}
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1={padL} y1={yAt(g)} x2={W - padR} y2={yAt(g)} stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4" />
              ))}

              {/* filled spectrum area (clipped) — taller = warmer/intense */}
              <g clipPath="url(#areaClip)">
                <rect x={padL} y={top} width={plotW} height={plotH} fill="url(#specV)" opacity="0.85" />
              </g>
              <path d={line} fill="none" stroke="#F4F5F7" strokeWidth="1.5" strokeOpacity="0.5" strokeLinejoin="round" />

              {/* optimal window bracket */}
              <rect x={winX0} y={top - 6} width={winX1 - winX0} height={plotH + 12} fill="rgba(255,106,44,0.10)" />
              <line x1={winX0} y1={top - 6} x2={winX0} y2={top + plotH + 6} stroke="var(--accent-action)" strokeWidth="2" />
              <line x1={winX1} y1={top - 6} x2={winX1} y2={top + plotH + 6} stroke="var(--accent-action)" strokeWidth="2" />
              <line x1={winX0} y1={top - 6} x2={winX1} y2={top - 6} stroke="var(--accent-action)" strokeWidth="2" />

              {/* lyric ticks */}
              {track.lyrics.map((l, i) => (
                <g key={i}>
                  <line x1={xAt(l.t)} y1={top} x2={xAt(l.t)} y2={top + plotH} stroke="var(--accent-micro)" strokeWidth="1" strokeOpacity="0.45" />
                  <circle cx={xAt(l.t)} cy={yAt(valAt(l.t))} r="3.5" fill="#14161B" stroke="var(--accent-micro)" strokeWidth="1.5" />
                </g>
              ))}

              {/* baseline / time axis */}
              <line x1={padL} y1={top + plotH} x2={W - padR} y2={top + plotH} stroke="var(--border-strong)" strokeWidth="1" />
              {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                <text key={f} x={xAt(f)} y={H - 14} fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="11" textAnchor={f === 0 ? 'start' : f === 1 ? 'end' : 'middle'}>{fmt(f * track.durSec)}</text>
              ))}

              {/* scrubber */}
              {hoverX != null && (
                <line x1={xAt(hoverX)} y1={top - 6} x2={xAt(hoverX)} y2={top + plotH} stroke="#F4F5F7" strokeWidth="1" strokeOpacity="0.7" />
              )}
            </svg>

            {/* window label pinned over bracket */}
            <div style={{ position: 'absolute', left: `calc(${(win[0] + win[1]) / 2 * 100}% - 60px)`, top: 6, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, color: 'var(--accent-action)', background: 'var(--bg-base)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-action)', pointerEvents: 'none' }}>
              {track.windowLabel}
            </div>

            {/* hover tooltip */}
            {hoverX != null && (
              <div style={{ position: 'absolute', left: `calc(${hoverX * 100}% )`, top: 0, transform: 'translateX(8px)', background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', padding: '8px 10px', pointerEvents: 'none', boxShadow: 'var(--shadow-pop)', minWidth: 150 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>{fmt(hoverSec)} · {Math.round(hoverVal * 100)}%</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-micro)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>{intensityWord(hoverVal)}</div>
                {hoverLine && <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', marginTop: 6, maxWidth: 200 }}>"{hoverLine.text}"</div>}
              </div>
            )}
          </div>

          {/* SonIA rationale */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)', alignItems: 'flex-start' }}>
            <div style={{ flex: 'none', marginTop: 2 }}><Waveform state="speaking" height={28} bars={6} /></div>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-pill)', padding: '12px 18px', maxWidth: 640 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-primary)' }}>{track.rationale}</span>
            </div>
          </div>

          {/* actions */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            <Button variant="primary" iconLeft={<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3.5v9l7-4.5z" /></svg>}>Play window · {track.windowLabel}</Button>
            <Button variant="secondary">Export cue sheet</Button>
            <Button variant="tertiary">Adjust window</Button>
          </div>
        </div>
      </div>
    );
  }

  window.SectionAligner = SectionAligner;
})();
