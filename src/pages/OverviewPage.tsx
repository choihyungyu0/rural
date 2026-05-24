import { CourseCard } from '../components/CourseCard'
import { HeroSection } from '../components/HeroSection'
import { InsightItem } from '../components/InsightItem'
import { KpiCard } from '../components/KpiCard'
import { OverviewSectionCard } from '../components/OverviewSectionCard'
import {
  courseItems,
  insightItems,
  kpiItems,
  overviewAssets,
} from '../data/overviewData'

export function OverviewPage() {
  return (
    <main className="overviewPage">
      <HeroSection />

      <section className="kpiGrid" aria-label="핵심 성과 지표">
        {kpiItems.map((item) => (
          <KpiCard item={item} key={item.title} />
        ))}
      </section>

      <section className="overviewGrid" aria-label="개요 상세 정보">
        <OverviewSectionCard
          title="핵심 분석 요약"
          iconSrc={overviewAssets.searchIcon}
          iconAlt="핵심 분석 요약 아이콘"
          className="summaryPanel"
        >
          <div className="insightList">
            {insightItems.map((item) => (
              <InsightItem item={item} key={item.title} />
            ))}
          </div>
        </OverviewSectionCard>

        <OverviewSectionCard
          title="하동·구례 자원 연계 개요"
          iconSrc={overviewAssets.mapIcon}
          iconAlt="자원 연계 지도 아이콘"
          className="mapPanel"
        >
          <div className="resourceMapFrame">
            <div className="resourceMapFallback" role="img" aria-label="하동과 구례 자원 연계 지도">
              <ResourceMapFallback />
            </div>
          </div>
        </OverviewSectionCard>

        <OverviewSectionCard
          title="추천 체류형 코스"
          iconSrc={overviewAssets.suitcaseIcon}
          iconAlt="추천 체류형 코스 아이콘"
          className="coursePanel"
        >
          <div className="courseList">
            {courseItems.map((item) => (
              <CourseCard item={item} key={item.title} />
            ))}
          </div>
        </OverviewSectionCard>
      </section>
    </main>
  )
}

function ResourceMapFallback() {
  return (
    <div className="fallbackMap">
      <div className="fallbackRegion fallbackHadong">
        <strong>하동</strong>
        <span className="fallbackNode nodeA">
          <span className="fallbackNodeIcon">🏯</span>
          화개장터
        </span>
        <span className="fallbackNode nodeB">
          <span className="fallbackNodeIcon">🌳</span>
          평사리
        </span>
        <span className="fallbackNode nodeC">
          <span className="fallbackNodeIcon">🍃</span>
          야생차 체험
        </span>
      </div>
      <div className="fallbackRiver" />
      <div className="fallbackRegion fallbackGurye">
        <strong>구례</strong>
        <span className="fallbackNode nodeD">
          산수유마을
          <span className="fallbackNodeIcon">🌼</span>
        </span>
        <span className="fallbackNode nodeE">
          화엄사
          <span className="fallbackNodeIcon">🏛️</span>
        </span>
        <span className="fallbackNode nodeF">
          한옥 숙박
          <span className="fallbackNodeIcon">🏡</span>
        </span>
      </div>
      <span className="mapDot dotA" />
      <span className="mapDot dotB" />
      <span className="mapDot dotC" />
      <span className="mapDot dotD" />
      <span className="mapDot dotE" />
      <span className="mapDot dotF" />
      <span className="mapLine lineA" />
      <span className="mapLine lineB" />
      <span className="mapLine lineC" />
    </div>
  )
}
