// 카테고리별 개선율 (벤치마크 기반)
export const CATEGORY_BENCHMARKS = {
  crm: {
    label: 'CRM',
    dealsIncrease: 0.28, // 딜 수 +28%
    closeRateIncrease: 0.1, // 클로징률 +10%
    cycleDaysReduction: 0.14, // 사이클 -14%
    dealSizeIncrease: 0.05, // 딜 규모 +5%
    productivityPerRep: 0.34, // 인당 생산성 +34%
    monthlyFee: 2_000_000,
  },
  martech: {
    label: 'MarTech',
    dealsIncrease: 0.22,
    closeRateIncrease: 0.02,
    cycleDaysReduction: 0.18,
    dealSizeIncrease: 0.05,
    productivityPerRep: 0.25,
    monthlyFee: 3_000_000,
  },
  erp: {
    label: 'ERP',
    dealsIncrease: 0.15,
    closeRateIncrease: 0.02,
    cycleDaysReduction: 0.25,
    dealSizeIncrease: 0.1,
    productivityPerRep: 0.2,
    monthlyFee: 4_000_000,
  },
  security: {
    label: 'Security',
    dealsIncrease: 0.2,
    closeRateIncrease: 0.03,
    cycleDaysReduction: 0.2,
    dealSizeIncrease: 0.07,
    productivityPerRep: 0.22,
    monthlyFee: 3_500_000,
  },
  other: {
    label: '기타',
    dealsIncrease: 0.2,
    closeRateIncrease: 0.03,
    cycleDaysReduction: 0.18,
    dealSizeIncrease: 0.06,
    productivityPerRep: 0.22,
    monthlyFee: 3_000_000,
  },
} as const;

// BioTech 전용 벤치마크
export const BIOTECH_BENCHMARK = {
  discoveryPeriodReduction: 0.4, // 발굴 기간 -40%
  rdCostReduction: 0.35, // R&D 비용 -35%
  clinicalSuccessIncrease: 0.25, // 임상 성공률 +25%p
  productivityMultiplier: 3.0, // 연구 생산성 3배
  monthlyFee: 5_000_000,
} as const;

// 기업 규모 보정
export const SIZE_MULTIPLIER = {
  under50: 0.8,
  '51to200': 1.0,
  '201to500': 1.2,
  over500: 1.4,
} as const;

// 환율 (frankfurter.app 사용 시 런타임 대체)
export const DEFAULT_EXCHANGE_RATES: Record<string, number> = {
  KRW: 1,
  USD: 1380,
  EUR: 1500,
  JPY: 9.2,
};
