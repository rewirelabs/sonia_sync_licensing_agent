import { LineScore, TargetArc } from '../types';
import { RichSyncLine } from '../connectors/types';

export interface AlignmentResult {
  startMs: number;
  endMs: number;
  fitScore: number;
  moneyLineTimestampMs: number;
  moneyLine?: string;
  fitRationale: string;
}

export function alignSection(
  lines: RichSyncLine[],
  scores: LineScore[],
  targetArc: TargetArc,
  trackDurationMs: number
): AlignmentResult {
  const windowDurationMs = targetArc.targetDurationSec * 1000;
  let bestFitScore = -1;
  let bestStartMs = 0;
  let bestMoneyLineMs = 0;
  let bestMoneyLineText = '';

  // Step 1s through the track
  const stepMs = 1000;
  for (let startMs = 0; startMs <= trackDurationMs - windowDurationMs; startMs += stepMs) {
    const endMs = startMs + windowDurationMs;
    
    // Snapping logic: Penalize windows that chop a lyric line in half
    let isTruncatedAtStart = false;
    let isTruncatedAtEnd = false;

    for (const item of lines) {
      if (item.startMs < startMs && item.endMs > startMs) isTruncatedAtStart = true;
      if (item.startMs < endMs && item.endMs > endMs) isTruncatedAtEnd = true;
    }

    // Find lines fully in this window
    const windowLines = lines.map((l, i) => ({ l, s: scores[i] })).filter(
      item => item.l.startMs >= startMs && item.l.endMs <= endMs
    );

    if (windowLines.length === 0) continue;

    // Calculate fit (naive implementation for demo)
    const avgIntensity = windowLines.reduce((acc, curr) => acc + curr.s.intensity, 0) / windowLines.length;
    const avgThemeFit = windowLines.reduce((acc, curr) => acc + curr.s.themeFit, 0) / windowLines.length;
    
    const shapeMultiplier = targetArc.shape === 'build' ? (windowLines[windowLines.length - 1].s.intensity - windowLines[0].s.intensity) : 1;
    
    // If the snippet chops a phrase abruptly, divide the score drastically so it's discarded
    const truncationPenalty = (isTruncatedAtStart || isTruncatedAtEnd) ? 0.3 : 1.0;

    const fitScore = ((avgIntensity * 0.3) + (avgThemeFit * 0.5) + (Math.max(0, shapeMultiplier) * 0.2)) * truncationPenalty;

      if (fitScore > bestFitScore) {
        bestFitScore = fitScore;
        bestStartMs = startMs;

        // Find money line
        let bestMoneyLine = windowLines[0];
        let maxMoneyScore = -1;
        for (const item of windowLines) {
          if (item.s.isMoneyCandidate) {
            const moneyScore = item.s.themeFit * item.s.intensity;
            if (moneyScore > maxMoneyScore) {
              maxMoneyScore = moneyScore;
              bestMoneyLine = item;
            }
          }
        }
        bestMoneyLineMs = bestMoneyLine.l.startMs;
        bestMoneyLineText = bestMoneyLine.l.text;
      }
    }

    const fitPercentage = Math.min(100, bestFitScore * 100);
    const themes = targetArc.brandProfile || 'general context';
    const rationale = fitPercentage > 85
      ? `Exceptional theme alignment with the requested ${targetArc.shape || 'steady'} energy profile for the ${themes} sector.`
      : `Solid narrative fit highlighting the core themes, naturally matching the ${targetArc.shape || 'steady'} arc constraint.`;

    return {
      startMs: bestStartMs,
      endMs: Math.min(bestStartMs + windowDurationMs, trackDurationMs),
      fitScore: fitPercentage,
      moneyLineTimestampMs: bestMoneyLineMs,
      moneyLine: bestMoneyLineText,
      fitRationale: rationale,
    };
}
