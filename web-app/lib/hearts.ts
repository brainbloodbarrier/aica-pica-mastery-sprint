// lib/hearts.ts - Heart (Lives) System

import { MAX_HEARTS, HEART_REFILL_TIME_MS } from './constants';

/**
 * Get current number of hearts accounting for auto-refill
 */
export function getCurrentHearts(hearts: number, lastHeartLoss: string): number {
  if (hearts >= MAX_HEARTS) return MAX_HEARTS;
  if (!lastHeartLoss) return hearts;

  const lastLoss = new Date(lastHeartLoss);
  const now = new Date();
  const timeSinceLoss = now.getTime() - lastLoss.getTime();

  const heartsRefilled = Math.floor(timeSinceLoss / HEART_REFILL_TIME_MS);
  return Math.min(hearts + heartsRefilled, MAX_HEARTS);
}

/**
 * Get time until next heart refill
 */
export function getTimeUntilNextHeart(hearts: number, lastHeartLoss: string): Date | null {
  if (hearts >= MAX_HEARTS) return null;
  if (!lastHeartLoss) return null;

  const lastLoss = new Date(lastHeartLoss);
  const nextRefill = new Date(lastLoss.getTime() + HEART_REFILL_TIME_MS);

  return nextRefill;
}

/**
 * Check if user can study (has hearts)
 */
export function canStudy(hearts: number, lastHeartLoss: string): boolean {
  return getCurrentHearts(hearts, lastHeartLoss) > 0;
}

/**
 * Deduct a heart when user answers incorrectly
 */
export function loseHeart(currentHearts: number): {
  hearts: number;
  timestamp: string;
} {
  return {
    hearts: Math.max(0, currentHearts - 1),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Add hearts (up to max)
 */
export function addHearts(currentHearts: number, amount: number): number {
  return Math.min(currentHearts + amount, MAX_HEARTS);
}

/**
 * Get heart display info
 */
export function getHeartInfo(hearts: number, lastHeartLoss: string): {
  current: number;
  max: number;
  nextRefillIn: string | null;
  canStudy: boolean;
} {
  const current = getCurrentHearts(hearts, lastHeartLoss);
  const nextRefill = getTimeUntilNextHeart(hearts, lastHeartLoss);

  let nextRefillIn: string | null = null;
  if (nextRefill) {
    const now = new Date();
    const diff = nextRefill.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    nextRefillIn = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  return {
    current,
    max: MAX_HEARTS,
    nextRefillIn,
    canStudy: current > 0,
  };
}
