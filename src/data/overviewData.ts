export type ChangeTone = 'green' | 'red'

export type KpiItem = {
  title: string
  value: string
  change: string
  changeTone: ChangeTone
  iconSrc: string
  iconAlt: string
}

export type InsightItemData = {
  title: string
  description: string
  iconSrc: string
  iconAlt: string
}

export type CourseItem = {
  title: string
  badges: string[]
  route: string
  imageSrc: string
  imageAlt: string
  buttonTone: 'green' | 'blue'
}

export const overviewAssets = {
  heroBg: '/images/overview/hero-bg.png',
  resourceMap: '/images/overview/resource-map.png',
  searchIcon: '/images/overview/icon-search.png',
  mapIcon: '/images/overview/icon-map.png',
  suitcaseIcon: '/images/overview/icon-suitcase.png',
}

export const navItems = ['개요', '체류·소비 분석', '개선 제안']

export const kpiItems: KpiItem[] = [
  {
    title: '방문자 수',
    value: '287,450명',
    change: '전년 동기간 대비 ↑ 12.6%',
    changeTone: 'green',
    iconSrc: '/images/overview/icon-visitor.png',
    iconAlt: '방문자 수 아이콘',
  },
  {
    title: '평균 체류시간',
    value: '4.2시간',
    change: '전년 동기간 대비 ↑ 0.8시간',
    changeTone: 'green',
    iconSrc: '/images/overview/icon-clock.png',
    iconAlt: '평균 체류시간 아이콘',
  },
  {
    title: '관광소비',
    value: '154,800원',
    change: '전년 동기간 대비 ↑ 9.3%',
    changeTone: 'green',
    iconSrc: '/images/overview/icon-card.png',
    iconAlt: '관광소비 아이콘',
  },
  {
    title: '숙박 방문 비율',
    value: '34.6%',
    change: '전년 동기간 대비 ↓ 2.1%',
    changeTone: 'red',
    iconSrc: '/images/overview/icon-bed.png',
    iconAlt: '숙박 방문 비율 아이콘',
  },
]

export const insightItems: InsightItemData[] = [
  {
    title: '체류시간 연장이 핵심 과제',
    description: '평균 체류시간은 소폭 증가했으나, 타 지역 대비 여전히 개선 여지가 큽니다.',
    iconSrc: '/images/overview/icon-hourglass.png',
    iconAlt: '체류시간 연장 아이콘',
  },
  {
    title: '숙박·미식·체험 연계 강화 필요',
    description: '숙박 방문 비율이 감소하고 있어, 체류형 상품과 연계 프로그램 확대가 필요합니다.',
    iconSrc: '/images/overview/icon-puzzle.png',
    iconAlt: '숙박 미식 체험 연계 아이콘',
  },
  {
    title: '소비 잠재력 확대 가능성',
    description: '관광소비는 증가 추세이나, 1인당 소비액의 추가 성장 여지가 있습니다.',
    iconSrc: '/images/overview/icon-growth.png',
    iconAlt: '소비 잠재력 확대 아이콘',
  },
]

export const courseItems: CourseItem[] = [
  {
    title: '하동·구례 자연 힐링 코스',
    badges: ['2박 3일', '자연', '힐링'],
    route: '화개장터 → 야생차 체험 → 평사리 → 산수유마을 → 화엄사',
    imageSrc: '/images/overview/course-nature.png',
    imageAlt: '하동·구례 자연 힐링 코스 이미지',
    buttonTone: 'green',
  },
  {
    title: '미식과 장터 체험 코스',
    badges: ['1박 2일', '미식', '체험'],
    route: '화개장터 → 지역 미식 체험 → 야생차 체험 → 한옥 숙박',
    imageSrc: '/images/overview/course-food.png',
    imageAlt: '미식과 장터 체험 코스 이미지',
    buttonTone: 'blue',
  },
]
