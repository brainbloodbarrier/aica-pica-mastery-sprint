// lib/utils.ts - Utility Functions

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LEVELS, XP_PER_CORRECT_ANSWER } from './constants';

/**
 * Merge Tailwind CSS classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate current level and progress based on XP
 */
export function calculateLevel(xp: number): {
  level: number;
  title: string;
  progress: number;
  nextLevelXp: number;
} {
  let currentLevel = LEVELS[0];
  let nextLevel = LEVELS[1];

  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xpRequired) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || LEVELS[i]; // Stay at max level
    } else {
      break;
    }
  }

  const xpIntoLevel = xp - currentLevel.xpRequired;
  const xpNeededForNext = nextLevel.xpRequired - currentLevel.xpRequired;
  const progress = xpNeededForNext > 0 ? (xpIntoLevel / xpNeededForNext) * 100 : 100;

  return {
    level: currentLevel.level,
    title: currentLevel.title,
    progress: Math.min(progress, 100),
    nextLevelXp: nextLevel.xpRequired,
  };
}

/**
 * Check if a streak is still active
 * Uses UTC to avoid timezone issues
 */
export function isStreakActive(lastStudyDate: string): boolean {
  if (!lastStudyDate) return false;

  const last = new Date(lastStudyDate);
  const now = new Date();

  // Set both to UTC midnight for comparison
  const lastMidnight = Date.UTC(last.getUTCFullYear(), last.getUTCMonth(), last.getUTCDate());
  const todayMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

  const daysDiff = Math.floor((todayMidnight - lastMidnight) / (1000 * 60 * 60 * 24));

  return daysDiff <= 1; // Same day or yesterday
}

/**
 * Format milliseconds to readable duration
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Format time until a target date
 */
export function formatTimeUntil(targetDate: Date): string {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return 'Ready!';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Shuffle an array (Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get current date in ISO format
 */
export function getCurrentDateISO(): string {
  return new Date().toISOString();
}

/**
 * Check if two dates are on the same day (UTC)
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  const d1 = Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate());
  const d2 = Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate());
  return d1 === d2;
}

/**
 * Parse ISO date string to Date object safely
 */
export function parseISO(isoString: string): Date | null {
  try {
    return new Date(isoString);
  } catch {
    return null;
  }
}

/**
 * Calculate percentage (with safety checks)
 */
export function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}
