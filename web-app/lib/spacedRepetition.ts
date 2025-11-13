/**
 * Spaced Repetition Algorithm
 * Based on SM-2 algorithm with modifications for confidence-based learning
 */

export interface ReviewItem {
  questionId: string
  moduleId: number
  lastReviewed: Date
  nextReview: Date
  interval: number // days until next review
  easeFactor: number // difficulty multiplier (1.3 to 2.5)
  repetitions: number // successful review count
  lapses: number // number of times forgotten
  mastery: number // 0-100% mastery level
}

export interface ReviewAnswer {
  questionId: string
  isCorrect: boolean
  confidence: 1 | 2 | 3 | 4 | 5
  timestamp: Date
}

/**
 * Calculate the next review interval based on performance
 */
export function calculateNextInterval(
  item: ReviewItem,
  answer: ReviewAnswer
): ReviewItem {
  const { isCorrect, confidence } = answer

  // Create a copy to avoid mutation
  const updatedItem = { ...item }

  if (!isCorrect) {
    // Wrong answer - reset to beginning
    updatedItem.repetitions = 0
    updatedItem.interval = 1
    updatedItem.lapses += 1
    updatedItem.easeFactor = Math.max(1.3, updatedItem.easeFactor - 0.2)
    updatedItem.mastery = Math.max(0, updatedItem.mastery - 20)
  } else {
    // Correct answer - calculate based on confidence
    const confidenceMultiplier = getConfidenceMultiplier(confidence)

    if (updatedItem.repetitions === 0) {
      // First correct review
      updatedItem.interval = 1
    } else if (updatedItem.repetitions === 1) {
      // Second correct review
      updatedItem.interval = 3
    } else {
      // Subsequent reviews - use spaced repetition formula
      updatedItem.interval = Math.round(
        updatedItem.interval * updatedItem.easeFactor * confidenceMultiplier
      )
    }

    // Update ease factor based on confidence
    updatedItem.easeFactor = calculateEaseFactor(
      updatedItem.easeFactor,
      confidence
    )

    // Update mastery
    updatedItem.mastery = calculateMastery(
      updatedItem.mastery,
      confidence,
      updatedItem.repetitions
    )

    updatedItem.repetitions += 1
  }

  // Set next review date
  updatedItem.lastReviewed = answer.timestamp
  updatedItem.nextReview = calculateNextReviewDate(
    answer.timestamp,
    updatedItem.interval
  )

  // Cap interval at 180 days (6 months)
  updatedItem.interval = Math.min(updatedItem.interval, 180)

  return updatedItem
}

/**
 * Get multiplier based on confidence level
 */
function getConfidenceMultiplier(confidence: number): number {
  const multipliers = {
    1: 0.6,  // Very low confidence - review sooner
    2: 0.8,  // Low confidence
    3: 1.0,  // Medium confidence - normal interval
    4: 1.3,  // High confidence - slightly longer
    5: 1.6,  // Very high confidence - much longer
  }
  return multipliers[confidence as keyof typeof multipliers] || 1.0
}

/**
 * Calculate new ease factor based on confidence
 */
function calculateEaseFactor(currentEase: number, confidence: number): number {
  const adjustment = (confidence - 3) * 0.1 // -0.2 to +0.2
  const newEase = currentEase + adjustment

  // Clamp between 1.3 and 2.5
  return Math.max(1.3, Math.min(2.5, newEase))
}

/**
 * Calculate mastery level (0-100%)
 */
function calculateMastery(
  currentMastery: number,
  confidence: number,
  repetitions: number
): number {
  // Base increase depends on confidence
  const baseIncrease = confidence * 4 // 4-20 points

  // Bonus for streak of correct answers
  const streakBonus = Math.min(repetitions * 2, 10)

  const newMastery = currentMastery + baseIncrease + streakBonus

  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, newMastery))
}

/**
 * Calculate next review date
 */
function calculateNextReviewDate(lastReview: Date, intervalDays: number): Date {
  const nextDate = new Date(lastReview)
  nextDate.setDate(nextDate.getDate() + intervalDays)
  return nextDate
}

/**
 * Create a new review item for a question
 */
export function createReviewItem(
  questionId: string,
  moduleId: number
): ReviewItem {
  const now = new Date()
  return {
    questionId,
    moduleId,
    lastReviewed: now,
    nextReview: now,
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0,
    lapses: 0,
    mastery: 0,
  }
}

/**
 * Get questions due for review
 */
export function getDueQuestions(items: ReviewItem[], now: Date = new Date()): ReviewItem[] {
  return items
    .filter(item => item.nextReview <= now)
    .sort((a, b) => {
      // Sort by priority: overdue first, then by mastery (lowest first)
      const aDaysOverdue = Math.floor((now.getTime() - a.nextReview.getTime()) / (1000 * 60 * 60 * 24))
      const bDaysOverdue = Math.floor((now.getTime() - b.nextReview.getTime()) / (1000 * 60 * 60 * 24))

      if (aDaysOverdue !== bDaysOverdue) {
        return bDaysOverdue - aDaysOverdue // Most overdue first
      }

      return a.mastery - b.mastery // Lowest mastery first
    })
}

/**
 * Get upcoming reviews for the next N days
 */
export function getUpcomingReviews(
  items: ReviewItem[],
  days: number = 7,
  now: Date = new Date()
): Map<string, ReviewItem[]> {
  const upcoming = new Map<string, ReviewItem[]>()

  for (let i = 0; i <= days; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() + i)
    const dateKey = date.toISOString().split('T')[0]
    upcoming.set(dateKey, [])
  }

  items.forEach(item => {
    const daysDiff = Math.floor(
      (item.nextReview.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (daysDiff >= 0 && daysDiff <= days) {
      const dateKey = item.nextReview.toISOString().split('T')[0]
      const dayItems = upcoming.get(dateKey) || []
      dayItems.push(item)
      upcoming.set(dateKey, dayItems)
    }
  })

  return upcoming
}

/**
 * Calculate overall mastery for a module
 */
export function calculateModuleMastery(items: ReviewItem[], moduleId: number): number {
  const moduleItems = items.filter(item => item.moduleId === moduleId)

  if (moduleItems.length === 0) return 0

  const totalMastery = moduleItems.reduce((sum, item) => sum + item.mastery, 0)
  return Math.round(totalMastery / moduleItems.length)
}

/**
 * Get retention prediction based on current state
 */
export function predictRetention(item: ReviewItem): number {
  // Simplified forgetting curve
  const daysSinceReview = Math.floor(
    (new Date().getTime() - item.lastReviewed.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (daysSinceReview === 0) return item.mastery

  // Exponential decay with ease factor influence
  const decayRate = 0.1 / item.easeFactor
  const retention = item.mastery * Math.exp(-decayRate * daysSinceReview)

  return Math.max(0, Math.round(retention))
}

/**
 * Get study recommendations
 */
export interface StudyRecommendation {
  type: 'urgent' | 'review' | 'practice' | 'mastered'
  message: string
  questionCount: number
  moduleId?: number
}

export function getStudyRecommendations(items: ReviewItem[]): StudyRecommendation[] {
  const recommendations: StudyRecommendation[] = []
  const now = new Date()

  // Check for overdue items
  const overdue = items.filter(item => {
    const daysOverdue = Math.floor(
      (now.getTime() - item.nextReview.getTime()) / (1000 * 60 * 60 * 24)
    )
    return daysOverdue > 0
  })

  if (overdue.length > 0) {
    recommendations.push({
      type: 'urgent',
      message: `Você tem ${overdue.length} questões atrasadas para revisar!`,
      questionCount: overdue.length,
    })
  }

  // Check for items due today
  const dueToday = getDueQuestions(items, now).filter(item => {
    const daysDiff = Math.floor(
      (now.getTime() - item.nextReview.getTime()) / (1000 * 60 * 60 * 24)
    )
    return daysDiff === 0
  })

  if (dueToday.length > 0) {
    recommendations.push({
      type: 'review',
      message: `${dueToday.length} questões para revisar hoje`,
      questionCount: dueToday.length,
    })
  }

  // Check for weak areas (mastery < 50%)
  const weakAreas = new Map<number, number>()
  items.forEach(item => {
    if (item.mastery < 50) {
      weakAreas.set(item.moduleId, (weakAreas.get(item.moduleId) || 0) + 1)
    }
  })

  weakAreas.forEach((count, moduleId) => {
    if (count >= 3) {
      recommendations.push({
        type: 'practice',
        message: `Módulo ${moduleId} precisa de mais prática (${count} questões fracas)`,
        questionCount: count,
        moduleId,
      })
    }
  })

  // Check for mastered modules (all items > 80% mastery)
  const moduleStats = new Map<number, { total: number; mastered: number }>()
  items.forEach(item => {
    const stats = moduleStats.get(item.moduleId) || { total: 0, mastered: 0 }
    stats.total++
    if (item.mastery >= 80) stats.mastered++
    moduleStats.set(item.moduleId, stats)
  })

  moduleStats.forEach((stats, moduleId) => {
    if (stats.total > 0 && stats.mastered === stats.total) {
      recommendations.push({
        type: 'mastered',
        message: `🎉 Módulo ${moduleId} dominado! Todas as questões com alta maestria`,
        questionCount: stats.total,
        moduleId,
      })
    }
  })

  return recommendations
}
