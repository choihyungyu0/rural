import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { navItems } from './data/analysisData'
import { AnalysisPage } from './pages/AnalysisPage'
import { ImprovementPage } from './pages/ImprovementPage'
import { OverviewPage } from './pages/OverviewPage'

type NavItem = (typeof navItems)[number]

const initialPage: NavItem = '체류·소비 분석'
const pageToHash: Record<NavItem, string> = {
  개요: '#overview',
  '방문 현황': '#visits',
  '체류·소비 분석': '#analysis',
  인사이트: '#insights',
  '개선 제안': '#improvement',
}

const hashToPage = Object.fromEntries(
  Object.entries(pageToHash).map(([page, hash]) => [hash, page]),
) as Record<string, NavItem>

function getInitialPage() {
  return hashToPage[window.location.hash] ?? initialPage
}

function App() {
  const [activePage, setActivePage] = useState<NavItem>(getInitialPage)

  useEffect(() => {
    const handleHashChange = () => setActivePage(getInitialPage())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleNavigate = (item: NavItem) => {
    setActivePage(item)
    window.history.replaceState(null, '', pageToHash[item])
  }

  return (
    <div className="appShell">
      <Header activeItem={activePage} onNavigate={handleNavigate} />
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
