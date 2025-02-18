import { Link } from 'react-router-dom'
import { FaPlay, FaHistory } from 'react-icons/fa'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-white text-center bg-clip-text">
          Interactive Quiz Platform
        </h1>
        <div className="space-y-4">
          <Link 
            to="/quiz" 
            className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm group"
          >
            <FaPlay className="group-hover:scale-110 transition-transform" />
            Start Quiz
          </Link>
          <Link 
            to="/history" 
            className="flex items-center justify-center gap-2 text-white/80 hover:text-white px-6 py-4 rounded-xl transition-all duration-300 group"
          >
            <FaHistory className="group-hover:rotate-12 transition-transform" />
            View History
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 