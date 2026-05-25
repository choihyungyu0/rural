import type { RegionCompositionItem } from '../../data/analysisData'
import AnalysisRegionMiniMap from '../AnalysisRegionMiniMap'

type RegionCompositionCardProps = {
  data: RegionCompositionItem[]
}

export function RegionCompositionCard({ data }: RegionCompositionCardProps) {
  return (
    <div className="regionComposition">
      <div className="regionMapColumn">
        <AnalysisRegionMiniMap data={data} />
        <p className="compositionMapNote">지도 데이터: OpenStreetMap · 비중 데이터: 한국관광 데이터랩</p>
      </div>

      <div className="compositionList" aria-label="지역별 방문자 구성비">
        {data.map((item) => (
          <div className="compositionItem" key={item.region}>
            <div className="compositionHeader">
              <span>{item.region}</span>
              <strong>{item.value.toFixed(1)}%</strong>
            </div>
            <div className="compositionTrack">
              <span
                className="compositionFill"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
