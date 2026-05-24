import { regionComposition } from '../../data/analysisData'

export function RegionCompositionCard() {
  return (
    <div className="regionComposition">
      <div className="regionIllustration" aria-hidden="true">
        <div className="regionBlob hadongBlob">
          <span>하동</span>
        </div>
        <div className="regionBlob guryeBlob">
          <span>구례</span>
        </div>
        <span className="regionConnection" />
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
