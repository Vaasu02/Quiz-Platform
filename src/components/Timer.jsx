import { useEffect } from 'react'
import { useQuiz } from '../context/QuizContext'
import { FaClock } from 'react-icons/fa'

const Timer = () => {
  const { timeLeft, setTimeLeft, finishQuiz } = useQuiz()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          finishQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [setTimeLeft, finishQuiz])

  return (
    <div className="flex items-center gap-2 text-lg font-semibold text-white">
      <FaClock className="text-blue-400" />
      <span>{timeLeft}s</span>
    </div>
  )
}

export default Timer 