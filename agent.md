# AGENTS.md

## Project overview

This repository is a React + TypeScript + Vite frontend project for a Korean rural tourism dashboard.

Current milestone:

Implement only the first overview dashboard screen:

`하동·구례 농촌관광 운영 개선 개요`

The screen should match the supplied first reference screenshot and use local image assets from:

`public/images/overview/`

Do not implement the full multi-page dashboard yet.

## Tech stack

Use:

- React
- TypeScript
- Vite
- Tailwind CSS

Do not add:

- Backend
- Authentication
- Database
- Payment features
- External image URLs
- API keys

## Asset policy

All static images for the first screen are stored in:

`public/images/overview/`

Use public asset paths in JSX.

Correct:

`/images/overview/hero-bg.png`

Incorrect:

`/public/images/overview/hero-bg.png`

Expected assets:

`hero-bg.png`
`course-nature.png`
`course-food.png`
`resource-map.png`

`icon-visitor.png`
`icon-clock.png`
`icon-card.png`
`icon-bed.png`

`icon-search.png`
`icon-map.png`
`icon-hourglass.png`
`icon-puzzle.png`
`icon-growth.png`
`icon-suitcase.png`

If an asset is missing, keep the layout working and show a fallback block.

## Required screen

The only complete screen for the current milestone is:

`개요`

Page title:

`하동·구례 농촌관광 운영 개선 개요`

Subtitle:

`데이터 기반으로 하동·구례 농촌관광의 현황을 진단하고, 체류·소비 증대를 위한 운영 개선 방향을 제안합니다.`

Header menu:

`개요`
`방문 현황`
`체류·소비 분석`
`인사이트`
`개선 제안`

Active menu:

`개요`

Right header information:

`기준월: 2026년 4월`
`분석 기간: 2025년 11월 ~ 2026년 4월`

## KPI cards

Use exactly these KPI values:

1. `방문자 수`
   - `287,450명`
   - `전년 동기간 대비 ↑ 12.6%`
   - `/images/overview/icon-visitor.png`

2. `평균 체류시간`
   - `4.2시간`
   - `전년 동기간 대비 ↑ 0.8시간`
   - `/images/overview/icon-clock.png`

3. `관광소비`
   - `154,800원`
   - `전년 동기간 대비 ↑ 9.3%`
   - `/images/overview/icon-card.png`

4. `숙박 방문 비율`
   - `34.6%`
   - `전년 동기간 대비 ↓ 2.1%`
   - `/images/overview/icon-bed.png`

## Main overview cards

The overview page must include:

1. `핵심 분석 요약`
2. `하동·구례 자원 연계 개요`
3. `추천 체류형 코스`

## Main overview content

### 핵심 분석 요약

Include three insight items:

1. `체류시간 연장이 핵심 과제`
   - `평균 체류시간은 소폭 증가했으나, 타 지역 대비 여전히 개선 여지가 큽니다.`

2. `숙박·미식·체험 연계 강화 필요`
   - `숙박 방문 비율이 감소하고 있어, 체류형 상품과 연계 프로그램 확대가 필요합니다.`

3. `소비 잠재력 확대 가능성`
   - `관광소비는 증가 추세이나, 1인당 소비액의 추가 성장 여지가 있습니다.`

### 하동·구례 자원 연계 개요

Use this image:

`/images/overview/resource-map.png`

Alt text:

`하동과 구례 자원 연계 지도`

### 추천 체류형 코스

Course 1:

- Title: `하동·구례 자연 힐링 코스`
- Image: `/images/overview/course-nature.png`
- Badges: `2박 3일`, `자연`, `힐링`
- Route: `화개장터 → 야생차 체험 → 평사리 → 산수유마을 → 화엄사`
- Button: `코스 상세보기`

Course 2:

- Title: `미식과 장터 체험 코스`
- Image: `/images/overview/course-food.png`
- Badges: `1박 2일`, `미식`, `체험`
- Route: `화개장터 → 지역 미식 체험 → 야생차 체험 → 한옥 숙박`
- Button: `코스 상세보기`

## Suggested source structure

Prefer this structure:

`src/App.tsx`
`src/index.css`

`src/data/overviewData.ts`

`src/components/Header.tsx`
`src/components/HeroSection.tsx`
`src/components/KpiCard.tsx`
`src/components/OverviewSectionCard.tsx`
`src/components/InsightItem.tsx`
`src/components/CourseCard.tsx`

`src/pages/OverviewPage.tsx`

## Code style

- Keep components small.
- Use TypeScript prop types or interfaces.
- Keep repeated data in `src/data/overviewData.ts`.
- Use semantic HTML where practical.
- Use readable Korean alt text for every image.
- Prefer Tailwind CSS utilities.
- Keep the design close to the supplied screenshot.
- Preserve existing design code if it already exists.
- Do not redesign from scratch unless the existing code is unusable.

## Validation

Before finalizing, run:

`npm run build`

The task is complete only when the build succeeds.