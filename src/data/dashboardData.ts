export type PageKey = 'overview' | 'visits' | 'analysis' | 'insights' | 'improvement'

export type MenuItem = {
  key: PageKey
  label: string
}

export type KpiMetric = {
  label: string
  value: string
  change: string
  direction: 'up' | 'down'
}

export type Course = {
  title: string
  duration: string
  tags: string[]
  target: string
  spend: string
}

export type ResourceNode = {
  label: string
  x: number
  y: number
}

export type TrendPoint = {
  month: string
  visitors: number
  stayHours: number
}

export type SharePoint = {
  name: string
  value: number
  color: string
}

export type BarPoint = {
  name: string
  value: number
  color?: string
}

export type LinkageMetric = {
  label: string
  value: string
  detail: string
  progress: number
  color: string
}

export type ImprovementSummary = {
  label: string
  value: string
  detail: string
}

export type ImprovementRow = {
  rank: number
  task: string
  department: string
  due: string
  status: '진행중' | '검토중' | '계획' | '준비중'
  kpi: string
  urgency: '상' | '중' | '하'
  impact: '상' | '중' | '하'
}

export const prototypeNote =
  '※ 수치는 제안서 이해를 위한 예시이며, 실제 적용 시 지자체 방문통계·카드소비 데이터·숙박 및 체험 예약 데이터로 대체됩니다.'

export const menuItems: MenuItem[] = [
  { key: 'overview', label: '개요' },
  { key: 'visits', label: '방문 현황' },
  { key: 'analysis', label: '체류·소비 분석' },
  { key: 'insights', label: '인사이트' },
  { key: 'improvement', label: '개선 제안' },
]

export const filterPills = [
  '지역: 전체',
  '시즌: 전체',
  '기준월: 2026년 4월',
  '분석 기간: 2025년 11월 ~ 2026년 4월',
]

export const kpiMetrics: KpiMetric[] = [
  {
    label: '총 방문자 수',
    value: '287,450명',
    change: '전년 동기간 대비 ↑ 12.6%',
    direction: 'up',
  },
  {
    label: '평균 체류시간',
    value: '4.2시간',
    change: '전년 동기간 대비 ↑ 0.8시간',
    direction: 'up',
  },
  {
    label: '1인당 관광소비',
    value: '154,800원',
    change: '전년 동기간 대비 ↑ 9.3%',
    direction: 'up',
  },
  {
    label: '숙박 전환율',
    value: '34.6%',
    change: '전년 동기간 대비 ↓ 2.1%',
    direction: 'down',
  },
]

export const overviewInsights = [
  {
    title: '체류시간 연장이 핵심 과제',
    body: '오후 방문이 집중되지만 저녁 이후 체류 전환은 제한적입니다.',
  },
  {
    title: '숙박·미식·체험 연계 강화 필요',
    body: '차 체험, 장터 미식, 한옥 숙박을 하나의 예약 흐름으로 묶어야 합니다.',
  },
  {
    title: '소비 잠재력 확대 가능성',
    body: '음식·숙박 소비 비중이 높아 패키지 단가 상승 여지가 큽니다.',
  },
]

export const resourceMap = {
  hadong: {
    region: '하동',
    subtitle: '장터·차·섬진강',
    nodes: [
      { label: '화개장터', x: 18, y: 30 },
      { label: '평사리', x: 28, y: 58 },
      { label: '야생차 체험', x: 38, y: 40 },
    ] satisfies ResourceNode[],
  },
  gurye: {
    region: '구례',
    subtitle: '산수유·사찰·숙박',
    nodes: [
      { label: '산수유마을', x: 63, y: 32 },
      { label: '화엄사', x: 73, y: 57 },
      { label: '한옥 숙박', x: 84, y: 42 },
    ] satisfies ResourceNode[],
  },
}

export const recommendedCourses: Course[] = [
  {
    title: '하동·구례 자연 힐링 코스',
    duration: '2박 3일',
    tags: ['자연', '힐링'],
    target: '주요 타깃: 커플·직장인',
    spend: '예상 소비액: 1인 18만 원',
  },
  {
    title: '미식과 장터 체험 코스',
    duration: '1박 2일',
    tags: ['미식', '체험'],
    target: '주요 타깃: 가족·MZ세대',
    spend: '예상 소비액: 1인 14만 원',
  },
]

export const monthlyTrend: TrendPoint[] = [
  { month: '2025.11', visitors: 39800, stayHours: 3.4 },
  { month: '2025.12', visitors: 42100, stayHours: 3.6 },
  { month: '2026.01', visitors: 43800, stayHours: 3.7 },
  { month: '2026.02', visitors: 47100, stayHours: 3.9 },
  { month: '2026.03', visitors: 55250, stayHours: 4.1 },
  { month: '2026.04', visitors: 59400, stayHours: 4.2 },
]

export const spendingShare: SharePoint[] = [
  { name: '음식', value: 36, color: '#1f9a62' },
  { name: '숙박', value: 28, color: '#2f80d1' },
  { name: '체험', value: 18, color: '#d68c1d' },
  { name: '교통', value: 10, color: '#7c3aed' },
  { name: '기념품', value: 8, color: '#64748b' },
]

export const inflowRegions: BarPoint[] = [
  { name: '부산·경남', value: 34.2, color: '#1f9a62' },
  { name: '광주·전남', value: 26.8, color: '#2f80d1' },
  { name: '수도권', value: 18.6, color: '#d68c1d' },
  { name: '대구·경북', value: 12.4, color: '#7c3aed' },
  { name: '기타', value: 8.0, color: '#64748b' },
]

export const timeDistribution: BarPoint[] = [
  { name: '09시', value: 8, color: '#9ccfba' },
  { name: '11시', value: 16, color: '#60b98c' },
  { name: '13시', value: 24, color: '#1f9a62' },
  { name: '15시', value: 29, color: '#2f80d1' },
  { name: '17시', value: 18, color: '#6ba8dc' },
  { name: '19시', value: 5, color: '#94a3b8' },
]

export const linkageMetrics: LinkageMetric[] = [
  {
    label: '연계 코스 문의',
    value: '18.4%',
    detail: '전월 대비 증가',
    progress: 76,
    color: '#1f9a62',
  },
  {
    label: '체험 예약 전환',
    value: '42.1%',
    detail: '방문 상담 대비',
    progress: 62,
    color: '#2f80d1',
  },
  {
    label: '숙박 동시 구매',
    value: '31.8%',
    detail: '패키지 예약 내 비중',
    progress: 54,
    color: '#d68c1d',
  },
]

export const improvementSummaries: ImprovementSummary[] = [
  {
    label: '핵심 불편요소',
    value: '교통 연계',
    detail: '응답 비중 38.7%',
  },
  {
    label: '우선 개선과제',
    value: '체험 예약',
    detail: '응답 비중 25.4%',
  },
  {
    label: '기대효과',
    value: '체류시간 확대',
    detail: '숙박 전환율 개선',
  },
]

export const inconvenienceFactors: BarPoint[] = [
  { name: '교통 연계', value: 38.7, color: '#1f9a62' },
  { name: '체험 예약', value: 25.4, color: '#2f80d1' },
  { name: '숙박 정보', value: 17.6, color: '#d68c1d' },
  { name: '음식점 정보', value: 11.3, color: '#7c3aed' },
  { name: '기타', value: 7.0, color: '#64748b' },
]

export const movementImprovementNotes = [
  '대중교통 기준 예상 이동시간 90~120분',
  '개선안: 주말 순환 셔틀 운영 검토',
  '체류형 코스 권장',
]

export const improvementRows: ImprovementRow[] = [
  {
    rank: 1,
    task: '하동·구례 주말 순환 셔틀 시범 운영',
    department: '관광정책팀',
    due: '2026년 6월',
    status: '진행중',
    kpi: '평균 이동시간 25% 단축',
    urgency: '상',
    impact: '상',
  },
  {
    rank: 2,
    task: '체험·숙박 통합 예약 페이지 구축',
    department: '농촌관광지원팀',
    due: '2026년 7월',
    status: '검토중',
    kpi: '예약 전환율 15%p 개선',
    urgency: '상',
    impact: '상',
  },
  {
    rank: 3,
    task: '미식·장터 추천 동선 표준화',
    department: '지역경제팀',
    due: '2026년 8월',
    status: '계획',
    kpi: '1인당 소비 8% 증가',
    urgency: '중',
    impact: '상',
  },
  {
    rank: 4,
    task: '숙박·체험 후기 데이터 정비',
    department: '디지털홍보팀',
    due: '2026년 9월',
    status: '준비중',
    kpi: '정보 만족도 4.3점',
    urgency: '중',
    impact: '중',
  },
]
