import React from 'react';

/**
 * SonIA Button — orange is reserved for primary actions only.
 * Variants: primary (action orange), secondary (ghost/outline), tertiary (text).
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  type = 'button',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const sizes = {
    sm: { padding: '0 12px', height: 30, font: 'var(--type-body-sm)' },
    md: { padding: '0 16px', height: 38, font: 'var(--type-body)' },
    lg: { padding: '0 22px', height: 46, font: 'var(--type-body-lg)' },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-body)',
    fontSize: s.font,
    fontWeight: 'var(--weight-semibold)',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-micro) var(--ease), border-color var(--dur-micro) var(--ease), color var(--dur-micro) var(--ease), transform var(--dur-micro) var(--ease)',
    transform: press && !disabled ? 'scale(0.98)' : 'scale(1)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  };

  const variants = {
    primary: {
      background: disabled ? 'var(--accent-action)' : press ? 'var(--accent-action-press)' : hover ? 'var(--accent-action-hover)' : 'var(--accent-action)',
      color: 'var(--text-on-action)',
    },
    secondary: {
      background: hover && !disabled ? 'var(--hover-overlay)' : 'transparent',
      color: 'var(--text-primary)',
      borderColor: hover && !disabled ? 'var(--border-strong)' : 'var(--border)',
    },
    tertiary: {
      background: 'transparent',
      color: hover && !disabled ? 'var(--accent-action-hover)' : 'var(--accent-action)',
      padding: '0 4px',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
