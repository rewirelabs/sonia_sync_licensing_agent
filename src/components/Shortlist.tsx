import React from 'react';
import { RankedTrack } from '@/lib/core/ranker';
import { TrackCard } from './TrackCard';

interface ShortlistProps {
  tracks: RankedTrack[];
  targetArc: any;
  briefText?: string;
}

export function Shortlist({ tracks, targetArc, briefText }: ShortlistProps) {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-[100px] text-center">
        <div className="text-[64px] mb-[20px]">🌌</div>
        <h2 className="text-[24px] font-semibold text-[#e9ecf3] tracking-[-0.01em] mb-[12px]">
          L'universo musicale è rimasto senza parole.
        </h2>
        <p className="text-[15px] leading-[1.6] text-[#e9ecf3]/60 max-w-[440px]">
          SonIA ha ascoltato con molta attenzione, ma non è riuscita a trovare brani che soddisfino perfettamente le tue richieste nel catalogo attuale. Prova a modificare le parole chiave del tuo brief!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* brief recap + arc */}
      <div className="flex gap-[16px] flex-wrap items-start mb-[26px]">
        {targetArc && (
          <div 
            className="flex-1 min-w-[280px] rounded-[14px] bg-[var(--glass)] border border-[var(--glass-border)] p-[16px_18px]"
            style={{ backdropFilter: 'blur(var(--blur))', WebkitBackdropFilter: 'blur(var(--blur))' }}
          >
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#e9ecf3]/40 mb-[7px]">Your brief</div>
            {briefText && (
              <div className="text-[15px] leading-[1.5] text-[#e9ecf3]/90 italic mb-[16px]">
                "{briefText}"
              </div>
            )}
            <div className="text-[13.5px] leading-[1.55] text-[#e9ecf3]/80 pt-[12px] border-t border-white/5">
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
        )}
      </div>

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

    </div>
  );
}
