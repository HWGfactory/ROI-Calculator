import {
  CHANNEL_BONUS,
  INDUSTRY_COEFFICIENTS,
  MONTHLY_FEE,
  SIZE_MULTIPLIER,
} from './constants';
import { CustomerInput, ROIResult, SolutionInfo } from './types';

export function calculateROI(
  solution: SolutionInfo,
  customer: CustomerInput
): ROIResult {
  const { improvement, wasteCoeff } = INDUSTRY_COEFFICIENTS[customer.industry];
  const sizeMultiplier = SIZE_MULTIPLIER[customer.companySize];

  const currentEfficiencyPct = customer.currentEfficiency * 10;

  const channelBonus = (customer.channelCount - 1) * CHANNEL_BONUS;
  const afterEfficiencyPct = Math.min(
    currentEfficiencyPct + (improvement + channelBonus) * 100 * sizeMultiplier,
    95
  );

  const currentWaste =
    customer.monthlyBudget * (1 - currentEfficiencyPct / 100) * wasteCoeff;

  const afterWaste =
    customer.monthlyBudget * (1 - afterEfficiencyPct / 100) * wasteCoeff * 0.4;

  const monthlySavings = currentWaste - afterWaste;
  const annualSavings = monthlySavings * 12;

  const fee = MONTHLY_FEE[solution.category];
  const roiPct = ((annualSavings - fee * 12) / (fee * 12)) * 100;
  const paybackMonths = Math.ceil(fee / monthlySavings);

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return {
      month,
      cumulative: (monthlySavings - fee) * month,
    };
  });

  return {
    currentEfficiencyPct,
    afterEfficiencyPct,
    currentWaste,
    afterWaste,
    monthlySavings,
    annualSavings,
    fee,
    roiPct,
    paybackMonths,
    monthlyData,
  };
}
