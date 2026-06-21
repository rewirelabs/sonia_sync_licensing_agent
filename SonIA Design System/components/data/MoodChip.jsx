import React from 'react';

const MOOD_HUES = {
  calm:      'var(--mood-calm)',
  mellow:    'var(--mood-mellow)',
  warm:      'var(--mood-warm)',
  energetic: 'var(--mood-energetic)',
  intense:   'var(--mood-intense)',
};

/**
 * MoodChip — low-opacity filled chip, one hue per emotional category.
 * The hue is data: it comes from the emotional spectrum, never decoration.
 */
export function MoodChip({ mood = 'calm', children, color, removable = false, onRemove, style = {} }) {
  const hue = color || MOOD_HUES[mood] || MOOD_HUES.calm;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        height: 26,
        padding: '0 10px',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${hue}`,
        background: `color-mix(in srgb, ${hue} 14%, transparent)`,
        color: hue,
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--type-body-sm)',
        fontWeight: 'var(--weight-medium)',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: hue, flex: 'none' }} />
      {children || mood}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          style={{
            border: 'none', background: 'transparent', color: hue, cursor: 'pointer',
            padding: 0, marginLeft: 2, fontSize: 14, lineHeight: 1, opacity: 0.8,
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
