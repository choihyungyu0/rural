import { Bus, CircleDot, Clock, Route } from 'lucide-react'
import { resourceMap } from '../data/dashboardData'

type ResourceMapProps = {
  notes?: string[]
}

export function ResourceMap({ notes }: ResourceMapProps) {
  return (
    <div className="space-y-4">
      <div className="relative h-[310px] overflow-hidden rounded-lg border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M49 0 C43 18 59 28 50 45 C41 62 58 73 50 100"
            fill="none"
            stroke="#78bfe8"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M19 31 C35 19 48 31 63 32"
            fill="none"
            stroke="#64748b"
            strokeDasharray="2 3"
            strokeWidth="0.9"
          />
          <path
            d="M29 58 C42 68 59 67 74 58"
            fill="none"
            stroke="#64748b"
            strokeDasharray="2 3"
            strokeWidth="0.9"
          />
          <path
            d="M39 40 C51 48 66 48 84 42"
            fill="none"
            stroke="#64748b"
            strokeDasharray="2 3"
            strokeWidth="0.9"
          />
          <path d="M0 82 C16 75 28 85 44 80 C62 75 80 79 100 72 L100 100 L0 100 Z" fill="#d6ecb7" opacity="0.7" />
          <path d="M0 22 L13 11 L26 22 L39 12 L52 23 L65 14 L82 25 L100 12 L100 0 L0 0 Z" fill="#c9e2ce" opacity="0.55" />
        </svg>

        <div className="absolute left-5 top-5 rounded-lg border border-emerald-100 bg-white/86 px-4 py-3">
          <p className="text-base font-extrabold text-emerald-800">{resourceMap.hadong.region}</p>
          <p className="text-xs font-semibold text-slate-500">{resourceMap.hadong.subtitle}</p>
        </div>
        <div className="absolute right-5 top-5 rounded-lg border border-sky-100 bg-white/86 px-4 py-3 text-right">
          <p className="text-base font-extrabold text-sky-800">{resourceMap.gurye.region}</p>
          <p className="text-xs font-semibold text-slate-500">{resourceMap.gurye.subtitle}</p>
        </div>

        {resourceMap.hadong.nodes.map((node) => (
          <MapNode key={node.label} label={node.label} x={node.x} y={node.y} tone="hadong" />
        ))}
        {resourceMap.gurye.nodes.map((node) => (
          <MapNode key={node.label} label={node.label} x={node.x} y={node.y} tone="gurye" />
        ))}

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-bold text-slate-600 shadow-sm">
          <Route size={14} />
          섬진강 생활권 연계 동선
        </div>
      </div>

      {notes && (
        <div className="grid grid-cols-3 gap-3">
          {notes.map((note, index) => {
            const icons = [Clock, Bus, Route]
            const Icon = icons[index] ?? CircleDot
            return (
              <div key={note} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700">
                <Icon size={16} className={index === 1 ? 'text-emerald-700' : 'text-sky-700'} />
                {note}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

type MapNodeProps = {
  label: string
  x: number
  y: number
  tone: 'hadong' | 'gurye'
}

function MapNode({ label, x, y, tone }: MapNodeProps) {
  const classes =
    tone === 'hadong'
      ? 'border-emerald-200 bg-white text-emerald-800 shadow-emerald-100'
      : 'border-sky-200 bg-white text-sky-800 shadow-sky-100'

  return (
    <div
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-xs font-extrabold shadow-md ${classes}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <CircleDot size={13} />
      {label}
    </div>
  )
}
