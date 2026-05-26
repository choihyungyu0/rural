export type WorkationSpaceType =
  | '빈집'
  | '폐교'
  | '유휴 공공시설'
  | '미활용 상가'

export type WorkationUseCase =
  | '숙박형'
  | '업무형'
  | '체험연계형'
  | '커뮤니티형'

export type SuitabilityLevel =
  | '높음'
  | '중상'
  | '중간'
  | '낮음'

export interface WorkationSpace {
  id: string
  name: string
  region: '하동' | '구례'
  type: WorkationSpaceType
  lat?: number
  lng?: number
  addressLabel: string
  sourceDataset: string
  buildingYear?: number
  buildingAreaSqm?: number
  landAreaSqm?: number
  vacantGrade?: string
  privacyAvailable?: boolean
  transactionType?: string
  useCase: WorkationUseCase
  suitabilityScore: number
  suitabilityLevel: SuitabilityLevel
  tourismDistanceKm?: number
  experienceLinked?: boolean
  mainReason: string
}

export interface WorkationStats {
  sourceType: 'real-json' | 'demo'
  sourceLabel: string
  period: string
  kpis: {
    availableEmptyHouses: number
    unusedSpaces: number
    workationCandidates: number
    experienceLinkable: number
  }
  spaceTypeComposition: Array<{
    name: WorkationSpaceType
    value: number
  }>
  spaces: WorkationSpace[]
  topCandidates: Array<{
    rank: number
    name: string
    type: WorkationSpaceType
    suitabilityLevel: SuitabilityLevel
    suitabilityScore: number
  }>
  dataNotes: string[]
}
