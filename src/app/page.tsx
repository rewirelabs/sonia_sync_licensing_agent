'use client';
import { useState } from 'react';
import { BriefComposer, BriefOverrides } from '@/components/BriefComposer';
import { ProcessingLoader } from '@/components/ProcessingLoader';
import { Shortlist } from '@/components/Shortlist';
import { RankedTrack } from '@/lib/core/ranker';

export default function Home() {
  const [stage, setStage] = useState<'intake' | 'processing' | 'results'>('intake');
  const [shortlist, setShortlist] = useState<RankedTrack[]>([]);
  const [targetArc, setTargetArc] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBriefSubmit = async (brief: string, overrides: BriefOverrides) => {
    setStage('processing');
    setError(null);
    setShortlist([]);
    setTargetArc(null);

    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief, overrides }),
      });

      if (!res.ok) {
        throw new Error('Failed to process brief');
      }

      const data = await res.json();
      setShortlist(data.shortlist);
      setTargetArc(data.targetArc);
      // Brief pause to show the 100% completion state in the loader
      setTimeout(() => {
        setStage('results');
      }, 500);
    } catch (e: any) {
      setError(e.message);
      setStage('intake');
    }
  };

  const handleReset = () => {
    setStage('intake');
    setShortlist([]);
    setTargetArc(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen bg-[#07080c] text-[var(--ink)] overflow-x-hidden flex flex-col">
      
      {/* AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-16%] left-[4%] w-[42vw] h-[42vw] rounded-full filter blur-[100px] animate-[sx-drift1_26s_ease-in-out_infinite]" style={{ background: 'radial-gradient(circle at 45% 45%, rgba(255,138,61,0.15), rgba(255,138,61,0) 60%)' }}></div>
        <div className="absolute top-[6%] right-[-10%] w-[46vw] h-[46vw] rounded-full filter blur-[110px] animate-[sx-drift2_32s_ease-in-out_infinite]" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,61,127,0.11), rgba(198,61,255,0.05) 45%, rgba(0,0,0,0) 70%)' }}></div>
        <div className="absolute bottom-[-22%] left-[36%] w-[40vw] h-[40vw] rounded-full filter blur-[110px] animate-[sx-drift3_36s_ease-in-out_infinite]" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(61,223,255,0.06), rgba(123,61,255,0.06) 45%, rgba(0,0,0,0) 70%)' }}></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 95% at 50% 0%, rgba(7,8,12,0) 35%, rgba(7,8,12,0.82) 100%)' }}></div>
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* TOP BAR */}
        <div className="flex items-center gap-[18px] px-[34px] py-[18px] border-b border-white/5">
          <div onClick={handleReset} className="flex items-baseline gap-[10px] cursor-pointer">
            <span className="text-[21px] font-bold tracking-[-0.01em] bg-clip-text text-transparent bg-gradient-to-r from-white via-[#ff8a3d] to-[#ff3d7f]">
              SonIA
            </span>
          </div>
          <div className="flex-1"></div>
          {stage === 'results' && (
            <button onClick={handleReset} className="font-sans text-[13px] font-medium text-[var(--ink)] bg-[var(--glass)] border border-[var(--glass-border)] rounded-full px-[18px] py-[9px] cursor-pointer backdrop-blur-[12px]">
              ＋ New brief
            </button>
          )}
        </div>

        {error && (
          <div className="bg-[#9E3B2E]/10 border border-[#9E3B2E]/20 text-[#9E3B2E] p-4 rounded m-8 z-20 relative">
            {error}
          </div>
        )}

        {stage === 'intake' && (
          <div className="flex-1 flex flex-col justify-center relative px-[34px] py-[40px] pb-[70px]">
            {/* ambient hero waveform */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <div className="absolute top-1/2 left-0 right-0 h-[340px] -translate-y-[46%]">
                <svg viewBox="0 0 1600 300" preserveAspectRatio="none" className="absolute inset-0 w-[130%] h-full filter blur-[2px] opacity-30">
                  <g className="animate-[sx-wave_19s_linear_infinite]">
                    <path d="M0,150 Q100,250 200,150 Q300,50 400,150 Q500,250 600,150 Q700,50 800,150 Q900,250 1000,150 Q1100,50 1200,150 Q1300,250 1400,150 Q1500,50 1600,150" fill="none" stroke="#ff8a3d" strokeWidth="1.2"></path>
                  </g>
                </svg>
                <svg viewBox="0 0 1600 300" preserveAspectRatio="none" className="absolute inset-0 w-[130%] h-full filter blur-[0.5px] opacity-65">
                  <g className="animate-[sx-wave_13s_linear_infinite]">
                    <path d="M0,150 Q100,95 200,150 Q300,205 400,150 Q500,95 600,150 Q700,205 800,150 Q900,95 1000,150 Q1100,205 1200,150 Q1300,95 1400,150 Q1500,205 1600,150" fill="none" stroke="#ff3d7f" strokeWidth="1.6"></path>
                  </g>
                </svg>
              </div>
            </div>
            
            <BriefComposer onSubmit={handleBriefSubmit} isLoading={false} />
          </div>
        )}

        {stage === 'processing' && (
          <ProcessingLoader isFinished={shortlist.length > 0} targetArcInfo={targetArc} />
        )}

        {stage === 'results' && shortlist.length > 0 && (
          <div className="flex-1 px-[34px] py-[30px] pb-[70px] max-w-[1080px] w-full mx-auto animate-[sx-fadein_0.5s_ease]">
            <Shortlist tracks={shortlist} targetArc={targetArc} />
          </div>
        )}
      </div>
    </div>
  );
}
