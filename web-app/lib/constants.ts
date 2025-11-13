// lib/constants.ts - Application Constants

export const XP_PER_CORRECT_ANSWER = 10;
export const XP_PER_MODULE_COMPLETE = 50;
export const XP_PER_ACHIEVEMENT = 100;

export const LEVELS = [
  { level: 1, xpRequired: 0, title: 'Medical Student' },
  { level: 2, xpRequired: 100, title: 'Intern' },
  { level: 3, xpRequired: 250, title: 'Resident' },
  { level: 4, xpRequired: 500, title: 'Chief Resident' },
  { level: 5, xpRequired: 1000, title: 'Fellow' },
  { level: 6, xpRequired: 2000, title: 'Attending' },
  { level: 7, xpRequired: 4000, title: 'Expert' },
  { level: 8, xpRequired: 8000, title: 'Master Surgeon' },
];

export const MAX_HEARTS = 5;
export const HEART_REFILL_TIME_MS = 4 * 60 * 60 * 1000; // 4 hours

export const NEURONS_PER_CORRECT = 10;
export const NEURONS_PER_MODULE = 50;
export const NEURONS_HEART_REFILL_COST = 50;
export const NEURONS_SKIP_QUESTION_COST = 25;
export const NEURONS_HINT_COST = 10;

export const DAILY_GOAL_DEFAULT = 50; // XP

export const STREAK_BONUS_THRESHOLD = 7; // days
export const STREAK_BONUS_MULTIPLIER = 2;

export const MASTERY_THRESHOLD_BRONZE = 60; // %
export const MASTERY_THRESHOLD_SILVER = 80; // %
export const MASTERY_THRESHOLD_GOLD = 90; // %
export const MASTERY_THRESHOLD_PLATINUM = 100; // %

export const MODULE_COUNT = 10;
export const QUESTIONS_PER_MODULE_AVG = 13; // Average, varies by module
