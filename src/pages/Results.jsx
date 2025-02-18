import { useLocation, Link } from 'react-router-dom'
import { FaHome, FaHistory, FaRedo } from 'react-icons/fa'

const Results = () => {
  const location = useLocation()
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 10 }
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Quiz Results</h1>
        
        <div className="mb-8">
          <div className="text-7xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              {percentage}%
            </span>
          </div>
          <p className="text-xl text-white/80 text-center">
            You scored {score} out of {totalQuestions} questions correctly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 group whitespace-nowrap"
          >
            <FaHome className="group-hover:scale-110 transition-transform" />
            Home
          </Link>
          <Link
            to="/quiz"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 text-white rounded-xl hover:bg-blue-500/30 transition-all duration-300 group whitespace-nowrap"
          >
            <FaRedo className="group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Link>
          <Link
            to="/history"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 group whitespace-nowrap"
          >
            <FaHistory className="group-hover:rotate-12 transition-transform" />
            History
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Results 