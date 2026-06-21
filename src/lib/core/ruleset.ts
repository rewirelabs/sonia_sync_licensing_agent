export interface SafetyCategory {
  id: string;
  name: string;
  description: string;
  defaultSeverity: 'low' | 'med' | 'high';
}

export const SAFETY_CATEGORIES: SafetyCategory[] = [
  { id: 'drugs', name: 'Drugs & Substances', description: 'References to illegal drugs or substance abuse.', defaultSeverity: 'high' },
  { id: 'alcohol', name: 'Alcohol', description: 'References to drinking alcohol.', defaultSeverity: 'med' },
  { id: 'sex', name: 'Sexual Content', description: 'Explicit sexual references.', defaultSeverity: 'high' },
  { id: 'violence', name: 'Violence', description: 'References to physical harm or weapons.', defaultSeverity: 'high' },
  { id: 'hate', name: 'Hate Speech', description: 'Slurs or discriminatory language.', defaultSeverity: 'high' },
  { id: 'profanity', name: 'Profanity', description: 'Swear words.', defaultSeverity: 'med' },
];

export function getRulesetForBrand(brandProfile: string, market: string): SafetyCategory[] {
  // A real implementation would adjust severities based on the brand.
  // For 'family automotive', alcohol might become 'high'.
  if (brandProfile.toLowerCase().includes('family')) {
    return SAFETY_CATEGORIES.map(cat => 
      cat.id === 'alcohol' || cat.id === 'profanity' 
        ? { ...cat, defaultSeverity: 'high' }
        : cat
    );
  }
  return SAFETY_CATEGORIES;
}
