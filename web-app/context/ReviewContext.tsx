'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Question } from '@/lib/types'
import {
  ReviewItem,
  ReviewAnswer,
  createReviewItem,
  calculateNextInterval,
  getDueQuestions,
  getUpcomingReviews,
  calculateModuleMastery,
  getStudyRecommendations,
  StudyRecommendation
} from '@/lib/spacedRepetition'

interface ReviewState {
  items: ReviewItem[]
  lastSync: Date
}

interface ReviewContextType {
  reviewItems: ReviewItem[]
  dueQuestions: ReviewItem[]
  upcomingReviews: Map<string, ReviewItem[]>
  recommendations: StudyRecommendation[]
  addQuestionForReview: (questionId: string, moduleId: number) => void
  recordReview: (answer: ReviewAnswer) => void
  getModuleMastery: (moduleId: number) => number
  getDueCount: () => number
  getWeakAreas: () => ReviewItem[]
  resetReviews: () => void
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

const STORAGE_KEY = 'aica_pica_reviews'

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviewState, setReviewState] = useState<ReviewState>({
    items: [],
    lastSync: new Date(),
  })

  // Load review state from localStorage on mount
  useEffect(() => {
    const loadReviewState = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setReviewState({
            items: parsed.items.map((item: any) => ({
              ...item,
              lastReviewed: new Date(item.lastReviewed),
              nextReview: new Date(item.nextReview),
            })),
            lastSync: new Date(parsed.lastSync),
          })
        }
      } catch (error) {
        console.error('Failed to load review state:', error)
      }
    }

    loadReviewState()
  }, [])

  // Save review state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewState))
    } catch (error) {
      console.error('Failed to save review state:', error)
    }
  }, [reviewState])

  // Add a question to the review system
  const addQuestionForReview = useCallback((questionId: string, moduleId: number) => {
    setReviewState(prev => {
      // Check if question already exists
      const exists = prev.items.some(item => item.questionId === questionId)
      if (exists) return prev

      const newItem = createReviewItem(questionId, moduleId)
      return {
        ...prev,
        items: [...prev.items, newItem],
      }
    })
  }, [])

  // Record a review answer and update intervals
  const recordReview = useCallback((answer: ReviewAnswer) => {
    setReviewState(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.questionId === answer.questionId) {
          return calculateNextInterval(item, answer)
        }
        return item
      })

      return {
        ...prev,
        items: updatedItems,
        lastSync: new Date(),
      }
    })
  }, [])

  // Get module mastery percentage
  const getModuleMastery = useCallback((moduleId: number): number => {
    return calculateModuleMastery(reviewState.items, moduleId)
  }, [reviewState.items])

  // Get count of due questions
  const getDueCount = useCallback((): number => {
    return getDueQuestions(reviewState.items).length
  }, [reviewState.items])

  // Get weak areas (questions with low mastery)
  const getWeakAreas = useCallback((): ReviewItem[] => {
    return reviewState.items
      .filter(item => item.mastery < 50)
      .sort((a, b) => a.mastery - b.mastery)
  }, [reviewState.items])

  // Reset all reviews
  const resetReviews = useCallback(() => {
    setReviewState({
      items: [],
      lastSync: new Date(),
    })
  }, [])

  // Calculate derived state
  const dueQuestions = getDueQuestions(reviewState.items)
  const upcomingReviews = getUpcomingReviews(reviewState.items, 7)
  const recommendations = getStudyRecommendations(reviewState.items)

  return (
    <ReviewContext.Provider
      value={{
        reviewItems: reviewState.items,
        dueQuestions,
        upcomingReviews,
        recommendations,
        addQuestionForReview,
        recordReview,
        getModuleMastery,
        getDueCount,
        getWeakAreas,
        resetReviews,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export function useReview() {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error('useReview must be used within a ReviewProvider')
  }
  return context
}
