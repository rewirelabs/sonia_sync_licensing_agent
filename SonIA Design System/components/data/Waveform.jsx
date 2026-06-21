import React from 'react';

const STATE_COLOR = {
  idle:      'var(--text-muted)',
  listening: 'var(--text-secondary)',
  thinking:  'var(--accent-micro)',
  speaking:  'var(--accent-action)',
};
const STATE_SPEED = { idle: 0, listening: 1.7, thinking: 1.15, speaking: 0.7 };

/**
 * Waveform — SonIA's mark, an audio signature in four states.
 * idle = flat baseline (still), listening / thinking / speaking animate.
 * This is the ONLY element that animates ambiently.
 */
export function Waveform({ state = 'listening', bars = 7, height = 36, barWidth = 4, gap = 3, style = {} }) {
  const color = STATE_COLOR[state] || STATE_COLOR.listening;
  const speed = STATE_SPEED[state] || 0;
  const animate = state !== 'idle';
  const kf = 'sonia-wv';

  // deterministic, varied delays so bars don't move in lockstep
  const delays = React.useMemo(
    () => Array.from({ length: bars }, (_, i) => -((i * 0.27 + (i % 3) * 0.19) % 1).toFixed(2)),
    [bars]
  );

  return (
    <div
      role="img"
      aria-label={`SonIA ${state}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap, height, ...style }}
    >
      <style>{`@keyframes ${kf}{0%,100%{transform:scaleY(.18)}50%{transform:scaleY(.95)}}`}</style>
      {delays.map((d, i) => (
        <span
          key={i}
          style={{
            width: barWidth,
            height: '100%',
            borderRadius: 2,
            background: color,
            transformOrigin: 'center',
            transform: animate ? undefined : 'scaleY(0.14)',
            animation: animate ? `${kf} ${speed}s var(--ease) ${d}s infinite` : 'none',
          }}
        />
      ))}
    </div>
  );
}
