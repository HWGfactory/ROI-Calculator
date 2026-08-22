import { BIOTECH_BENCHMARK, CATEGORY_BENCHMARKS, SIZE_MULTIPLIER } from './constants';
import { CustomerInput, ROIResult, SolutionInfo } from './types';

export function calculateROI(
  solution: SolutionInfo,
  customer: CustomerInput
): ROIResult {
  const sizeMultiplier = SIZE_MULTIPLIER[customer.companySize];
  const isBioTech = solution.category === 'biotech';

  // ── BioTech 전용 계산 ──────────────────────────
  if (isBioTech) {
    const {
      researchProjects = 1,
      annualRDbudget = 0,
      discoveryPeriodYears = 5,
      clinicalSuccessRate = 50,
    } = customer;

    const bm = BIOTECH_BENCHMARK;
    const fee = bm.monthlyFee;

    const budgetBase = annualRDbudget;

    const afterDiscovery =
      discoveryPeriodYears * (1 - bm.discoveryPeriodReduction * sizeMultiplier);
    const savedYears = discoveryPeriodYears - afterDiscovery;
    const savedRDCost = budgetBase * bm.rdCostReduction;
    const afterClinical = Math.min(
      clinicalSuccessRate + bm.clinicalSuccessIncrease * 100 * sizeMultiplier,
      90
    );
    const additionalProjects =
      researchProjects * (bm.productivityMultiplier - 1) * sizeMultiplier;

    const annualROI = savedRDCost - fee * 12;
    const paybackMonths = Math.ceil((fee * 12) / (savedRDCost / 12));

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      cumulative: (savedRDCost / 12 - fee) * (i + 1),
    }));

    return {
      currentAnnualRevenue: 0,
      afterAnnualRevenue: 0,
      revenueIncrease: 0,
      afterDeals: 0,
      afterCloseRate: 0,
      afterCycleDays: 0,
      afterDealSize: 0,
      dealsIncreasePct: 0,
      closeRateIncreasePct: 0,
      cycleDaysReductionPct: 0,
      dealSizeIncreasePct: 0,
      productivityPerRep: 0,
      totalProductivityGain: 0,
      monthlyFee: fee,
      annualFee: fee * 12,
      netAnnualROI: annualROI,
      roiPct: (annualROI / (fee * 12)) * 100,
      paybackMonths,
      monthlyData: monthlyData.map((d) => ({ ...d, label: `${d.month}월` })),
      isBioTech: true,
      currency: customer.currency,
      biotech: {
        afterDiscoveryPeriod: afterDiscovery,
        savedYears,
        savedRDCost,
        afterClinicalSuccess: afterClinical,
        additionalProjects,
        annualROI,
        paybackMonths,
        monthlyData,
      },
    };
  }

  // ── 일반 카테고리 계산 (HubSpot 구조) ────────────
  const bm =
    CATEGORY_BENCHMARKS[
      solution.category as keyof typeof CATEGORY_BENCHMARKS
    ] ?? CATEGORY_BENCHMARKS.other;

  const {
    monthlyDeals = 0,
    avgDealSize = 0,
    closeRate = 0,
    dealCycleDays = 0,
    salesTeamSize = 1,
  } = customer;

  const dealSizeBase = avgDealSize;

  // 현재 연간 매출
  const currentAnnualRevenue =
    monthlyDeals * dealSizeBase * (closeRate / 100) * 12;

  // 도입 후 각 지표
  const dealsMultiplier = 1 + bm.dealsIncrease * sizeMultiplier;
  const closeRateMultiplier = 1 + bm.closeRateIncrease * sizeMultiplier;
  const dealSizeMultiplier = 1 + bm.dealSizeIncrease * sizeMultiplier;
  const cycleDaysMultiplier = 1 - bm.cycleDaysReduction * sizeMultiplier;

  const afterDeals = monthlyDeals * dealsMultiplier;
  const afterCloseRate = Math.min(closeRate * closeRateMultiplier, 90);
  const afterDealSize = dealSizeBase * dealSizeMultiplier;
  const afterCycleDays = Math.max(dealCycleDays * cycleDaysMultiplier, 1);

  // 도입 후 연간 매출
  const afterAnnualRevenue =
    afterDeals * afterDealSize * (afterCloseRate / 100) * 12;

  const revenueIncrease = afterAnnualRevenue - currentAnnualRevenue;

  // 인당 생산성
  const productivityPerRep =
    salesTeamSize > 0 ? revenueIncrease / salesTeamSize : 0;
  const totalProductivityGain = revenueIncrease * bm.productivityPerRep;

  // ROI
  const fee = bm.monthlyFee;
  const annualFee = fee * 12;
  const netAnnualROI = revenueIncrease - annualFee;
  const roiPct = annualFee > 0 ? (netAnnualROI / annualFee) * 100 : 0;
  const paybackMonths =
    revenueIncrease > 0
      ? Math.ceil(annualFee / 12 / (revenueIncrease / 12))
      : 99;

  // 12개월 누적
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    return {
      month: m,
      cumulative: (revenueIncrease / 12 - fee) * m,
      label: `${m}월`,
    };
  });

  // % 표시용
  const dealsIncreasePct = bm.dealsIncrease * sizeMultiplier * 100;
  const closeRateIncreasePct = bm.closeRateIncrease * sizeMultiplier * 100;
  const cycleDaysReductionPct = bm.cycleDaysReduction * sizeMultiplier * 100;
  const dealSizeIncreasePct = bm.dealSizeIncrease * sizeMultiplier * 100;

  return {
    currentAnnualRevenue,
    afterAnnualRevenue,
    revenueIncrease,
    afterDeals,
    afterCloseRate,
    afterCycleDays,
    afterDealSize,
    dealsIncreasePct,
    closeRateIncreasePct,
    cycleDaysReductionPct,
    dealSizeIncreasePct,
    productivityPerRep,
    totalProductivityGain,
    monthlyFee: fee,
    annualFee,
    netAnnualROI,
    roiPct,
    paybackMonths,
    monthlyData,
    isBioTech: false,
    currency: customer.currency,
  };
}

export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    KRW: '₩',
    USD: '$',
    EUR: '€',
    JPY: '¥',
  };
  return symbols[currency] ?? '₩';
}

export function formatCurrency(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${Math.round(amount).toLocaleString()}`;
}

export function formatPaybackPeriod(months: number): string {
  if (months < 12) return `${months}개월`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  return remainingMonths === 0 ? `${years}년` : `${years}년 ${remainingMonths}개월`;
}
