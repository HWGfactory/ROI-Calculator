# ROI Calculator

## 프로젝트 개요
B2B SaaS 솔루션 도입 ROI를 계산하는 범용 도구.
솔루션 회사 이름과 해결하는 문제를 입력받고,
고객의 현재 수치를 입력하면 도입 효과를 계산해서 시각화.
API 통신 없음. 순수 프론트엔드 수식 계산.

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- API 없음, 환경변수 없음

## 화면 구성
- 화면 1: 솔루션 정보 입력 (회사명, 솔루션명, 해결 문제)
- 화면 2: 고객 현재 상황 입력 (업종, 예산, 현재 효율 등)
- 화면 3: ROI 결과 대시보드 (지표 카드 + 차트)

## 파일 구조
app/
  page.tsx
  components/
    SolutionInput.tsx (화면 1)
    CustomerInput.tsx (화면 2)
    ResultDashboard.tsx (화면 3)
    charts/
      BeforeAfterChart.tsx
      SavingsChart.tsx
      PaybackChart.tsx
lib/
  calculator.ts (핵심 계산 로직)
  constants.ts (업종별 계수)
  types.ts (타입 정의)

## 개발 규칙
- API 호출 없음
- 환경변수 없음
- 외부 데이터 없음
- 모든 계산은 lib/calculator.ts에서
- useState로만 상태 관리
