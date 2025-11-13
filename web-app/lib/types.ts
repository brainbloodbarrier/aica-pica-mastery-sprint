// lib/types.ts - Core TypeScript Interfaces for AICA-PICA App

export interface Question {
  id: string;
  moduleId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  tags: string[];
  source: string;
  image?: {
    url: string;
    alt: string;
    caption?: string;
  };
}

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  estimatedTime: number; // minutes
  icon: string;
  color: string;
  prerequisiteModules: number[];
  questions?: Question[];
}

export interface UserProgress {
  questionId: string;
  correct: boolean;
  attempts: number;
  lastAttempted: string; // ISO date
  timeSpent: number; // milliseconds
  confidence?: number; // 0-100
}

export interface ModuleProgress {
  questionsAttempted: number;
  questionsCorrect: number;
  totalTimeSpent: number; // milliseconds
  lastStudied: string; // ISO date
  mastery: number; // 0-100%
}

export interface GameState {
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string; // ISO date
  todayProgress: number; // XP today
  hearts: number;
  lastHeartLoss: string; // ISO date
  neurons: number;
  completedModules: number[];
  moduleProgress: Record<number, ModuleProgress>;
  questionProgress: Record<string, UserProgress>;
  achievements: string[]; // achievement IDs
  settings: {
    dailyGoal: number; // XP target
    notifications: boolean;
    soundEffects: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string; // ISO date
  progress?: number;
  requirement: number;
  category: 'streak' | 'mastery' | 'speed' | 'dedication' | 'special';
}

export interface AnalyticsEvent {
  type: 'question_answered' | 'module_completed' | 'session_start' | 'session_end' | 'achievement_unlocked';
  timestamp: string; // ISO date
  data: {
    questionId?: string;
    correct?: boolean;
    timeSpent?: number;
    confidence?: number;
    moduleId?: number;
    score?: number;
    achievementId?: string;
  };
}

export interface SkillNode {
  id: string;
  moduleId: number;
  name: string;
  description: string;
  position: { x: number; y: number };
  requiredNodes: string[];
  status: 'locked' | 'available' | 'completed';
  masteryLevel: number; // 0-100%
  icon?: string;
  color?: string;
}

export interface SkillBranch {
  id: string;
  name: string;
  nodes: SkillNode[];
  description: string;
  color: string;
}
