import React from 'react';

/**
 * Select — native select styled to match Input, with a cyan focus ring
 * and a custom chevron.
 */
export function Select({
  value,
  onChange,
  options = [],
  disabled = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = { sm: 32, md: 40, lg: 46 }[size] || 40;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        height: h,
        background: 'var(--bg-base)',
        border: '1px solid',
        borderColor: focus ? 'var(--accent-micro)' : 'var(--border)',
        borderRadius: 'var(--radius-sm)',
        boxShadow: focus ? '0 0 0 3px color-mix(in srgb, var(--accent-micro) 22%, transparent)' : 'none',
        transition: 'border-color var(--dur-micro) var(--ease), box-shadow var(--dur-micro) var(--ease)',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--type-body)',
          height: '100%',
          padding: '0 34px 0 12px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          width: '100%',
        }}
        {...rest}
      >
        {options.map((o) => {
          const val = typeof o === 'string' ? o : o.value;
          const lbl = typeof o === 'string' ? o : o.label;
          return <option key={val} value={val} style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>{lbl}</option>;
        })}
      </select>
      <svg
        width="14" height="14" viewBox="0 0 16 16" fill="none"
        stroke="var(--text-muted)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: 'absolute', right: 11, pointerEvents: 'none' }}
      >
        <path d="M4 6l4 4 4-4" />
      </svg>
    </div>
  );
}
