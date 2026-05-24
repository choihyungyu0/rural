import type { KpiItem } from '../data/overviewData'
import { LocalImage } from './LocalImage'

type KpiCardProps = {
  item: KpiItem
}

export function KpiCard({ item }: KpiCardProps) {
  return (
    <article className="kpiCard">
      <div className={`kpiIcon ${item.changeTone}`}>
        <LocalImage
          src={item.iconSrc}
          alt={item.iconAlt}
          className="kpiIconImage"
          fallbackLabel={item.title}
        />
      </div>

      <div className="kpiInfo">
        <h2>{item.title}</h2>
        <strong>{item.value}</strong>
        <p className={item.changeTone}>{item.change}</p>
      </div>
    </article>
  )
}
