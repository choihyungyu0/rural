import { DashboardCard } from '../components/DashboardCard'
import { KpiCard } from '../components/KpiCard'
import { InflowRegionBarChart } from '../components/charts/InflowRegionBarChart'
import { RegionCompositionCard } from '../components/charts/RegionCompositionCard'
import { SpendingDonutChart } from '../components/charts/SpendingDonutChart'
import { StayTimeTrendChart } from '../components/charts/StayTimeTrendChart'
import { TimeDistributionChart } from '../components/charts/TimeDistributionChart'
import { VisitorTrendChart } from '../components/charts/VisitorTrendChart'
import { analysisAssets, kpiItems } from '../data/analysisData'

export function AnalysisPage() {
  return (
    <main className="analysisPage">
      <section className="analysisIntro" aria-labelledby="analysis-title">
        <p className="pageEyebrow">체류·소비 분석</p>
        <h1 id="analysis-title">방문 흐름·체류시간·관광소비 분석</h1>
        <p>방문 흐름과 소비 구조를 바탕으로 체류형 농촌관광의 가능성을 분석합니다.</p>
      </section>

      <section className="analysisKpiGrid" aria-label="체류와 소비 핵심 지표">
        {kpiItems.map((item) => (
          <KpiCard item={item} key={item.title} />
        ))}
      </section>

      <section className="analysisGrid" aria-label="체류와 소비 분석 차트">
        <DashboardCard
          title="A. 월별 방문자 추이"
          iconSrc={analysisAssets.trend}
          iconAlt="월별 방문자 추이 아이콘"
        >
          <VisitorTrendChart />
        </DashboardCard>

        <DashboardCard
          title="B. 평균 체류시간 추이"
          iconSrc={analysisAssets.stayTime}
          iconAlt="평균 체류시간 추이 아이콘"
        >
          <StayTimeTrendChart />
        </DashboardCard>

        <DashboardCard
          title="C. 관광소비 비중"
          iconSrc={analysisAssets.pie}
          iconAlt="관광소비 비중 아이콘"
        >
          <SpendingDonutChart />
        </DashboardCard>

        <DashboardCard
          title="D. 유입 지역 TOP 5"
          iconSrc={analysisAssets.location}
          iconAlt="유입 지역 아이콘"
        >
          <InflowRegionBarChart />
        </DashboardCard>

        <DashboardCard
          title="E. 시간대별 방문 분포"
          iconSrc={analysisAssets.timeBars}
          iconAlt="시간대별 방문 분포 아이콘"
        >
          <TimeDistributionChart />
        </DashboardCard>

        <DashboardCard
          title="지역별 방문자 구성비"
          iconSrc={analysisAssets.people}
          iconAlt="지역별 방문자 구성비 아이콘"
        >
          <RegionCompositionCard />
        </DashboardCard>
      </section>

      <p className="analysisNote">※ 수치는 제안서 이해를 위한 예시이며, 실제 적용 시 최신 자료로 대체됩니다.</p>
    </main>
  )
}
