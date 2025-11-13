'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Question } from './Question'
import { Options } from './Options'
import { Feedback } from './Feedback'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Question as QuestionType } from '@/lib/types'
import { useGame } from '@/context/GameContext'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface QuizContainerProps {
  questions: QuestionType[]
  moduleId: number
  onComplete: (score: number) => void
}

export function QuizContainer({ questions, moduleId, onComplete }: QuizContainerProps) {
  const { answerQuestion } = useGame()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [score, setScore] = useState(0)

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleSelectOption = (index: number) => {
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption === null) return

    const isCorrect = selectedOption === question.correctAnswer
    setShowFeedback(true)

    // Update answers
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedOption
    setAnswers(newAnswers)

    // Update score
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Update game state
    answerQuestion(isCorrect)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = Math.round((score / questions.length) * 100)
      onComplete(finalScore)
    } else {
      setCurrentQuestion(prev => prev + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setSelectedOption(answers[currentQuestion - 1])
      setShowFeedback(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} showLabel color="blue" size="lg" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Question
            question={question}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
          />

          <Options
            options={question.options}
            selectedOption={selectedOption}
            correctAnswer={question.correctAnswer}
            showFeedback={showFeedback}
            onSelect={handleSelectOption}
          />

          {showFeedback && (
            <Feedback
              isCorrect={selectedOption === question.correctAnswer}
              explanation={question.explanation}
              source={question.source}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Anterior
            </Button>

            {!showFeedback ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="flex items-center gap-2"
              >
                Verificar Resposta
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                {isLastQuestion ? 'Concluir' : 'Próxima'}
                {!isLastQuestion && <ArrowRight size={20} />}
              </Button>
            )}
          </div>

          {/* Score Display */}
          <div className="mt-6 text-center text-gray-600">
            <p className="text-sm">
              Acertos: {score} de {currentQuestion + 1} ({Math.round((score / (currentQuestion + 1)) * 100)}%)
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
