import React from 'react';
import { RankedTrack } from '@/lib/core/ranker';
import { TrackCard } from './TrackCard';

interface ShortlistProps {
  tracks: RankedTrack[];
  targetArc: any;
}

export function Shortlist({ tracks, targetArc }: ShortlistProps) {
  if (!tracks || tracks.length === 0) return null;

  return (
    <div className="w-full">
      {/* brief recap + arc */}
      {targetArc && (
        <div className="flex gap-[16px] flex-wrap items-start mb-[26px]">
          <div 
            className="flex-1 min-w-[280px] rounded-[14px] bg-[var(--glass)] border border-[var(--glass-border)] p-[16px_18px]"
            style={{ backdropFilter: 'blur(var(--blur))', WebkitBackdropFilter: 'blur(var(--blur))' }}
          >
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#e9ecf3]/40 mb-[7px]">Your brief</div>
            <div className="text-[13.5px] leading-[1.55] text-[#e9ecf3]/80">
              Target Duration: {targetArc.targetDurationSec || 30}s • Target Markets: {targetArc.targetMarkets?.join(', ') || 'Global'}
            </div>
            <div className="flex flex-wrap gap-[6px] mt-[12px]">
              {targetArc.vocalGender && (
                <span className="font-mono text-[10px] tracking-[0.04em] text-[#e9ecf3]/60 bg-white/5 border border-white/10 rounded-full px-[9px] py-[4px]">
                  <span className="text-[#e9ecf3]/40">vocals</span> {targetArc.vocalGender}
                </span>
              )}
              {targetArc.shape && (
                <span className="font-mono text-[10px] tracking-[0.04em] text-[#e9ecf3]/60 bg-white/5 border border-white/10 rounded-full px-[9px] py-[4px]">
                  <span className="text-[#e9ecf3]/40">shape</span> {targetArc.shape}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-baseline gap-[12px] mb-[16px]">
        <h2 className="text-[20px] font-semibold tracking-[-0.01em] m-0">Shortlist</h2>
        <span className="font-mono text-[11px] text-[#e9ecf3]/45">{tracks.length} tracks · ranked by fit · audio-free</span>
        <div className="flex-1"></div>
        <span className="font-mono text-[11px] text-[#e9ecf3]/45">▾ Newest</span>
      </div>

      {/* track list */}
      <div className="flex flex-col gap-[14px]">
        {tracks.map((track, idx) => (
          <TrackCard 
            key={track.isrc || idx} 
            track={track} 
            rank={idx + 1}
          />
        ))}
      </div>

      <div className="text-center mt-[28px] font-mono text-[10.5px] tracking-[0.1em] text-[#e9ecf3]/30">
        Musixmatch lyrics & timings are ephemeral — never stored · derivatives only
      </div>
    </div>
  );
}
