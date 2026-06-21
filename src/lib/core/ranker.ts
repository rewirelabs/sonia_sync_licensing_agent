import { AlignmentResult } from './sectionAligner';
import { Track } from '../connectors/types';
import { SafetyVerdict } from '../types';

export interface RankedTrack extends Track {
  alignment: AlignmentResult;
  safetyVerdicts?: SafetyVerdict[];
  safetyLevel?: string;
  coverUrl?: string;
  previewUrl?: string;
  spotifyId?: string;
}

export function rankTracks(tracks: RankedTrack[]): RankedTrack[] {
  return tracks.sort((a, b) => b.alignment.fitScore - a.alignment.fitScore);
}
