import * as React from 'react';

/**
 * Editable mood/facet chip. The color is the data — don't recolor for looks.
 * @startingPoint section="Signature" subtitle="Emotional mood chips" viewport="700x140"
 */
export interface MoodChipProps {
  /** emotional spectrum category — sets the hue */
  mood?: 'calm' | 'mellow' | 'warm' | 'energetic' | 'intense';
  children?: React.ReactNode;
  /** override hue explicitly (e.g. a non-spectrum facet) */
  color?: string;
  removable?: boolean;
  onRemove?: () => void;
  style?: React.CSSProperties;
}

/**
 * Editable mood/facet chip. Low-opacity fill + solid text/border, one hue per
 * spectrum category. The color is the data — don't recolor for decoration.
 */
export function MoodChip(props: MoodChipProps): React.ReactElement;
