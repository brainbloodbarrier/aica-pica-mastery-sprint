'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { useGame } from '@/context/GameContext'

export function DailyGoal() {
  const { gameState } = useGame()

  const progress = Math.min(
    (gameState.todayProgress / gameState.dailyGoal) * 100,
    100
  )

  const isComplete = gameState.todayProgress >= gameState.dailyGoal

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card variant="gradient" className="relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-full ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}>
            <Target className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-800">Meta Diária</h3>
            <p className="text-xs text-gray-600">
              {gameState.todayProgress} / {gameState.dailyGoal} questões
            </p>
          </div>
          {isComplete && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-2xl"
            >
              ✅
            </motion.div>
          )}
        </div>

        <Progress
          value={progress}
          color={isComplete ? 'green' : 'blue'}
          size="md"
        />

        {isComplete && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-green-600 font-semibold mt-2 text-center"
          >
            🎉 Meta alcançada! Continue assim!
          </motion.p>
        )}

        {/* Decorative background */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-200 rounded-full opacity-20" />
      </Card>
    </motion.div>
  )
}
