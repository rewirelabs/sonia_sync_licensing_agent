import React from 'react';

/**
 * Input — text field with a cyan focus ring. Mono variant for data entry
 * (timestamps, BPM). Quiet borders that lift on focus.
 */
export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  mono = false,
  disabled = false,
  invalid = false,
  iconLeft = null,
  size = 'md',
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = { sm: 32, md: 40, lg: 46 }[size] || 40;
  const ringColor = invalid ? 'var(--safe-block)' : 'var(--accent-micro)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        height: h,
        padding: '0 12px',
        background: 'var(--bg-base)',
        border: '1px solid',
        borderColor: invalid ? 'var(--safe-block)' : focus ? ringColor : 'var(--border)',
        borderRadius: 'var(--radius-sm)',
        boxShadow: focus ? `0 0 0 3px color-mix(in srgb, ${ringColor} 22%, transparent)` : 'none',
        transition: 'border-color var(--dur-micro) var(--ease), box-shadow var(--dur-micro) var(--ease)',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {iconLeft && <span style={{ display: 'flex', color: 'var(--text-muted)', flex: 'none' }}>{iconLeft}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          flex: 1,
          minWidth: 0,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: 'var(--text-primary)',
          fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
          fontSize: 'var(--type-body)',
          letterSpacing: mono ? 'var(--tracking-data)' : 'normal',
        }}
        {...rest}
      />
    </div>
  );
}
