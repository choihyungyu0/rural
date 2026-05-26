import { useEffect, useState } from 'react'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { SpaceTypeCompositionCard } from '../components/SpaceTypeCompositionCard'
import { WorkationCandidateTable } from '../components/WorkationCandidateTable'
import { WorkationInsightCard } from '../components/WorkationInsightCard'
import { WorkationKpiCard } from '../components/WorkationKpiCard'
import WorkationSpaceMap from '../components/WorkationSpaceMap'
import {
  demoWorkationStats,
  workationAssets,
  workationExpectedEffects,
  workationInsights,
  type WorkationKpiCardItem,
} from '../data/workationData'
import {
  loadWorkationStats,
} from '../services/workationSpaceLoader'
import type { WorkationStats } from '../types/workation'

const mapFilterChips = ['빈집', '폐교', '공공시설', '숙박형', '업무형']

function formatNumber(value: number) {
  return value.toLocaleString('ko-KR')
}

function buildKpiCards(stats: WorkationStats): WorkationKpiCardItem[] {
  return [
    {
      label: '활용 가능 빈집',
      value: formatNumber(stats.kpis.availableEmptyHouses),
      unit: '개',
      subtext: stats.sourceType === 'real-json' ? stats.period : '전월 대비 +12개',
      iconSrc: workationAssets.house,
      iconAlt: '활용 가능 빈집 아이콘',
      tone: 'green',
    },
    {
      label: '미활용 공간',
      value: formatNumber(stats.kpis.unusedSpaces),
      unit: '개',
      subtext: '폐교·유휴시설 포함',
      iconSrc: workationAssets.unusedSpace,
      iconAlt: '미활용 공간 아이콘',
      tone: 'blue',
    },
    {
      label: '워케이션 후보지',
      value: formatNumber(stats.kpis.workationCandidates),
      unit: '개',
      subtext: '중간 이상 적합 등급',
      iconSrc: workationAssets.workationPin,
      iconAlt: '워케이션 후보지 아이콘',
      tone: 'green',
    },
    {
      label: '체험 연계 가능',
      value: formatNumber(stats.kpis.experienceLinkable),
      unit: '개',
      subtext: '농어촌 체험 연계 가능',
      iconSrc: workationAssets.target,
      iconAlt: '체험 연계 가능 아이콘',
      tone: 'green',
    },
  ]
}

export function WorkationPage() {
  const [stats, setStats] = useState<WorkationStats>(demoWorkationStats)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    async function loadData() {
      const nextStats = await loadWorkationStats()

      if (isActive) {
        setStats(nextStats)
        setIsLoading(false)
      }
    }

    void loadData()

    return () => {
      isActive = false
    }
  }, [])

  const kpiCards = buildKpiCards(stats)
  const sourceLabel = isLoading ? '공간 데이터 불러오는 중' : stats.sourceLabel
  const heroNotice = stats.sourceType === 'real-json'
    ? '※ 공공데이터 기반 분석 결과이며 상세주소는 읍면 단위 또는 보정 좌표로 표시됩니다.'
    : '※ 수치는 제안서 이해를 위한 예시입니다.'

  return (
    <main className="workationPage">
      <section className="workationHero" aria-labelledby="workation-title">
        <ImageWithFallback
          src={workationAssets.heroBg}
          alt="하동과 구례의 농촌 워케이션 풍경"
          className="workationHeroImage"
          fallbackClassName="workationHeroImageFallback"
          fallbackLabel="하동·구례 워케이션 풍경"
        />
        <div className="workationHeroOverlay" aria-hidden="true" />
        <div className="workationHeroContent">
          <h1 id="workation-title">빈집·미활용 공간 기반 워케이션 제안</h1>
          <p>
            하동·구례의 빈집, 폐교, 유휴공간 데이터를 기반으로
            <br />
            워케이션 후보지를 발굴하고 활용 가능성을 분석합니다.
          </p>
        </div>
        <p className="workationHeroNotice">{heroNotice}</p>
      </section>

      <section className="workationKpiGrid" aria-label="워케이션 핵심 지표">
        {kpiCards.map((item) => (
          <WorkationKpiCard item={item} key={item.label} />
        ))}
      </section>

      <section className="workationMainGrid" aria-label="워케이션 유휴공간 분석">
        <SpaceTypeCompositionCard items={stats.spaceTypeComposition} />

        <article className="workationPanel workationMapCard" aria-labelledby="workation-map-title">
          <div className="workationPanelTitleRow">
            <h2 id="workation-map-title">하동·구례 유휴공간 분포 지도</h2>
            <span className="workationSourceBadge">{sourceLabel}</span>
          </div>

          <div className="workationFilterChips" aria-label="유휴공간 지도 필터">
            {mapFilterChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <WorkationSpaceMap spaces={stats.spaces} />
        </article>

        <WorkationCandidateTable candidates={stats.topCandidates} />
      </section>

      <section className="workationBottomGrid" aria-label="워케이션 핵심 인사이트와 기대효과">
        <WorkationInsightCard title="핵심 인사이트" variant="insights" items={workationInsights} />
        <WorkationInsightCard
          title="활용 전략 및 기대효과"
          variant="effects"
          items={workationExpectedEffects}
        />
      </section>

      <p className="workationDataNote">
        ※ 빈집·유휴공간 수치는 공공데이터를 기반으로 하되, 상세주소는 개인정보 및 사유재산 보호를
        위해 읍면 단위 또는 보정 좌표로 표시합니다. 실제 운영 시 지자체 협의와 소유자 동의,
        안전점검이 필요합니다.
        {stats.sourceType === 'demo' ? (
          <>
            <br />
            현재 화면은 예시 데이터 기반입니다.
          </>
        ) : null}
      </p>
    </main>
  )
}
