import * as React from 'react';

/**
 * Primary action button for SonIA. Orange is reserved for primary CTAs only.
 * @startingPoint section="Core" subtitle="Action / ghost / text buttons" viewport="700x180"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = orange CTA, secondary = ghost outline, tertiary = text only */
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

/**
 * Primary action button for SonIA. Orange is reserved for primary CTAs and
 * active states only — use secondary/tertiary everywhere else.
 */
export function Button(props: ButtonProps): React.ReactElement;
