'use client';

import { useState } from 'react';
import { INDUSTRY_COEFFICIENTS } from '@/lib/constants';
import {
  CompanySize,
  CustomerInput as CustomerInputData,
  Industry,
  SolutionCategory,
  SolutionInfo,
} from '@/lib/types';

interface CustomerInputProps {
  solution: SolutionInfo;
  onNext: (data: CustomerInputData) => void;
  onBack: () => void;
}

const INDUSTRY_OPTIONS = (
  Object.entries(INDUSTRY_COEFFICIENTS) as [Industry, { label: string }][]
).map(([value, { label }]) => ({ value, label }));

const COMPANY_SIZE_OPTIONS: { value: CompanySize; label: string }[] = [
  { value: 'startup', label: '스타트업 (~50명)' },
  { value: 'smb', label: '중견기업 (50~500명)' },
  { value: 'enterprise', label: '대기업 (500명+)' },
];

const CATEGORY_CHIP_LABELS: Record<SolutionCategory, string> = {
  martech: 'MarTech',
  biotech: 'BioTech',
  crm: 'CRM',
  erp: 'ERP',
  security: 'Security',
  other: '기타',
};

function getEfficiencyMeta(value: number): { label: string; emoji: string } {
  if (value <= 3) return { label: '매우 낮음', emoji: '🔴' };
  if (value <= 6) return { label: '보통', emoji: '🟡' };
  if (value <= 9) return { label: '좋음', emoji: '🟢' };
  return { label: '완벽', emoji: '✨' };
}

export default function CustomerInput({
  solution,
  onNext,
  onBack,
}: CustomerInputProps) {
  const [industry, setIndustry] = useState<Industry | ''>('');
  const [companySize, setCompanySize] = useState<CompanySize | ''>('');
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [currentEfficiency, setCurrentEfficiency] = useState(5);
  const [channelCount, setChannelCount] = useState('');
  const [currentTools, setCurrentTools] = useState('');

  const isValid =
    industry !== '' &&
    companySize !== '' &&
    monthlyBudget.trim() !== '' &&
    Number(monthlyBudget) > 0 &&
    channelCount.trim() !== '' &&
    Number(channelCount) >= 1 &&
    Number(channelCount) <= 20;

  const handleNext = () => {
    if (!isValid) return;
    onNext({
      industry: industry as Industry,
      companySize: companySize as CompanySize,
      monthlyBudget: Number(monthlyBudget),
      currentEfficiency,
      channelCount: Number(channelCount),
      currentTools: currentTools.trim() || undefined,
    });
  };

  const efficiencyMeta = getEfficiencyMeta(currentEfficiency);

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-4 py-1.5 text-sm font-medium text-[#1B4FFF]">
            {solution.companyName} · {solution.solutionName} ·{' '}
            {CATEGORY_CHIP_LABELS[solution.category]}
          </span>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">고객사 현황 입력</h1>
          <p className="mt-2 text-sm text-gray-500">
            현재 상황을 입력하면 도입 효과를 계산합니다
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="industry"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              고객사 업종
            </label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value as Industry)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#1B4FFF] focus:outline-none focus:ring-2 focus:ring-[#1B4FFF]"
            >
              <option value="" disabled>
                업종을 선택하세요
              </option>
              {INDUSTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="companySize"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              고객사 규모
            </label>
            <select
              id="companySize"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value as CompanySize)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#1B4FFF] focus:outline-none focus:ring-2 focus:ring-[#1B4FFF]"
            >
              <option value="" disabled>
                규모를 선택하세요
              </option>
              {COMPANY_SIZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="monthlyBudget"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              월 관련 예산 (원)
            </label>
            <input
              id="monthlyBudget"
              type="number"
              min={0}
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              placeholder="예: 50000000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#1B4FFF] focus:outline-none focus:ring-2 focus:ring-[#1B4FFF]"
            />
            <p className="mt-1.5 text-xs text-gray-400">
              광고비, 운영비 등 솔루션과 관련된 월 예산
            </p>
          </div>

          <div>
            <label
              htmlFor="currentEfficiency"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              현재 업무/캠페인 효율
            </label>
            <input
              id="currentEfficiency"
              type="range"
              min={1}
              max={10}
              step={1}
              value={currentEfficiency}
              onChange={(e) => setCurrentEfficiency(Number(e.target.value))}
              className="w-full accent-[#1B4FFF]"
            />
            <div className="mt-1.5 flex items-center justify-between text-xs text-gray-400">
              <span>1</span>
              <span className="text-sm font-medium text-gray-700">
                {currentEfficiency}점 · {efficiencyMeta.emoji} {efficiencyMeta.label}
              </span>
              <span>10</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="channelCount"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              연동 채널 또는 시스템 수
            </label>
            <input
              id="channelCount"
              type="number"
              min={1}
              max={20}
              value={channelCount}
              onChange={(e) => setChannelCount(e.target.value)}
              placeholder="예: 광고 채널 4개"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#1B4FFF] focus:outline-none focus:ring-2 focus:ring-[#1B4FFF]"
            />
          </div>

          <div>
            <label
              htmlFor="currentTools"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              현재 사용 도구
            </label>
            <input
              id="currentTools"
              type="text"
              value={currentTools}
              onChange={(e) => setCurrentTools(e.target.value)}
              placeholder="예: AppsFlyer, 엑셀, 없음"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#1B4FFF] focus:outline-none focus:ring-2 focus:ring-[#1B4FFF]"
            />
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            ← 이전
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!isValid}
            className="flex-1 rounded-lg bg-[#1B4FFF] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1640d6] disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            ROI 계산하기
          </button>
        </div>
      </div>
    </div>
  );
}
