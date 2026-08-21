'use client';
import { useState } from 'react';
import { CustomerInput, SolutionInfo } from '@/lib/types';

const STEPS = ['솔루션 정보', '고객사 현황', '결과 확인'];

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-start gap-0 mb-6">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
              ${i <= current ? 'bg-[#06402B] text-white' : 'bg-gray-200 text-gray-400'}`}>
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

function ClientPanel() {
  return (
    <div className="flex flex-col h-full p-8 pt-6">
      <div>
        <h2 className="text-3xl font-light text-gray-700 leading-tight mb-3">
          Client<br />Organization
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          고객사의 현재 세일즈 수치를<br />
          입력하면 솔루션 도입 후<br />
          예상 효과를 계산합니다.
        </p>
      </div>
      <div className="flex justify-center mt-auto pt-8">
        <svg width="200" height="180" viewBox="0 0 220 200" fill="none">
          <rect x="20" y="80" width="50" height="100" rx="3"
            stroke="#06402B" strokeWidth="1.5" fill="#06402B10"/>
          <rect x="28" y="90" width="10" height="10" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="44" y="90" width="10" height="10" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="28" y="106" width="10" height="10" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="44" y="106" width="10" height="10" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="28" y="122" width="10" height="10" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="44" y="122" width="10" height="10" rx="1" fill="#06402B" opacity="0.35"/>
          <rect x="32" y="148" width="26" height="32" rx="2" fill="#06402B20"/>
          <rect x="85" y="40" width="115" height="140" rx="3"
            stroke="#06402B" strokeWidth="1.5" fill="#06402B08"/>
          <rect x="96" y="55" width="18" height="18" rx="2" fill="#06402B" opacity="0.25"/>
          <rect x="120" y="55" width="18" height="18" rx="2" fill="#06402B" opacity="0.25"/>
          <rect x="144" y="55" width="18" height="18" rx="2" fill="#06402B" opacity="0.25"/>
          <rect x="168" y="55" width="18" height="18" rx="2" fill="#06402B" opacity="0.25"/>
          <rect x="96" y="80" width="90" height="6" rx="3" fill="#06402B" opacity="0.15"/>
          <rect x="96" y="93" width="70" height="6" rx="3" fill="#06402B" opacity="0.12"/>
          <rect x="96" y="110" width="90" height="6" rx="3" fill="#06402B" opacity="0.15"/>
          <rect x="96" y="123" width="55" height="6" rx="3" fill="#06402B" opacity="0.12"/>
          <rect x="96" y="140" width="90" height="6" rx="3" fill="#06402B" opacity="0.15"/>
          <rect x="96" y="153" width="75" height="6" rx="3" fill="#06402B" opacity="0.12"/>
          <line x1="10" y1="182" x2="210" y2="182"
            stroke="#06402B" strokeWidth="1.5" opacity="0.2"/>
          <circle cx="160" cy="176" r="10" fill="#06402B" opacity="0.1"/>
          <path d="M154 176 Q160 162 166 176"
            stroke="#06402B" strokeWidth="1.2" fill="none"/>
          <circle cx="176" cy="173" r="6" fill="#06402B" opacity="0.08"/>
          <path d="M172 173 Q176 164 180 173"
            stroke="#06402B" strokeWidth="1" fill="none"/>
        </svg>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-white
        focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 focus:border-[#06402B] transition-colors"
    >
      {children}
    </select>
  );
}

function NumberInput({
  value,
  onChange,
  suffix,
}: {
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800
          focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 focus:border-[#06402B]
          transition-colors pr-10"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
          {suffix}
        </span>
      )}
    </div>
  );
}

export default function CustomerInputForm({
  solution,
  onNext,
  onBack,
}: {
  solution: SolutionInfo;
  onNext: (data: CustomerInput) => void;
  onBack: () => void;
}) {
  const isBioTech = solution.category === 'biotech';
  const [form, setForm] = useState<Partial<CustomerInput>>({});
  const set = (key: keyof CustomerInput, val: string | number) =>
    setForm(f => ({ ...f, [key]: val }));

  const isValid = isBioTech
    ? !!(form.industry && form.companySize && form.currency &&
        form.researchProjects && form.annualRDbudget &&
        form.discoveryPeriodYears && form.clinicalSuccessRate)
    : !!(form.industry && form.companySize && form.currency &&
        form.monthlyDeals && form.avgDealSize &&
        form.closeRate && form.dealCycleDays && form.salesTeamSize);

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

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">

        {/* 왼쪽: 입력 영역 */}
        <div className="flex-[3] p-8 overflow-y-auto">
          <ProgressBar current={1} />

          <div className="border-t border-gray-100 pt-6">
            {/* 솔루션 칩 */}
            <div className="flex gap-2 mb-4">
              {[solution.companyName, solution.solutionName, solution.category?.toUpperCase()]
                .filter(Boolean)
                .map((t, i) => (
                  <span key={i}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#06402B]/10 text-[#06402B] font-medium">
                    {t}
                  </span>
                ))}
            </div>

            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Step 2</p>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">고객사 현황 입력</h3>
            <p className="text-sm text-gray-400 mb-6">현재 수치를 입력하면 도입 효과를 계산합니다</p>

            <div className="space-y-4">
              {/* 공통 */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="고객사 업종">
                  <Select value={form.industry ?? ''} onChange={v => set('industry', v)}>
                    <option value="">업종 선택</option>
                    <option value="game">게임</option>
                    <option value="commerce">커머스</option>
                    <option value="fintech">핀테크</option>
                    <option value="manufacturing">제조</option>
                    <option value="healthcare">헬스케어</option>
                    <option value="other">기타</option>
                  </Select>
                </Field>

                <Field label="고객사 규모">
                  <Select value={form.companySize ?? ''} onChange={v => set('companySize', v)}>
                    <option value="">규모 선택</option>
                    <option value="under50">~50명</option>
                    <option value="51to200">51~200명</option>
                    <option value="201to500">201~500명</option>
                    <option value="over500">500명+</option>
                  </Select>
                </Field>
              </div>

              <Field label="통화">
                <Select value={form.currency ?? ''} onChange={v => set('currency', v)}>
                  <option value="">통화 선택</option>
                  <option value="KRW">KRW (₩)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="JPY">JPY (¥)</option>
                </Select>
              </Field>

              {/* BioTech 전용 */}
              {isBioTech ? (
                <>
                  <Field label="현재 진행 중인 연구 프로젝트 수">
                    <NumberInput
                      value={String(form.researchProjects ?? '')}
                      onChange={v => set('researchProjects', Number(v))}
                    />
                  </Field>
                  <Field label="연간 R&D 예산">
                    <NumberInput
                      value={String(form.annualRDbudget ?? '')}
                      onChange={v => set('annualRDbudget', Number(v))}
                    />
                  </Field>
                  <Field
                    label="현재 유효물질 발굴 기간 (년)"
                    hint="후보물질 발굴까지 평균 소요 기간">
                    <NumberInput
                      value={String(form.discoveryPeriodYears ?? '')}
                      onChange={v => set('discoveryPeriodYears', Number(v))}
                    />
                  </Field>
                  <Field label="현재 임상 1상 성공률 (%)">
                    <NumberInput
                      value={String(form.clinicalSuccessRate ?? '')}
                      onChange={v => set('clinicalSuccessRate', Number(v))}
                      suffix="%"
                    />
                  </Field>
                </>
              ) : (
                <>
                  <Field
                    label="월간 클로징 딜 수"
                    hint="월평균 클로징되는 딜 건수">
                    <NumberInput
                      value={String(form.monthlyDeals ?? '')}
                      onChange={v => set('monthlyDeals', Number(v))}
                    />
                  </Field>
                  <Field label="평균 딜 규모">
                    <NumberInput
                      value={String(form.avgDealSize ?? '')}
                      onChange={v => set('avgDealSize', Number(v))}
                    />
                  </Field>
                  <Field label="딜 클로징률 (%)">
                    <NumberInput
                      value={String(form.closeRate ?? '')}
                      onChange={v => set('closeRate', Number(v))}
                      suffix="%"
                    />
                  </Field>
                  <Field
                    label="딜 사이클 기간 (일)"
                    hint="리드 발굴부터 계약까지 평균 일수">
                    <NumberInput
                      value={String(form.dealCycleDays ?? '')}
                      onChange={v => set('dealCycleDays', Number(v))}
                    />
                  </Field>
                  <Field
                    label="세일즈 팀 인원"
                    hint="인당 생산성 향상 계산에 사용됩니다">
                    <NumberInput
                      value={String(form.salesTeamSize ?? '')}
                      onChange={v => set('salesTeamSize', Number(v))}
                    />
                  </Field>
                </>
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl text-sm font-medium text-gray-500
                  border border-gray-200 hover:bg-gray-50 transition-colors">
                ← 이전
              </button>
              <button
                onClick={() => isValid && onNext(form as CustomerInput)}
                disabled={!isValid}
                className={`px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2
                  transition-all duration-200
                  ${isValid
                    ? 'bg-[#06402B] text-white hover:bg-[#052f20] shadow-lg shadow-[#06402B]/25'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                ROI 계산하기 →
              </button>
            </div>
          </div>
        </div>

        <div className="w-px bg-gray-100" />

        {/* 오른쪽 패널 */}
        <div className="flex-[2] bg-gray-50/50">
          <ClientPanel />
        </div>
      </div>
    </div>
  );
}
