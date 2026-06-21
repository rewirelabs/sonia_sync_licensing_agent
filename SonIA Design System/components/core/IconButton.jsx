import React from 'react';

/**
 * IconButton — square, icon-only control. Quiet by default (ghost),
 * with an optional active state that uses the cyan micro-accent.
 */
export function IconButton({
  children,
  size = 'md',
  active = false,
  disabled = false,
  label,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = { sm: 30, md: 36, lg: 42 }[size] || 36;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: dim,
        height: dim,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid',
        borderColor: active ? 'var(--accent-micro)' : hover && !disabled ? 'var(--border-strong)' : 'var(--border)',
        background: active ? 'var(--accent-micro-dim)' : hover && !disabled ? 'var(--hover-overlay)' : 'transparent',
        color: active ? 'var(--accent-micro)' : 'var(--text-secondary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-micro) var(--ease), border-color var(--dur-micro) var(--ease), color var(--dur-micro) var(--ease)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
