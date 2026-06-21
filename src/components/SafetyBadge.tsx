import React from 'react';

interface SafetyBadgeProps {
  level: 'safe' | 'caution' | 'unsafe';
}

export function SafetyBadge({ level }: SafetyBadgeProps) {
  const config = {
    safe: { label: 'Clear', color: 'bg-green-100 text-green-800 border-green-200' },
    caution: { label: 'Review', color: 'bg-[#B07D2B]/10 text-caution border-caution/20' },
    unsafe: { label: 'Blocked', color: 'bg-[#9E3B2E]/10 text-unsafe border-unsafe/20' },
  };

  const { label, color } = config[level] || config.safe;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${color}`}>
      {label}
    </span>
  );
}
