import {
  analysisAssets,
  demoAnalysisData,
  type AnalysisDashboardData,
  type ChangeTone,
  type InflowRegionItem,
  type KpiItem,
  type MonthlyTrendItem,
  type RegionCompositionItem,
  type SpendingRatioItem,
} from '../data/analysisData'

export type StatisticsSourceType = 'real-json' | 'demo'

export type StatisticsLoadResult = AnalysisDashboardData & {
  sourceType: StatisticsSourceType
}

type TourismStatsJson = {
  source: string
  period: string
  regions: string[]
  kpis: {
    totalVisitors: number
    visitorYoYChangeRate: number
    averageStayHours: number
    lodgingVisitRate: number
    tourismSpendingEokKrw: number
  }
  monthlyVisitors: Array<{
    month: string
    hadong: number
    gurye: number
  }>
  stayTimeTrend: Array<{
    month: string
    hadongHours: number
    guryeHours: number
  }>
  lodgingRateTrend: unknown[]
  tourismSpendingTrend: unknown[]
  spendingRatioActual: Array<{
    name: string
    value: number
  }>
  inflowTop5ByNavigationRatioWeighted: Array<{
    name: string
    ratio: number
  }>
  regionComposition: {
    hadong: number
    gurye: number
  }
  dataNotes: string[]
}

const statisticsJsonPath = '/data/hadong-gurye-tourism-stats.json'

const spendingColors = ['#16a34a', '#2563eb', '#f59e0b', '#8b5cf6', '#14b8a6', '#64748b']

const spendingLabelMap: Record<string, string> = {
  식음료업: '식음료',
  운송업: '운송',
  쇼핑업: '쇼핑',
  숙박업: '숙박',
  여가서비스업: '여가',
  의료웰니스업: '의료',
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string')
}

function hasNumber(record: Record<string, unknown>, key: string) {
  return typeof record[key] === 'number' && Number.isFinite(record[key])
}

function hasString(record: Record<string, unknown>, key: string) {
  return typeof record[key] === 'string' && record[key].length > 0
}

function isKpis(value: unknown): value is TourismStatsJson['kpis'] {
  if (!isRecord(value)) {
    return false
  }

  return (
    hasNumber(value, 'totalVisitors') &&
    hasNumber(value, 'visitorYoYChangeRate') &&
    hasNumber(value, 'averageStayHours') &&
    hasNumber(value, 'lodgingVisitRate') &&
    hasNumber(value, 'tourismSpendingEokKrw')
  )
}

function isMonthlyVisitorItem(value: unknown): value is TourismStatsJson['monthlyVisitors'][number] {
  return isRecord(value) && hasString(value, 'month') && hasNumber(value, 'hadong') && hasNumber(value, 'gurye')
}

function isStayTimeItem(value: unknown): value is TourismStatsJson['stayTimeTrend'][number] {
  return (
    isRecord(value) &&
    hasString(value, 'month') &&
    hasNumber(value, 'hadongHours') &&
    hasNumber(value, 'guryeHours')
  )
}

function isSpendingRatioItem(value: unknown): value is TourismStatsJson['spendingRatioActual'][number] {
  return isRecord(value) && hasString(value, 'name') && hasNumber(value, 'value')
}

function isInflowItem(value: unknown): value is TourismStatsJson['inflowTop5ByNavigationRatioWeighted'][number] {
  return isRecord(value) && hasString(value, 'name') && hasNumber(value, 'ratio')
}

function isRegionComposition(value: unknown): value is TourismStatsJson['regionComposition'] {
  return isRecord(value) && hasNumber(value, 'hadong') && hasNumber(value, 'gurye')
}

function isTourismStatsJson(value: unknown): value is TourismStatsJson {
  if (!isRecord(value)) {
    return false
  }

  return (
    hasString(value, 'source') &&
    hasString(value, 'period') &&
    isStringArray(value.regions) &&
    isKpis(value.kpis) &&
    Array.isArray(value.monthlyVisitors) &&
    value.monthlyVisitors.length > 0 &&
    value.monthlyVisitors.every(isMonthlyVisitorItem) &&
    Array.isArray(value.stayTimeTrend) &&
    value.stayTimeTrend.length > 0 &&
    value.stayTimeTrend.every(isStayTimeItem) &&
    Array.isArray(value.lodgingRateTrend) &&
    Array.isArray(value.tourismSpendingTrend) &&
    Array.isArray(value.spendingRatioActual) &&
    value.spendingRatioActual.length > 0 &&
    value.spendingRatioActual.every(isSpendingRatioItem) &&
    Array.isArray(value.inflowTop5ByNavigationRatioWeighted) &&
    value.inflowTop5ByNavigationRatioWeighted.length > 0 &&
    value.inflowTop5ByNavigationRatioWeighted.every(isInflowItem) &&
    isRegionComposition(value.regionComposition) &&
    isStringArray(value.dataNotes)
  )
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value)
}

function formatOneDecimal(value: number) {
  return value.toFixed(1)
}

function formatRateChange(value: number) {
  const arrow = value < 0 ? '↓' : '↑'
  return `${arrow} ${formatOneDecimal(Math.abs(value))}%`
}

function formatMonthLabel(month: string) {
  const match = month.match(/^(\d{4})-(\d{2})$/)

  if (!match) {
    return month
  }

  return `${match[1]}년 ${Number(match[2])}월`
}

function buildKpis(stats: TourismStatsJson): KpiItem[] {
  const visitorTone: ChangeTone = stats.kpis.visitorYoYChangeRate < 0 ? 'red' : 'green'

  return [
    {
      title: '총 방문자 수',
      value: `${formatNumber(stats.kpis.totalVisitors)}명`,
      change: `전년 동기간 대비 ${formatRateChange(stats.kpis.visitorYoYChangeRate)}`,
      changeTone: visitorTone,
      iconSrc: analysisAssets.visitor,
      iconAlt: '총 방문자 수 아이콘',
    },
    {
      title: '평균 체류시간',
      value: `${formatOneDecimal(stats.kpis.averageStayHours)}시간`,
      changeTone: 'green',
      iconSrc: analysisAssets.clock,
      iconAlt: '평균 체류시간 아이콘',
    },
    {
      title: '관광소비액',
      value: `${formatOneDecimal(stats.kpis.tourismSpendingEokKrw)}억원`,
      change: '외지인 관광소비 기준',
      changeTone: 'green',
      iconSrc: analysisAssets.card,
      iconAlt: '관광소비액 아이콘',
    },
    {
      title: '숙박방문자 비율',
      value: `${formatOneDecimal(stats.kpis.lodgingVisitRate)}%`,
      changeTone: 'red',
      iconSrc: analysisAssets.bed,
      iconAlt: '숙박방문자 비율 아이콘',
    },
  ]
}

function mapMonthlyVisitors(stats: TourismStatsJson): MonthlyTrendItem[] {
  return stats.monthlyVisitors.map((item) => ({
    month: formatMonthLabel(item.month),
    하동: item.hadong,
    구례: item.gurye,
  }))
}

function mapStayTimeTrend(stats: TourismStatsJson): MonthlyTrendItem[] {
  return stats.stayTimeTrend.map((item) => ({
    month: formatMonthLabel(item.month),
    하동: item.hadongHours,
    구례: item.guryeHours,
  }))
}

function mapSpendingRatio(stats: TourismStatsJson): SpendingRatioItem[] {
  return stats.spendingRatioActual.map((item, index) => ({
    name: spendingLabelMap[item.name] ?? item.name,
    value: item.value,
    color: spendingColors[index % spendingColors.length],
  }))
}

function mapInflowRegions(stats: TourismStatsJson): InflowRegionItem[] {
  return stats.inflowTop5ByNavigationRatioWeighted.map((item, index) => ({
    rank: index + 1,
    region: item.name,
    ratio: item.ratio,
  }))
}

function mapRegionComposition(stats: TourismStatsJson): RegionCompositionItem[] {
  return [
    { region: '하동', value: stats.regionComposition.hadong, color: '#16a34a' },
    { region: '구례', value: stats.regionComposition.gurye, color: '#2563eb' },
  ]
}

function mapStatisticsJsonToDashboardData(stats: TourismStatsJson): AnalysisDashboardData {
  return {
    kpiItems: buildKpis(stats),
    monthlyVisitorTrend: mapMonthlyVisitors(stats),
    averageStayTimeTrend: mapStayTimeTrend(stats),
    spendingRatio: mapSpendingRatio(stats),
    inflowRegions: mapInflowRegions(stats),
    timeDistribution: demoAnalysisData.timeDistribution,
    regionComposition: mapRegionComposition(stats),
    totalSpendingLabel: `${formatOneDecimal(stats.kpis.tourismSpendingEokKrw)}억원`,
  }
}

function getDemoStatistics(): StatisticsLoadResult {
  return {
    ...demoAnalysisData,
    sourceType: 'demo',
  }
}

export async function loadTourismStatistics(): Promise<StatisticsLoadResult> {
  try {
    const response = await fetch(statisticsJsonPath)

    if (!response.ok) {
      return getDemoStatistics()
    }

    const json: unknown = await response.json()

    if (!isTourismStatsJson(json)) {
      return getDemoStatistics()
    }

    return {
      ...mapStatisticsJsonToDashboardData(json),
      sourceType: 'real-json',
    }
  } catch {
    return getDemoStatistics()
  }
}
