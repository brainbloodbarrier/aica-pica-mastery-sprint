'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useGame } from '@/context/GameContext'
import { QuizContainer } from '@/components/quiz/QuizContainer'
import { ModuleComplete } from '@/components/celebration/ModuleComplete'
import { Confetti } from '@/components/celebration/Confetti'
import { LevelUpAnimation } from '@/components/celebration/LevelUpAnimation'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { SAMPLE_QUESTIONS } from '@/data/questions'
import { calculateLevel } from '@/lib/utils'

export default function ModulePage() {
  const router = useRouter()
  const params = useParams()
  const moduleId = parseInt(params.id as string)

  const { gameState, modules, completeModule } = useGame()
  const [showComplete, setShowComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [previousLevel, setPreviousLevel] = useState(gameState.level)

  const module = modules.find(m => m.id === moduleId)

  useEffect(() => {
    setPreviousLevel(gameState.level)
  }, [gameState.level])

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Módulo não encontrado</h1>
          <Button onClick={() => router.push('/dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    )
  }

  if (module.locked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Módulo Bloqueado</h1>
          <p className="text-gray-600 mb-6">
            Complete o Módulo {module.prerequisite} primeiro para desbloquear este módulo.
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    )
  }

  // For demo purposes, using sample questions for Module 1
  // In production, you would load specific questions for each module
  const questions = moduleId === 1 ? SAMPLE_QUESTIONS : []

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Em Desenvolvimento</h1>
          <p className="text-gray-600 mb-6">
            Este módulo está em desenvolvimento. Por enquanto, apenas o Módulo 1 está disponível para demonstração.
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const handleQuizComplete = (score: number) => {
    setFinalScore(score)

    // Complete module
    completeModule(moduleId, score)

    // Show celebrations
    if (score >= module.passPercentage) {
      setShowConfetti(true)

      // Check for level up
      const newLevel = calculateLevel(gameState.xp + module.xpReward)
      if (newLevel.level > previousLevel) {
        setTimeout(() => {
          setShowLevelUp(true)
        }, 1500)
      }
    }

    // Show completion modal
    setTimeout(() => {
      setShowComplete(true)
    }, 1000)
  }

  const handleContinue = () => {
    const nextModule = modules.find(m => m.id === moduleId + 1)
    if (nextModule && !nextModule.locked) {
      router.push(`/module/${nextModule.id}`)
    } else {
      router.push('/dashboard')
    }
  }

  const handleRetry = () => {
    router.refresh()
  }

  return (
    <div className="min-h-screen">
      {/* Confetti */}
      <Confetti active={showConfetti} duration={5000} />

      {/* Level Up Animation */}
      {showLevelUp && (
        <LevelUpAnimation
          show={showLevelUp}
          level={calculateLevel(gameState.xp).level}
          levelName={calculateLevel(gameState.xp).name}
          onClose={() => setShowLevelUp(false)}
        />
      )}

      {/* Module Complete Modal */}
      <ModuleComplete
        show={showComplete}
        moduleTitle={module.title}
        score={finalScore}
        passPercentage={module.passPercentage}
        earnedXP={module.xpReward}
        badge={module.badge}
        onContinue={handleContinue}
        onRetry={finalScore < module.passPercentage ? handleRetry : undefined}
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Dashboard
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold text-gray-800">
              {module.title}
            </h1>
            <p className="text-sm text-gray-600">Módulo {module.id}</p>
          </div>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Quiz Container */}
      <QuizContainer
        questions={questions}
        moduleId={moduleId}
        onComplete={handleQuizComplete}
      />
    </div>
  )
}
