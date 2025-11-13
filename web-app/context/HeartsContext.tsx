'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface HeartsState {
  currentHearts: number
  maxHearts: number
  lastRefillTime: Date
  refillIntervalHours: number
  freezesAvailable: number
}

interface HeartsContextType {
  hearts: number
  maxHearts: number
  useHeart: () => boolean
  refillHeart: () => void
  buyHeart: (cost: number) => boolean
  buyFreeze: (cost: number) => boolean
  timeUntilRefill: number
  freezesAvailable: number
  canUseHeart: boolean
}

const HeartsContext = createContext<HeartsContextType | undefined>(undefined)

const STORAGE_KEY = 'aica_pica_hearts'
const DEFAULT_MAX_HEARTS = 5
const REFILL_INTERVAL_HOURS = 4
const MILLISECONDS_PER_HOUR = 60 * 60 * 1000

export function HeartsProvider({ children }: { children: React.ReactNode }) {
  const [heartsState, setHeartsState] = useState<HeartsState>({
    currentHearts: DEFAULT_MAX_HEARTS,
    maxHearts: DEFAULT_MAX_HEARTS,
    lastRefillTime: new Date(),
    refillIntervalHours: REFILL_INTERVAL_HOURS,
    freezesAvailable: 0,
  })

  const [timeUntilRefill, setTimeUntilRefill] = useState<number>(0)

  // Load hearts state from localStorage on mount
  useEffect(() => {
    const loadHeartsState = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setHeartsState({
            ...parsed,
            lastRefillTime: new Date(parsed.lastRefillTime),
          })
        }
      } catch (error) {
        console.error('Failed to load hearts state:', error)
      }
    }

    loadHeartsState()
  }, [])

  // Save hearts state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(heartsState))
    } catch (error) {
      console.error('Failed to save hearts state:', error)
    }
  }, [heartsState])

  // Auto-refill hearts based on time elapsed
  useEffect(() => {
    const checkRefill = () => {
      const now = new Date()
      const timeSinceLastRefill = now.getTime() - heartsState.lastRefillTime.getTime()
      const hoursSinceRefill = timeSinceLastRefill / MILLISECONDS_PER_HOUR
      const heartsToRefill = Math.floor(hoursSinceRefill / heartsState.refillIntervalHours)

      if (heartsToRefill > 0 && heartsState.currentHearts < heartsState.maxHearts) {
        const newHearts = Math.min(
          heartsState.currentHearts + heartsToRefill,
          heartsState.maxHearts
        )
        const newLastRefillTime = new Date(
          heartsState.lastRefillTime.getTime() +
            heartsToRefill * heartsState.refillIntervalHours * MILLISECONDS_PER_HOUR
        )

        setHeartsState((prev) => ({
          ...prev,
          currentHearts: newHearts,
          lastRefillTime: newLastRefillTime,
        }))
      }

      // Calculate time until next refill
      if (heartsState.currentHearts < heartsState.maxHearts) {
        const nextRefillTime =
          heartsState.lastRefillTime.getTime() +
          heartsState.refillIntervalHours * MILLISECONDS_PER_HOUR
        const timeUntil = Math.max(0, nextRefillTime - now.getTime())
        setTimeUntilRefill(Math.ceil(timeUntil / 1000)) // Convert to seconds
      } else {
        setTimeUntilRefill(0)
      }
    }

    // Check immediately
    checkRefill()

    // Check every second for UI updates
    const interval = setInterval(checkRefill, 1000)

    return () => clearInterval(interval)
  }, [heartsState.currentHearts, heartsState.lastRefillTime, heartsState.refillIntervalHours, heartsState.maxHearts])

  const useHeart = useCallback((): boolean => {
    if (heartsState.currentHearts > 0) {
      setHeartsState((prev) => ({
        ...prev,
        currentHearts: prev.currentHearts - 1,
      }))
      return true
    }
    return false
  }, [heartsState.currentHearts])

  const refillHeart = useCallback(() => {
    setHeartsState((prev) => ({
      ...prev,
      currentHearts: Math.min(prev.currentHearts + 1, prev.maxHearts),
      lastRefillTime: new Date(),
    }))
  }, [])

  const buyHeart = useCallback((cost: number): boolean => {
    // This will be integrated with neurons system
    // For now, just add a heart
    if (heartsState.currentHearts < heartsState.maxHearts) {
      refillHeart()
      return true
    }
    return false
  }, [heartsState.currentHearts, heartsState.maxHearts, refillHeart])

  const buyFreeze = useCallback((cost: number): boolean => {
    // Buy a streak freeze with neurons
    setHeartsState((prev) => ({
      ...prev,
      freezesAvailable: Math.min(prev.freezesAvailable + 1, 3), // Max 3 freezes
    }))
    return true
  }, [])

  const canUseHeart = heartsState.currentHearts > 0

  return (
    <HeartsContext.Provider
      value={{
        hearts: heartsState.currentHearts,
        maxHearts: heartsState.maxHearts,
        useHeart,
        refillHeart,
        buyHeart,
        buyFreeze,
        timeUntilRefill,
        freezesAvailable: heartsState.freezesAvailable,
        canUseHeart,
      }}
    >
      {children}
    </HeartsContext.Provider>
  )
}

export function useHearts() {
  const context = useContext(HeartsContext)
  if (context === undefined) {
    throw new Error('useHearts must be used within a HeartsProvider')
  }
  return context
}
