'use client';
import React, { useState } from 'react';

interface BriefComposerProps {
  onSubmit: (brief: string) => void;
  isLoading: boolean;
}

export function BriefComposer({ onSubmit, isLoading }: BriefComposerProps) {
  const [brief, setBrief] = useState('');

  const handleDemoClick = (text: string) => {
    setBrief(text);
  };

  return (
    <div className="bg-surface border border-hairline p-6 rounded-lg mb-8 shadow-sm">
      <h2 className="font-serif text-2xl text-ink mb-4">Describe the scene</h2>
      <p className="text-ink-soft mb-4">Mood, energy, duration, language: SonIA does the rest.</p>
      
      <textarea
        className="w-full h-32 p-4 bg-bg border border-hairline rounded focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none text-ink mb-4"
        placeholder="Racconta lo spot..."
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        disabled={isLoading}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => handleDemoClick("We need a driving, energetic track for an automotive commercial airing in the DACH region and Italy. It's a family car, so no explicit content, violence, or drugs. The mood should start calm as the family gets in, build steadily, and peak around 30 seconds when they hit the open road.")}
            className="text-xs text-forest border border-forest/20 px-3 py-1 rounded hover:bg-forest/5 transition-colors"
          >
            Demo: Automotive DACH
          </button>
          <button 
            type="button"
            onClick={() => handleDemoClick("Looking for an intense, pulsing electronic track for a summer fashion campaign. Global market. The energy should be high right from the start and maintain a steady pulse. We need a strong 'money line' about confidence or style.")}
            className="text-xs text-forest border border-forest/20 px-3 py-1 rounded hover:bg-forest/5 transition-colors"
          >
            Demo: Fashion Pulse
          </button>
        </div>

        <button
          onClick={() => onSubmit(brief)}
          disabled={!brief || isLoading}
          className="bg-forest text-bg px-6 py-2 rounded font-medium hover:bg-forest/90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Listening...' : 'Find Matches'}
        </button>
      </div>
    </div>
  );
}
