'use client';

import { useState } from 'react';
import { SolutionCategory, SolutionInfo } from '@/lib/types';

interface SolutionInputProps {
  onNext: (data: SolutionInfo) => void;
}

const CATEGORY_OPTIONS: { value: SolutionCategory; label: string }[] = [
  { value: 'martech', label: 'MarTech (마케팅 기술)' },
  { value: 'biotech', label: 'BioTech (바이오/신약)' },
  { value: 'crm', label: 'CRM (고객 관계 관리)' },
  { value: 'erp', label: 'ERP (전사 자원 관리)' },
  { value: 'security', label: 'Security (보안)' },
  { value: 'other', label: '기타' },
];

export default function SolutionInput({ onNext }: SolutionInputProps) {
  const [companyName, setCompanyName] = useState('');
  const [solutionName, setSolutionName] = useState('');
  const [problem, setProblem] = useState('');
  const [category, setCategory] = useState<SolutionCategory | ''>('');

  const isValid =
    companyName.trim() !== '' &&
    solutionName.trim() !== '' &&
    problem.trim() !== '' &&
    category !== '';

  const handleNext = () => {
    if (!isValid) return;
    onNext({
      companyName: companyName.trim(),
      solutionName: solutionName.trim(),
      problem: problem.trim(),
      category: category as SolutionCategory,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">SaaS ROI 계산기</h1>
          <p className="mt-2 text-sm text-gray-500">
            솔루션 정보를 입력하면 고객사 도입 효과를 계산합니다
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="companyName"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              솔루션 회사명
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="예: AB180, 히츠, Salesforce"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#1B4FFF] focus:outline-none focus:ring-2 focus:ring-[#1B4FFF]"
            />
          </div>

          <div>
            <label
              htmlFor="solutionName"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              솔루션 이름
            </label>
            <input
              id="solutionName"
              type="text"
              value={solutionName}
              onChange={(e) => setSolutionName(e.target.value)}
              placeholder="예: Airbridge, HyperLab, Sales Cloud"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#1B4FFF] focus:outline-none focus:ring-2 focus:ring-[#1B4FFF]"
            />
          </div>

          <div>
            <label
              htmlFor="problem"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              해결하는 문제
            </label>
            <textarea
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="예: 모바일 광고 어트리뷰션 정확도 향상"
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#1B4FFF] focus:outline-none focus:ring-2 focus:ring-[#1B4FFF]"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              솔루션 카테고리
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as SolutionCategory)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#1B4FFF] focus:outline-none focus:ring-2 focus:ring-[#1B4FFF]"
            >
              <option value="" disabled>
                카테고리를 선택하세요
              </option>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={!isValid}
          className="mt-8 w-full rounded-lg bg-[#1B4FFF] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1640d6] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          다음 단계 →
        </button>
      </div>
    </div>
  );
}
