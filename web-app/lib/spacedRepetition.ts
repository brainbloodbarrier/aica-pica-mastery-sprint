// lib/spacedRepetition.ts - Spaced Repetition Algorithm (SM-2)

import { UserProgress } from './types';

export interface ReviewSchedule {
  questionId: string;
  nextReview: Date;
  interval: number; // days
  easeFactor: number;
  repetitions: number;
}

const INITIAL_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

/**
 * SM-2 Algorithm (SuperMemo 2)
 * Calculates next review date based on performance
 * Quality: 0=total blackout, 1-2=poor, 3-4=acceptable, 5=perfect
 */
export function calculateNextReview(
  progress: UserProgress | null,
  quality: number // 0-5
): ReviewSchedule {
  const now = new Date();

  if (!progress) {
    // First time seeing this question
    return {
      questionId: '',
      nextReview: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 1 day
      interval: 1,
      easeFactor: INITIAL_EASE_FACTOR,
      repetitions: 1,
    };
  }

  let interval = 1;
  let easeFactor = INITIAL_EASE_FACTOR;
  let repetitions = 0;

  // Quality < 3 means incorrect, reset
  if (quality < 3) {
    interval = 1;
    repetitions = 0;
  } else {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor
  easeFactor =
    easeFactor +
    (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  easeFactor = Math.max(easeFactor, MIN_EASE_FACTOR);

  const nextReview = new Date(
    now.getTime() + interval * 24 * 60 * 60 * 1000
  );

  return {
    questionId: progress.questionId,
    nextReview,
    interval,
    easeFactor,
    repetitions,
  };
}

/**
 * Get questions due for review
 */
export function getDueQuestions(
  schedules: Record<string, ReviewSchedule>
): string[] {
  const now = new Date();
  return Object.values(schedules)
    .filter((schedule) => new Date(schedule.nextReview) <= now)
    .map((schedule) => schedule.questionId);
}

/**
 * Get next review date
 */
export function getNextReviewDate(
  schedules: Record<string, ReviewSchedule>
): Date | null {
  const nextDates = Object.values(schedules)
    .map((s) => new Date(s.nextReview))
    .filter((d) => d > new Date());

  if (nextDates.length === 0) return null;

  return new Date(Math.min(...nextDates.map((d) => d.getTime())));
}

/**
 * Calculate review statistics
 */
export function getReviewStats(
  schedules: Record<string, ReviewSchedule>
): {
  totalQuestions: number;
  dueForReview: number;
  averageEaseFactor: number;
  nextReviewIn: string | null;
} {
  const now = new Date();
  const scheduleArray = Object.values(schedules);

  const dueForReview = scheduleArray.filter(
    (s) => new Date(s.nextReview) <= now
  ).length;

  const avgEase =
    scheduleArray.length > 0
      ? scheduleArray.reduce((sum, s) => sum + s.easeFactor, 0) /
        scheduleArray.length
      : 0;

  const nextReview = getNextReviewDate(schedules);
  let nextIn: string | null = null;

  if (nextReview) {
    const diff = nextReview.getTime() - now.getTime();
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    nextIn = days > 0 ? `${days}d ${hours}h` : `${hours}h`;
  }

  return {
    totalQuestions: scheduleArray.length,
    dueForReview,
    averageEaseFactor: Math.round(avgEase * 100) / 100,
    nextReviewIn: nextIn,
  };
}
