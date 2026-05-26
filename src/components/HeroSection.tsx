import { overviewAssets } from '../data/overviewData'
import { LocalImage } from './LocalImage'

type HeroSectionProps = {
  notice?: string
}

export function HeroSection({ notice }: HeroSectionProps = {}) {
  return (
    <section className="heroSection">
      <LocalImage
        src={overviewAssets.heroBg}
        alt="하동과 구례 농촌관광 배경"
        className="heroImage"
        fallbackClassName="heroImageFallback"
        fallbackLabel="하동·구례 농촌관광 배경"
      />
      <div className="heroOverlay" />

      <div className="heroContent">
        <h1>
          <span className="desktopTitle">하동·구례 농촌관광 운영 개선 개요</span>
          <span className="mobileTitle">
            하동·구례 농촌관광
            <br />
            운영 개선 개요
          </span>
        </h1>
        <p>
          데이터 기반으로 하동·구례 농촌관광의 현황을 진단하고,
          <br />
          체류·소비 증대를 위한 운영 개선 방향을 제안합니다.
        </p>
      </div>

      {notice ? <p className="heroNotice">{notice}</p> : null}
    </section>
  )
}
