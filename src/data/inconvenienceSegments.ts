export type InconvenienceLevel = 'normal' | 'caution' | 'danger'

export interface InconvenienceSegment {
  from: string
  to: string
  level: InconvenienceLevel
  label: string
  reason: string
  estimatedTime: string
  recommendation: string
}

export const inconvenienceSegments: InconvenienceSegment[] = [
  {
    from: '화개장터',
    to: '평사리',
    level: 'normal',
    label: '하동 내부 이동',
    reason: '같은 지역 내 관광지 이동 구간입니다.',
    estimatedTime: '30~40분',
    recommendation: '기존 코스 안내 유지',
  },
  {
    from: '평사리',
    to: '하동 야생차',
    level: 'caution',
    label: '체험지 연계 이동',
    reason: '관광지 간 이동 거리가 있어 차량 또는 셔틀 안내가 필요합니다.',
    estimatedTime: '40~60분',
    recommendation: '체험 예약 시간과 이동 안내 연계',
  },
  {
    from: '하동 야생차',
    to: '구례 산수유마을',
    level: 'danger',
    label: '지역 간 이동 불편 예상',
    reason: '하동과 구례를 연결하는 핵심 구간으로 대중교통 보완이 필요합니다.',
    estimatedTime: '90~120분',
    recommendation: '주말 순환 셔틀 운영 검토',
  },
  {
    from: '구례 산수유마을',
    to: '구례 화엄사',
    level: 'caution',
    label: '구례 내부 이동',
    reason: '관광지 간 이동시간이 발생하여 코스 안내가 필요합니다.',
    estimatedTime: '40~60분',
    recommendation: '코스별 이동시간 사전 안내',
  },
  {
    from: '구례 화엄사',
    to: '한옥 숙박',
    level: 'normal',
    label: '숙박 연계 구간',
    reason: '체류형 관광상품으로 연결 가능한 구간입니다.',
    estimatedTime: '20~30분',
    recommendation: '숙박 예약과 관광 코스 연계',
  },
]
