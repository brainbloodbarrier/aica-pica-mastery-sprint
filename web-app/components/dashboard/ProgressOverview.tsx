'use client'

import React from 'react'
import { useGame } from '@/context/GameContext'
import { StatsCard } from './StatsCard'
import { ProgressCard } from '../gamification/ProgressCard'
import { XPBar } from '../gamification/XPBar'
import { LevelBadge } from '../gamification/LevelBadge'
import { StreakCounter } from '../gamification/StreakCounter'
import { Target, CheckCircle, Brain, Trophy } from 'lucide-react'
import { calculateAccuracy } from '@/lib/utils'

export function ProgressOverview() {
  const { gameState, modules } = useGame()

  const totalModules = modules.length
  const completedCount = gameState.progress.completedModules.length
  const accuracy = calculateAccuracy(
    gameState.progress.correctAnswers,
    gameState.progress.totalQuestionsAnswered
  )

  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={Target}
          label="Módulos Completos"
          value={`${completedCount}/${totalModules}`}
          color="blue"
        />
        <StatsCard
          icon={CheckCircle}
          label="Taxa de Acerto"
          value={`${accuracy}%`}
          color="green"
        />
        <StatsCard
          icon={Brain}
          label="Questões Respondidas"
          value={gameState.progress.totalQuestionsAnswered}
          color="purple"
        />
        <StatsCard
          icon={Trophy}
          label="Badges Conquistados"
          value={gameState.badges.length}
          color="yellow"
        />
      </div>

      {/* Middle Row - XP and Level */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <XPBar xp={gameState.xp} animated />
        </div>
        <div className="flex items-center justify-center">
          <LevelBadge xp={gameState.xp} size="lg" />
        </div>
      </div>

      {/* Bottom Row - Streak and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreakCounter
          streak={gameState.streak}
          lastStreakDate={gameState.lastStreakDate}
        />
        <ProgressCard
          completedModules={completedCount}
          totalModules={totalModules}
          accuracy={accuracy}
          badges={gameState.badges}
        />
      </div>
    </div>
  )
}
