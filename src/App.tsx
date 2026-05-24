import { Header } from './components/Header'
import { AnalysisPage } from './pages/AnalysisPage'

function App() {
  return (
    <div className="appShell">
      <Header activeItem="체류·소비 분석" />
      <AnalysisPage />
    </div>
  )
}

export default App
