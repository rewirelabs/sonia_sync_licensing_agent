import React from 'react';

const STATES = {
  clear:  { color: 'var(--safe-clear)',  label: 'Clear' },
  review: { color: 'var(--safe-review)', label: 'Review' },
  block:  { color: 'var(--safe-block)',  label: 'Block' },
};

function Glyph({ state, color }) {
  const common = { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', stroke: color, strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (state === 'clear') return (<svg {...common}><path d="M3.5 8.5l3 3 6-6.5" /></svg>);
  if (state === 'review') return (<svg {...common}><path d="M8 2.5l6 11H2l6-11z" /><path d="M8 7v3" /><path d="M8 12h.01" /></svg>);
  return (<svg {...common}><circle cx="8" cy="8" r="5.5" /><path d="M5 5l6 6" /></svg>);
}

/**
 * SafetyBadge — brand-safety status. NEVER color alone: always icon + label.
 */
export function SafetyBadge({ state = 'clear', label, style = {} }) {
  const s = STATES[state] || STATES.clear;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        height: 24,
        padding: '0 9px',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid color-mix(in srgb, ${s.color} 40%, transparent)`,
        background: `color-mix(in srgb, ${s.color} 12%, transparent)`,
        color: s.color,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--type-data-sm)',
        fontWeight: 'var(--weight-medium)',
        letterSpacing: 'var(--tracking-data)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <Glyph state={state} color={s.color} />
      {label || s.label}
    </span>
  );
}
