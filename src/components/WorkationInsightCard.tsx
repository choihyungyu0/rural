import {
  BedDouble,
  Building2,
  CheckCircle2,
  Lightbulb,
  Target,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import type { ExpectedEffectIcon, WorkationExpectedEffect } from '../data/workationData'

type WorkationInsightCardProps =
  | {
      title: '핵심 인사이트'
      variant: 'insights'
      items: string[]
    }
  | {
      title: '활용 전략 및 기대효과'
      variant: 'effects'
      items: WorkationExpectedEffect[]
    }

const effectIcons: Record<ExpectedEffectIcon, LucideIcon> = {
  bed: BedDouble,
  building: Building2,
  users: UsersRound,
}

export function WorkationInsightCard(props: WorkationInsightCardProps) {
  const TitleIcon = props.variant === 'insights' ? Lightbulb : Target

  return (
    <article className={`workationPanel workationInsightCard ${props.variant}`}>
      <h2>
        <span className="workationTitleIcon" aria-hidden="true">
          <TitleIcon size={27} strokeWidth={2.2} />
        </span>
        {props.title}
      </h2>

      {props.variant === 'insights' ? (
        <ul className="workationInsightList">
          {props.items.map((item) => (
            <li key={item}>
              <CheckCircle2 size={21} strokeWidth={2.1} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="workationEffectList">
          {props.items.map((item) => {
            const Icon = effectIcons[item.icon]

            return (
              <div className="workationEffectItem" key={item.title}>
                <span className="workationEffectIcon" aria-hidden="true">
                  <Icon size={34} strokeWidth={2} />
                </span>
                <p>{item.title}</p>
              </div>
            )
          })}
        </div>
      )}
    </article>
  )
}
