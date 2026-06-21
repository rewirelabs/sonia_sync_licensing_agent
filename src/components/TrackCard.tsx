import React from 'react';
import { RankedTrack } from '@/lib/core/ranker';
import { SafetyBadge } from './SafetyBadge';
import { SongTimeline } from './SongTimeline';

interface TrackCardProps {
  track: RankedTrack;
  isHero?: boolean;
}

export function TrackCard({ track, isHero = false }: TrackCardProps) {
  return (
    <div className={`flex flex-col bg-surface border border-hairline rounded-lg overflow-hidden ${isHero ? 'shadow-md ring-1 ring-forest/20' : ''}`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-hairline rounded overflow-hidden flex-shrink-0 relative">
            {track.coverUrl ? (
              <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-ink-soft text-xs">No Cover</div>
            )}
          </div>
          <div>
            <h3 className="font-serif text-lg text-ink m-0 leading-tight">{track.title}</h3>
            <p className="text-sm text-ink-soft m-0">{track.artist}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-forest font-semibold">{track.alignment.fitScore.toFixed(0)} Fit</span>
            <SafetyBadge level={track.safetyLevel as any} />
          </div>
          <p className="text-xs text-ink-soft max-w-xs text-right hidden sm:block">
            {track.alignment.fitRationale}
          </p>
        </div>
      </div>

      {isHero && (
        <div className="p-4 border-t border-hairline bg-bg">
          <SongTimeline track={track} />
        </div>
      )}
    </div>
  );
}
