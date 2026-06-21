import * as React from 'react';

export interface SelectOption { value: string; label: string; }

export interface SelectProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** array of strings or { value, label } */
  options?: (string | SelectOption)[];
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/** Native select styled to match Input — cyan focus ring, custom chevron. */
export function Select(props: SelectProps): React.ReactElement;
