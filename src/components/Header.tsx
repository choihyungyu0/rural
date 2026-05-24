import { navItems } from '../data/overviewData'

export function Header() {
  return (
    <header className="appHeader">
      <div className="brand">
        <div className="logoMark" aria-hidden="true">
          <span />
          <span />
        </div>
        <strong>하동·구례 농촌관광</strong>
      </div>

      <nav className="mainNav" aria-label="주요 메뉴">
        {navItems.map((item) => (
          <button
            key={item}
            type="button"
            className={item === '개요' ? 'active' : ''}
            aria-current={item === '개요' ? 'page' : undefined}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="dateInfo" aria-label="분석 기준 정보">
        <span className="dateItem dateCalendar">기준월: 2026년 4월</span>
        <i aria-hidden="true" />
        <span className="dateItem dateClock">분석 기간: 2025년 11월 ~ 2026년 4월</span>
      </div>
    </header>
  )
}
