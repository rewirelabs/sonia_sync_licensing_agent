import * as React from 'react';

export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  /** use JetBrains Mono — for data entry (timestamps, BPM, scores) */
  mono?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  iconLeft?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/** Text input with cyan focus ring. Set `mono` for measure/data entry. */
export function Input(props: InputProps): React.ReactElement;
