import { useState } from 'react'
import { Header } from './components/Header'
import { navItems } from './data/analysisData'
import { AnalysisPage } from './pages/AnalysisPage'
import { ImprovementPage } from './pages/ImprovementPage'
import { OverviewPage } from './pages/OverviewPage'

type NavItem = (typeof navItems)[number]

const initialPage: NavItem = '체류·소비 분석'

function App() {
  const [activePage, setActivePage] = useState<NavItem>(initialPage)

  return (
    <div className="appShell">
      <Header activeItem={activePage} onNavigate={setActivePage} />
      <ActivePage page={activePage} />
    </div>
  )
}

function ActivePage({ page }: { page: NavItem }) {
  if (page === '개요') {
    return <OverviewPage />
  }

  if (page === '개선 제안') {
    return <ImprovementPage />
  }

  if (page === '체류·소비 분석') {
    return <AnalysisPage />
  }

  return <PlaceholderPage title={page} />
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="analysisPage">
      <section className="analysisIntro" aria-labelledby="placeholder-title">
        <p className="pageEyebrow">{title}</p>
        <h1 id="placeholder-title">{title}</h1>
        <p>현재 요청 범위에서는 별도 화면을 구현하지 않았습니다.</p>
      </section>
    </main>
  )
}

export default App
