import { inflowRegions } from '../../data/analysisData'

const maxVisitors = Math.max(...inflowRegions.map((item) => item.visitors))

export function InflowRegionBarChart() {
  return (
    <div className="inflowBars" role="img" aria-label="유입 지역 상위 5개 지역 가로 막대 차트">
      {inflowRegions.map((item) => (
        <div className="inflowRow" key={item.region}>
          <span className="rankBadge">{item.rank}</span>
          <span className="regionName">{item.region}</span>
          <div className="barTrack" aria-hidden="true">
            <span
              className="barFill"
              style={{ width: `${(item.visitors / maxVisitors) * 100}%` }}
            />
          </div>
          <strong>{item.visitors.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  )
}
