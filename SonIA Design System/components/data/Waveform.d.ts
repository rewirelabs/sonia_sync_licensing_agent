import * as React from 'react';

/**
 * SonIA's mark: a waveform that doubles as the agent's status indicator.
 * @startingPoint section="Signature" subtitle="The SonIA waveform mark" viewport="700x160"
 */
export interface WaveformProps {
  /** idle = flat & still, others animate at decreasing periods */
  state?: 'idle' | 'listening' | 'thinking' | 'speaking';
  bars?: number;
  /** total height in px */
  height?: number;
  barWidth?: number;
  gap?: number;
  style?: React.CSSProperties;
}

/**
 * SonIA's mark: a waveform that doubles as the agent's status indicator.
 * idle is flat and muted; listening/thinking/speaking animate (the only
 * ambient animation in the system). State is encoded by color + motion.
 */
export function Waveform(props: WaveformProps): React.ReactElement;
