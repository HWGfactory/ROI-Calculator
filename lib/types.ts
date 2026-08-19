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
  problem: string;
  category: SolutionCategory;
}

export interface CustomerInput {
  industry: Industry;
  companySize: CompanySize;
  monthlyBudget: number;
  currentEfficiency: number;
  channelCount: number;
  currentTools?: string;
}

export interface MonthlyDataPoint {
  month: number;
  cumulative: number;
}

export interface ROIResult {
  currentEfficiencyPct: number;
  afterEfficiencyPct: number;
  currentWaste: number;
  afterWaste: number;
  monthlySavings: number;
  annualSavings: number;
  fee: number;
  roiPct: number;
  paybackMonths: number;
  monthlyData: MonthlyDataPoint[];
}
