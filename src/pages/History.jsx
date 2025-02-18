import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAttempts } from '../services/dbService'
import { FaHome, FaPlay, FaClock } from 'react-icons/fa'

const History = () => {
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const data = await getAttempts()
        setAttempts(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
      } catch (error) {
        console.error('Error fetching attempts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAttempts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-xl text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="backdrop-blur-lg bg-white/10 p-4 sm:p-8 rounded-2xl shadow-2xl border border-white/20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">Attempt History</h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 w-full sm:w-auto">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 group whitespace-nowrap w-full sm:w-auto"
            >
              <FaHome className="group-hover:scale-110 transition-transform" /> Home
            </Link>
            <Link
              to="/quiz"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-white rounded-xl hover:bg-blue-500/30 transition-all duration-300 group whitespace-nowrap w-full sm:w-auto"
            >
              <FaPlay className="group-hover:translate-x-1 transition-transform" /> New Quiz
            </Link>
          </div>
        </div>

        {attempts.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/70">No attempts yet. Start a quiz to see your history!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {attempts.map((attempt, index) => (
              <div
                key={attempt.id || index}
                className="bg-white/5 p-4 sm:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="text-xl font-semibold text-white">
                      Score: {attempt.score}/{attempt.totalQuestions}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60 mt-1">
                      <FaClock />
                      {new Date(attempt.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-3xl font-bold self-end sm:self-auto">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                      {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default History 