You are a senior frontend implementation agent working inside this GitHub repository:

https://github.com/choihyungyu0/rural.git

Your task is to build a React + TypeScript dashboard MVP for the Hadong-Gurye rural tourism admin dashboard.

The repository may be empty. If it is empty or only contains docs, initialize a Vite React TypeScript app at the repository root. Do not create a nested app directory. The repository root must be the app root.

## Primary goal

Implement three desktop dashboard screens for a Korean admin dashboard named:

`하동·구례 농촌관광`

The dashboard visualizes a rural tourism operation improvement proposal that connects Hadong and Gurye resources into a stay-oriented tourism package combining food, activities, lodging, regional movement, seasonal programs, and improvement actions.

## Tech stack

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- lucide-react

Do not add a backend. Use local static data in TypeScript files.
Do not use external image URLs, API keys, Google Fonts, backend services, databases, authentication, or payment features.

## Installation expectation

If the project has not been initialized yet, create it with Vite React TypeScript.
Then install Tailwind CSS, Recharts, lucide-react, and any minimal required peer dependencies.

## Required pages

Use the top navigation to switch between these screens:

1. `개요`
2. `체류·소비 분석`
3. `개선 제안`

Also show menu items `방문 현황` and `인사이트`, but they can display a simple placeholder saying the screen is planned.
React Router is optional. A simple `useState` tab switch is acceptable.

## Shared header

Every screen must use the same header.

Left brand:
- Logo mark can be CSS/SVG-based.
- Text: `하동·구례 농촌관광`

Navigation menu:
- `개요`
- `방문 현황`
- `체류·소비 분석`
- `인사이트`
- `개선 제안`

Active menu style:
- green text
- green underline

Right-side filter pills:
- `지역: 전체`
- `시즌: 전체`
- `기준월: 2026년 4월`
- `분석 기간: 2025년 11월 ~ 2026년 4월`

## Shared KPI cards

Use the following KPI values consistently:

1. `총 방문자 수`
   - value: `287,450명`
   - change: `전년 동기간 대비 ↑ 12.6%`

2. `평균 체류시간`
   - value: `4.2시간`
   - change: `전년 동기간 대비 ↑ 0.8시간`

3. `1인당 관광소비`
   - value: `154,800원`
   - change: `전년 동기간 대비 ↑ 9.3%`

4. `숙박 전환율`
   - value: `34.6%`
   - change: `전년 동기간 대비 ↓ 2.1%`

Important wording rules:
- Use `1인당 관광소비`, not just `관광소비`.
- Use `숙박 전환율`, not `숙박 방문 비율`.

## Page 1: Overview

Active menu: `개요`

Hero title:
`하동·구례 농촌관광 운영 개선 개요`

Hero subtitle:
`데이터 기반으로 하동·구례 농촌관광의 현황을 진단하고, 체류·소비 증대를 위한 운영 개선 방향을 제안합니다.`

Diagnosis message:
`방문자 수와 소비는 증가하고 있으나, 숙박 전환율은 감소해 미식·체험·숙박 연계 강화가 필요합니다.`

Required sections:

1. Scenic hero area
   - Use CSS gradient and decorative shapes to imply a river, mountains, fields, and villages.
   - Do not fetch remote images.

2. KPI row with 4 cards.

3. Card: `핵심 분석 요약`
   Include three stacked insight items:
   - `체류시간 연장이 핵심 과제`
     - `평균 체류시간은 소폭 증가했으나, 타 지역 대비 여전히 개선 여지가 큽니다.`
   - `숙박·미식·체험 연계 강화 필요`
     - `숙박 전환율이 감소하고 있어 체류형 상품과 연계 프로그램 확대가 필요합니다.`
   - `소비 잠재력 확대 가능성`
     - `1인당 관광소비는 증가 추세이나, 미식 중심 객단가 상승 여지가 있습니다.`

4. Card: `미식·체험·숙박 연계 관광 동선`
   Build a schematic map, not a real map API.
   - Hadong side in green:
     - `화개장터`
     - `평사리`
     - `야생차 체험`
   - Gurye side in blue:
     - `산수유마을`
     - `화엄사`
     - `한옥 숙박`
   - Draw dotted connection lines between the two regions.
   - Add a river-like divider between the regions.

5. Card: `추천 체류형 코스`
   Include two course cards:

   Course 1:
   - title: `하동·구례 자연 힐링 코스`
   - badges: `2박 3일`, `자연`, `힐링`
   - route: `화개장터 → 야생차 체험 → 평사리 → 산수유마을 → 화엄사`
   - metadata: `주요 타깃: 커플·직장인`, `예상 소비액: 1인 18만 원`
   - button text: `코스 상세보기 →`

   Course 2:
   - title: `미식과 장터 체험 코스`
   - badges: `1박 2일`, `미식`, `체험`
   - route: `화개장터 → 지역 미식 체험 → 야생차 체험 → 한옥 숙박`
   - metadata: `주요 타깃: 가족·MZ세대`, `예상 소비액: 1인 14만 원`
   - button text: `코스 상세보기 →`

## Page 2: Stay and spending analysis

Active menu: `체류·소비 분석`

Page title:
`방문 흐름·체류시간·관광소비 분석`

Subtitle:
`방문 흐름과 소비 구조를 바탕으로 체류형 농촌관광의 가능성을 분석합니다.`

Insight sentence:
`오후 방문 비중이 높고 음식·숙박 소비가 64%를 차지해 체류형 미식 패키지 확대 가능성이 높습니다.`

Required sections:

1. KPI row with 4 cards.

2. `A. 월별 방문자 추이`
   - Recharts line chart.
   - Green line: Hadong.
   - Blue line: Gurye.
   - Data:
     - 2025년 11월: Hadong 102400, Gurye 85100
     - 2025년 12월: Hadong 115600, Gurye 96200
     - 2026년 1월: Hadong 126300, Gurye 104800
     - 2026년 2월: Hadong 138700, Gurye 115900
     - 2026년 3월: Hadong 153200, Gurye 127400
     - 2026년 4월: Hadong 171300, Gurye 143150

3. `B. 평균 체류시간 추이`
   - Recharts line chart.
   - Data:
     - 2025년 11월: Hadong 3.2, Gurye 2.9
     - 2025년 12월: Hadong 3.4, Gurye 3.1
     - 2026년 1월: Hadong 3.6, Gurye 3.3
     - 2026년 2월: Hadong 3.8, Gurye 3.5
     - 2026년 3월: Hadong 4.0, Gurye 3.7
     - 2026년 4월: Hadong 4.2, Gurye 3.9

4. `C. 관광소비 비중`
   - Recharts donut chart.
   - Food: 36%
   - Lodging: 28%
   - Activity: 22%
   - Other: 14%
   - Center text: `분석기간 총 소비액 444.7억원`
   - Supporting note: `음식·숙박 비중 64%`

5. `D. 유입 지역 TOP 5`
   - Recharts horizontal bar chart.
   - 진주 56,420
   - 순천 49,310
   - 광주 43,780
   - 부산 28,650
   - 사천 19,620
   - Footnote: `기준: 분석기간 내 방문객 유입 지역`

6. `E. 시간대별 방문 분포`
   - Recharts vertical bar chart.
   - 오전 18%
   - 점심 29%
   - 오후 34%
   - 저녁 19%
   - Note: `오후 시간대 프로그램 집중 운영 필요`

7. `F. 연계관광 성과`
   - Progress rows:
     - `하동→구례 연계 이동률 38.2%`
     - `구례→하동 연계 이동률 34.7%`
   - Stacked bar:
     - `하동 방문 비중 59.4%`
     - `구례 방문 비중 40.6%`

## Page 3: Improvement strategy

Active menu: `개선 제안`

Hero title:
`불편요소 개선 및 실행 전략`

Hero subtitle:
`설문 기반 불편요소와 이동 동선을 바탕으로 우선 개선 과제와 실행 방향을 제안합니다.`

Diagnosis message:
`교통 연계와 체험 예약 개선이 체류시간 확대의 핵심입니다.`

Required sections:

1. Summary cards:
   - `핵심 불편요소` → `교통 연계`, `응답 비중 38.7%`
   - `우선 개선과제` → `체험 예약`, `응답 비중 25.4%`
   - `기대효과` → `체류시간 확대`, `숙박 전환율 개선`

2. `주요 불편요소 분석`
   - Recharts horizontal bar chart:
     - 교통 연계 38.7%
     - 체험 예약 25.4%
     - 숙박 정보 17.6%
     - 음식점 정보 11.3%
     - 기타 7.0%
   - Footnote: `자체 설문조사 결과 예시 · n=100`

3. `하동·구례 연계 동선 및 이동 불편 예상 구간`
   - Reuse the schematic map idea.
   - Include callouts:
     - `대중교통 기준 예상 이동시간 90~120분`
     - `개선안: 주말 순환 셔틀 운영 검토`
     - `체류형 코스 권장`

4. `개선 우선순위`
   Build a table with columns:
   - `순위`
   - `개선 과제`
   - `담당 부서`
   - `목표 일정`
   - `진행 상태`
   - `KPI`
   - `시급성`
   - `영향도`

   Rows:
   - `1순위`, `교통 연계`, `관광과·교통과`, `2026년 6월`, `검토중`, `셔틀 이용률`, `높음`, `높음`
   - `2순위`, `체험 예약`, `관광협의체`, `2026년 5월`, `진행중`, `예약 전환율`, `높음`, `높음`
   - `3순위`, `숙박 정보`, `숙박업체 협의체`, `2026년 5월`, `예정`, `숙박 클릭률`, `중간`, `중간`
   - `4순위`, `비수기 콘텐츠`, `지역 기획팀`, `2026년 8월`, `예정`, `겨울 방문자 수`, `중간`, `중간`

5. Bottom action area:
   - Insight text:
     `교통과 예약 개선이 우선이며, 이동 편의와 예약 경험 개선이 전반적 만족도 향상에 가장 큰 영향을 미칩니다.`
   - Action buttons:
     - `상세 보고서`
     - `개선과제 등록`
     - `데이터 업데이트`
   - Expected effect text:
     `숙박·미식·체험 연계 시 체류시간과 소비 확대가 가능하며, 지역 경제 활성화와 재방문율 증가로 이어질 것입니다.`

## Design requirements

- Build a real dashboard UI, not a poster.
- Desktop-first 16:9 presentation quality.
- Light gray background: `#f8fafc` or similar.
- White cards with subtle borders and shadows.
- Rounded cards, consistent gaps, strong typography.
- Hadong = green.
- Gurye = blue.
- Important positive changes = green.
- Negative lodging conversion change = blue or red, but keep it readable.
- Keep 3D-style icons optional and restrained. Lucide icons are acceptable.
- Avoid overdecorating charts.
- Korean text must be readable and not clipped.
- Add responsive behavior so the dashboard does not break on narrower screens.

## Data organization

Create `src/data/dashboardData.ts` and keep all demo datasets there.
Do not hard-code long data arrays inside UI components.

## Preferred file structure

Use this structure unless there is already a strong reason not to:

```txt
src/
  App.tsx
  main.tsx
  index.css
  data/
    dashboardData.ts
  components/
    Header.tsx
    Hero.tsx
    KpiCard.tsx
    DashboardCard.tsx
    CourseCard.tsx
    ResourceMap.tsx
    ImprovementTable.tsx
    StatusBadge.tsx
    charts/
      LineTrendChart.tsx
      DonutChart.tsx
      HorizontalBarChart.tsx
      VerticalBarChart.tsx
  pages/
    OverviewPage.tsx
    AnalysisPage.tsx
    ImprovementPage.tsx
    PlaceholderPage.tsx
```

## Footer note

Add this note to the pages where suitable:

`※ 수치는 제안서 이해를 위한 예시이며, 실제 적용 시 지자체 방문통계·카드소비 데이터·숙박 및 체험 예약 데이터로 대체됩니다.`

## Acceptance criteria

The task is complete only if:

1. The app is React + TypeScript.
2. `npm run build` passes.
3. The three required pages are reachable from the top navigation.
4. Korean text and KPI values match the requirements.
5. Charts render correctly with Recharts.
6. The layout is visually close to the supplied dashboard screenshots.
7. Data is separated into `src/data/dashboardData.ts`.
8. No remote images, API keys, backend, database, auth, or payment code is added.

## Verification

Run:

```bash
npm run build
```

If there are TypeScript or build errors, fix them and rerun the build.

## Final response format

When finished, respond with:

1. Summary of what was implemented.
2. Major files created or changed.
3. Packages installed.
4. Commands run for verification.
5. Local run instructions.
6. Any remaining TODOs or limitations.
