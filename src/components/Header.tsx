import { navigationItems, type NavigationHash } from '../data/navigation'

type HeaderProps = {
  activeHash: NavigationHash
}

export function Header({ activeHash }: HeaderProps) {
  return (
    <header className="appHeader">
      <div className="brand">
        <img className="logoMark" src="/images/logo.png" alt="하동·구례 농촌관광 로고" />
        <strong>하동·구례 농촌관광</strong>
      </div>

      <nav className="mainNav" aria-label="주요 메뉴">
        {navigationItems.map((item) => (
          <a
            key={item.hash}
            href={item.hash}
            className={item.hash === activeHash ? 'active' : ''}
            aria-current={item.hash === activeHash ? 'page' : undefined}
          >
            {item.label}
          </a>
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
