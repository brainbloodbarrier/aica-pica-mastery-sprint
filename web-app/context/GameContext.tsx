'use client'

import React, { createContext, useContext, useCallback, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  GameState,
  Achievement,
  Module,
} from '@/lib/types'
import {
  calculateLevel,
  isStreakActive,
} from '@/lib/utils'
import {
  XP_PER_CORRECT_ANSWER,
  XP_PER_MODULE_COMPLETION,
  XP_PER_STREAK_DAY,
} from '@/lib/constants'
import { ACHIEVEMENTS } from '@/data/achievements'
import { MODULES } from '@/data/modules'

interface GameContextType {
  gameState: GameState
  modules: Module[]
  addXP: (amount: number) => void
  updateStreak: () => void
  completeModule: (moduleId: number, score: number) => void
  answerQuestion: (correct: boolean) => void
  unlockAchievement: (achievementId: string) => void
  resetProgress: () => void
}

const initialGameState: GameState = {
  xp: 0,
  level: 1,
  streak: 0,
  lastStreakDate: '',
  badges: [],
  achievements: ACHIEVEMENTS.map(a => ({ ...a, unlocked: false })),
  progress: {
    currentModule: 1,
    completedModules: [],
    moduleScores: {},
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    lastActive: new Date().toISOString(),
  },
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useLocalStorage<GameState>(
    'aica-pica-game-state',
    initialGameState
  )

  // Update modules based on completed modules
  const modules = MODULES.map(module => ({
    ...module,
    locked: module.id === 1 ? false : !gameState.progress.completedModules.includes(module.prerequisite || 0),
  }))

  // Add XP and check for level up
  const addXP = useCallback((amount: number) => {
    setGameState(prev => {
      const newXP = prev.xp + amount
      const newLevel = calculateLevel(newXP)

      return {
        ...prev,
        xp: newXP,
        level: newLevel.level,
      }
    })
  }, [setGameState])

  // Update daily streak
  const updateStreak = useCallback(() => {
    setGameState(prev => {
      const today = new Date().toDateString()
      const lastDate = prev.lastStreakDate ? new Date(prev.lastStreakDate).toDateString() : ''

      // Already updated today
      if (lastDate === today) {
        return prev
      }

      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const isConsecutive = lastDate === yesterday

      const newStreak = isConsecutive ? prev.streak + 1 : 1
      const streakXP = isConsecutive ? XP_PER_STREAK_DAY * newStreak : 0

      return {
        ...prev,
        streak: newStreak,
        lastStreakDate: new Date().toISOString(),
        xp: prev.xp + streakXP,
      }
    })
  }, [setGameState])

  // Complete a module
  const completeModule = useCallback((moduleId: number, score: number) => {
    setGameState(prev => {
      const alreadyCompleted = prev.progress.completedModules.includes(moduleId)
      const module = MODULES.find(m => m.id === moduleId)

      if (!module) return prev

      const passed = score >= module.passPercentage

      if (!passed) return prev

      const newCompletedModules = alreadyCompleted
        ? prev.progress.completedModules
        : [...prev.progress.completedModules, moduleId]

      const moduleXP = alreadyCompleted ? 0 : module.xpReward

      // Check for badge
      const newBadges = module.badge && !prev.badges.includes(module.badge)
        ? [...prev.badges, module.badge]
        : prev.badges

      return {
        ...prev,
        xp: prev.xp + moduleXP,
        badges: newBadges,
        progress: {
          ...prev.progress,
          completedModules: newCompletedModules,
          moduleScores: {
            ...prev.progress.moduleScores,
            [moduleId]: score,
          },
          currentModule: Math.max(prev.progress.currentModule, moduleId + 1),
          lastActive: new Date().toISOString(),
        },
      }
    })
  }, [setGameState])

  // Answer a question
  const answerQuestion = useCallback((correct: boolean) => {
    setGameState(prev => ({
      ...prev,
      xp: correct ? prev.xp + XP_PER_CORRECT_ANSWER : prev.xp,
      progress: {
        ...prev.progress,
        totalQuestionsAnswered: prev.progress.totalQuestionsAnswered + 1,
        correctAnswers: correct ? prev.progress.correctAnswers + 1 : prev.progress.correctAnswers,
        lastActive: new Date().toISOString(),
      },
    }))
  }, [setGameState])

  // Unlock achievement
  const unlockAchievement = useCallback((achievementId: string) => {
    setGameState(prev => {
      const achievement = prev.achievements.find(a => a.id === achievementId)

      if (!achievement || achievement.unlocked) {
        return prev
      }

      const updatedAchievements = prev.achievements.map(a =>
        a.id === achievementId
          ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() }
          : a
      )

      return {
        ...prev,
        xp: prev.xp + achievement.xpReward,
        achievements: updatedAchievements,
      }
    })
  }, [setGameState])

  // Reset progress
  const resetProgress = useCallback(() => {
    setGameState(initialGameState)
  }, [setGameState])

  // Check for achievements on state change
  useEffect(() => {
    // First module completion
    if (
      gameState.progress.completedModules.length === 1 &&
      !gameState.achievements.find(a => a.id === 'first_steps')?.unlocked
    ) {
      unlockAchievement('first_steps')
    }

    // Halfway hero (5 modules)
    if (
      gameState.progress.completedModules.length >= 5 &&
      !gameState.achievements.find(a => a.id === 'halfway_hero')?.unlocked
    ) {
      unlockAchievement('halfway_hero')
    }

    // Streak warrior (7 days)
    if (
      gameState.streak >= 7 &&
      !gameState.achievements.find(a => a.id === 'streak_warrior')?.unlocked
    ) {
      unlockAchievement('streak_warrior')
    }

    // Legend 30 days
    if (
      gameState.streak >= 30 &&
      !gameState.achievements.find(a => a.id === 'legend_30')?.unlocked
    ) {
      unlockAchievement('legend_30')
    }
  }, [gameState, unlockAchievement])

  const value = {
    gameState,
    modules,
    addXP,
    updateStreak,
    completeModule,
    answerQuestion,
    unlockAchievement,
    resetProgress,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
