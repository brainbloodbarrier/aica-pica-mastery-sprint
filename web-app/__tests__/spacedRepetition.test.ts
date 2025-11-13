import {
  createReviewItem,
  calculateNextInterval,
  getDueQuestions,
  getUpcomingReviews,
  calculateModuleMastery,
  predictRetention,
  getStudyRecommendations,
} from '@/lib/spacedRepetition'

describe('Spaced Repetition Algorithm', () => {
  const mockDate = new Date('2025-11-13T12:00:00Z')

  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(mockDate)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('createReviewItem', () => {
    it('creates a new review item with default values', () => {
      const item = createReviewItem('q1', 1)

      expect(item.questionId).toBe('q1')
      expect(item.moduleId).toBe(1)
      expect(item.interval).toBe(0)
      expect(item.easeFactor).toBe(2.5)
      expect(item.repetitions).toBe(0)
      expect(item.lapses).toBe(0)
      expect(item.mastery).toBe(0)
      expect(item.lastReviewed).toEqual(mockDate)
      expect(item.nextReview).toEqual(mockDate)
    })
  })

  describe('calculateNextInterval', () => {
    it('resets interval on wrong answer', () => {
      const item = createReviewItem('q1', 1)
      item.repetitions = 3
      item.interval = 7
      item.mastery = 60

      const answer = {
        questionId: 'q1',
        isCorrect: false,
        confidence: 3 as const,
        timestamp: mockDate,
      }

      const updated = calculateNextInterval(item, answer)

      expect(updated.repetitions).toBe(0)
      expect(updated.interval).toBe(1)
      expect(updated.lapses).toBe(1)
      expect(updated.mastery).toBeLessThan(60)
    })

    it('increases interval on correct answer with high confidence', () => {
      const item = createReviewItem('q1', 1)
      item.repetitions = 2
      item.interval = 3

      const answer = {
        questionId: 'q1',
        isCorrect: true,
        confidence: 5 as const,
        timestamp: mockDate,
      }

      const updated = calculateNextInterval(item, answer)

      expect(updated.repetitions).toBe(3)
      expect(updated.interval).toBeGreaterThan(3)
      expect(updated.mastery).toBeGreaterThan(0)
    })

    it('adjusts interval based on confidence level', () => {
      const item = createReviewItem('q1', 1)
      item.repetitions = 2
      item.interval = 3

      const lowConfidenceAnswer = {
        questionId: 'q1',
        isCorrect: true,
        confidence: 1 as const,
        timestamp: mockDate,
      }

      const highConfidenceAnswer = {
        questionId: 'q1',
        isCorrect: true,
        confidence: 5 as const,
        timestamp: mockDate,
      }

      const lowConfResult = calculateNextInterval(item, lowConfidenceAnswer)
      const highConfResult = calculateNextInterval(item, highConfidenceAnswer)

      expect(highConfResult.interval).toBeGreaterThan(lowConfResult.interval)
    })

    it('caps interval at 180 days', () => {
      const item = createReviewItem('q1', 1)
      item.repetitions = 10
      item.interval = 150
      item.easeFactor = 2.5

      const answer = {
        questionId: 'q1',
        isCorrect: true,
        confidence: 5 as const,
        timestamp: mockDate,
      }

      const updated = calculateNextInterval(item, answer)

      expect(updated.interval).toBeLessThanOrEqual(180)
    })
  })

  describe('getDueQuestions', () => {
    it('returns questions due for review', () => {
      const yesterday = new Date(mockDate)
      yesterday.setDate(yesterday.getDate() - 1)

      const tomorrow = new Date(mockDate)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const items = [
        { ...createReviewItem('q1', 1), nextReview: yesterday },
        { ...createReviewItem('q2', 1), nextReview: mockDate },
        { ...createReviewItem('q3', 1), nextReview: tomorrow },
      ]

      const due = getDueQuestions(items, mockDate)

      expect(due).toHaveLength(2)
      expect(due[0].questionId).toBe('q1') // Most overdue first
      expect(due[1].questionId).toBe('q2')
    })

    it('sorts by mastery when equally overdue', () => {
      const items = [
        { ...createReviewItem('q1', 1), nextReview: mockDate, mastery: 60 },
        { ...createReviewItem('q2', 1), nextReview: mockDate, mastery: 30 },
        { ...createReviewItem('q3', 1), nextReview: mockDate, mastery: 45 },
      ]

      const due = getDueQuestions(items, mockDate)

      expect(due[0].questionId).toBe('q2') // Lowest mastery first
      expect(due[1].questionId).toBe('q3')
      expect(due[2].questionId).toBe('q1')
    })
  })

  describe('getUpcomingReviews', () => {
    it('groups reviews by date', () => {
      const today = new Date(mockDate)
      const tomorrow = new Date(mockDate)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const dayAfter = new Date(mockDate)
      dayAfter.setDate(dayAfter.getDate() + 2)

      const items = [
        { ...createReviewItem('q1', 1), nextReview: today },
        { ...createReviewItem('q2', 1), nextReview: tomorrow },
        { ...createReviewItem('q3', 1), nextReview: tomorrow },
        { ...createReviewItem('q4', 1), nextReview: dayAfter },
      ]

      const upcoming = getUpcomingReviews(items, 3, mockDate)

      expect(upcoming.get('2025-11-13')).toHaveLength(1)
      expect(upcoming.get('2025-11-14')).toHaveLength(2)
      expect(upcoming.get('2025-11-15')).toHaveLength(1)
    })
  })

  describe('calculateModuleMastery', () => {
    it('calculates average mastery for a module', () => {
      const items = [
        { ...createReviewItem('q1', 1), mastery: 80 },
        { ...createReviewItem('q2', 1), mastery: 60 },
        { ...createReviewItem('q3', 1), mastery: 70 },
        { ...createReviewItem('q4', 2), mastery: 90 },
      ]

      const module1Mastery = calculateModuleMastery(items, 1)
      const module2Mastery = calculateModuleMastery(items, 2)

      expect(module1Mastery).toBe(70) // (80 + 60 + 70) / 3
      expect(module2Mastery).toBe(90)
    })

    it('returns 0 for modules with no items', () => {
      const mastery = calculateModuleMastery([], 1)
      expect(mastery).toBe(0)
    })
  })

  describe('predictRetention', () => {
    it('predicts retention based on time since review', () => {
      const item = createReviewItem('q1', 1)
      item.mastery = 100
      item.lastReviewed = new Date(mockDate)
      item.lastReviewed.setDate(item.lastReviewed.getDate() - 7) // 7 days ago

      const retention = predictRetention(item)

      expect(retention).toBeLessThan(100)
      expect(retention).toBeGreaterThan(0)
    })
  })

  describe('getStudyRecommendations', () => {
    it('generates recommendations based on review state', () => {
      const yesterday = new Date(mockDate)
      yesterday.setDate(yesterday.getDate() - 1)

      const items = [
        { ...createReviewItem('q1', 1), nextReview: yesterday }, // Overdue
        { ...createReviewItem('q2', 1), nextReview: mockDate, mastery: 30 }, // Weak
        { ...createReviewItem('q3', 1), nextReview: mockDate, mastery: 30 }, // Weak
        { ...createReviewItem('q4', 1), nextReview: mockDate, mastery: 30 }, // Weak
        { ...createReviewItem('q5', 2), mastery: 90 }, // Strong
      ]

      const recommendations = getStudyRecommendations(items)

      expect(recommendations).toContainEqual(
        expect.objectContaining({ type: 'urgent' })
      )
      expect(recommendations).toContainEqual(
        expect.objectContaining({ type: 'practice', moduleId: 1 })
      )
    })
  })
})
