'use client';

import { DEFAULT_EXCHANGE_RATES } from '@/lib/constants';
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

const STEPS = ['솔루션 정보', '고객사 현황', '결과 확인'];

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-start gap-0 mb-6">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${i <= current ? 'bg-[#06402B] text-white' : 'bg-gray-200 text-gray-400'}`}
            >
              {i < current ? '✓' : i + 1}
            </div>
            <span
              className={`text-xs mt-1 whitespace-nowrap
                ${i === current ? 'text-[#06402B] font-semibold' : 'text-gray-400'}`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-16 h-0.5 mb-4 mx-1
                ${i < current ? 'bg-[#06402B]' : 'bg-gray-200'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const CATEGORY_CHIP_LABELS: Record<SolutionInfo['category'], string> = {
  martech: 'MarTech',
  biotech: 'BioTech',
  crm: 'CRM',
  erp: 'ERP',
  security: 'Security',
  other: '기타',
};

const INDUSTRY_LABELS: Record<CustomerInput['industry'], string> = {
  game: '게임',
  commerce: '커머스',
  fintech: '핀테크',
  manufacturing: '제조',
  healthcare: '헬스케어',
  other: '기타',
};

const COMPANY_SIZE_LABELS: Record<CustomerInput['companySize'], string> = {
  under50: '~50명',
  '51to200': '51~200명',
  '201to500': '201~500명',
  over500: '500명+',
};

function formatWon(value: number) {
  return `₩${Math.round(value).toLocaleString('ko-KR')}`;
}

function formatPct(value: number) {
  return `${Math.round(value)}%`;
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
    <div className="overflow-hidden rounded-2xl bg-gray-50">
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

function CompareRow({
  label,
  before,
  after,
}: {
  label: string;
  before: string;
  after: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
        <span className="text-gray-400">{before}</span>
        <span className="text-gray-300">→</span>
        <span className="text-[#06402B]">{after}</span>
      </span>
    </div>
  );
}

export default function ResultDashboard({
  solution,
  customer,
  result,
  onReset,
}: ResultDashboardProps) {
  const roiSign = result.roiPct >= 0 ? '+' : '';
  const rate = DEFAULT_EXCHANGE_RATES[customer.currency] ?? 1;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background:
          'linear-gradient(135deg, #021a0f 0%, #03260f 30%, #06402B 70%, #042d1c 100%)',
      }}
    >
      <div className="w-full max-w-4xl mb-6">
        <span className="text-white/70 font-medium text-sm tracking-widest uppercase">
          ROI Calculator
        </span>
      </div>

      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <ProgressBar current={3} />

          <div className="border-t border-gray-100 pt-6 space-y-6">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#06402B]/10 px-4 py-1.5 text-sm font-medium text-[#06402B]">
                  {solution.companyName} · {solution.solutionName} ·{' '}
                  {CATEGORY_CHIP_LABELS[solution.category]}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-600">
                  {INDUSTRY_LABELS[customer.industry]} ·{' '}
                  {COMPANY_SIZE_LABELS[customer.companySize]} · {customer.currency}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                {solution.solutionName} 도입 ROI 결과
              </h1>
            </div>

            {result.isBioTech && result.biotech ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <StatCard
                    label="유효물질 발굴 기간 단축"
                    value={`${result.biotech.savedYears.toFixed(1)}년 단축`}
                    accent="#06402B"
                  />
                  <StatCard
                    label="R&D 비용 절감"
                    value={formatWon(result.biotech.savedRDCost)}
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

                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">
                    도입 전 vs 도입 후
                  </h3>
                  <CompareRow
                    label="유효물질 발굴 기간"
                    before={`${(customer.discoveryPeriodYears ?? 0).toFixed(1)}년`}
                    after={`${result.biotech.afterDiscoveryPeriod.toFixed(1)}년`}
                  />
                  <CompareRow
                    label="임상 1상 성공률"
                    before={`${customer.clinicalSuccessRate ?? 0}%`}
                    after={formatPct(result.biotech.afterClinicalSuccess)}
                  />
                  <CompareRow
                    label="동시 진행 가능 연구 프로젝트"
                    before={`${customer.researchProjects ?? 0}개`}
                    after={`${(
                      (customer.researchProjects ?? 0) +
                      result.biotech.additionalProjects
                    ).toFixed(1)}개`}
                  />
                </div>

                <BeforeAfterChart
                  currentPct={customer.clinicalSuccessRate ?? 0}
                  afterPct={result.biotech.afterClinicalSuccess}
                />

                <SavingsChart
                  monthlyData={result.monthlyData}
                  paybackMonths={result.paybackMonths}
                />

                <PaybackChart
                  monthlySavings={result.biotech.savedRDCost / 12}
                  fee={result.monthlyFee}
                />
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <StatCard
                    label="연 매출 증가"
                    value={formatWon(result.revenueIncrease)}
                    accent="#06402B"
                  />
                  <StatCard
                    label="인당 생산성 향상"
                    value={formatWon(result.productivityPerRep)}
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

                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">
                    도입 전 vs 도입 후
                  </h3>
                  <CompareRow
                    label="월간 클로징 딜 수"
                    before={`${customer.monthlyDeals ?? 0}건`}
                    after={`${result.afterDeals.toFixed(1)}건`}
                  />
                  <CompareRow
                    label="딜 클로징률"
                    before={`${customer.closeRate ?? 0}%`}
                    after={formatPct(result.afterCloseRate)}
                  />
                  <CompareRow
                    label="평균 딜 규모"
                    before={formatWon((customer.avgDealSize ?? 0) * rate)}
                    after={formatWon(result.afterDealSize)}
                  />
                  <CompareRow
                    label="딜 사이클 기간"
                    before={`${customer.dealCycleDays ?? 0}일`}
                    after={`${Math.round(result.afterCycleDays)}일`}
                  />
                </div>

                <BeforeAfterChart
                  currentPct={customer.closeRate ?? 0}
                  afterPct={result.afterCloseRate}
                />

                <SavingsChart
                  monthlyData={result.monthlyData}
                  paybackMonths={result.paybackMonths}
                />

                <PaybackChart
                  monthlySavings={result.revenueIncrease / 12}
                  fee={result.monthlyFee}
                />
              </>
            )}

            <div className="pt-2 text-center">
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onReset}
                  className="rounded-xl bg-[#06402B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#052f20]"
                >
                  다시 계산하기
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
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
      </div>
    </div>
  );
}
