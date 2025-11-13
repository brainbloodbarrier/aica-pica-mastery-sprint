'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Brain, BookOpen, RotateCcw, Flame, Trophy, ChevronRight, Settings } from 'lucide-react'
import { useDailyGoals } from '@/context/DailyGoalsContext'
import { useNeurons } from '@/context/NeuronsContext'
import { Progress } from '@/components/ui/Progress'
import { Button } from '@/components/ui/Button'

const goalIcons = {
  questions: BookOpen,
  modules: Target,
  reviews: RotateCcw,
  streak: Flame,
}

const goalLabels = {
  questions: 'Questões Respondidas',
  modules: 'Módulos Completados',
  reviews: 'Revisões Feitas',
  streak: 'Streak Mantido',
}

export function DailyGoals() {
  const {
    goals,
    selectedDifficulty,
    setDifficulty,
    totalProgress,
    completedGoals,
    totalReward,
  } = useDailyGoals()
  const { earnNeurons } = useNeurons()
  const [showSettings, setShowSettings] = useState(false)
  const [rewardsClaimed, setRewardsClaimed] = useState(false)

  const allGoalsCompleted = completedGoals === goals.length && goals.length > 0

  const handleClaimRewards = () => {
    if (totalReward > 0 && !rewardsClaimed) {
      earnNeurons(totalReward, 'Metas diárias completadas!')
      setRewardsClaimed(true)
    }
  }

  const difficultyOptions = [
    { value: 'easy', label: 'Fácil', color: 'text-green-600', bgColor: 'bg-green-100' },
    { value: 'medium', label: 'Médio', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { value: 'hard', label: 'Difícil', color: 'text-red-600', bgColor: 'bg-red-100' },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Metas Diárias</h2>
          <p className="text-sm text-gray-600 mt-1">
            Complete suas metas para ganhar neurônios extras!
          </p>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Difficulty Settings */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Dificuldade das Metas</h3>
            <div className="grid grid-cols-3 gap-3">
              {difficultyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setDifficulty(option.value as 'easy' | 'medium' | 'hard')
                    setShowSettings(false)
                    setRewardsClaimed(false)
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedDifficulty === option.value
                      ? `${option.bgColor} border-current ${option.color}`
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`font-semibold ${
                    selectedDifficulty === option.value ? option.color : 'text-gray-700'
                  }`}>
                    {option.label}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              ⚠️ Mudar a dificuldade reseta o progresso do dia
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overall Progress */}
      <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Progresso Total</h3>
            <p className="text-sm text-gray-600">
              {completedGoals} de {goals.length} metas completadas
            </p>
          </div>
          {allGoalsCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full"
            >
              <Trophy className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Completo!</span>
            </motion.div>
          )}
        </div>
        <Progress
          value={totalProgress}
          showLabel
          color={allGoalsCompleted ? 'green' : 'blue'}
          size="lg"
        />
        {totalReward > 0 && !rewardsClaimed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3"
          >
            <Button
              variant="success"
              onClick={handleClaimRewards}
              className="w-full flex items-center justify-center gap-2"
            >
              <Brain className="w-5 h-5" />
              Resgatar {totalReward} Neurônios
            </Button>
          </motion.div>
        )}
      </div>

      {/* Individual Goals */}
      <div className="space-y-3">
        {goals.map((goal) => {
          const Icon = goalIcons[goal.type]
          const label = goalLabels[goal.type]
          const progress = (goal.current / goal.target) * 100

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 bg-white rounded-lg border-2 transition-all ${
                goal.completed
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-lg ${
                  goal.completed ? 'bg-green-200' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    goal.completed ? 'text-green-700' : 'text-gray-600'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{label}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {goal.current}/{goal.target}
                      </span>
                      {goal.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full"
                        >
                          <Brain className="w-3 h-3 text-purple-600" />
                          <span className="text-xs font-semibold text-purple-700">
                            +{goal.reward}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <Progress
                    value={progress}
                    showLabel={false}
                    color={goal.completed ? 'green' : 'blue'}
                    size="sm"
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Motivation Message */}
      {!allGoalsCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg text-center"
        >
          <p className="text-sm font-medium text-gray-800">
            {totalProgress < 25 && '🚀 Vamos começar! Você consegue!'}
            {totalProgress >= 25 && totalProgress < 50 && '💪 Bom progresso! Continue assim!'}
            {totalProgress >= 50 && totalProgress < 75 && '🔥 Mais da metade! Não desista!'}
            {totalProgress >= 75 && totalProgress < 100 && '⭐ Quase lá! Só mais um pouco!'}
          </p>
        </motion.div>
      )}

      {/* Celebration for completion */}
      {allGoalsCompleted && rewardsClaimed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl text-center"
        >
          <Trophy className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-green-800 mb-1">Parabéns!</h3>
          <p className="text-sm text-green-700">
            Você completou todas as metas de hoje e ganhou {totalReward} neurônios!
          </p>
        </motion.div>
      )}
    </div>
  )
}
