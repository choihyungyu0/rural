import { demoWorkationStats } from '../data/workationData'
import type {
  SuitabilityLevel,
  WorkationSpace,
  WorkationSpaceType,
  WorkationStats,
  WorkationUseCase,
} from '../types/workation'

const validSpaceTypes: WorkationSpaceType[] = ['빈집', '폐교', '유휴 공공시설', '미활용 상가']
const validUseCases: WorkationUseCase[] = ['숙박형', '업무형', '체험연계형', '커뮤니티형']
const validSuitabilityLevels: SuitabilityLevel[] = ['높음', '중상', '중간', '낮음']
const validRegions: WorkationSpace['region'][] = ['하동', '구례']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isBooleanOrUndefined(value: unknown): value is boolean | undefined {
  return typeof value === 'boolean' || value === undefined
}

function isStringOrUndefined(value: unknown): value is string | undefined {
  return typeof value === 'string' || value === undefined
}

function isNumberOrUndefined(value: unknown): value is number | undefined {
  return isNumber(value) || value === undefined
}

function isWorkationSpace(value: unknown): value is WorkationSpace {
  if (!isRecord(value)) {
    return false
  }

  return (
    isString(value.id) &&
    isString(value.name) &&
    validRegions.includes(value.region as WorkationSpace['region']) &&
    validSpaceTypes.includes(value.type as WorkationSpaceType) &&
    isNumberOrUndefined(value.lat) &&
    isNumberOrUndefined(value.lng) &&
    isString(value.addressLabel) &&
    isString(value.sourceDataset) &&
    isNumberOrUndefined(value.buildingYear) &&
    isNumberOrUndefined(value.buildingAreaSqm) &&
    isNumberOrUndefined(value.landAreaSqm) &&
    isStringOrUndefined(value.vacantGrade) &&
    isBooleanOrUndefined(value.privacyAvailable) &&
    isStringOrUndefined(value.transactionType) &&
    validUseCases.includes(value.useCase as WorkationUseCase) &&
    isNumber(value.suitabilityScore) &&
    validSuitabilityLevels.includes(value.suitabilityLevel as SuitabilityLevel) &&
    isNumberOrUndefined(value.tourismDistanceKm) &&
    isBooleanOrUndefined(value.experienceLinked) &&
    isString(value.mainReason)
  )
}

function isSpaceTypeComposition(value: unknown): value is WorkationStats['spaceTypeComposition'][number] {
  if (!isRecord(value)) {
    return false
  }

  return validSpaceTypes.includes(value.name as WorkationSpaceType) && isNumber(value.value)
}

function isTopCandidate(value: unknown): value is WorkationStats['topCandidates'][number] {
  if (!isRecord(value)) {
    return false
  }

  return (
    isNumber(value.rank) &&
    isString(value.name) &&
    validSpaceTypes.includes(value.type as WorkationSpaceType) &&
    validSuitabilityLevels.includes(value.suitabilityLevel as SuitabilityLevel) &&
    isNumber(value.suitabilityScore)
  )
}

function isWorkationStats(value: unknown): value is WorkationStats {
  if (!isRecord(value) || !isRecord(value.kpis)) {
    return false
  }

  return (
    isString(value.period) &&
    isNumber(value.kpis.availableEmptyHouses) &&
    isNumber(value.kpis.unusedSpaces) &&
    isNumber(value.kpis.workationCandidates) &&
    isNumber(value.kpis.experienceLinkable) &&
    Array.isArray(value.spaceTypeComposition) &&
    value.spaceTypeComposition.every(isSpaceTypeComposition) &&
    Array.isArray(value.spaces) &&
    value.spaces.every(isWorkationSpace) &&
    Array.isArray(value.topCandidates) &&
    value.topCandidates.every(isTopCandidate) &&
    Array.isArray(value.dataNotes) &&
    value.dataNotes.every(isString)
  )
}

function warnAndUseDemo(reason: string): WorkationStats {
  console.warn(`[workation] ${reason} Using demo data.`)
  return demoWorkationStats
}

export async function loadWorkationStats(): Promise<WorkationStats> {
  try {
    const response = await fetch('/data/workation-spaces.json', { cache: 'no-cache' })

    if (!response.ok) {
      return warnAndUseDemo('public/data/workation-spaces.json is not available.')
    }

    const json: unknown = await response.json()

    if (!isWorkationStats(json)) {
      return warnAndUseDemo('public/data/workation-spaces.json has an invalid shape.')
    }

    return {
      ...json,
      sourceType: 'real-json',
      sourceLabel: '공간 데이터: 공공데이터 기반',
    }
  } catch {
    return warnAndUseDemo('Failed to load public/data/workation-spaces.json.')
  }
}
