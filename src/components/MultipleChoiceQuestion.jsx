import { useQuiz } from '../context/QuizContext'
import { FaCheck, FaTimes } from 'react-icons/fa'

const MultipleChoiceQuestion = ({ question }) => {
  const { submitAnswer, answers, showFeedback } = useQuiz()
  const currentAnswer = answers[question.id]
  const isCorrect = currentAnswer === question.correctAnswer

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => submitAnswer(question.id, option)}
            className={`w-full p-3 text-left rounded-xl transition flex justify-between items-center ${
              currentAnswer === option
                ? isCorrect
                  ? 'bg-green-500/20 text-white border border-green-500/50'
                  : 'bg-red-500/20 text-white border border-red-500/50'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            }`}
          >
            <span>{option}</span>
            {showFeedback && currentAnswer === option && (
              <span>
                {isCorrect ? (
                  <FaCheck className="text-green-400" />
                ) : (
                  <FaTimes className="text-red-400" />
                )}
              </span>
            )}
          </button>
        ))}
      </div>
      {showFeedback && currentAnswer && !isCorrect && (
        <p className="text-red-400 mt-2">
          Correct answer was: {question.correctAnswer}
        </p>
      )}
    </div>
  )
}

export default MultipleChoiceQuestion 