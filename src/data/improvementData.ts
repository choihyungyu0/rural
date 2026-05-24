export type SummaryCardTone = 'green' | 'blue'
export type PriorityLevel = '높음' | '중간'

export type SummaryCardItem = {
  label: string
  value: string
  description: string
  iconSrc: string
  iconAlt: string
  tone: SummaryCardTone
}

export type InconvenienceItem = {
  category: string
  percentage: number
  color: string
}

export type ImprovementPriorityItem = {
  rank: string
  task: string
  effect: string
  urgency: PriorityLevel
  impact: PriorityLevel
}

export type BottomCardItem = {
  title: string
  text: string
  iconSrc: string
  iconAlt: string
}

export const improvementAssets = {
  heroBg: '/images/improvement/hero-bg.png',
  bus: '/images/improvement/icon-bus.png',
  calendar: '/images/improvement/icon-calendar.png',
  growth: '/images/improvement/icon-growth.png',
  barChart: '/images/improvement/icon-bar-chart.png',
  routePin: '/images/improvement/icon-route-pin.png',
  checklist: '/images/improvement/icon-checklist.png',
  routeMap: '/images/improvement/route-map.png',
  lightbulb: '/images/improvement/icon-lightbulb.png',
  target: '/images/improvement/icon-target.png',
}

export const summaryCards: SummaryCardItem[] = [
  {
    label: '핵심 불편요소',
    value: '교통 연계',
    description: '응답 비중 38.7%',
    iconSrc: improvementAssets.bus,
    iconAlt: '교통 연계 아이콘',
    tone: 'green',
  },
  {
    label: '우선 개선과제',
    value: '체험 예약',
    description: '응답 비중 25.4%',
    iconSrc: improvementAssets.calendar,
    iconAlt: '체험 예약 아이콘',
    tone: 'blue',
  },
  {
    label: '기대효과',
    value: '체류시간 확대',
    description: '숙박 전환율 개선',
    iconSrc: improvementAssets.growth,
    iconAlt: '체류시간 확대 아이콘',
    tone: 'green',
  },
]

export const inconvenienceItems: InconvenienceItem[] = [
  { category: '교통 연계', percentage: 38.7, color: '#16a34a' },
  { category: '체험 예약', percentage: 25.4, color: '#22c55e' },
  { category: '숙박 정보', percentage: 17.6, color: '#4ade80' },
  { category: '음식점 정보', percentage: 11.3, color: '#86efac' },
  { category: '기타', percentage: 7.0, color: '#bbf7d0' },
]

export const improvementPriorities: ImprovementPriorityItem[] = [
  {
    rank: '1순위',
    task: '교통 연계',
    effect: '지역 간 접근성 개선',
    urgency: '높음',
    impact: '높음',
  },
  {
    rank: '2순위',
    task: '체험 예약',
    effect: '사전 예약 편의성 강화',
    urgency: '높음',
    impact: '높음',
  },
  {
    rank: '3순위',
    task: '숙박 정보',
    effect: '체류형 상품 연결',
    urgency: '중간',
    impact: '중간',
  },
  {
    rank: '4순위',
    task: '비수기 콘텐츠',
    effect: '계절별 콘텐츠 보강',
    urgency: '중간',
    impact: '중간',
  },
]

export const bottomCards: BottomCardItem[] = [
  {
    title: '핵심 인사이트',
    iconSrc: improvementAssets.lightbulb,
    iconAlt: '핵심 인사이트 아이콘',
    text: '교통과 예약 개선이 우선이며, 이동 편의와 예약 경험 개선이 전반적 만족도 향상에 가장 큰 영향을 미칩니다.',
  },
  {
    title: '기대효과',
    iconSrc: improvementAssets.target,
    iconAlt: '기대효과 아이콘',
    text: '숙박·미식·체험 연계 시 체류시간과 소비 확대가 가능하며, 지역 경제 활성화와 재방문율 증가로 이어질 것입니다.',
  },
]
