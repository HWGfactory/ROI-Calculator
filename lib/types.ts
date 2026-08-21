export type Industry =
  | 'game'
  | 'commerce'
  | 'fintech'
  | 'ott'
  | 'manufacturing'
  | 'other';

export type CompanySize = 'startup' | 'smb' | 'enterprise';

export type SolutionCategory =
  | 'martech'
  | 'biotech'
  | 'crm'
  | 'erp'
  | 'security'
  | 'other';

export interface SolutionInfo {
  companyName: string;
  solutionName: string;
  category: SolutionCategory;
}

export interface CustomerInput {
  // 공통
  industry:
    | 'game'
    | 'commerce'
    | 'fintech'
    | 'manufacturing'
    | 'healthcare'
    | 'other';
  companySize: 'under50' | '51to200' | '201to500' | 'over500';
  currency: 'KRW' | 'USD' | 'EUR' | 'JPY';

  // 일반 카테고리 (MarTech/CRM/ERP/Security/기타)
  monthlyDeals?: number; // 월간 클로징 딜 수
  avgDealSize?: number; // 평균 딜 규모
  closeRate?: number; // 딜 클로징률 (%)
  dealCycleDays?: number; // 딜 사이클 기간 (일)
  salesTeamSize?: number; // 세일즈 팀 인원 수

  // BioTech 전용
  researchProjects?: number; // 현재 연구 프로젝트 수
  annualRDbudget?: number; // 연간 R&D 예산
  discoveryPeriodYears?: number; // 현재 유효물질 발굴 기간 (년)
  clinicalSuccessRate?: number; // 현재 임상 성공률 (%)
}

export interface MonthlyDataPoint {
  month: number;
  cumulative: number;
}

export interface ROIResult {
  // 일반 카테고리 결과
  currentAnnualRevenue: number;
  afterAnnualRevenue: number;
  revenueIncrease: number;

  afterDeals: number;
  afterCloseRate: number;
  afterCycleDays: number;
  afterDealSize: number;

  dealsIncreasePct: number;
  closeRateIncreasePct: number;
  cycleDaysReductionPct: number;
  dealSizeIncreasePct: number;

  productivityPerRep: number;
  totalProductivityGain: number;

  monthlyFee: number;
  annualFee: number;
  netAnnualROI: number;
  roiPct: number;
  paybackMonths: number;

  monthlyData: {
    month: number;
    cumulative: number;
    label: string;
  }[];

  // BioTech 전용 결과
  isBioTech: boolean;
  biotech?: {
    afterDiscoveryPeriod: number;
    savedYears: number;
    savedRDCost: number;
    afterClinicalSuccess: number;
    additionalProjects: number;
    annualROI: number;
    paybackMonths: number;
    monthlyData: { month: number; cumulative: number }[];
  };
}
