'use client';

import { INDUSTRY_COEFFICIENTS } from '@/lib/constants';
import { CustomerInput, ROIResult, SolutionInfo } from '@/lib/types';
import BeforeAfterChart from './charts/BeforeAfterChart';
import PaybackChart from './charts/PaybackChart';
import SavingsChart from './charts/SavingsChart';

interface ResultDashboardProps {
  solution: SolutionInfo;
  customer: CustomerInput;
  result: ROIResult;
  onReset: () => void;
}

const CATEGORY_CHIP_LABELS: Record<SolutionInfo['category'], string> = {
  martech: 'MarTech',
  biotech: 'BioTech',
  crm: 'CRM',
  erp: 'ERP',
  security: 'Security',
  other: '기타',
};

const COMPANY_SIZE_LABELS: Record<CustomerInput['companySize'], string> = {
  startup: '스타트업',
  smb: '중견기업',
  enterprise: '대기업',
};

function formatWon(value: number) {
  return `₩${Math.round(value).toLocaleString('ko-KR')}`;
}

function StatCard({
  label,
  value,
  delta,
  accent,
}: {
  label: string;
  value: string;
  delta?: string;
  accent: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="h-1" style={{ backgroundColor: accent }} />
      <div className="p-5">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="mt-2 text-xl font-semibold text-gray-900">{value}</p>
        {delta && (
          <p className="mt-1 text-sm font-medium" style={{ color: accent }}>
            {delta}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ResultDashboard({
  solution,
  customer,
  result,
  onReset,
}: ResultDashboardProps) {
  const currentPct = Math.round(result.currentEfficiencyPct);
  const afterPct = Math.round(result.afterEfficiencyPct);
  const deltaPt = afterPct - currentPct;
  const roiSign = result.roiPct >= 0 ? '+' : '';

  return (
    <div className="min-h-screen bg-[#F8FAFF] px-4 py-12">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-4 py-1.5 text-sm font-medium text-[#1B4FFF]">
              {solution.companyName} · {solution.solutionName} ·{' '}
              {CATEGORY_CHIP_LABELS[solution.category]}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-600">
              {INDUSTRY_COEFFICIENTS[customer.industry].label} ·{' '}
              {COMPANY_SIZE_LABELS[customer.companySize]} · 월 예산{' '}
              {formatWon(customer.monthlyBudget)}
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {solution.solutionName} 도입 ROI 결과
          </h1>
          <p className="mt-1 text-sm text-gray-500">{solution.problem}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            label="효율 향상"
            value={`${currentPct}% → ${afterPct}%`}
            delta={`▲+${deltaPt}pt`}
            accent="#1B4FFF"
          />
          <StatCard
            label="월 절감액"
            value={formatWon(result.monthlySavings)}
            accent="#0ca30c"
          />
          <StatCard
            label="연간 ROI"
            value={`${roiSign}${Math.round(result.roiPct)}%`}
            accent="#4a3aa7"
          />
          <StatCard
            label="투자 회수"
            value={`${result.paybackMonths}개월`}
            accent="#eb6834"
          />
        </div>

        <BeforeAfterChart currentPct={currentPct} afterPct={afterPct} />

        <SavingsChart
          monthlyData={result.monthlyData}
          paybackMonths={result.paybackMonths}
        />

        <PaybackChart monthlySavings={result.monthlySavings} fee={result.fee} />

        <div className="rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              다시 계산하기
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg bg-[#1B4FFF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1640d6]"
            >
              결과 공유
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            본 계산은 업종 평균 데이터 기반 추정치입니다
          </p>
        </div>
      </div>
    </div>
  );
}
