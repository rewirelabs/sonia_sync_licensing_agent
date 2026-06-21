import React from 'react';
import { RankedTrack } from '@/lib/core/ranker';

interface SongTimelineProps {
  track: RankedTrack;
}

export function SongTimeline({ track }: SongTimelineProps) {
  const { alignment, safetyVerdicts } = track;
  const durationMs = track.durationMs || 300000;
  
  // Calculate percentages for positioning
  const windowStartPct = (alignment.startMs / durationMs) * 100;
  const windowWidthPct = ((alignment.endMs - alignment.startMs) / durationMs) * 100;
  const moneyLinePct = (alignment.moneyLineTimestampMs / durationMs) * 100;

  return (
    <div className="w-full relative py-6">
      <div className="flex justify-between text-xs font-mono text-ink-soft mb-2">
        <span>0:00</span>
        <span className="text-forest font-semibold">Recommended Window ({Math.round(alignment.startMs/1000)}s - {Math.round(alignment.endMs/1000)}s)</span>
        <span>{Math.round(durationMs / 60000)}:{(Math.round((durationMs % 60000)/1000)).toString().padStart(2, '0')}</span>
      </div>

      {/* Main Axis */}
      <div className="relative h-12 bg-hairline/50 rounded-sm">
        {/* Mock Lyric Curve (smooth forest line) */}
        <svg className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0,80 Q25,80 50,40 T100,20" fill="none" stroke="var(--forest, #2F5D50)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* 30s Window Band */}
        <div 
          className="absolute top-0 bottom-0 bg-forest/10 border-x border-forest/30 transition-all duration-500"
          style={{ left: `${windowStartPct}%`, width: `${windowWidthPct}%` }}
        />

        {/* Money Line Marker */}
        {alignment.moneyLineTimestampMs > 0 && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-terracotta z-10"
            style={{ left: `${moneyLinePct}%` }}
          >
            <div className="absolute top-full mt-2 -translate-x-1/2 whitespace-nowrap">
              <span className="font-serif italic text-terracotta text-sm block">Money Line</span>
            </div>
          </div>
        )}

        {/* Safety Markers */}
        {safetyVerdicts && safetyVerdicts.map((v, i) => (
          <div 
            key={i}
            className={`absolute top-0 bottom-0 w-1 ${v.severity === 'high' ? 'bg-unsafe' : 'bg-caution'} z-10 group cursor-help`}
            style={{ left: `${(v.timestampMs / durationMs) * 100}%` }}
          >
            {/* Popover on hover */}
            <div className="absolute bottom-full mb-2 -translate-x-1/2 hidden group-hover:block w-48 bg-surface border border-hairline p-2 rounded shadow-lg z-20">
              <p className="text-xs font-bold text-ink mb-1">{v.category.toUpperCase()}</p>
              <p className="text-xs text-ink-soft mb-1 italic">"{v.evidence}"</p>
              <p className="text-xs text-ink">{v.translation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
