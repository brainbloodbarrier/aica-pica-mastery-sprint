// lib/validation.ts - Zod Validation Schemas

import { z } from 'zod';

/**
 * Question Validation Schema
 */
export const QuestionSchema = z.object({
  id: z.string().min(1, 'Question ID required'),
  moduleId: z.number().min(1).max(10, 'Invalid module'),
  question: z.string().min(10, 'Question too short'),
  options: z.array(z.string()).length(4, 'Must have 4 options'),
  correctAnswer: z.number().min(0).max(3, 'Invalid answer index'),
  explanation: z.string().min(10, 'Explanation too short'),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert']),
  tags: z.array(z.string()),
  source: z.string(),
  image: z
    .object({
      url: z.string().url(),
      alt: z.string(),
      caption: z.string().optional(),
    })
    .optional(),
});

/**
 * Module Validation Schema
 */
export const ModuleSchema = z.object({
  id: z.number().min(1).max(10),
  title: z.string().min(1),
  subtitle: z.string(),
  description: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert']),
  estimatedTime: z.number().positive(),
  icon: z.string(),
  color: z.string(),
  prerequisiteModules: z.array(z.number()),
  questions: z.array(QuestionSchema).optional(),
});

/**
 * User Progress Validation Schema
 */
export const UserProgressSchema = z.object({
  questionId: z.string(),
  correct: z.boolean(),
  attempts: z.number().positive(),
  lastAttempted: z.string(),
  timeSpent: z.number().nonnegative(),
  confidence: z.number().min(0).max(100).optional(),
});

/**
 * Module Progress Validation Schema
 */
export const ModuleProgressSchema = z.object({
  questionsAttempted: z.number().nonnegative(),
  questionsCorrect: z.number().nonnegative(),
  totalTimeSpent: z.number().nonnegative(),
  lastStudied: z.string(),
  mastery: z.number().min(0).max(100),
});

/**
 * Game State Validation Schema
 */
export const GameStateSchema = z.object({
  totalXP: z.number().nonnegative(),
  level: z.number().min(1).max(8),
  currentStreak: z.number().nonnegative(),
  longestStreak: z.number().nonnegative(),
  lastStudyDate: z.string(),
  todayProgress: z.number().nonnegative(),
  hearts: z.number().min(0).max(5),
  lastHeartLoss: z.string(),
  neurons: z.number().nonnegative(),
  completedModules: z.array(z.number()),
  moduleProgress: z.record(z.number().positive().toString(), ModuleProgressSchema),
  questionProgress: z.record(z.string(), UserProgressSchema),
  achievements: z.array(z.string()),
  settings: z.object({
    dailyGoal: z.number().min(10),
    notifications: z.boolean(),
    soundEffects: z.boolean(),
    theme: z.enum(['light', 'dark', 'auto']),
  }),
});

/**
 * Achievement Validation Schema
 */
export const AchievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  unlockedAt: z.string().optional(),
  progress: z.number().optional(),
  requirement: z.number().positive(),
  category: z.enum(['streak', 'mastery', 'speed', 'dedication', 'special']),
});

/**
 * Analytics Event Validation Schema
 */
export const AnalyticsEventSchema = z.object({
  type: z.enum(['question_answered', 'module_completed', 'session_start', 'session_end', 'achievement_unlocked']),
  timestamp: z.string(),
  data: z.object({
    questionId: z.string().optional(),
    correct: z.boolean().optional(),
    timeSpent: z.number().optional(),
    confidence: z.number().optional(),
    moduleId: z.number().optional(),
    score: z.number().optional(),
    achievementId: z.string().optional(),
  }),
});

/**
 * Validate Game State
 */
export function validateGameState(data: unknown) {
  try {
    return GameStateSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Invalid game state:', error.errors);
    }
    return null;
  }
}

/**
 * Validate Question
 */
export function validateQuestion(data: unknown) {
  try {
    return QuestionSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Invalid question:', error.errors);
    }
    return null;
  }
}

/**
 * Validate Module
 */
export function validateModule(data: unknown) {
  try {
    return ModuleSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Invalid module:', error.errors);
    }
    return null;
  }
}

/**
 * Validate Analytics Event
 */
export function validateAnalyticsEvent(data: unknown) {
  try {
    return AnalyticsEventSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Invalid analytics event:', error.errors);
    }
    return null;
  }
}
