import { useState } from 'react'
import { Header } from './components/Header'
import type { PageKey } from './data/dashboardData'
import { AnalysisPage } from './pages/AnalysisPage'
import { ImprovementPage } from './pages/ImprovementPage'
import { OverviewPage } from './pages/OverviewPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

function App() {
  const [activePage, setActivePage] = useState<PageKey>('overview')

  return (
    <div className="min-h-screen">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <main className="mx-auto max-w-[1440px] px-8 py-7">
        {activePage === 'overview' && <OverviewPage />}
        {activePage === 'analysis' && <AnalysisPage />}
        {activePage === 'improvement' && <ImprovementPage />}
        {activePage === 'visits' && <PlaceholderPage title="방문 현황" />}
        {activePage === 'insights' && <PlaceholderPage title="인사이트" />}
      </main>
    </div>
  )
}

export default App
