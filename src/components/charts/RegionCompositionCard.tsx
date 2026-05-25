import { regionComposition } from '../../data/analysisData'
import AnalysisRegionMiniMap from '../AnalysisRegionMiniMap'

export function RegionCompositionCard() {
  return (
    <div className="regionComposition">
      <div className="regionMapColumn">
        <AnalysisRegionMiniMap />
        <p className="compositionMapNote">지도 데이터: 한국관광공사 TourAPI + OpenStreetMap</p>
      </div>

      <div className="compositionList" aria-label="지역별 방문자 구성비">
        {regionComposition.map((item) => (
          <div className="compositionItem" key={item.region}>
            <div className="compositionHeader">
              <span>{item.region}</span>
              <strong>{item.value}%</strong>
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
