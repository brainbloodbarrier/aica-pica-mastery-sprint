# AICA-PICA Mastery Sprint - Plano de Melhorias (Beta)

## 📊 Análise de Plataformas de Referência

### Brainscape - Spaced Repetition Excellence
- ✅ **Confidence-Based Repetition (CBR)**: Autoavaliação de confiança (1-5)
- ✅ **Adaptive Timing**: Revisão calculada antes do esquecimento
- ✅ **Metacognition**: Usuário avalia sua própria confiança
- ✅ **AI Flashcards**: Geração automática de conteúdo

### Duolingo - Gamification Mastery
- ✅ **Robust Streak System**: Incentivo diário com consequências
- ✅ **Dual Currency**: XP + Gems (moeda virtual)
- ✅ **Competitive Leaderboards**: Rankings semanais com promoção/rebaixamento
- ✅ **Adaptive Difficulty**: Ajuste baseado em performance
- ✅ **Microlessons**: Lições curtas (5-10min)
- ✅ **Social Competition**: Comparação com amigos
- ✅ **Power User Mechanics**: Interface que cria usuários engajados

## 🎯 Melhorias Planejadas

### 1. Sistema de Repetição Espaçada (Inspired by Brainscape)

#### 1.1 Confidence Rating System
**Status**: 🆕 Nova Feature

**Implementação**:
```typescript
// Adicionar após responder cada questão
interface ConfidenceRating {
  questionId: string
  correct: boolean
  confidence: 1 | 2 | 3 | 4 | 5 // 1=guessing, 5=absolutely sure
  timestamp: Date
}

// Algoritmo de repetição
function calculateNextReview(rating: ConfidenceRating): Date {
  const baseIntervals = {
    1: 1,      // 1 day
    2: 3,      // 3 days
    3: 7,      // 1 week
    4: 14,     // 2 weeks
    5: 30,     // 1 month
  }

  const interval = rating.correct
    ? baseIntervals[rating.confidence]
    : 0 // Immediate review if wrong

  return addDays(new Date(), interval)
}
```

**UI Changes**:
- After answering, show: "How confident were you?"
- 5 emoji buttons: 😰 (1) → 😐 (2) → 🙂 (3) → 😊 (4) → 🤩 (5)
- Store rating + schedule review

**Benefits**:
- Personalized learning pace
- Better long-term retention
- Metacognitive awareness

---

### 2. Review Mode (Spaced Repetition)

#### 2.1 Daily Review Queue
**Status**: 🆕 Nova Feature

**Features**:
- Dashboard shows "X questions due for review"
- Separate "Review" button besides "Learn"
- Mix of questions from all modules based on confidence ratings
- Prioritize low-confidence and forgotten items

#### 2.2 Review Statistics
- Show retention curve
- Mastery level per topic (0-100%)
- Weak areas highlighted

---

### 3. Enhanced Gamification (Inspired by Duolingo)

#### 3.1 Virtual Currency: "Neurons" 🧠
**Status**: 🆕 Nova Feature

**Earn Neurons**:
- +1 neuron per correct answer
- +5 neurons for perfect module (100%)
- +10 neurons for maintaining streak
- +20 neurons for level up

**Spend Neurons**:
- 💔 **Hearts System**: 5 hearts per day
  - Lose 1 heart per wrong answer
  - Refill 1 heart every 4 hours
  - Buy 5 hearts for 50 neurons
- 🔥 **Streak Freeze**: 200 neurons (protects 1 day)
- 🎯 **Skip Module** (if too hard): 500 neurons
- 🎨 **Cosmetic Items**: Profile badges, themes

#### 3.2 Weekly Leaderboard
**Status**: 🆕 Nova Feature

**Mechanics**:
- Bronze, Silver, Gold, Platinum, Diamond leagues
- Top 10 users promoted to next league
- Bottom 5 users relegated (except Bronze)
- XP resets weekly, but level/progress maintained
- Show position + XP difference to next rank

**UI**:
- Leaderboard tab in dashboard
- Profile avatars
- Country flags (optional)
- Weekly countdown timer

#### 3.3 Friends & Social Features
**Status**: 🔮 Future (requires backend)

- Add friends by code
- See friends' streaks and levels
- Friend leaderboard
- Challenge friends to specific modules

---

### 4. Adaptive Difficulty System

#### 4.1 Dynamic Question Selection
**Status**: ⚡ Enhancement

**Current**: All questions in module presented linearly
**New**: Adaptive based on performance

```typescript
function selectNextQuestion(userProgress: UserProgress): Question {
  const recentAccuracy = calculateRecentAccuracy(userProgress)

  if (recentAccuracy > 0.85) {
    return selectHardQuestion() // Challenge user
  } else if (recentAccuracy < 0.60) {
    return selectEasyQuestion() // Build confidence
  } else {
    return selectMediumQuestion() // Maintain flow
  }
}
```

#### 4.2 Performance-Based Module Unlock
**Current**: Require 80% to unlock next
**New**:
- 90%+ → Skip Level 2 (unlock Level 3 directly)
- 100% → +50% XP bonus
- <70% → Suggest review before advancing

---

### 5. Learning Experience Improvements

#### 5.1 Microlessons (5-10 min sessions)
**Status**: ⚡ Enhancement

**Current**: Modules have 5-33 questions
**New**:
- Break long modules into 5-question "lessons"
- Each lesson = 1 XP bar segment
- "Quick Review" button: 5 random questions (3min)
- "Daily Goal": Set target (10/20/30 questions per day)

#### 5.2 Explanation Modes
**Status**: ⚡ Enhancement

**Beginner Mode** (default):
- Full explanation after each question
- Source citations
- Related concepts

**Advanced Mode**:
- Concise explanation
- Only show if wrong
- Faster pacing

**Speed Run Mode**:
- No explanations during quiz
- Review at end
- Timer shown
- Leaderboard for fastest completion

#### 5.3 Visual Learning Aids
**Status**: 🆕 Nova Feature

- **Image Integration**: Show anatomical images from JSON
- **Interactive Diagrams**: Click to identify structures
- **Video Explanations**: Short clips for complex topics
- **3D Models**: (Future) Interactive brain anatomy

---

### 6. UI/UX Enhancements

#### 6.1 Modern UI Improvements

**Color System** (Medical + Modern):
```css
/* Current: Blue/Purple gradient */
/* New: Medical-inspired palette */

Primary: #0066CC (Medical Blue)
Secondary: #DC143C (Medical Red/Artery)
Accent: #00CED1 (Turquoise/Vein)
Success: #10B981 (Green)
Warning: #F59E0B (Amber)
Neutral: #6B7280 (Gray)

/* Dark Mode Support */
```

**Typography**:
- Headings: Inter (current) ✅
- Body: System font stack for readability
- Code/Medical Terms: Monospace for precision

#### 6.2 Animations & Micro-interactions

**Enhanced Feedback**:
- ✅ Correct: Gentle green pulse + checkmark
- ❌ Wrong: Subtle shake + red flash (não agressivo)
- Confetti: Only for major milestones (level up, module complete)
- Smooth page transitions (Framer Motion)

**Progress Indicators**:
- Animated circular progress (Apple-style)
- Skill trees (visual module progression)
- Achievement popups (toast notifications)

#### 6.3 Accessibility

**Features to Add**:
- Keyboard navigation (Tab, Enter, Arrow keys)
- Screen reader support (ARIA labels)
- High contrast mode
- Font size adjustment
- Dyslexia-friendly font option (OpenDyslexic)
- Color blind modes

---

### 7. Performance & Technical Improvements

#### 7.1 Code Quality

**Fix/Improve**:
- ✅ Add PropTypes/TypeScript strict mode
- ✅ Error boundaries for better error handling
- ✅ Loading states for all async operations
- ✅ Optimize images (WebP, lazy loading)
- ✅ Code splitting per route

#### 7.2 PWA Enhancement

**Make it Installable**:
- Manifest.json (icons, name, theme)
- Service Worker (offline support)
- Push notifications (daily reminders)
- Add to Home Screen prompt

#### 7.3 Analytics (Privacy-Friendly)

**Track for Improvement**:
- Completion rates per module
- Average time per question
- Drop-off points
- Most difficult questions
- Streak retention rate

---

### 8. Content Improvements

#### 8.1 Question Quality

**Add to Each Question**:
- ⭐ **Difficulty Rating**: Easy/Medium/Hard (actual, not assumed)
- 🎯 **Learning Objective**: "Tests: AICA segment identification"
- 📚 **Topic Tags**: ["AICA", "segments", "anatomy"]
- 🖼️ **Images**: Anatomical diagrams where relevant
- 🔗 **Related Questions**: "Review Q12, Q15 first"

#### 8.2 Explanation Quality

**Improve Format**:
```typescript
interface EnhancedExplanation {
  summary: string          // 1-2 sentences
  detailed: string         // Full explanation
  mnemonicDevice?: string  // Memory trick
  clinicalPearl?: string   // Clinical relevance
  commonMistake?: string   // Why distractors are wrong
  imageUrl?: string        // Anatomical diagram
  videoUrl?: string        // Optional video
  relatedQuestions: string[] // [q12, q15]
}
```

#### 8.3 Migrate All 130 Questions

**Priority Order**:
1. ✅ Module 1 (5 questions) - DONE
2. 🔄 Module 2: AICA Segments (10 questions)
3. 🔄 Module 3: AICA Clinical (10 questions)
4. 🔄 Module 4: PICA Segments (12 questions)
5. 🔄 Module 5: PICA Clinical (10 questions)
6. 🔄 Modules 6-10 (remaining 83 questions)

---

## 🎨 Visual Design Updates

### Homepage Redesign

**Current**: Feature list + stats
**New**:
- Hero with animated brain illustration
- "Start Learning" CTA more prominent
- Social proof: "Join 1,000+ medical students"
- Sample question preview
- Video demo/testimonial

### Dashboard Redesign

**Layout**:
```
┌─────────────────────────────────────────┐
│  [Avatar] Dr. Name    🔥 15  💎 Level 3 │
│  ━━━━━━━━━━━━━━━━ 85% to Level 4       │
├─────────────────────────────────────────┤
│  Today's Goal: ██████░░░░ 6/10 questions│
│  Review Due: 12 questions 🔔           │
│  Weekly XP: 350 (#12 in Gold League)   │
├─────────────────────────────────────────┤
│  [Module Grid - 3 columns]              │
│  [Achievements Strip at bottom]         │
└─────────────────────────────────────────┘
```

### Quiz Interface

**Improvements**:
- Larger text for better readability
- Progress bar top (always visible)
- Hearts/Lives indicator (top right)
- Timer (optional, for speed mode)
- Confidence slider after answer
- "Explain More" expandable section

---

## 📱 Mobile-First Optimizations

### Touch Interactions
- Swipe right: Next question
- Swipe left: Previous question
- Pull to refresh: Reload dashboard
- Haptic feedback on correct/wrong

### Mobile UI
- Bottom navigation (Home, Learn, Review, Profile)
- Thumb-friendly buttons
- Reduced animations on low-end devices
- Offline mode with service worker

---

## 🧪 A/B Testing Plan

### Metrics to Test

1. **Streak vs No Streak**
   - Hypothesis: Streaks increase 7-day retention
   - Target: +20% retention

2. **Hearts vs Unlimited Lives**
   - Hypothesis: Hearts increase engagement
   - Target: +15% DAU

3. **Confidence Rating vs Binary (Correct/Wrong)**
   - Hypothesis: Confidence improves retention
   - Target: +25% long-term recall

4. **Leaderboard vs Solo**
   - Hypothesis: Competition increases usage
   - Target: +30% time spent

---

## 🚀 Implementation Priority

### Phase 1: Beta MVP (Week 1-2) 🎯

**Must Have**:
- [x] Move legacy files to /legacy
- [x] Fix any TypeScript errors
- [ ] Add Hearts system (5 per day)
- [ ] Add Confidence rating (1-5) after each question
- [ ] Implement Review Queue
- [ ] Add Daily Goal setting
- [ ] Break modules into microlessons (5Q each)
- [ ] Improve mobile responsiveness
- [ ] Add keyboard navigation
- [ ] Update all documentation

**Nice to Have**:
- [ ] Dark mode
- [ ] Streak freeze (with neurons)
- [ ] Speed run mode

### Phase 2: Beta Launch (Week 3-4)

- [ ] Weekly leaderboard
- [ ] Virtual currency (Neurons)
- [ ] Skill tree visualization
- [ ] Migrate Modules 2-5 questions (42Q)
- [ ] Add images to questions
- [ ] PWA with offline support
- [ ] Privacy-friendly analytics

### Phase 3: Post-Beta (Month 2)

- [ ] Backend with PostgreSQL
- [ ] User accounts
- [ ] Friends system
- [ ] Social features
- [ ] Migrate remaining questions (83Q)
- [ ] Video explanations
- [ ] 3D models (future)
- [ ] Mobile apps (React Native)

---

## 📊 Success Metrics (Beta Goals)

| Metric | Current | Beta Target | Gold Standard |
|--------|---------|-------------|---------------|
| 7-Day Retention | N/A | 60% | 70% (Duolingo) |
| 30-Day Retention | N/A | 30% | 40% |
| Avg Session Time | N/A | 15 min | 20 min |
| Daily Active Users | N/A | 40% MAU | 50% |
| Module Completion | N/A | 70% | 80% |
| Streak Maintenance | N/A | 50% | 60% |

---

## 🔧 Technical Debt to Address

### Code Quality
- [ ] Add error boundaries
- [ ] Improve loading states
- [ ] Add unit tests (Jest + React Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Performance monitoring
- [ ] SEO optimization

### Database Design (Future)
```sql
-- User profiles
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  username TEXT,
  streak INT DEFAULT 0,
  neurons INT DEFAULT 0,
  level INT DEFAULT 1,
  xp INT DEFAULT 0
);

-- Question attempts with confidence
CREATE TABLE question_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  question_id TEXT,
  correct BOOLEAN,
  confidence INT CHECK (confidence >= 1 AND confidence <= 5),
  next_review_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leaderboards
CREATE TABLE leaderboard_entries (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  league TEXT, -- bronze, silver, gold, platinum, diamond
  weekly_xp INT,
  week_start DATE,
  rank INT
);
```

---

## 🎓 Pedagogical Improvements

### Learning Science Integration

1. **Spacing Effect**: Review questions at optimal intervals
2. **Testing Effect**: Active recall > passive review
3. **Interleaving**: Mix topics within review sessions
4. **Elaboration**: Force explanation (confidence rating)
5. **Dual Coding**: Images + text

### Content Strategy

- **Microlearning**: 5-10 min sessions max
- **Scaffolding**: Build complexity gradually
- **Immediate Feedback**: Never delay corrections
- **Mastery-Based**: Don't advance until solid
- **Metacognition**: Self-assessment (confidence)

---

## 📝 Documentation Updates Needed

- [ ] README.md: Add new features
- [ ] CONTRIBUTING.md: Guide for contributors
- [ ] API.md: Document data structures
- [ ] CHANGELOG.md: Version history
- [ ] DEPLOYMENT.md: Vercel + backend setup
- [ ] USER_GUIDE.md: How to use all features

---

## 💡 Future Ideas (Backlog)

- **AI Study Buddy**: ChatGPT-powered Q&A
- **Peer Learning**: User-generated questions
- **Certification**: Official PDF certificate
- **Institutional Licensing**: For medical schools
- **API Access**: For other platforms
- **Mobile Native Apps**: iOS + Android
- **VR/AR Mode**: Immersive 3D anatomy
- **Multi-language**: Translate to Spanish, Portuguese, etc.

---

**Next Steps**: Implement Phase 1 features for beta testing! 🚀
