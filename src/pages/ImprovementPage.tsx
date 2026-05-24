import { BottomInsightCard } from '../components/BottomInsightCard'
import { DashboardCard } from '../components/DashboardCard'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { ImprovementPriorityTable } from '../components/ImprovementPriorityTable'
import { ImprovementSummaryCard } from '../components/ImprovementSummaryCard'
import { InconvenienceBarChart } from '../components/InconvenienceBarChart'
import { bottomCards, improvementAssets, summaryCards } from '../data/improvementData'

export function ImprovementPage() {
  return (
    <main className="improvementPage">
      <section className="improvementHero" aria-labelledby="improvement-title">
        <ImageWithFallback
          src={improvementAssets.heroBg}
          alt="불편요소 개선 및 실행 전략 배경 이미지"
          className="improvementHeroImage"
          fallbackClassName="improvementHeroImageFallback"
          fallbackLabel="불편요소 개선 및 실행 전략"
        />
        <div className="improvementHeroOverlay" aria-hidden="true" />
        <div className="improvementHeroContent">
          <h1 id="improvement-title">불편요소 개선 및 실행 전략</h1>
          <p>설문 기반 불편요소와 이동 동선을 바탕으로 우선 개선 과제와 실행 방향을 제안합니다.</p>
        </div>
      </section>

      <section className="improvementSummaryGrid" aria-label="개선 제안 핵심 요약">
        {summaryCards.map((item) => (
          <ImprovementSummaryCard item={item} key={item.label} />
        ))}
      </section>

      <section className="improvementMainGrid" aria-label="불편요소 개선 분석">
        <DashboardCard
          title="주요 불편요소 분석"
          iconSrc={improvementAssets.barChart}
          iconAlt="주요 불편요소 분석 아이콘"
          className="inconvenienceCard"
        >
          <InconvenienceBarChart />
        </DashboardCard>

        <DashboardCard
          title="하동·구례 연계 동선 및 이동 불편 예상 구간"
          iconSrc={improvementAssets.routePin}
          iconAlt="연계 동선 아이콘"
          className="routeMapCard"
        >
          <div className="routeMapFrame">
            <ImageWithFallback
              src={improvementAssets.routeMap}
              alt="하동·구례 연계 동선 및 이동 불편 예상 구간 지도"
              className="routeMapImage"
              fallbackClassName="routeMapFallback"
              fallbackLabel="하동·구례 연계 동선 지도"
            />
          </div>
        </DashboardCard>

        <DashboardCard
          title="개선 우선순위"
          iconSrc={improvementAssets.checklist}
          iconAlt="개선 우선순위 아이콘"
          className="priorityCard"
        >
          <ImprovementPriorityTable />
        </DashboardCard>
      </section>

      <section className="bottomInsightGrid" aria-label="핵심 인사이트와 기대효과">
        {bottomCards.map((item) => (
          <BottomInsightCard item={item} key={item.title} />
        ))}
      </section>

      <p className="improvementNote">
        ※ 수치는 제안서 이해를 위한 예시이며, 실제 적용 시 최신 자료 및 설문 결과로 대체됩니다.
      </p>
    </main>
  )
}
