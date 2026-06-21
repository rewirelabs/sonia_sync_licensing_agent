import * as React from 'react';

export interface SafetyBadgeProps {
  /** brand-safety status */
  state?: 'clear' | 'review' | 'block';
  /** override the label text */
  label?: string;
  style?: React.CSSProperties;
}

/**
 * Brand-safety badge. Accessibility + brand rule: NEVER communicate status
 * with color alone — always pairs an icon with a text label.
 */
export function SafetyBadge(props: SafetyBadgeProps): React.ReactElement;
