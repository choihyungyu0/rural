import { CourseCard } from '../components/CourseCard'
import { HeroSection } from '../components/HeroSection'
import { InsightItem } from '../components/InsightItem'
import { KpiCard } from '../components/KpiCard'
import { OverviewSectionCard } from '../components/OverviewSectionCard'
import OverviewResourceMap from '../components/OverviewResourceMap'
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
            <OverviewResourceMap />
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
