'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface Transaction {
  id: string
  amount: number
  type: 'earn' | 'spend'
  reason: string
  timestamp: Date
}

interface NeuronsState {
  balance: number
  transactions: Transaction[]
}

interface NeuronsContextType {
  neurons: number
  earnNeurons: (amount: number, reason: string) => void
  spendNeurons: (amount: number, reason: string) => boolean
  canAfford: (amount: number) => boolean
  transactions: Transaction[]
  recentEarnings: Transaction[]
}

const NeuronsContext = createContext<NeuronsContextType | undefined>(undefined)

const STORAGE_KEY = 'aica_pica_neurons'
const INITIAL_BALANCE = 100 // Starting neurons for new users

export function NeuronsProvider({ children }: { children: React.ReactNode }) {
  const [neuronsState, setNeuronsState] = useState<NeuronsState>({
    balance: INITIAL_BALANCE,
    transactions: [],
  })

  // Load neurons state from localStorage on mount
  useEffect(() => {
    const loadNeuronsState = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setNeuronsState({
            balance: parsed.balance,
            transactions: parsed.transactions.map((t: any) => ({
              ...t,
              timestamp: new Date(t.timestamp),
            })),
          })
        }
      } catch (error) {
        console.error('Failed to load neurons state:', error)
      }
    }

    loadNeuronsState()
  }, [])

  // Save neurons state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(neuronsState))
    } catch (error) {
      console.error('Failed to save neurons state:', error)
    }
  }, [neuronsState])

  const earnNeurons = useCallback((amount: number, reason: string) => {
    if (amount <= 0) {
      console.warn('Cannot earn non-positive neurons:', amount)
      return
    }

    const transaction: Transaction = {
      id: `${Date.now()}-${Math.random()}`,
      amount,
      type: 'earn',
      reason,
      timestamp: new Date(),
    }

    setNeuronsState((prev) => ({
      balance: prev.balance + amount,
      transactions: [transaction, ...prev.transactions].slice(0, 100), // Keep last 100
    }))
  }, [])

  const spendNeurons = useCallback((amount: number, reason: string): boolean => {
    if (amount <= 0) {
      console.warn('Cannot spend non-positive neurons:', amount)
      return false
    }

    if (neuronsState.balance < amount) {
      console.warn('Insufficient neurons:', neuronsState.balance, '<', amount)
      return false
    }

    const transaction: Transaction = {
      id: `${Date.now()}-${Math.random()}`,
      amount,
      type: 'spend',
      reason,
      timestamp: new Date(),
    }

    setNeuronsState((prev) => ({
      balance: prev.balance - amount,
      transactions: [transaction, ...prev.transactions].slice(0, 100), // Keep last 100
    }))

    return true
  }, [neuronsState.balance])

  const canAfford = useCallback((amount: number): boolean => {
    return neuronsState.balance >= amount
  }, [neuronsState.balance])

  // Get recent earnings (last 5 earn transactions)
  const recentEarnings = neuronsState.transactions
    .filter((t) => t.type === 'earn')
    .slice(0, 5)

  return (
    <NeuronsContext.Provider
      value={{
        neurons: neuronsState.balance,
        earnNeurons,
        spendNeurons,
        canAfford,
        transactions: neuronsState.transactions,
        recentEarnings,
      }}
    >
      {children}
    </NeuronsContext.Provider>
  )
}

export function useNeurons() {
  const context = useContext(NeuronsContext)
  if (context === undefined) {
    throw new Error('useNeurons must be used within a NeuronsProvider')
  }
  return context
}

// Neuron earning rewards
export const NEURON_REWARDS = {
  CORRECT_ANSWER: 5,
  MODULE_COMPLETE: 50,
  STREAK_7_DAY: 50,
  STREAK_30_DAY: 200,
  STREAK_100_DAY: 1000,
  ACHIEVEMENT_BRONZE: 50,
  ACHIEVEMENT_SILVER: 100,
  ACHIEVEMENT_GOLD: 250,
  ACHIEVEMENT_PLATINUM: 500,
  DAILY_GOAL_EASY: 20,
  DAILY_GOAL_MEDIUM: 50,
  DAILY_GOAL_HARD: 100,
  DAILY_GOAL_ALL: 50,
}

// Neuron spending costs
export const NEURON_COSTS = {
  BUY_HEART: 20,
  BUY_STREAK_FREEZE: 50,
  BUY_HINT: 10,
  UNLOCK_POWERUP: 100,
}
