import type {
  WorkationSpace,
  WorkationStats,
} from '../types/workation'

export type WorkationKpiTone = 'green' | 'blue'
export type ExpectedEffectIcon = 'bed' | 'building' | 'users'

export type WorkationKpiCardItem = {
  label: string
  value: string
  unit: string
  subtext: string
  iconSrc: string
  iconAlt: string
  tone: WorkationKpiTone
}

export type WorkationExpectedEffect = {
  title: string
  icon: ExpectedEffectIcon
}

export const workationAssets = {
  heroBg: '/images/overview/hero-bg.png',
  house: '/images/workation/icon-house.png',
  unusedSpace: '/images/workation/icon-unused-space.png',
  workationPin: '/images/workation/icon-workation-pin.png',
  target: '/images/workation/icon-target.png',
}

export const workationInsights: string[] = [
  '관광지 접근성이 좋은 빈집·유휴공간이 워케이션 전환 후보로 가장 유리합니다.',
  '하동은 자연·체험형, 구례는 체류·휴식형 공간으로 차별화가 가능합니다.',
  '폐교·공공시설은 커뮤니티형 거점 공간으로 활용 가능성이 높습니다.',
]

export const workationExpectedEffects: WorkationExpectedEffect[] = [
  {
    title: '숙박·업무·체험 기능을 연계한 체류형 관광 확장',
    icon: 'bed',
  },
  {
    title: '유휴공간 재생을 통한 지역 활성화',
    icon: 'building',
  },
  {
    title: '재방문율 및 장기체류 유도',
    icon: 'users',
  },
]

export const demoWorkationSpaces: WorkationSpace[] = [
  {
    id: 'demo-hadong-hwagae-house',
    name: '화개장터 인근 빈집',
    region: '하동',
    type: '빈집',
    lat: 35.1897,
    lng: 127.6255,
    addressLabel: '하동군 화개면 일대',
    sourceDataset: '예시 데이터',
    vacantGrade: '1등급',
    privacyAvailable: false,
    transactionType: '임대 가능',
    useCase: '숙박형',
    suitabilityScore: 86,
    suitabilityLevel: '높음',
    tourismDistanceKm: 1.2,
    experienceLinked: true,
    mainReason: '관광 거점 접근성과 숙박 전환 가능성이 높은 예시 후보입니다.',
  },
  {
    id: 'demo-hadong-pyeongsari-hanok',
    name: '평사리 한옥형 공간',
    region: '하동',
    type: '빈집',
    lat: 35.1605,
    lng: 127.6865,
    addressLabel: '하동군 악양면 일대',
    sourceDataset: '예시 데이터',
    vacantGrade: '1등급',
    privacyAvailable: false,
    transactionType: '임대 가능',
    useCase: '숙박형',
    suitabilityScore: 82,
    suitabilityLevel: '높음',
    tourismDistanceKm: 2.1,
    experienceLinked: true,
    mainReason: '한옥형 체류 콘텐츠와 자연 휴식형 워케이션 연결성이 높은 예시 후보입니다.',
  },
  {
    id: 'demo-hadong-public-space',
    name: '하동읍 유휴 공공시설',
    region: '하동',
    type: '유휴 공공시설',
    lat: 35.067,
    lng: 127.751,
    addressLabel: '하동군 하동읍 일대',
    sourceDataset: '예시 데이터',
    privacyAvailable: true,
    useCase: '업무형',
    suitabilityScore: 69,
    suitabilityLevel: '중상',
    tourismDistanceKm: 4.8,
    experienceLinked: false,
    mainReason: '행정 중심지 접근성과 업무 거점 활용 가능성이 있는 예시 후보입니다.',
  },
  {
    id: 'demo-hadong-wild-tea-house',
    name: '야생차 체험권 빈집',
    region: '하동',
    type: '빈집',
    lat: 35.206,
    lng: 127.633,
    addressLabel: '하동군 화개면 일대',
    sourceDataset: '예시 데이터',
    vacantGrade: '2등급',
    privacyAvailable: false,
    transactionType: '매매 가능',
    useCase: '체험연계형',
    suitabilityScore: 72,
    suitabilityLevel: '중상',
    tourismDistanceKm: 2.7,
    experienceLinked: true,
    mainReason: '야생차 체험과 체류 프로그램을 결합하기 쉬운 예시 후보입니다.',
  },
  {
    id: 'demo-gurye-cornus-school',
    name: '산수유마을 폐교',
    region: '구례',
    type: '폐교',
    lat: 35.314,
    lng: 127.462,
    addressLabel: '구례군 산동면 일대',
    sourceDataset: '예시 데이터',
    privacyAvailable: true,
    useCase: '커뮤니티형',
    suitabilityScore: 74,
    suitabilityLevel: '중상',
    tourismDistanceKm: 1.5,
    experienceLinked: true,
    mainReason: '마을 관광 자원과 커뮤니티 거점 활용 가능성이 있는 예시 후보입니다.',
  },
  {
    id: 'demo-gurye-hwaeomsa-public',
    name: '화엄사권 공공시설',
    region: '구례',
    type: '유휴 공공시설',
    lat: 35.257,
    lng: 127.497,
    addressLabel: '구례군 마산면 일대',
    sourceDataset: '예시 데이터',
    privacyAvailable: true,
    useCase: '업무형',
    suitabilityScore: 68,
    suitabilityLevel: '중상',
    tourismDistanceKm: 3.4,
    experienceLinked: true,
    mainReason: '주요 관광지 접근성과 업무 거점 활용 가능성이 있는 예시 후보입니다.',
  },
  {
    id: 'demo-gurye-town-store',
    name: '구례읍 유휴상가',
    region: '구례',
    type: '미활용 상가',
    lat: 35.2025,
    lng: 127.4622,
    addressLabel: '구례군 구례읍 일대',
    sourceDataset: '예시 데이터',
    privacyAvailable: true,
    useCase: '업무형',
    suitabilityScore: 56,
    suitabilityLevel: '중간',
    tourismDistanceKm: 6.1,
    experienceLinked: false,
    mainReason: '생활 편의 접근성은 있으나 관광 연계 보강이 필요한 예시 후보입니다.',
  },
]

export const demoWorkationStats: WorkationStats = {
  sourceType: 'demo',
  sourceLabel: '공간 데이터: 예시 데이터',
  period: '2026년 4월 기준 예시',
  kpis: {
    availableEmptyHouses: 128,
    unusedSpaces: 47,
    workationCandidates: 36,
    experienceLinkable: 24,
  },
  spaceTypeComposition: [
    { name: '빈집', value: 46 },
    { name: '폐교', value: 18 },
    { name: '유휴 공공시설', value: 21 },
    { name: '미활용 상가', value: 15 },
  ],
  spaces: demoWorkationSpaces,
  topCandidates: [
    {
      rank: 1,
      name: '화개장터 인근 빈집',
      type: '빈집',
      suitabilityLevel: '높음',
      suitabilityScore: 86,
    },
    {
      rank: 2,
      name: '평사리 한옥형 공간',
      type: '빈집',
      suitabilityLevel: '높음',
      suitabilityScore: 82,
    },
    {
      rank: 3,
      name: '산수유마을 폐교',
      type: '폐교',
      suitabilityLevel: '중상',
      suitabilityScore: 74,
    },
    {
      rank: 4,
      name: '화엄사권 공공시설',
      type: '유휴 공공시설',
      suitabilityLevel: '중상',
      suitabilityScore: 68,
    },
    {
      rank: 5,
      name: '구례읍 유휴상가',
      type: '미활용 상가',
      suitabilityLevel: '중간',
      suitabilityScore: 56,
    },
  ],
  dataNotes: [
    '현재 화면은 실제 공공데이터 파일이 없을 때 사용하는 예시 데이터 기반입니다.',
    '상세주소와 좌표는 개인정보 및 사유재산 보호를 고려해 읍면 단위로 표시합니다.',
  ],
}
