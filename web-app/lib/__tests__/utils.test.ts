// lib/__tests__/utils.test.ts

import {
  calculateLevel,
  isStreakActive,
  formatDuration,
  calculatePercentage,
} from '../utils';

describe('calculateLevel', () => {
  it('should return level 1 for 0 XP', () => {
    const result = calculateLevel(0);
    expect(result.level).toBe(1);
    expect(result.title).toBe('Medical Student');
    expect(result.progress).toBe(0);
  });

  it('should return level 2 for 100 XP', () => {
    const result = calculateLevel(100);
    expect(result.level).toBe(2);
    expect(result.title).toBe('Intern');
  });

  it('should return level 2 for 150 XP (halfway to level 3)', () => {
    const result = calculateLevel(150);
    expect(result.level).toBe(2);
    expect(result.progress).toBeCloseTo(33.33, 1);
  });

  it('should stay at max level', () => {
    const result = calculateLevel(99999);
    expect(result.level).toBe(8);
    expect(result.title).toBe('Master Surgeon');
    expect(result.progress).toBe(100);
  });

  it('should calculate progress between levels', () => {
    const result = calculateLevel(350); // Level 3, 40% to level 4 (100/250)
    expect(result.level).toBe(3);
    expect(result.progress).toBeCloseTo(40, 1);
  });
});

describe('isStreakActive', () => {
  it('should return false for empty string', () => {
    expect(isStreakActive('')).toBe(false);
  });

  it('should return true for today', () => {
    const today = new Date().toISOString();
    expect(isStreakActive(today)).toBe(true);
  });

  it('should return true for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isStreakActive(yesterday.toISOString())).toBe(true);
  });

  it('should return false for 2 days ago', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    expect(isStreakActive(twoDaysAgo.toISOString())).toBe(false);
  });

  it('should return false for 30 days ago', () => {
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    expect(isStreakActive(monthAgo.toISOString())).toBe(false);
  });
});

describe('formatDuration', () => {
  it('should format seconds', () => {
    expect(formatDuration(30000)).toBe('30s');
    expect(formatDuration(59000)).toBe('59s');
  });

  it('should format minutes', () => {
    expect(formatDuration(90000)).toBe('1m 30s');
    expect(formatDuration(300000)).toBe('5m 0s');
  });

  it('should format hours', () => {
    expect(formatDuration(3665000)).toBe('1h 1m');
    expect(formatDuration(7200000)).toBe('2h 0m');
  });

  it('should format zero', () => {
    expect(formatDuration(0)).toBe('0s');
  });
});

describe('calculatePercentage', () => {
  it('should calculate percentage correctly', () => {
    expect(calculatePercentage(50, 100)).toBe(50);
    expect(calculatePercentage(75, 100)).toBe(75);
    expect(calculatePercentage(1, 3)).toBe(33);
  });

  it('should return 0 for zero total', () => {
    expect(calculatePercentage(0, 0)).toBe(0);
    expect(calculatePercentage(5, 0)).toBe(0);
  });

  it('should return 100 for full score', () => {
    expect(calculatePercentage(100, 100)).toBe(100);
    expect(calculatePercentage(10, 10)).toBe(100);
  });

  it('should round correctly', () => {
    expect(calculatePercentage(1, 3)).toBe(33); // 33.33 rounded
    expect(calculatePercentage(2, 3)).toBe(67); // 66.67 rounded
  });
});
