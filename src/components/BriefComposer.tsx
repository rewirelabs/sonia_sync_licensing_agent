'use client';
import React, { useState } from 'react';

export interface BriefOverrides {
  vocalGender?: string;
  shape?: string;
  targetDurationSec?: number;
}

interface BriefComposerProps {
  onSubmit: (brief: string, overrides: BriefOverrides) => void;
  isLoading: boolean;
}

export function BriefComposer({ onSubmit, isLoading }: BriefComposerProps) {
  const [brief, setBrief] = useState('');
  const [shape, setShape] = useState('');
  const [vocalGender, setVocalGender] = useState('');
  const [targetDurationSec, setTargetDurationSec] = useState<number | ''>('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleDemoClick = (text: string) => {
    setBrief(text);
  };

  const handleSubmit = () => {
    const overrides: BriefOverrides = {};
    if (shape) overrides.shape = shape;
    if (vocalGender) overrides.vocalGender = vocalGender;
    if (targetDurationSec) overrides.targetDurationSec = targetDurationSec;
    onSubmit(brief, overrides);
  };

  const createDisabled = !brief.trim() || isLoading;

  return (
    <div className="relative max-w-[760px] mx-auto w-full text-center z-10 pt-10 pb-20">
      <h1 className="text-[64px] sm:text-[72px] leading-[1.05] font-bold tracking-[-0.035em] m-0 mb-[24px] animate-[sx-fadeup_0.8s_ease_both]">
        Describe the scene.<br />
        <span className="bg-gradient-to-r from-[#ff8a3d] via-[#ff3d7f] to-[#c63dff] bg-clip-text text-transparent">
          Get the sync window.
        </span>
      </h1>
      <p className="text-[19px] sm:text-[21px] text-[#e9ecf3]/70 mx-auto mb-[46px] max-w-[620px] leading-[1.55] animate-[sx-fadeup_0.9s_ease_both] [animation-delay:100ms]">
        Forget keyword searches. SonIA listens to the emotional arc of your brief, scores the narrative intensity of every line, and instantly extracts the perfect money window for your sync.
      </p>

      {/* COMPOSER */}
      <div 
        className="text-left rounded-[var(--radius)] bg-[var(--glass-strong)] border border-[var(--glass-border)] overflow-hidden animate-[sx-fadeup_1s_ease_both] [animation-delay:250ms]"
        style={{
          boxShadow: 'var(--glass-shadow, 0 24px 70px -28px rgba(0,0,0,0.7)), inset 0 1px 0 rgba(255,255,255,0.07)',
          backdropFilter: 'blur(var(--blur))',
          WebkitBackdropFilter: 'blur(var(--blur))'
        }}
      >
        <textarea
          className="w-full min-h-[120px] resize-none border-0 outline-0 bg-transparent text-[var(--ink)] font-sans text-[16px] leading-[1.6] px-[22px] pt-[22px] pb-[8px] placeholder:text-white/30"
          placeholder="A driving, hopeful track for a family-car spot in the DACH region. Calm intro, steady build, peak around 0:30 as they hit the open road. No explicit content…"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          disabled={isLoading}
        />

        {showAdvanced && (
          <div className="px-[22px] pb-[12px] animate-[sx-fadein_0.3s_ease]">
            <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10">
              {/* Shape */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] font-semibold text-white/40 uppercase tracking-wider">Energy Shape</span>
                <div className="flex gap-2 flex-wrap">
                  {[{label:'Auto', val:''}, {label:'Build', val:'build'}, {label:'Steady', val:'steady'}, {label:'Pulse', val:'pulse'}, {label:'Peak Early', val:'peak_early'}].map(o => (
                    <button key={o.label} onClick={() => setShape(o.val)}
                      className={`px-3 py-1 text-xs rounded-full border transition-all ${shape === o.val ? 'bg-forest text-white border-forest shadow-[0_0_10px_rgba(255,138,61,0.4)]' : 'bg-transparent text-white/60 border-white/10 hover:border-forest/50'}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vocals */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] font-semibold text-white/40 uppercase tracking-wider">Vocal Gender</span>
                <div className="flex gap-2 flex-wrap">
                  {[{label:'Any', val:''}, {label:'Male', val:'male'}, {label:'Female', val:'female'}].map(o => (
                    <button key={o.label} onClick={() => setVocalGender(o.val)}
                      className={`px-3 py-1 text-xs rounded-full border transition-all ${vocalGender === o.val ? 'bg-forest text-white border-forest shadow-[0_0_10px_rgba(255,138,61,0.4)]' : 'bg-transparent text-white/60 border-white/10 hover:border-forest/50'}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] font-semibold text-white/40 uppercase tracking-wider">Duration</span>
                <div className="flex gap-2 flex-wrap">
                  {[{label:'Auto', val:''}, {label:'15s', val:15}, {label:'30s', val:30}, {label:'60s', val:60}].map(o => (
                    <button key={o.label} onClick={() => setTargetDurationSec(o.val as any)}
                      className={`px-3 py-1 text-xs rounded-full border transition-all ${targetDurationSec === o.val ? 'bg-forest text-white border-forest shadow-[0_0_10px_rgba(255,138,61,0.4)]' : 'bg-transparent text-white/60 border-white/10 hover:border-forest/50'}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-[10px] flex-wrap px-[18px] py-[12px] pb-[18px]">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#e9ecf3]/40 mr-[2px]">Try</span>
          
          <button 
            type="button"
            onClick={() => handleDemoClick("A driving, hopeful track for a family-car commercial airing in the DACH region and Italy. No explicit content, violence or drugs. Start calm as the family gets in, build steadily, and peak around 0:30 when they hit the open road. Male or female vocals.")}
            className="font-sans text-[12.5px] text-[#e9ecf3]/80 bg-white/5 border border-white/10 rounded-full px-[14px] py-[7px] cursor-pointer hover:bg-white/10 transition"
          >
            Automotive · DACH
          </button>
          <button 
            type="button"
            onClick={() => handleDemoClick("An intense, pulsing electronic track for a summer fashion campaign. Global market, English or Spanish. High energy from the first second, steady pulse throughout. I need a strong money-line about confidence and style.")}
            className="font-sans text-[12.5px] text-[#e9ecf3]/80 bg-white/5 border border-white/10 rounded-full px-[14px] py-[7px] cursor-pointer hover:bg-white/10 transition"
          >
            Fashion · Pulse
          </button>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="ml-2 font-mono text-[10px] uppercase tracking-wider text-white/40 hover:text-white/80 transition"
          >
            ⚙️ Advanced
          </button>

          <div className="flex-1"></div>
          
          <button
            onClick={handleSubmit}
            disabled={createDisabled}
            className="inline-flex items-center gap-[8px] font-sans text-[14px] font-semibold border-0 rounded-full px-[22px] py-[11px] text-[#0a0a0c] bg-gradient-to-br from-[#ff8a3d] to-[#ff3d7f] shadow-[0_6px_20px_-12px_rgba(255,61,127,0.4)] transition-all"
            style={{
              cursor: createDisabled ? 'not-allowed' : 'pointer',
              opacity: createDisabled ? 0.4 : 1
            }}
          >
            <span className="text-[15px]">♫</span> {isLoading ? 'Listening...' : 'Find the window'}
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-[26px] mt-[24px] font-mono text-[10.5px] tracking-[0.12em] uppercase text-[#e9ecf3]/30">
        <span>① Brief → Arc</span>
        <span>② Lyric Curve</span>
        <span>③ 30s Aligner</span>
        <span>④ Brand Safety</span>
      </div>
    </div>
  );
}
