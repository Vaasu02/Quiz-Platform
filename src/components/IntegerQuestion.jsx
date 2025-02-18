import { useState, useEffect } from 'react'
import { useQuiz } from '../context/QuizContext'
import { FaCheck, FaTimes } from 'react-icons/fa'

const IntegerQuestion = ({ question }) => {
  const { submitAnswer, answers, showFeedback } = useQuiz()
  const [inputValue, setInputValue] = useState('')
  const currentAnswer = answers[question.id]
  const isCorrect = currentAnswer === question.correctAnswer

  // Reset input value when question changes
  useEffect(() => {
    setInputValue('')
  }, [question.id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue) {
      submitAnswer(question.id, parseInt(inputValue))
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">{question.question}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`w-full p-2 rounded-xl bg-white/10 border text-white placeholder-white/50 ${
              showFeedback && currentAnswer
                ? isCorrect
                  ? 'border-green-500/50 bg-green-500/20'
                  : 'border-red-500/50 bg-red-500/20'
                : 'border-white/10 focus:border-white/30'
            }`}
            placeholder="Enter your answer"
          />
          {showFeedback && currentAnswer && (
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {isCorrect ? (
                <FaCheck className="text-green-400" />
              ) : (
                <FaTimes className="text-red-400" />
              )}
            </span>
          )}
        </div>
        <button
          type="submit"
          className={`w-full p-2 rounded-xl transition ${
            currentAnswer
              ? isCorrect
                ? 'bg-green-500/20 text-white border border-green-500/50'
                : 'bg-red-500/20 text-white border border-red-500/50'
              : 'bg-white/20 text-white hover:bg-white/30 border border-white/10'
          }`}
          disabled={!inputValue}
        >
          Submit Answer
        </button>
      </form>
      {showFeedback && currentAnswer && !isCorrect && (
        <p className="text-red-400 mt-2">
          Correct answer was: {question.correctAnswer}
        </p>
      )}
    </div>
  )
}

export default IntegerQuestion 