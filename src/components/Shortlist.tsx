import React from 'react';
import { RankedTrack } from '@/lib/core/ranker';
import { TrackCard } from './TrackCard';

interface ShortlistProps {
  tracks: RankedTrack[];
}

export function Shortlist({ tracks }: ShortlistProps) {
  if (!tracks || tracks.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-hairline pb-2 mb-4">
        <h2 className="font-serif text-xl text-ink">Ranked Shortlist</h2>
        <span className="font-mono text-sm text-ink-soft">{tracks.length} matches found</span>
      </div>
      
      {tracks.map((track, idx) => (
        <TrackCard 
          key={track.isrc} 
          track={track} 
          isHero={idx === 0} // Top result gets the HERO treatment
        />
      ))}
    </div>
  );
}
