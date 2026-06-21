import * as React from 'react';

export interface TrackMood { mood: string; label?: string; }

/**
 * Result row for a track: the canonical shortlist item.
 * @startingPoint section="Signature" subtitle="Shortlist track result card" viewport="700x130"
 */
export interface TrackCardProps {
  title?: string;
  artist?: string;
  /** total duration, mono-formatted e.g. "3:24" */
  duration?: string;
  language?: string;
  bpm?: number;
  /** album-art image URL; falls back to a spectrum placeholder */
  artwork?: string;
  /** spectrum categories or { mood, label } */
  moods?: (string | TrackMood)[];
  /** match score 0–100 */
  match?: number;
  safety?: 'clear' | 'review' | 'block';
  /** normalized emotional curve samples (0–1) for the sparkline */
  curve?: number[];
  /** [start, end] of the optimal window as 0–1 fractions */
  window?: [number, number];
  /** mono time label for the window, e.g. "01:12–01:42" */
  windowLabel?: string;
  onOpen?: () => void;
  style?: React.CSSProperties;
}

/**
 * Result row for a track: artwork, title, mono metadata, mood chips, the
 * 30s-window sparkline, brand-safety badge and match ring. Composes
 * MoodChip + SafetyBadge + MatchRing — the canonical shortlist item.
 */
export function TrackCard(props: TrackCardProps): React.ReactElement;
