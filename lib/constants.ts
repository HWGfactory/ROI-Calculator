import { CompanySize, Industry, SolutionCategory } from './types';

export const INDUSTRY_COEFFICIENTS: Record<
  Industry,
  { improvement: number; wasteCoeff: number; label: string }
> = {
  game: { improvement: 0.25, wasteCoeff: 0.35, label: '게임' },
  commerce: { improvement: 0.22, wasteCoeff: 0.28, label: '커머스' },
  fintech: { improvement: 0.18, wasteCoeff: 0.22, label: '핀테크' },
  ott: { improvement: 0.2, wasteCoeff: 0.25, label: 'OTT' },
  manufacturing: { improvement: 0.2, wasteCoeff: 0.3, label: '제조' },
  other: { improvement: 0.2, wasteCoeff: 0.27, label: '기타' },
};

export const SIZE_MULTIPLIER: Record<CompanySize, number> = {
  startup: 0.8,
  smb: 1.0,
  enterprise: 1.3,
};

export const CHANNEL_BONUS = 0.02;

export const MONTHLY_FEE: Record<SolutionCategory, number> = {
  martech: 3_000_000,
  biotech: 5_000_000,
  crm: 2_000_000,
  erp: 4_000_000,
  security: 3_500_000,
  other: 3_000_000,
};
