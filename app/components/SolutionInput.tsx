'use client';
import { useState } from 'react';
import { SolutionInfo } from '@/lib/types';

const STEPS = ['솔루션 정보', '고객사 현황', '결과 확인'];

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-start gap-0 mb-6">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${i === current
                  ? 'bg-[#06402B] text-white'
                  : i < current
                  ? 'bg-[#06402B] text-white'
                  : 'bg-gray-200 text-gray-400'}`}
            >
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`text-xs mt-1 whitespace-nowrap
              ${i === current ? 'text-[#06402B] font-semibold' : 'text-gray-400'}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-16 h-0.5 mb-4 mx-1
              ${i < current ? 'bg-[#06402B]' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="flex flex-col h-full p-8 pt-6">
      <div>
        <h2 className="text-3xl font-light text-gray-700 leading-tight mb-3">
          About<br />Solution
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          솔루션의 기본 정보를 입력해<br />
          ROI 분석을 시작하세요.<br />
          카테고리에 따라 업계 벤치마크<br />
          기반 개선율이 적용됩니다.
        </p>
      </div>
      <div className="flex justify-center mt-auto pt-8">
        <svg width="200" height="180" viewBox="0 0 220 200" fill="none">
          <rect x="30" y="60" width="60" height="120" rx="3"
            stroke="#06402B" strokeWidth="1.5" fill="#06402B10"/>
          <rect x="38" y="70" width="12" height="12" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="56" y="70" width="12" height="12" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="38" y="88" width="12" height="12" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="56" y="88" width="12" height="12" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="38" y="106" width="12" height="12" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="56" y="106" width="12" height="12" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="44" y="140" width="32" height="40" rx="2" fill="#06402B20"/>
          <rect x="100" y="30" width="90" height="150" rx="3"
            stroke="#06402B" strokeWidth="1.5" fill="#06402B08"/>
          <rect x="110" y="45" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="132" y="45" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="154" y="45" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="110" y="68" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="132" y="68" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="154" y="68" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="110" y="91" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="132" y="91" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="154" y="91" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="110" y="114" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="132" y="114" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="154" y="114" width="15" height="15" rx="1" fill="#06402B" opacity="0.3"/>
          <rect x="118" y="150" width="20" height="30" rx="2" fill="#06402B20"/>
          <rect x="148" y="155" width="20" height="25" rx="2" fill="#06402B20"/>
          <line x1="10" y1="180" x2="210" y2="180"
            stroke="#06402B" strokeWidth="1.5" opacity="0.25"/>
          <circle cx="168" cy="174" r="9" fill="#06402B" opacity="0.12"/>
          <path d="M162 174 Q168 160 174 174"
            stroke="#06402B" strokeWidth="1.2" fill="none"/>
          <circle cx="180" cy="171" r="6" fill="#06402B" opacity="0.1"/>
          <path d="M176 171 Q180 162 184 171"
            stroke="#06402B" strokeWidth="1" fill="none"/>
        </svg>
      </div>
    </div>
  );
}

export default function SolutionInput({
  onNext,
}: {
  onNext: (data: SolutionInfo) => void;
}) {
  const [form, setForm] = useState<Partial<SolutionInfo>>({});
  const isValid = !!(form.companyName && form.solutionName && form.category);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background:
          'linear-gradient(135deg, #021a0f 0%, #03260f 30%, #06402B 70%, #042d1c 100%)',
      }}
    >
      {/* 헤더 */}
      <div className="w-full max-w-4xl mb-6">
        <span className="text-white/70 font-medium text-sm tracking-widest uppercase">
          ROI Calculator
        </span>
      </div>

      {/* 메인 카드 */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">

        {/* 왼쪽: 입력 영역 */}
        <div className="flex-[3] p-8">
          {/* 목차 — 카드 안에 배치 */}
          <ProgressBar current={0} />

          <div className="border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
              Step 1
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              솔루션 정보 입력
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              분석할 솔루션의 기본 정보를 입력해주세요
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  솔루션 회사명
                </label>
                <input
                  type="text"
                  value={form.companyName ?? ''}
                  onChange={e =>
                    setForm(f => ({ ...f, companyName: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 focus:border-[#06402B]
                    transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  솔루션 이름
                </label>
                <input
                  type="text"
                  value={form.solutionName ?? ''}
                  onChange={e =>
                    setForm(f => ({ ...f, solutionName: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 focus:border-[#06402B]
                    transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  솔루션 카테고리
                </label>
                <select
                  value={form.category ?? ''}
                  onChange={e =>
                    setForm(f => ({
                      ...f,
                      category: e.target.value as SolutionInfo['category'],
                    }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800
                    bg-white focus:outline-none focus:ring-2 focus:ring-[#06402B]/20
                    focus:border-[#06402B] transition-colors"
                >
                  <option value="">카테고리를 선택하세요</option>
                  <option value="martech">MarTech (마케팅 기술)</option>
                  <option value="biotech">BioTech (바이오/신약)</option>
                  <option value="crm">CRM (고객 관계 관리)</option>
                  <option value="erp">ERP (전사 자원 관리)</option>
                  <option value="security">Security (보안)</option>
                  <option value="other">기타</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => isValid && onNext(form as SolutionInfo)}
                disabled={!isValid}
                className={`px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2
                  transition-all duration-200
                  ${isValid
                    ? 'bg-[#06402B] text-white hover:bg-[#052f20] shadow-lg shadow-[#06402B]/25'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                다음 단계 <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-px bg-gray-100" />

        {/* 오른쪽: 안내 패널 */}
        <div className="flex-[2] bg-gray-50/50">
          <AboutPanel />
        </div>
      </div>
    </div>
  );
}
