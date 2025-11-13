'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface Goal {
  id: string
  type: 'questions' | 'modules' | 'reviews' | 'streak'
  target: number
  current: number
  completed: boolean
  reward: number // neurons
}

interface DailyGoalsState {
  date: string // YYYY-MM-DD
  goals: Goal[]
  selectedDifficulty: 'easy' | 'medium' | 'hard'
}

interface DailyGoalsContextType {
  goals: Goal[]
  selectedDifficulty: 'easy' | 'medium' | 'hard'
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void
  updateProgress: (type: string, increment?: number) => void
  resetDailyGoals: () => void
  totalProgress: number // percentage
  completedGoals: number
  totalReward: number
}

const DailyGoalsContext = createContext<DailyGoalsContextType | undefined>(undefined)

const STORAGE_KEY = 'aica_pica_daily_goals'

// Goal presets by difficulty
const GOAL_PRESETS = {
  easy: [
    { type: 'questions', target: 5, reward: 20 },
    { type: 'modules', target: 1, reward: 30 },
    { type: 'streak', target: 1, reward: 10 },
  ],
  medium: [
    { type: 'questions', target: 10, reward: 40 },
    { type: 'modules', target: 2, reward: 60 },
    { type: 'reviews', target: 5, reward: 30 },
    { type: 'streak', target: 1, reward: 10 },
  ],
  hard: [
    { type: 'questions', target: 20, reward: 80 },
    { type: 'modules', target: 3, reward: 100 },
    { type: 'reviews', target: 10, reward: 50 },
    { type: 'streak', target: 1, reward: 20 },
  ],
}

function getTodayDateString(): string {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

export function DailyGoalsProvider({ children }: { children: React.ReactNode }) {
  const [goalsState, setGoalsState] = useState<DailyGoalsState>({
    date: getTodayDateString(),
    goals: [],
    selectedDifficulty: 'medium',
  })

  // Load goals from localStorage on mount
  useEffect(() => {
    const loadGoalsState = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          const today = getTodayDateString()

          // Check if goals are from today
          if (parsed.date === today) {
            setGoalsState(parsed)
          } else {
            // Reset for new day
            const newGoals = createGoals(parsed.selectedDifficulty || 'medium')
            setGoalsState({
              date: today,
              goals: newGoals,
              selectedDifficulty: parsed.selectedDifficulty || 'medium',
            })
          }
        } else {
          // First time - create default goals
          const newGoals = createGoals('medium')
          setGoalsState({
            date: getTodayDateString(),
            goals: newGoals,
            selectedDifficulty: 'medium',
          })
        }
      } catch (error) {
        console.error('Failed to load daily goals:', error)
        // Create default goals on error
        const newGoals = createGoals('medium')
        setGoalsState({
          date: getTodayDateString(),
          goals: newGoals,
          selectedDifficulty: 'medium',
        })
      }
    }

    loadGoalsState()
  }, [])

  // Save goals to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goalsState))
    } catch (error) {
      console.error('Failed to save daily goals:', error)
    }
  }, [goalsState])

  // Check and reset goals at midnight
  useEffect(() => {
    const checkMidnight = () => {
      const today = getTodayDateString()
      if (goalsState.date !== today) {
        resetDailyGoals()
      }
    }

    // Check every minute
    const interval = setInterval(checkMidnight, 60 * 1000)

    return () => clearInterval(interval)
  }, [goalsState.date])

  const createGoals = (difficulty: 'easy' | 'medium' | 'hard'): Goal[] => {
    const presets = GOAL_PRESETS[difficulty]
    return presets.map((preset, index) => ({
      id: `${preset.type}_${index}`,
      type: preset.type as Goal['type'],
      target: preset.target,
      current: 0,
      completed: false,
      reward: preset.reward,
    }))
  }

  const setDifficulty = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    const newGoals = createGoals(difficulty)
    setGoalsState({
      date: getTodayDateString(),
      goals: newGoals,
      selectedDifficulty: difficulty,
    })
  }, [])

  const updateProgress = useCallback((type: string, increment: number = 1) => {
    setGoalsState(prev => {
      const updatedGoals = prev.goals.map(goal => {
        if (goal.type === type && !goal.completed) {
          const newCurrent = Math.min(goal.current + increment, goal.target)
          return {
            ...goal,
            current: newCurrent,
            completed: newCurrent >= goal.target,
          }
        }
        return goal
      })

      return {
        ...prev,
        goals: updatedGoals,
      }
    })
  }, [])

  const resetDailyGoals = useCallback(() => {
    const newGoals = createGoals(goalsState.selectedDifficulty)
    setGoalsState({
      date: getTodayDateString(),
      goals: newGoals,
      selectedDifficulty: goalsState.selectedDifficulty,
    })
  }, [goalsState.selectedDifficulty])

  // Calculate total progress percentage
  const totalProgress = goalsState.goals.reduce((acc, goal) => {
    return acc + (goal.current / goal.target) * 100
  }, 0) / Math.max(goalsState.goals.length, 1)

  // Count completed goals
  const completedGoals = goalsState.goals.filter(g => g.completed).length

  // Calculate total potential reward
  const totalReward = goalsState.goals
    .filter(g => g.completed)
    .reduce((acc, goal) => acc + goal.reward, 0)

  return (
    <DailyGoalsContext.Provider
      value={{
        goals: goalsState.goals,
        selectedDifficulty: goalsState.selectedDifficulty,
        setDifficulty,
        updateProgress,
        resetDailyGoals,
        totalProgress,
        completedGoals,
        totalReward,
      }}
    >
      {children}
    </DailyGoalsContext.Provider>
  )
}

export function useDailyGoals() {
  const context = useContext(DailyGoalsContext)
  if (context === undefined) {
    throw new Error('useDailyGoals must be used within a DailyGoalsProvider')
  }
  return context
}
