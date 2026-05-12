
export type ElementType = 'Fire' | 'Earth' | 'Air' | 'Water';
export type QualityType = 'Cardinal' | 'Fixed' | 'Mutable';

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dateRange: string;
  element: ElementType;
  quality: QualityType;
  rulingPlanet: string;
  traits: string[];
  description: string;
  color: string;
  stone: string;
}
