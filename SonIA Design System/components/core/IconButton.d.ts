import * as React from 'react';

export interface IconButtonProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** active uses the cyan micro-accent ring + tint */
  active?: boolean;
  disabled?: boolean;
  /** accessible label (also used as tooltip) */
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/** Square icon-only control. Ghost by default; cyan ring when active. */
export function IconButton(props: IconButtonProps): React.ReactElement;
