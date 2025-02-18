import { useEffect, useCallback } from 'react'
import { useQuiz } from '../context/QuizContext'
import { useNavigate } from 'react-router-dom'
import Timer from '../components/Timer'
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion'
import IntegerQuestion from '../components/IntegerQuestion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Quiz = () => {
  const navigate = useNavigate()
  const { 
    currentQuestion, 
    setCurrentQuestion, 
    allQuestions,
    answers,
    finishQuiz,
    setTimeLeft,
    runningScore,
    resetQuiz
  } = useQuiz()

  // Reset quiz 
  useEffect(() => {
    resetQuiz()
  }, [])

  //keyboard navigation
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'ArrowRight' && answers[allQuestions[currentQuestion].id]) {
      handleNext()
    } else if (e.key === 'ArrowLeft' && currentQuestion > 0) {
      handlePrevious()
    }
  }, [currentQuestion, answers, allQuestions])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  useEffect(() => {
    setTimeLeft(30)
  }, [currentQuestion, setTimeLeft])

  const currentQuestionData = allQuestions[currentQuestion]
  const isMultipleChoice = currentQuestion < 5

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      finishQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="backdrop-blur-lg bg-white/10 p-4 sm:p-8 rounded-2xl shadow-2xl border border-white/20">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <Timer />
              <div className="text-lg font-semibold text-white">
                Score: {runningScore}/{allQuestions.length}
              </div>
            </div>
            <div className="h-2 bg-white/20 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / allQuestions.length) * 100}%` }}
                role="progressbar"
                aria-valuenow={currentQuestion + 1}
                aria-valuemin={1}
                aria-valuemax={allQuestions.length}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-white/70">
              <span>Question {currentQuestion + 1}</span>
              <span>Total: {allQuestions.length}</span>
            </div>
          </div>

          <div className="transition-opacity duration-300">
            {isMultipleChoice ? (
              <MultipleChoiceQuestion question={currentQuestionData} />
            ) : (
              <IntegerQuestion question={currentQuestionData} />
            )}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                currentQuestion === 0
                  ? 'bg-white/5 text-white/40 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              aria-label="Previous question"
            >
              <FaArrowLeft /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestionData.id]}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                !answers[currentQuestionData.id]
                  ? 'bg-white/5 text-white/40 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              aria-label={currentQuestion === allQuestions.length - 1 ? 'Finish quiz' : 'Next question'}
            >
              {currentQuestion === allQuestions.length - 1 ? 'Finish' : 'Next'} <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz 