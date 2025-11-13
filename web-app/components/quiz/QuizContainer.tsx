'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Question } from './Question'
import { Options } from './Options'
import { Feedback } from './Feedback'
import { ConfidenceRating } from './ConfidenceRating'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Question as QuestionType } from '@/lib/types'
import { useGame } from '@/context/GameContext'
import { useHearts } from '@/context/HeartsContext'
import { useNeurons, NEURON_REWARDS } from '@/context/NeuronsContext'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { HeartsDisplayCompact } from '@/components/gamification/HeartsDisplay'
import { NeuronsEarnedPopup } from '@/components/gamification/NeuronsDisplay'
import OutOfHeartsModal from '@/components/gamification/OutOfHeartsModal'

interface QuizContainerProps {
  questions: QuestionType[]
  moduleId: number
  onComplete: (score: number) => void
}

export function QuizContainer({ questions, moduleId, onComplete }: QuizContainerProps) {
  const { answerQuestion } = useGame()
  const { hearts, useHeart } = useHearts()
  const { earnNeurons, neurons } = useNeurons()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [score, setScore] = useState(0)
  const [showNeuronsPopup, setShowNeuronsPopup] = useState(false)
  const [neuronsEarned, setNeuronsEarned] = useState(0)
  const [showOutOfHeartsModal, setShowOutOfHeartsModal] = useState(false)
  const [showConfidenceRating, setShowConfidenceRating] = useState(false)
  const [confidenceRatings, setConfidenceRatings] = useState<number[]>([])

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleSelectOption = (index: number) => {
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption === null) return

    // Show confidence rating first
    setShowConfidenceRating(true)
  }

  const handleConfidenceRate = (confidence: number) => {
    const isCorrect = selectedOption === question.correctAnswer

    // Store confidence rating
    const newRatings = [...confidenceRatings]
    newRatings[currentQuestion] = confidence
    setConfidenceRatings(newRatings)

    // Hide confidence rating and show feedback
    setShowConfidenceRating(false)
    setShowFeedback(true)

    // Update answers
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedOption!
    setAnswers(newAnswers)

    if (isCorrect) {
      // Update score
      setScore(prev => prev + 1)

      // Earn neurons for correct answer
      earnNeurons(NEURON_REWARDS.CORRECT_ANSWER, 'Resposta correta!')
      setNeuronsEarned(NEURON_REWARDS.CORRECT_ANSWER)
      setShowNeuronsPopup(true)
    } else {
      // Use a heart for wrong answer
      const heartUsed = useHeart()
      if (!heartUsed) {
        // Show out of hearts modal
        setShowOutOfHeartsModal(true)
      }
    }

    // Update game state with confidence for spaced repetition
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
      {/* Hearts Display */}
      <div className="flex justify-between items-center mb-6">
        <HeartsDisplayCompact />
        <div className="text-sm text-gray-600">
          Módulo {moduleId}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} showLabel color="blue" size="lg" />
      </div>

      {/* Neurons Earned Popup */}
      <NeuronsEarnedPopup
        amount={neuronsEarned}
        reason="Resposta correta!"
        show={showNeuronsPopup}
        onComplete={() => setShowNeuronsPopup(false)}
      />

      {/* Out of Hearts Modal */}
      <OutOfHeartsModal
        isOpen={showOutOfHeartsModal}
        onClose={() => setShowOutOfHeartsModal(false)}
        neurons={neurons}
        onBuyHeart={() => {
          // Neurons will be deducted in the modal
          setShowOutOfHeartsModal(false)
        }}
      />

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

          {/* Confidence Rating */}
          <ConfidenceRating
            show={showConfidenceRating}
            onRate={handleConfidenceRate}
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
