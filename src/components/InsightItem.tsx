import type { InsightItemData } from '../data/overviewData'
import { LocalImage } from './LocalImage'

type InsightItemProps = {
  item: InsightItemData
}

export function InsightItem({ item }: InsightItemProps) {
  return (
    <article className="insightItem">
      <div className="insightIcon">
        <LocalImage
          src={item.iconSrc}
          alt={item.iconAlt}
          className="insightIconImage"
          fallbackLabel={item.title}
        />
      </div>

      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </article>
  )
}
