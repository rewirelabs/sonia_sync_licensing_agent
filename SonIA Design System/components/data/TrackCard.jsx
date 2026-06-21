import React from 'react';
import { MoodChip } from './MoodChip.jsx';
import { SafetyBadge } from './SafetyBadge.jsx';
import { MatchRing } from './MatchRing.jsx';

/** Mini sparkline of the emotional curve, with the 30s window highlighted. */
function WindowSparkline({ curve, window: win }) {
  const w = 120, h = 34;
  const pts = curve.map((v, i) => `${(i / (curve.length - 1)) * w},${h - v * (h - 4) - 2}`).join(' ');
  const start = win ? win[0] : 0.45;
  const end = win ? win[1] : 0.72;
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <rect x={start * w} y={0} width={(end - start) * w} height={h} fill="color-mix(in srgb, var(--accent-action) 16%, transparent)" />
      <rect x={start * w} y={0} width="1.5" height={h} fill="var(--accent-action)" />
      <rect x={end * w - 1.5} y={0} width="1.5" height={h} fill="var(--accent-action)" />
      <polyline points={pts} fill="none" stroke="var(--accent-micro)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/**
 * TrackCard — assembles the SonIA result row: artwork, title (display),
 * artist / duration / language (mono), mood chips, match ring, safety
 * badge, and a mini-sparkline of the optimal window.
 */
export function TrackCard({
  title = 'Untitled',
  artist = 'Unknown',
  duration = '0:00',
  language = '—',
  bpm,
  artwork,
  moods = [],
  match = 0,
  safety = 'clear',
  curve = [0.2, 0.3, 0.25, 0.4, 0.55, 0.7, 0.85, 0.78, 0.6, 0.5, 0.42, 0.3],
  window: win = [0.45, 0.72],
  windowLabel = '01:12–01:42',
  onOpen,
  style = {},
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onOpen}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-5)',
        padding: 'var(--space-4)',
        background: 'var(--bg-surface)',
        border: '1px solid',
        borderColor: hover ? 'var(--border-strong)' : 'var(--border)',
        borderRadius: 'var(--radius-md)',
        cursor: onOpen ? 'pointer' : 'default',
        transition: 'border-color var(--dur-std) var(--ease)',
        ...style,
      }}
    >
      {/* artwork */}
      <div style={{
        width: 60, height: 60, flex: 'none', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
        background: artwork ? `center/cover no-repeat url(${artwork})` : 'var(--spectrum)',
        border: '1px solid var(--border)',
      }} />

      {/* title + meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-semibold)',
          fontSize: 'var(--type-subheading)', letterSpacing: 'var(--tracking-heading)',
          color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{title}</div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--type-data-sm)',
          color: 'var(--text-secondary)', marginTop: 3, letterSpacing: 'var(--tracking-data)',
        }}>
          {artist} · {duration} · {language}{bpm ? ` · ${bpm} BPM` : ''}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
          {moods.map((m, i) => (
            <MoodChip key={i} mood={typeof m === 'string' ? m : m.mood}>{typeof m === 'string' ? m : m.label}</MoodChip>
          ))}
        </div>
      </div>

      {/* window sparkline */}
      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
        <WindowSparkline curve={curve} window={win} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--type-eyebrow)',
          color: 'var(--accent-action)', letterSpacing: 'var(--tracking-data)',
        }}>{windowLabel}</span>
      </div>

      {/* safety + match */}
      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
        <SafetyBadge state={safety} />
        <MatchRing value={match} size={48} stroke={4} showLabel={false} />
      </div>
    </div>
  );
}
