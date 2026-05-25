import { useEffect, useState } from 'react'
import { DashboardCard } from '../components/DashboardCard'
import { KpiCard } from '../components/KpiCard'
import { InflowRegionBarChart } from '../components/charts/InflowRegionBarChart'
import { RegionCompositionCard } from '../components/charts/RegionCompositionCard'
import { SpendingDonutChart } from '../components/charts/SpendingDonutChart'
import { StayTimeTrendChart } from '../components/charts/StayTimeTrendChart'
import { TimeDistributionChart } from '../components/charts/TimeDistributionChart'
import { VisitorTrendChart } from '../components/charts/VisitorTrendChart'
import { analysisAssets, demoAnalysisData } from '../data/analysisData'
import {
  loadTourismStatistics,
  type StatisticsLoadResult,
} from '../services/statisticsLoader'

const initialStatistics: StatisticsLoadResult = {
  ...demoAnalysisData,
  sourceType: 'demo',
}

export function AnalysisPage() {
  const [statistics, setStatistics] = useState<StatisticsLoadResult>(initialStatistics)

  useEffect(() => {
    let isActive = true

    async function loadStatistics() {
      const nextStatistics = await loadTourismStatistics()

      if (isActive) {
        setStatistics(nextStatistics)
      }
    }

    void loadStatistics()

    return () => {
      isActive = false
    }
  }, [])

  const statisticsSourceLabel =
    statistics.sourceType === 'real-json'
      ? '통계 지표: 한국관광 데이터랩 기반'
      : '통계 지표: 예시 데이터'

  return (
    <main className="analysisPage">
      <section className="analysisIntro" aria-labelledby="analysis-title">
        <p className="pageEyebrow">체류·소비 분석</p>
        <h1 id="analysis-title">방문 흐름·체류시간·관광소비 분석</h1>
        <p className="analysisIntroText">방문 흐름과 소비 구조를 바탕으로 체류형 농촌관광의 가능성을 분석합니다.</p>
        <div className="analysisSourceBadges" aria-label="분석 데이터 출처">
          <span className={`dataSourceBadge ${statistics.sourceType === 'real-json' ? 'real' : 'demo'}`}>
            {statisticsSourceLabel}
          </span>
          <span className="dataSourceBadge">지도 데이터: OpenStreetMap</span>
          <span className="dataSourceBadge demo">시간대별 분포: 예시 데이터</span>
        </div>
      </section>

      <section className="analysisKpiGrid" aria-label="체류와 소비 핵심 지표">
        {statistics.kpiItems.map((item) => (
          <KpiCard item={item} key={item.title} />
        ))}
      </section>

      <section className="analysisGrid" aria-label="체류와 소비 분석 차트">
        <DashboardCard
          title="A. 월별 방문자 추이"
          iconSrc={analysisAssets.trend}
          iconAlt="월별 방문자 추이 아이콘"
        >
          <VisitorTrendChart data={statistics.monthlyVisitorTrend} />
        </DashboardCard>

        <DashboardCard
          title="B. 평균 체류시간 추이"
          iconSrc={analysisAssets.stayTime}
          iconAlt="평균 체류시간 추이 아이콘"
        >
          <StayTimeTrendChart data={statistics.averageStayTimeTrend} />
        </DashboardCard>

        <DashboardCard
          title="C. 관광소비 비중"
          iconSrc={analysisAssets.pie}
          iconAlt="관광소비 비중 아이콘"
        >
          <SpendingDonutChart data={statistics.spendingRatio} totalSpendingLabel={statistics.totalSpendingLabel} />
        </DashboardCard>

        <DashboardCard
          title="D. 유입 지역 TOP 5"
          iconSrc={analysisAssets.location}
          iconAlt="유입 지역 아이콘"
        >
          <InflowRegionBarChart data={statistics.inflowRegions} />
        </DashboardCard>

        <DashboardCard
          title="E. 시간대별 방문 분포"
          iconSrc={analysisAssets.timeBars}
          iconAlt="시간대별 방문 분포 아이콘"
        >
          <TimeDistributionChart data={statistics.timeDistribution} />
        </DashboardCard>

        <DashboardCard
          title="지역별 방문자 구성비"
          iconSrc={analysisAssets.people}
          iconAlt="지역별 방문자 구성비 아이콘"
        >
          <RegionCompositionCard data={statistics.regionComposition} />
        </DashboardCard>
      </section>

      <p className="analysisNote">
        ※ 방문자·체류시간은 한국관광 데이터랩 이동통신 기반 자료, 관광소비는 신용카드 기반 자료를
        활용했으며, 일부 지표는 분석 목적에 맞게 재가공했습니다. 시간대별 방문 분포는 예시 데이터입니다.
      </p>
    </main>
  )
}
