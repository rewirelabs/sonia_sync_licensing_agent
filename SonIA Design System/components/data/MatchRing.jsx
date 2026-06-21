import React from 'react';

/**
 * MatchRing — circular 0–100 match score. The arc uses the cyan→orange
 * gradient (low→high). The number is mono; the score is the data.
 */
export function MatchRing({ value = 0, size = 56, stroke = 5, label = 'match', showLabel = true, style = {} }) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (v / 100) * c;
  const gid = React.useId ? React.useId().replace(/:/g, '') : 'mr' + Math.round(value * 1000);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4, ...style }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-micro)" />
              <stop offset="100%" stopColor="var(--accent-action)" />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--ring-track)" strokeWidth={stroke} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={`url(#${gid})`} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
            style={{ transition: 'stroke-dasharray var(--dur-enter) var(--ease)' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontWeight: 'var(--weight-semibold)',
          fontSize: size > 44 ? 'var(--type-data-lg)' : 'var(--type-data-sm)',
          color: 'var(--text-primary)',
        }}>
          {Math.round(v)}
        </div>
      </div>
      {showLabel && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--type-eyebrow)',
          letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>{label}</span>
      )}
    </div>
  );
}
