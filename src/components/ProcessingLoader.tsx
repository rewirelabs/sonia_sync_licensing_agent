'use client';
import React, { useEffect, useState } from 'react';

const STEPS = [
  { label: 'Brief Normalizer', phrase: 'Reading your brief', sub: 'building the target arc' },
  { label: 'Track Discovery', phrase: 'Searching the catalogue', sub: 'q_lyrics + market filters' },
  { label: 'Lyric Fetch', phrase: 'Pulling word-level lyrics', sub: 'richsync · subtitle · mood' },
  { label: 'Lyric Curve', phrase: 'Listening to every line', sub: 'intensity · valence · fit' },
  { label: 'Section Aligner', phrase: 'Sliding the 30-second window', sub: 'finding the money line' },
  { label: 'Safety Engine', phrase: 'Checking brand-safety', sub: 'line-by-line · translation' },
];

const TICKER = [
  'richsync · 1,204 words mapped',
  'q_lyrics · markets DE · AT · CH · IT',
  'scoring intensity · valence · theme-fit',
  'window step · 1000ms · snapping to phrases',
  'scanning 0:00 → 0:30 …',
  'money-line candidate located',
  'translation de → en for safety pass',
  'ruleset · automotive · family',
];

export function ProcessingLoader({ isFinished, targetArcInfo }: { isFinished: boolean, targetArcInfo: any }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const int = setInterval(() => {
      setTick(t => t + 1);
    }, 1150);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    let t: any;
    const advance = (i: number) => {
      // Adjusted durations to map closer to ~45 seconds (5000, 7000, 7000, 10000, 8000, 8000)
      const durs = [5000, 7000, 7000, 10000, 8000, 8000];
      if (i >= STEPS.length || isFinished) return;
      setStepIdx(i);
      t = setTimeout(() => {
        setDone(prev => [...prev, i]);
        advance(i + 1);
      }, durs[i] || 5000);
    };
    advance(0);
    return () => clearTimeout(t);
  }, [isFinished]);

  // If finished, force everything to done quickly to smoothly exit.
  useEffect(() => {
    if (isFinished) {
      setDone([0,1,2,3,4,5]);
      setStepIdx(6);
    }
  }, [isFinished]);

  const cur = STEPS[Math.min(Math.max(stepIdx, 0), STEPS.length - 1)] || STEPS[0];
  const phrase = cur.phrase;
  const tickerStr = TICKER[tick % TICKER.length];
  const pct = Math.round((done.length / STEPS.length) * 100);
  const progressLabel = pct >= 100 ? 'Finalising shortlist' : `Analysing · ${stepIdx + 1} / ${STEPS.length}`;

  return (
    <div className="flex-1 flex items-center justify-center py-10 px-[34px] w-full">
      <div 
        className="w-full max-w-[920px] rounded-[var(--radius)] bg-[var(--glass)] border border-[var(--glass-border)] p-10 animate-[sx-fadein_0.4s_ease]"
        style={{
          boxShadow: 'var(--glass-shadow)',
          backdropFilter: 'blur(var(--blur))',
          WebkitBackdropFilter: 'blur(var(--blur))'
        }}
      >
        <div className="flex gap-10 flex-wrap">
          
          {/* left: orb + forming wave + phrase */}
          <div className="flex-1 min-w-[320px]">
            <div className="relative h-[150px] mb-2 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <div 
                className="absolute top-1/2 left-1/2 w-[120px] h-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 animate-[sx-spin_8s_linear_infinite,sx-pulse_3s_ease-in-out_infinite]"
                style={{
                  background: 'conic-gradient(from 0deg,#ff8a3d,#ff3d7f,#c63dff,#7b3dff,#3ddfff,#ff8a3d)',
                  filter: 'blur(34px)'
                }}
              />
              <svg viewBox="0 0 1600 300" preserveAspectRatio="none" className="absolute inset-0 w-[160%] h-full">
                <g className="animate-[sx-wave_9s_linear_infinite]">
                  <path d="M0,150 Q100,90 200,150 Q300,210 400,150 Q500,90 600,150 Q700,210 800,150 Q900,90 1000,150 Q1100,210 1200,150 Q1300,90 1400,150 Q1500,210 1600,150" fill="none" stroke="url(#sxSpectrum)" strokeWidth="3.5"></path>
                </g>
              </svg>
              <svg viewBox="0 0 1600 300" preserveAspectRatio="none" className="absolute inset-0 w-[160%] h-full opacity-60 blur-[5px]">
                <g className="animate-[sx-wave_14s_linear_infinite]">
                  <path d="M0,150 Q100,215 200,150 Q300,85 400,150 Q500,215 600,150 Q700,85 800,150 Q900,215 1000,150 Q1100,85 1200,150 Q1300,215 1400,150 Q1500,85 1600,150" fill="none" stroke="url(#sxSpectrum)" strokeWidth="8"></path>
                </g>
              </svg>
              <div className="absolute top-0 bottom-0 w-[2px] animate-[sx-scan_2.6s_ease-in-out_infinite]" style={{
                background: 'linear-gradient(180deg,transparent,rgba(255,255,255,0.9),transparent)',
                boxShadow: '0 0 18px rgba(255,255,255,0.6)'
              }}></div>
            </div>

            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent my-[18px] flex items-center gap-[8px]">
              <span className="w-[7px] h-[7px] rounded-full bg-accent shadow-[0_0_10px_var(--accent)] animate-[sx-blink_1s_infinite]"></span>
              SonIA is listening
            </div>
            
            <div className="text-[27px] font-semibold tracking-[-0.02em] leading-[1.2] min-h-[34px]">
              {phrase}<span className="text-accent">…</span>
            </div>
            <div className="font-mono text-[12.5px] text-[#e9ecf3]/50 mt-[10px] min-h-[18px]">
              {tickerStr}
            </div>

            {/* progress */}
            <div className="mt-[24px]">
              <div className="h-[5px] rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${pct}%`,
                    background: 'linear-gradient(90deg,#ff8a3d,#ff3d7f,#c63dff)',
                    boxShadow: '0 0 14px rgba(255,61,127,0.5)'
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-[8px] font-mono text-[10.5px] text-[#e9ecf3]/40">
                <span>{progressLabel}</span>
                <span>{pct}%</span>
              </div>
            </div>
          </div>

          {/* right: step pipeline */}
          <div className="w-[260px] flex-none">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#e9ecf3]/40 mb-[14px]">Pipeline · The Floor</div>
            <div className="flex flex-col gap-[3px]">
              {STEPS.map((s, i) => {
                const isDone = done.includes(i);
                const isActive = i === stepIdx && !isDone;
                const status = isDone ? 'done' : (isActive ? 'active' : 'pending');
                
                return (
                  <div key={i} className="flex gap-[11px] items-center p-[9px] rounded-[10px] transition-all" style={{
                    background: isActive ? 'rgba(255,138,61,0.08)' : 'transparent',
                    opacity: status === 'pending' ? 0.4 : 1
                  }}>
                    {isDone ? (
                      <div className="w-[22px] h-[22px] shrink-0 rounded-full flex items-center justify-center text-[11px] text-[#0a0a0c] bg-gradient-to-br from-[#ff8a3d] to-[#ff3d7f] shadow-[0_0_10px_rgba(255,61,127,0.4)]">✓</div>
                    ) : isActive ? (
                      <div className="w-[22px] h-[22px] shrink-0 rounded-full flex items-center justify-center text-[11px] text-white border-2 border-accent shadow-[0_0_12px_rgba(255,138,61,0.7)] animate-[sx-glowpulse_1.1s_ease-in-out_infinite]">{i + 1}</div>
                    ) : (
                      <div className="w-[22px] h-[22px] shrink-0 rounded-full flex items-center justify-center text-[10px] text-[#e9ecf3]/40 border border-white/10">{i + 1}</div>
                    )}
                    
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium" style={{ color: isActive ? 'var(--ink)' : (isDone ? 'rgba(233,236,243,0.82)' : 'rgba(233,236,243,0.55)') }}>
                        {s.label}
                      </div>
                      <div className="font-mono text-[10px] text-[#e9ecf3]/40">{s.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* target arc reveal */}
        {targetArcInfo && (
          <div className="mt-[30px] pt-[24px] border-t border-white/10 animate-[sx-fadeup_0.5s_ease]">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#e9ecf3]/40 mb-[12px]">Target Arc · extracted from your brief</div>
            <div className="flex flex-wrap gap-[8px]">
              {(() => {
                const chips = Array.isArray(targetArcInfo) ? targetArcInfo : [
                  { k: 'shape', v: targetArcInfo.shape },
                  { k: 'window', v: targetArcInfo.targetDurationSec ? `${targetArcInfo.targetDurationSec}s` : null },
                  { k: 'vocals', v: targetArcInfo.vocalGender },
                  { k: 'lang', v: targetArcInfo.languages?.join('·') },
                  { k: 'markets', v: targetArcInfo.targetMarkets?.join('·') },
                  { k: 'brand', v: targetArcInfo.brandProfile }
                ].filter(c => c.v);

                return chips.map((c: any, i: number) => (
                  <span key={i} className="inline-flex items-center gap-[7px] text-[13px] text-[#e9ecf3]/85 bg-white/5 border border-white/10 rounded-full px-[13px] py-[6px]">
                    <span className="text-[#e9ecf3]/45 font-mono text-[10px] uppercase tracking-[0.08em]">{c.k}</span>
                    <span className="max-w-[150px] truncate">{c.v}</span>
                  </span>
                ));
              })()}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
