import { overviewAssets } from '../data/overviewData'
import { LocalImage } from './LocalImage'

export default function OverviewResourceMap() {
  return (
    <LocalImage
      src={overviewAssets.resourceMap}
      alt="하동과 구례 자원 연계 지도"
      className="resourceMapImage"
      fallbackClassName="resourceMapFallback"
      fallbackLabel="하동과 구례 자원 연계 지도"
      fallback={<ResourceMapFallback />}
    />
  )
}

function ResourceMapFallback() {
  return (
    <div className="fallbackMap" aria-hidden="true">
      <div className="fallbackRegion fallbackHadong">
        <strong>하동</strong>
        <span className="fallbackNode nodeA">
          <i className="fallbackNodeIcon">차</i>
          야생차 체험
        </span>
        <span className="fallbackNode nodeB">
          <i className="fallbackNodeIcon">장</i>
          화개장터
        </span>
        <span className="fallbackNode nodeC">
          <i className="fallbackNodeIcon">강</i>
          평사리
        </span>
      </div>

      <div className="fallbackRiver" />

      <div className="fallbackRegion fallbackGurye">
        <strong>구례</strong>
        <span className="fallbackNode nodeD">
          <i className="fallbackNodeIcon">꽃</i>
          산수유마을
        </span>
        <span className="fallbackNode nodeE">
          <i className="fallbackNodeIcon">사</i>
          화엄사
        </span>
        <span className="fallbackNode nodeF">
          <i className="fallbackNodeIcon">숲</i>
          지리산권
        </span>
      </div>

      <i className="mapDot dotA" />
      <i className="mapDot dotB" />
      <i className="mapDot dotC" />
      <i className="mapDot dotD" />
      <i className="mapDot dotE" />
      <i className="mapDot dotF" />
      <i className="mapLine lineA" />
      <i className="mapLine lineB" />
      <i className="mapLine lineC" />
    </div>
  )
}
