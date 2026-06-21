'use client';
import { useState } from 'react';
import { BriefComposer } from '@/components/BriefComposer';
import { Shortlist } from '@/components/Shortlist';
import { RankedTrack } from '@/lib/core/ranker';

export default function Home() {
  const [shortlist, setShortlist] = useState<RankedTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBriefSubmit = async (brief: string) => {
    setIsLoading(true);
    setError(null);
    setShortlist([]);

    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief }),
      });

      if (!res.ok) {
        throw new Error('Failed to process brief');
      }

      const data = await res.json();
      setShortlist(data.shortlist);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12 border-b border-hairline pb-6">
        <h1 className="font-serif text-4xl text-ink tracking-tight mb-2">SonIA</h1>
        <p className="text-lg text-ink-soft">She doesn't search. She listens.</p>
      </header>

      <BriefComposer onSubmit={handleBriefSubmit} isLoading={isLoading} />

      {error && (
        <div className="bg-[#9E3B2E]/10 border border-[#9E3B2E]/20 text-[#9E3B2E] p-4 rounded mb-8">
          {error}
        </div>
      )}

      {shortlist.length > 0 && (
        <Shortlist tracks={shortlist} />
      )}
    </div>
  );
}
