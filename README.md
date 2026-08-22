# 📊 ROI Calculator

> **B2B SaaS 솔루션 도입 ROI를 3단계로 즉시 산출하는 세일즈 도구**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)

---

## 🌐 Live Demo

**[→ roi-calculator-hwgfactory.vercel.app](https://roi-calculator-five-sable.vercel.app/)**

---

## 💡 제작 목적

B2B SaaS 영업 현장에서 AE(Account Executive)가 가장 어려운 순간 중 하나는 고객에게
**"이 솔루션을 도입하면 얼마나 좋아지나요?"** 라는 질문에 즉각적이고 설득력 있는 답을 주는 것입니다.

이 도구는 **AI와 코딩 역량을 갖춘 AE**의 관점에서, 복잡한 ROI 계산을 영업 현장에서
누구나 3단계로 즉시 산출할 수 있도록 자동화한 세일즈 도구입니다.

- 외부 API 없이 순수 프론트엔드 수식으로 계산 → **무제한 무료 사용**
- HubSpot ROI Calculator와 동일한 방법론 채택 → **검증된 업계 표준**
- 6개 솔루션 카테고리 + BioTech 전용 계산 구조 → **범용 솔루션 대응**

---

## 🖥️ 화면 구성

### Step 1 — 솔루션 정보 입력

![Solution 입력 화면](<img width="2559" height="1268" alt="Solution 입력 화면" src="https://github.com/user-attachments/assets/63d14192-1c41-4cf9-a28a-1b9eb7f3c516" />)

영업하는 솔루션의 기본 정보를 입력합니다.

| 필드 | 설명 |
|------|------|
| 솔루션 회사명 | 예: AB180, 히츠, Salesforce |
| 솔루션 이름 | 예: Airbridge, HyperLab, Sales Cloud |
| 솔루션 카테고리 | MarTech / BioTech / CRM / ERP / Security / 기타 |

> 카테고리 선택에 따라 업계 벤치마크 개선율이 다르게 적용됩니다.

---

### Step 2 — 고객사 현황 입력

![고객사 입력 화면](<img width="2559" height="1264" alt="고객사 입력 화면" src="https://github.com/user-attachments/assets/5bdfcdf3-bece-4dde-a80e-b387de2f1aa0" />)


고객사의 현재 세일즈 수치를 입력합니다. HubSpot ROI Calculator와 동일한 입력 구조입니다.

**일반 카테고리 (CRM / MarTech / ERP / Security):**

| 필드 | 설명 |
|------|------|
| 고객사 업종 | 게임 / 커머스 / 핀테크 / 제조 / 헬스케어 / 기타 |
| 고객사 규모 | ~50명 / 51~200명 / 201~500명 / 500명+ |
| 통화 | KRW / USD / EUR / JPY |
| 월간 클로징 딜 수 | 월평균 계약 건수 |
| 평균 딜 규모 | 계약 1건당 평균 금액 |
| 딜 클로징률 (%) | 리드 → 계약 전환율 |
| 딜 사이클 기간 (일) | 리드 발굴 → 계약까지 평균 일수 |
| 세일즈 팀 인원 | 인당 생산성 계산에 사용 |

**BioTech 전용 필드:**

| 필드 | 설명 |
|------|------|
| 연구 프로젝트 수 | 현재 진행 중인 프로젝트 수 |
| 연간 R&D 예산 | 연간 연구개발 투자 금액 |
| 유효물질 발굴 기간 | 후보물질 발굴까지 평균 소요 기간 (년) |
| 임상 1상 성공률 | 현재 임상 성공률 (%) |

---

### Step 3 — ROI 결과 대시보드

![결과 화면](<img width="2545" height="1266" alt="결과 화면" src="https://github.com/user-attachments/assets/6f08dc55-e5bd-40c3-8d39-b73541ddf7e2" />)

입력값과 벤치마크 개선율을 결합하여 4가지 핵심 지표와 3개의 차트로 시각화합니다.

**핵심 지표 카드:**
- 연 매출 증가액
- 인당 생산성 향상액
- 연간 ROI (%)
- 투자 회수 기간 (개월)

**차트 3종:**
- 솔루션 도입 후 개선율 비교 (수평 바 차트)
- 12개월 누적 절감액 추이 (라인 차트, 흑자전환 시점 표시)
- 누적 절감 vs 누적 구독료 (바 차트)

---

## 🧮 ROI 계산 원리

### 핵심 철학

> **고객의 현재 수치 × 업계 벤치마크 개선율 = 예상 ROI**

외부 AI API 없이 순수 수식으로 계산합니다.
HubSpot, Forrester TEI(Total Economic Impact) 방법론과 동일한 구조입니다.

### 일반 카테고리 계산 공식

**① 현재 연간 매출**
```
현재 연간 매출 = 월간 딜 수 × 평균 딜 규모 × (클로징률 / 100) × 12
```

**② 도입 후 각 지표 (카테고리 + 기업 규모 보정 반영)**
```
도입 후 딜 수      = 현재 딜 수 × (1 + 딜 증가율 × 규모 보정)
도입 후 클로징률   = 현재 클로징률 × (1 + 클로징 개선율 × 규모 보정) [최대 90%]
도입 후 딜 규모    = 현재 딜 규모 × (1 + 딜 규모 증가율 × 규모 보정)
도입 후 사이클     = 현재 사이클 × (1 - 사이클 단축율 × 규모 보정) [최소 1일]
```

**③ ROI 산출**
```
도입 후 연간 매출  = 도입 후 딜 수 × 딜 규모 × (클로징률 / 100) × 12
연 매출 증가       = 도입 후 연간 매출 - 현재 연간 매출
연간 ROI (%)       = (연 매출 증가 - 연간 구독료) / 연간 구독료 × 100
투자 회수 기간     = 월 구독료 / 월 매출 증가
인당 생산성        = 연 매출 증가 / 세일즈 팀 인원
```

### 카테고리별 벤치마크 개선율

| 카테고리 | 딜 수 | 클로징률 | 딜 규모 | 사이클 단축 | 인당 생산성 |
|---------|-------|---------|--------|-----------|------------|
| **CRM** | +28% | +10% | +5% | -14% | +34% |
| **MarTech** | +22% | +2% | +5% | -18% | +25% |
| **ERP** | +15% | +2% | +10% | -25% | +20% |
| **Security** | +20% | +3% | +7% | -20% | +22% |
| **기타** | +20% | +3% | +6% | -18% | +22% |

> 출처: CRM.org, Gartner, Forrester TEI, MarTech Alliance, NetSuite, IBM (2025~2026)

### 기업 규모 보정 계수

| 규모 | 보정 계수 | 이유 |
|------|---------|------|
| ~50명 | 0.8× | 소규모, 보수적 추정 |
| 51~200명 | 1.0× | 기준값 |
| 201~500명 | 1.2× | 중견, 시스템화 효과 큼 |
| 500명+ | 1.4× | 대기업, 스케일 효과 극대화 |

### BioTech 전용 계산 공식

BioTech은 세일즈 딜이 아닌 연구 생산성 기반으로 계산합니다.

```
도입 후 발굴 기간  = 현재 기간 × (1 - 40% × 규모 보정)
R&D 비용 절감     = 연간 R&D 예산 × 35%
임상 성공률 향상  = 현재 성공률 + 25%p × 규모 보정 [최대 90%]
추가 프로젝트 수  = 현재 수 × (3.0 - 1) × 규모 보정
연간 ROI          = R&D 비용 절감 - 연간 구독료
```

---

## 🗂️ 프로젝트 구조

```
roi-calculator/
├── app/
│   ├── page.tsx                    # 메인 — 3단계 화면 전환 로직
│   └── components/
│       ├── SolutionInput.tsx       # Step 1: 솔루션 정보 입력
│       ├── CustomerInput.tsx       # Step 2: 고객사 현황 입력
│       ├── ResultDashboard.tsx     # Step 3: ROI 결과 대시보드
│       └── charts/
│           ├── BeforeAfterChart.tsx  # 개선율 비교 바 차트
│           ├── SavingsChart.tsx      # 12개월 누적 라인 차트
│           └── PaybackChart.tsx      # 절감 vs 구독료 바 차트
├── lib/
│   ├── calculator.ts               # 핵심 ROI 계산 로직
│   ├── constants.ts                # 카테고리별 벤치마크 계수
│   └── types.ts                    # TypeScript 타입 정의
├── capture/                        # 화면 스크린샷
└── CLAUDE.md                       # 개발 가이드
```

---

## 🛠️ 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js (App Router) | 14 |
| 언어 | TypeScript | 5 |
| 스타일링 | Tailwind CSS | 3 |
| 차트 | Recharts | 3 |
| 배포 | Vercel | — |
| 외부 API | **없음** | — |

---

## 🚀 로컬 실행

```bash
# 저장소 클론
git clone https://github.com/HWGfactory/roi-calculator.git
cd roi-calculator

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

> ⚡ 환경변수 설정 불필요 — 외부 API 연동 없음

---

## ✨ 주요 특징

- **API 불필요** — 서버 없이 순수 프론트엔드 계산, 비용 0원
- **범용 설계** — 어떤 B2B SaaS 솔루션이든 입력 가능
- **BioTech 특화** — 신약 개발 도메인 전용 계산 구조 별도 구현
- **멀티 통화** — KRW / USD / EUR / JPY 지원
- **HubSpot 방법론** — 검증된 업계 표준 계산 구조 채택
- **3단계 UX** — Progress Bar 기반 직관적 단계별 입력

---

## 📄 License

MIT

---

*이 프로젝트는 Cursor + Claude Code를 활용한 AI 보조 개발로 제작되었습니다.*
