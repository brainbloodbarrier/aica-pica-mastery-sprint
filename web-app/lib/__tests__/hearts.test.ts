// lib/__tests__/hearts.test.ts

import {
  getCurrentHearts,
  getTimeUntilNextHeart,
  canStudy,
  loseHeart,
  addHearts,
} from '../hearts';
import { MAX_HEARTS, HEART_REFILL_TIME_MS } from '../constants';

describe('getCurrentHearts', () => {
  it('should return current hearts if at max', () => {
    expect(getCurrentHearts(5, '')).toBe(5);
  });

  it('should refill one heart after 4 hours', () => {
    const fourHoursAgo = new Date(Date.now() - HEART_REFILL_TIME_MS);
    expect(getCurrentHearts(3, fourHoursAgo.toISOString())).toBe(4);
  });

  it('should refill multiple hearts after multiple 4-hour periods', () => {
    const eightHoursAgo = new Date(Date.now() - HEART_REFILL_TIME_MS * 2);
    expect(getCurrentHearts(2, eightHoursAgo.toISOString())).toBe(4);
  });

  it('should not exceed max hearts', () => {
    const longTimeAgo = new Date(Date.now() - HEART_REFILL_TIME_MS * 10);
    expect(getCurrentHearts(0, longTimeAgo.toISOString())).toBe(MAX_HEARTS);
  });

  it('should return 0 if no refill yet', () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    expect(getCurrentHearts(0, oneHourAgo.toISOString())).toBe(0);
  });
});

describe('getTimeUntilNextHeart', () => {
  it('should return null when at max hearts', () => {
    expect(getTimeUntilNextHeart(5, '')).toBeNull();
  });

  it('should return null when no last heart loss', () => {
    expect(getTimeUntilNextHeart(3, '')).toBeNull();
  });

  it('should return future date when refill pending', () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const nextHeart = getTimeUntilNextHeart(0, oneHourAgo.toISOString());
    expect(nextHeart).not.toBeNull();
    expect(nextHeart!.getTime()).toBeGreaterThan(Date.now());
  });
});

describe('canStudy', () => {
  it('should return true when hearts > 0', () => {
    expect(canStudy(3, '')).toBe(true);
    expect(canStudy(1, '')).toBe(true);
  });

  it('should return false when hearts = 0 and no refill', () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    expect(canStudy(0, oneHourAgo.toISOString())).toBe(false);
  });

  it('should return true when refill available', () => {
    const fiveHoursAgo = new Date(Date.now() - HEART_REFILL_TIME_MS - 60 * 60 * 1000);
    expect(canStudy(0, fiveHoursAgo.toISOString())).toBe(true);
  });
});

describe('loseHeart', () => {
  it('should decrease hearts by 1', () => {
    const result = loseHeart(3);
    expect(result.hearts).toBe(2);
    expect(result.timestamp).toBeDefined();
  });

  it('should not go below 0', () => {
    const result = loseHeart(0);
    expect(result.hearts).toBe(0);
  });

  it('should set timestamp to now', () => {
    const before = new Date();
    const result = loseHeart(5);
    const after = new Date();

    const timestamp = new Date(result.timestamp);
    expect(timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});

describe('addHearts', () => {
  it('should add hearts', () => {
    expect(addHearts(2, 2)).toBe(4);
  });

  it('should not exceed max', () => {
    expect(addHearts(4, 2)).toBe(5);
    expect(addHearts(5, 5)).toBe(5);
  });

  it('should add zero hearts', () => {
    expect(addHearts(3, 0)).toBe(3);
  });
});
