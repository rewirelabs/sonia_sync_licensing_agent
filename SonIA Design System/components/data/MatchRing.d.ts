import * as React from 'react';

/**
 * Circular 0–100 match-score ring (cyan→orange). Pure data viz.
 * @startingPoint section="Signature" subtitle="0–100 match score ring" viewport="700x140"
 */
export interface MatchRingProps {
  /** match score 0–100 */
  value?: number;
  /** outer diameter in px */
  size?: number;
  /** ring thickness in px */
  stroke?: number;
  label?: string;
  showLabel?: boolean;
  style?: React.CSSProperties;
}

/**
 * Circular 0–100 match-score ring. Arc fills with the cyan→orange gradient
 * (low→high); the number is rendered in mono. Pure data viz, no decoration.
 */
export function MatchRing(props: MatchRingProps): React.ReactElement;
