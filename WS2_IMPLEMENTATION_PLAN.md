# WS2: Core Features Implementation Plan

**Branch**: `ws2-core-features`
**Date**: November 13, 2025
**Status**: 🔄 In Progress
**Prerequisites**: WS1 Foundation Infrastructure ✅ Complete

---

## 🎯 Objectives

Implement the core gamification and learning features to create an engaging,
production-ready learning experience:

1. **Hearts/Lives System** - Resource management for engagement
2. **Neurons Currency** - In-game economy for progression
3. **Confidence Rating** - Learning science integration
4. **Spaced Repetition** - Evidence-based review scheduling
5. **Daily Goals** - Habit formation mechanics
6. **Achievements System** - 10 tiered achievements (Bronze → Platinum)
7. **Enhanced Streaks** - Visual feedback and motivation
8. **Review Queue** - Smart prioritization of weak areas

---

## 📋 Implementation Checklist

### Phase 1: Hearts/Lives System (2-3 hours)

#### 1.1 Hearts State Management

- [ ] Create `HeartsContext` in `context/HeartsContext.tsx`
- [ ] Define hearts state interface:

  ```typescript
  interface HeartsState {
    currentHearts: number
    maxHearts: number
    lastRefillTime: Date
    refillIntervalHours: number
  }
  ```

- [ ] Implement localStorage persistence
- [ ] Add automatic refill logic (1 heart every 4 hours)
- [ ] Test hearts deduction on wrong answers

#### 1.2 Hearts Display Component

- [ ] Create `HeartsDisplay.tsx` in `components/gamification/`
- [ ] Show current/max hearts (e.g., ❤️❤️❤️🖤🖤)
- [ ] Display time until next refill
- [ ] Add animations for heart loss
- [ ] Add animations for heart refill

#### 1.3 Hearts Integration

- [ ] Integrate hearts into quiz flow
- [ ] Deduct 1 heart per wrong answer
- [ ] Block quiz when hearts = 0
- [ ] Add "out of hearts" modal with options:
  - Wait for refill (show countdown)
  - Buy hearts with neurons
  - Watch ad (future)

#### 1.4 Testing

- [ ] Test hearts deduction logic
- [ ] Test refill timing calculations
- [ ] Test localStorage persistence
- [ ] Test edge cases (negative hearts, overflow)

---

### Phase 2: Neurons Currency System (2-3 hours)

#### 2.1 Neurons State Management

- [ ] Extend `ProgressContext` to include neurons
- [ ] Define neurons earning rules:
  - 5 neurons per correct answer
  - 50 neurons per module completion
  - Streak bonuses (10/20/50 neurons)
  - Achievement bonuses (50-500 neurons)
- [ ] Implement neurons spending:
  - Buy 1 heart: 20 neurons
  - Buy streak freeze: 50 neurons
  - Buy hint: 10 neurons (future)

#### 2.2 Neurons Display Component

- [ ] Create `NeuronsDisplay.tsx` in `components/gamification/`
- [ ] Show current neurons with brain icon 🧠
- [ ] Add subtle pulse animation on earn
- [ ] Show "+X neurons" popup on earn
- [ ] Display neurons history (optional)

#### 2.3 Neurons Shop

- [ ] Create `NeuronsShop.tsx` component
- [ ] Show available items with costs
- [ ] Implement purchase flow:
  - Confirm purchase modal
  - Deduct neurons
  - Grant item (heart, freeze, etc.)
- [ ] Add transaction history

#### 2.4 Testing

- [ ] Test neurons earning on correct answers
- [ ] Test neurons earning on milestones
- [ ] Test purchase transactions
- [ ] Test insufficient neurons handling

---

### Phase 3: Confidence Rating (2-3 hours)

#### 3.1 Confidence Rating UI

- [ ] Create `ConfidenceRating.tsx` component
- [ ] Show after answer submission (before feedback)
- [ ] 5-level scale with emoji:
  - 😰 Guessed (1)
  - 😕 Unsure (2)
  - 😐 Somewhat (3)
  - 😊 Confident (4)
  - 🤩 Very Confident (5)
- [ ] Smooth animation entrance
- [ ] Require selection before proceeding

#### 3.2 Confidence Data Storage

- [ ] Add confidence field to answer records
- [ ] Store in localStorage with answers
- [ ] Schema:

  ```typescript
  interface AnswerRecord {
    questionId: string
    isCorrect: boolean
    confidence: 1 | 2 | 3 | 4 | 5
    timestamp: Date
  }
  ```

#### 3.3 Confidence-Based Scheduling

- [ ] Implement spaced repetition algorithm
- [ ] Calculate review intervals:
  - Low confidence (1-2): Review in 1 day
  - Medium confidence (3): Review in 3 days
  - High confidence (4-5): Review in 7 days
- [ ] Adjust intervals based on correctness

#### 3.4 Testing

- [ ] Test confidence selection flow
- [ ] Test data persistence
- [ ] Test review scheduling logic

---

### Phase 4: Spaced Repetition System (3-4 hours)

#### 4.1 Review Queue Implementation

- [ ] Create `ReviewQueue.ts` in `lib/`
- [ ] Implement priority queue:
  - Sort by due date (ascending)
  - Then by mastery level (ascending)
  - Then by confidence (ascending)
- [ ] Calculate mastery per question:
  - Formula: `(correct_attempts / total_attempts) * 100`
  - Weight recent attempts higher

#### 4.2 Review Session Component

- [ ] Create `ReviewSession.tsx` in `app/review/`
- [ ] Show due questions count
- [ ] Display mastery level per question
- [ ] Use same quiz interface
- [ ] Track review completion

#### 4.3 Dashboard Integration

- [ ] Add "Review Due" card to dashboard
- [ ] Show count of questions due today
- [ ] Display upcoming review schedule
- [ ] Add mastery visualization (0-100% per topic)
- [ ] Show retention prediction graph (optional)

#### 4.4 Notification System

- [ ] Create notification state
- [ ] Trigger notifications for:
  - Reviews due
  - Hearts refilled
  - Daily streak at risk
  - Achievements unlocked
- [ ] Add notification badge to nav

#### 4.5 Testing

- [ ] Test queue generation logic
- [ ] Test mastery calculations
- [ ] Test review scheduling
- [ ] Test notification triggers

---

### Phase 5: Daily Goals System (2-3 hours)

#### 5.1 Daily Goals State

- [ ] Create `DailyGoalsContext`
- [ ] Define goal types:
  - Questions answered (10/20/30)
  - Modules completed (1/2/3)
  - Review sessions (1/2/3)
  - Streak maintained (boolean)
- [ ] Allow user to set custom goals
- [ ] Track progress daily

#### 5.2 Daily Goals UI

- [ ] Create `DailyGoals.tsx` component
- [ ] Show progress bars for each goal
- [ ] Display completion percentage
- [ ] Celebrate goal completion with confetti
- [ ] Reset at midnight (user's timezone)

#### 5.3 Goal Rewards

- [ ] Award neurons on goal completion:
  - Easy goal: 20 neurons
  - Medium goal: 50 neurons
  - Hard goal: 100 neurons
- [ ] Bonus for completing all goals: 50 neurons
- [ ] Show motivation messages

#### 5.4 Testing

- [ ] Test goal tracking logic
- [ ] Test daily reset functionality
- [ ] Test reward distribution
- [ ] Test custom goal setting

---

### Phase 6: Achievements System (3-4 hours)

#### 6.1 Achievements Definition

- [ ] Create `achievements.ts` data file
- [ ] Define 10 achievements with tiers:

  ```typescript
  interface Achievement {
    id: string
    name: string
    description: string
    tier: 'bronze' | 'silver' | 'gold' | 'platinum'
    criteria: AchievementCriteria
    reward: {
      xp: number
      neurons: number
    }
    icon: string
  }
  ```

- [ ] Examples:
  - "First Steps" (Bronze): Answer 1 question
  - "Knowledge Seeker" (Silver): Complete Module 1
  - "Master Learner" (Gold): 7-day streak
  - "AICA/PICA Master" (Platinum): 100% mastery

#### 6.2 Achievement Tracking

- [ ] Create achievement check system
- [ ] Run checks on:
  - Answer submission
  - Module completion
  - Daily login
  - Milestone events
- [ ] Update achievement progress
- [ ] Trigger unlock when criteria met

#### 6.3 Achievement Display

- [ ] Create `AchievementCard.tsx` component
- [ ] Show locked/unlocked state
- [ ] Display progress bar (if partially complete)
- [ ] Add unlock animation (confetti + modal)
- [ ] Create achievements gallery page

#### 6.4 Achievement Notifications

- [ ] Show toast notification on unlock
- [ ] Display achievement modal with details
- [ ] Award XP and neurons
- [ ] Add to achievement history

#### 6.5 Testing

- [ ] Test achievement unlock logic
- [ ] Test criteria checking
- [ ] Test reward distribution
- [ ] Test UI animations

---

### Phase 7: Enhanced Streaks (2 hours)

#### 7.1 Streak Visualization

- [ ] Enhance `StreakCounter.tsx` component
- [ ] Add fire emoji intensity based on streak:
  - 1-6 days: 🔥
  - 7-29 days: 🔥🔥
  - 30-99 days: 🔥🔥🔥
  - 100+ days: 🔥🔥🔥🔥
- [ ] Show motivational messages:
  - "Keep it burning!"
  - "You're on fire!"
  - "Unstoppable streak!"

#### 7.2 Streak Protection

- [ ] Implement streak freeze mechanic
- [ ] Buy freeze with neurons (50 neurons)
- [ ] Show freeze status in UI (🛡️ icon)
- [ ] Auto-apply freeze if available
- [ ] Limit freezes (max 3 active)

#### 7.3 Streak Rewards

- [ ] Award bonus neurons:
  - 7-day streak: 50 neurons
  - 30-day streak: 200 neurons
  - 100-day streak: 1000 neurons
- [ ] Show milestone celebration
- [ ] Track longest streak

#### 7.4 Testing

- [ ] Test streak increment logic
- [ ] Test freeze functionality
- [ ] Test reward distribution
- [ ] Test streak recovery

---

### Phase 8: Review Queue Dashboard (2 hours)

#### 8.1 Queue Visualization

- [ ] Create `ReviewQueue.tsx` component
- [ ] Show questions due today
- [ ] Display upcoming reviews (next 7 days)
- [ ] Group by module
- [ ] Color-code by mastery level

#### 8.2 Mastery Tracking

- [ ] Create `MasteryTracker.tsx` component
- [ ] Show 0-100% mastery per module
- [ ] Display overall mastery
- [ ] Show weak areas (mastery < 70%)
- [ ] Prioritize weak areas in review

#### 8.3 Progress Visualization

- [ ] Add retention curve graph
- [ ] Show learning velocity
- [ ] Display study time statistics
- [ ] Show questions answered over time

#### 8.4 Testing

- [ ] Test queue filtering
- [ ] Test mastery calculations
- [ ] Test data visualization
- [ ] Test performance with large datasets

---

## 🔧 Technical Implementation Notes

### State Management

```typescript
// context/HeartsContext.tsx
interface HeartsContextType {
  hearts: number
  maxHearts: number
  useHeart: () => boolean
  refillHeart: () => void
  buyHeart: (cost: number) => boolean
  timeUntilRefill: number
}

// context/NeuronsContext.tsx
interface NeuronsContextType {
  neurons: number
  earnNeurons: (amount: number, reason: string) => void
  spendNeurons: (amount: number, item: string) => boolean
  transactions: Transaction[]
}

// context/ReviewContext.tsx
interface ReviewContextType {
  dueQuestions: Question[]
  upcomingReviews: ReviewSchedule[]
  markReviewed: (questionId: string, confidence: number) => void
  mastery: Record<string, number>
}
```

### localStorage Schema

```typescript
interface LocalStorageSchema {
  hearts: {
    current: number
    lastRefill: string // ISO date
    freezesAvailable: number
  }
  neurons: {
    balance: number
    transactions: Transaction[]
  }
  reviews: {
    schedule: ReviewItem[]
    history: ReviewHistory[]
  }
  achievements: {
    unlocked: string[]
    progress: Record<string, number>
  }
  dailyGoals: {
    date: string // YYYY-MM-DD
    goals: Goal[]
    completed: string[]
  }
}
```

---

## 🧪 Testing Strategy

### Unit Tests

- [ ] Hearts refill logic
- [ ] Neurons earning/spending
- [ ] Spaced repetition algorithm
- [ ] Achievement criteria checking
- [ ] Streak tracking
- [ ] Goal progress calculation

### Integration Tests

- [ ] Hearts + Quiz flow
- [ ] Neurons + Shop flow
- [ ] Confidence + Review scheduling
- [ ] Achievements + Rewards flow
- [ ] Daily goals + Reset

### E2E Tests

- [ ] Complete quiz with hearts
- [ ] Buy hearts with neurons
- [ ] Schedule and complete review
- [ ] Unlock achievement
- [ ] Complete daily goals

---

## 📊 Success Criteria

### Phase 1-3 Complete When

- [ ] Hearts system fully functional
- [ ] Neurons earning/spending works
- [ ] Confidence rating integrated
- [ ] All state persists in localStorage
- [ ] UI animations smooth
- [ ] Tests passing (80%+ coverage)

### Phase 4-6 Complete When

- [ ] Review queue generates correctly
- [ ] Daily goals track progress
- [ ] Achievements unlock properly
- [ ] Dashboard shows all features
- [ ] Notifications trigger correctly
- [ ] Tests passing (80%+ coverage)

### Phase 7-8 Complete When

- [ ] Enhanced streaks display
- [ ] Review dashboard complete
- [ ] Mastery tracking works
- [ ] All features integrated
- [ ] Performance optimized
- [ ] Ready for user testing

---

## 🚀 Deployment Checklist

- [ ] All features implemented
- [ ] Tests passing (85%+ coverage)
- [ ] Performance optimized (<3s load time)
- [ ] Accessibility audit passed
- [ ] Mobile responsive verified
- [ ] localStorage migration tested
- [ ] Error boundaries in place
- [ ] Analytics events added
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Git commits clean and descriptive

---

## 📝 Git Commit Convention

```bash
# Feature additions
git commit -m "feat(hearts): implement hearts/lives system"
git commit -m "feat(neurons): add neurons currency and shop"
git commit -m "feat(confidence): integrate confidence rating"
git commit -m "feat(spaced-repetition): implement review scheduling"
git commit -m "feat(goals): add daily goals system"
git commit -m "feat(achievements): create 10-tier achievement system"

# Bug fixes
git commit -m "fix(hearts): correct refill timing calculation"

# Documentation
git commit -m "docs(ws2): add implementation plan"

# Tests
git commit -m "test(hearts): add unit tests for hearts system"

# Chores
git commit -m "chore(deps): update dependencies"
```

---

## 🔗 Related Documents

- [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md) - Beta roadmap
- [README_WEB_APP.md](./README_WEB_APP.md) - Migration overview
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Git workflow
- [GIT_SYNC_GUIDE.md](./GIT_SYNC_GUIDE.md) - Sync procedures

---

## 💡 Implementation Tips

1. **Start with Hearts** - It's the foundation for resource management
2. **Test incrementally** - Don't implement everything before testing
3. **Use TypeScript strictly** - Define interfaces first
4. **Commit frequently** - Small, atomic commits
5. **Update tests** - Write tests as you implement
6. **Check performance** - Profile on large datasets
7. **Test on mobile** - Ensure touch interactions work
8. **Consider edge cases** - Negative values, overflows, etc.

---

## 🎯 Next Steps After WS2

Once WS2 is complete, proceed to:

- **WS3: Analytics** - User behavior tracking
- **WS4: PWA** - Offline support
- **WS5: Images** - Anatomical diagrams
- **WS6: Skill Tree** - Visual progression

---

**Plan Created**: November 13, 2025
**Status**: 🔄 Ready for Implementation
**Estimated Time**: 18-24 hours
**Target Completion**: November 18, 2025

Let's build an amazing learning experience! 🚀
