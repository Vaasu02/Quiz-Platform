import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import History from './pages/History'

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="results" element={<Results />} />
              <Route path="history" element={<History />} />
            </Route>
          </Routes>
        </QuizProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
