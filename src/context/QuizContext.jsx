import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { quizData } from '../data/quizData'
import { saveAttempt } from '../services/dbService'

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(30)
  const [showFeedback, setShowFeedback] = useState(false)
  const [runningScore, setRunningScore] = useState(0)

  const allQuestions = [...quizData.multipleChoice, ...quizData.integerType]

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setTimeLeft(30)
    setShowFeedback(false)
    setRunningScore(0)
  }

  const submitAnswer = (questionId, answer) => {
    const question = allQuestions.find(q => q.id === questionId)
    const isCorrect = question.correctAnswer === answer
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
    
    setShowFeedback(true)
    
    if (isCorrect) {
      setRunningScore(prev => prev + 1)
    }

    setTimeout(() => {
      setShowFeedback(false)
    }, 1500)
  }

  const calculateScore = () => {
    return runningScore
  }

  const finishQuiz = async () => {
    const score = calculateScore()
    const attempt = {
      answers,
      score,
      totalQuestions: allQuestions.length
    }
    await saveAttempt(attempt)
    navigate('/results', { state: { score, totalQuestions: allQuestions.length } })
  }

  const value = {
    currentQuestion,
    setCurrentQuestion,
    answers,
    submitAnswer,
    timeLeft,
    setTimeLeft,
    finishQuiz,
    allQuestions,
    showFeedback,
    runningScore,
    resetQuiz
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
} 