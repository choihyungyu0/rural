import { CalendarDays, Filter, Leaf, MapPin } from 'lucide-react'
import { filterPills, menuItems, type PageKey } from '../data/dashboardData'

type HeaderProps = {
  activePage: PageKey
  onNavigate: (page: PageKey) => void
}

export function Header({ activePage, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] min-w-[1180px] max-w-[1440px] items-center gap-7 px-8">
        <button
          type="button"
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-3 text-left"
          aria-label="개요로 이동"
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-sm">
            <Leaf size={21} strokeWidth={2.4} />
          </span>
          <span>
            <span className="block text-[17px] font-bold text-slate-950">하동·구례 농촌관광</span>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
              <MapPin size={13} />
              체류형 운영 대시보드
            </span>
          </span>
        </button>

        <nav className="flex h-full items-center gap-1" aria-label="주요 메뉴">
          {menuItems.map((item) => {
            const isActive = item.key === activePage
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key)}
                className={`relative flex h-full items-center px-3 text-sm font-semibold transition ${
                  isActive ? 'text-emerald-700' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-emerald-600" />
                )}
              </button>
            )
          })}
        </nav>

        <div className="ml-auto flex max-w-[520px] flex-wrap justify-end gap-2">
          {filterPills.map((pill, index) => (
            <span
              key={pill}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
            >
              {index === 0 ? <Filter size={13} /> : <CalendarDays size={13} />}
              {pill}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
