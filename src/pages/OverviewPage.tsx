import { useEffect, useState } from 'react'
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
  type KpiItem,
  overviewAssets,
} from '../data/overviewData'
import {
  loadTourismStatistics,
  type StatisticsLoadResult,
} from '../services/statisticsLoader'

type OverviewStatisticsState = StatisticsLoadResult | null

function getStatisticKpi(statistics: StatisticsLoadResult, title: string) {
  return statistics.kpiItems.find((item) => item.title === title)
}

function buildRealOverviewKpiItems(statistics: StatisticsLoadResult): KpiItem[] {
  const visitors = getStatisticKpi(statistics, '총 방문자 수')
  const stayTime = getStatisticKpi(statistics, '평균 체류시간')
  const spending = getStatisticKpi(statistics, '관광소비액')
  const lodging = getStatisticKpi(statistics, '숙박방문자 비율')

  return [
    {
      title: '방문자 수',
      value: visitors?.value ?? kpiItems[0].value,
      change: visitors?.change ?? kpiItems[0].change,
      changeTone: visitors?.changeTone ?? 'green',
      iconSrc: '/images/overview/icon-visitor.png',
      iconAlt: '방문자 수 아이콘',
    },
    {
      title: '평균 체류시간',
      value: stayTime?.value ?? kpiItems[1].value,
      change: '이동통신 기반 평균',
      changeTone: 'green',
      iconSrc: '/images/overview/icon-clock.png',
      iconAlt: '평균 체류시간 아이콘',
    },
    {
      title: '관광소비액',
      value: spending?.value ?? kpiItems[2].value,
      change: spending?.change ?? '외지인 관광소비 기준',
      changeTone: 'green',
      iconSrc: '/images/overview/icon-card.png',
      iconAlt: '관광소비액 아이콘',
    },
    {
      title: '숙박 방문 비율',
      value: lodging?.value ?? kpiItems[3].value,
      change: '방문자 수 가중평균',
      changeTone: 'red',
      iconSrc: '/images/overview/icon-bed.png',
      iconAlt: '숙박 방문 비율 아이콘',
    },
  ]
}

export function OverviewPage() {
  const [statistics, setStatistics] = useState<OverviewStatisticsState>(null)

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

  const isRealStatistics = statistics?.sourceType === 'real-json'
  const overviewKpiItems = isRealStatistics ? buildRealOverviewKpiItems(statistics) : kpiItems
  const heroNotice = isRealStatistics
    ? '※ 통계 지표: 한국관광 데이터랩 기반'
    : '※ 수치는 제안서 이해를 위한 예시입니다.'

  return (
    <main className="overviewPage">
      <HeroSection notice={heroNotice} />

      <section className="kpiGrid" aria-label="핵심 성과 지표">
        {overviewKpiItems.map((item) => (
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
