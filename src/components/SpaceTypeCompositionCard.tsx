import type { WorkationSpaceType } from '../types/workation'

type SpaceTypeCompositionItem = {
  name: WorkationSpaceType
  value: number
}

type SpaceTypeCompositionCardProps = {
  items: SpaceTypeCompositionItem[]
}

const barColors: Record<WorkationSpaceType, string> = {
  빈집: '#2f9e44',
  폐교: '#2168cf',
  '유휴 공공시설': '#34a6b8',
  '미활용 상가': '#8bcf62',
}

export function SpaceTypeCompositionCard({ items }: SpaceTypeCompositionCardProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0)

  return (
    <article className="workationPanel workationTypeCard" aria-labelledby="space-type-title">
      <h2 id="space-type-title">공간 유형 구성</h2>

      <div className="workationTypeRows">
        {items.map((item) => {
          const percent = total > 0 ? Math.round((item.value / total) * 100) : 0

          return (
            <div className="workationTypeRow" key={item.name}>
              <span>{item.name}</span>
              <div className="workationTypeTrack" aria-hidden="true">
                <i style={{ width: `${percent}%`, backgroundColor: barColors[item.name] }} />
              </div>
              <strong>{percent}%</strong>
            </div>
          )
        })}
      </div>

      <p>자료 기준: 지자체 공개자료·공공데이터</p>
    </article>
  )
}
