import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import {
  defaultNavigationHash,
  getNavigationItemByHash,
  isNavigationHash,
  type NavigationHash,
} from './data/navigation'
import { OverviewPage } from './pages/OverviewPage'

function getActiveHash(): NavigationHash {
  const currentHash = window.location.hash
  return isNavigationHash(currentHash) ? currentHash : defaultNavigationHash
}

function App() {
  const [activeHash, setActiveHash] = useState<NavigationHash>(getActiveHash)

  useEffect(() => {
    const handleHashChange = () => setActiveHash(getActiveHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className="appShell">
      <Header activeHash={activeHash} />
      <ActivePage hash={activeHash} />
    </div>
  )
}

function ActivePage({ hash }: { hash: NavigationHash }) {
  if (hash === '#overview') {
    return <OverviewPage />
  }

  return <PlaceholderPage title={getNavigationItemByHash(hash).label} />
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
