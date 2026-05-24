export type ChangeTone = 'green' | 'red'

export type KpiItem = {
  title: string
  value: string
  change: string
  changeTone: ChangeTone
  iconSrc: string
  iconAlt: string
}

export type MonthlyTrendItem = {
  month: string
  하동: number
  구례: number
}

export type SpendingRatioItem = {
  name: string
  value: number
  color: string
}

export type InflowRegionItem = {
  rank: number
  region: string
  visitors: number
}

export type TimeDistributionItem = {
  label: string
  timeRange: string
  value: number
  color: string
}

export type RegionCompositionItem = {
  region: string
  value: number
  color: string
}

export const navItems = ['개요', '방문 현황', '체류·소비 분석', '인사이트', '개선 제안']

export const analysisAssets = {
  visitor: '/images/analysis/icon-visitor.png',
  clock: '/images/analysis/icon-clock.png',
  card: '/images/analysis/icon-card.png',
  trend: '/images/analysis/icon-trend.png',
  stayTime: '/images/analysis/icon-stay-time.png',
  location: '/images/analysis/icon-location.png',
  timeBars: '/images/analysis/icon-time-bars.png',
  pie: '/images/analysis/icon-pie.png',
  people: '/images/analysis/icon-people.png',
}

export const kpiItems: KpiItem[] = [
  {
    title: '총 방문자 수',
    value: '287,450명',
    change: '전년 동기간 대비 ↑ 12.6%',
    changeTone: 'green',
    iconSrc: analysisAssets.visitor,
    iconAlt: '총 방문자 수 아이콘',
  },
  {
    title: '평균 체류시간',
    value: '4.2시간',
    change: '전년 동기간 대비 ↑ 0.8시간',
    changeTone: 'green',
    iconSrc: analysisAssets.clock,
    iconAlt: '평균 체류시간 아이콘',
  },
  {
    title: '1인당 관광소비',
    value: '154,800원',
    change: '전년 동기간 대비 ↑ 9.3%',
    changeTone: 'green',
    iconSrc: analysisAssets.card,
    iconAlt: '1인당 관광소비 아이콘',
  },
]

export const monthlyVisitorTrend: MonthlyTrendItem[] = [
  { month: '2025년 11월', 하동: 102400, 구례: 85100 },
  { month: '2025년 12월', 하동: 115600, 구례: 96200 },
  { month: '2026년 1월', 하동: 126300, 구례: 104800 },
  { month: '2026년 2월', 하동: 138700, 구례: 115900 },
  { month: '2026년 3월', 하동: 153200, 구례: 127400 },
  { month: '2026년 4월', 하동: 171300, 구례: 143150 },
]

export const averageStayTimeTrend: MonthlyTrendItem[] = [
  { month: '2025년 11월', 하동: 3.2, 구례: 2.9 },
  { month: '2025년 12월', 하동: 3.4, 구례: 3.1 },
  { month: '2026년 1월', 하동: 3.6, 구례: 3.3 },
  { month: '2026년 2월', 하동: 3.8, 구례: 3.5 },
  { month: '2026년 3월', 하동: 4.0, 구례: 3.7 },
  { month: '2026년 4월', 하동: 4.2, 구례: 3.9 },
]

export const spendingRatio: SpendingRatioItem[] = [
  { name: '음식', value: 36, color: '#16a34a' },
  { name: '숙박', value: 28, color: '#2563eb' },
  { name: '체험', value: 22, color: '#14b8a6' },
  { name: '기타', value: 14, color: '#9ca3af' },
]

export const inflowRegions: InflowRegionItem[] = [
  { rank: 1, region: '진주', visitors: 56420 },
  { rank: 2, region: '순천', visitors: 49310 },
  { rank: 3, region: '광주', visitors: 43780 },
  { rank: 4, region: '부산', visitors: 28650 },
  { rank: 5, region: '사천', visitors: 19620 },
]

export const timeDistribution: TimeDistributionItem[] = [
  { label: '오전', timeRange: '06~12시', value: 18, color: '#16a34a' },
  { label: '점심', timeRange: '12~14시', value: 29, color: '#2563eb' },
  { label: '오후', timeRange: '14~18시', value: 34, color: '#14b8a6' },
  { label: '저녁', timeRange: '18~24시', value: 19, color: '#7c3aed' },
]

export const regionComposition: RegionCompositionItem[] = [
  { region: '하동', value: 59.4, color: '#16a34a' },
  { region: '구례', value: 40.6, color: '#2563eb' },
]
