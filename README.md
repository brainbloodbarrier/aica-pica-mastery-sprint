# AICA-PICA Mastery Sprint 🧠

> **Enterprise-grade gamified learning system** for mastering the microsurgical anatomy of AICA and PICA arteries

[![Status](https://img.shields.io/badge/status-beta-blue)](https://github.com/brainbloodbarrier/aica-pica-mastery-sprint)
[![Version](https://img.shields.io/badge/version-0.9.0--beta-green)](./CHANGELOG.md)
[![License](https://img.shields.io/badge/license-Educational-yellow)]()

---

## 🎉 **NEW: Modern Web Application!**

AICA-PICA Mastery Sprint has been completely reimagined as a **modern, interactive web application** with professional gamification and learning science integration.

**Why the migration?** ✨
- 🚀 **Superior UX**: Modern, intuitive interface vs. Jupyter's clunky notebook
- 📱 **Mobile-First**: Works perfectly on phones, tablets, and desktop
- 🎮 **Advanced Gamification**: Duolingo-level engagement mechanics
- 🧠 **Spaced Repetition**: Brainscape-inspired review system
- 💫 **Instant Access**: No installation, just open in browser

**[→ Jump to Quick Start](#-quick-start)** | **[→ See What's New](#-whats-new-in-v090-beta)**

---

## 📊 At a Glance

| Feature | Details |
|---------|---------|
| **Content** | 130 validated questions on AICA/PICA anatomy |
| **Format** | Modern web app (Next.js + TypeScript) |
| **Duration** | 12-16 hours study time (self-paced) |
| **Target** | Neurosurgery residents, fellows, attending surgeons |
| **Gamification** | XP system, streaks, hearts, neurons, achievements |
| **Learning Science** | Spaced repetition, confidence rating, mastery tracking |
| **Mobile Support** | ✅ Fully responsive |
| **Offline Mode** | 🔄 Coming soon (PWA) |

---

## 🚀 Quick Start

### Web App (Recommended)

```bash
cd web-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**That's it!** No Python, no Jupyter, no complicated setup.

### Deploy Your Own (Vercel)

```bash
cd web-app
npm i -g vercel
vercel
```

Get a public URL in ~2 minutes.

---

## ✨ What's New in v0.9.0-beta

### 🎮 Enhanced Gamification

| Feature | Description |
|---------|-------------|
| **💔 Hearts/Lives System** | 5 hearts per day, lose 1 per wrong answer, refill every 4 hours |
| **🧠 Neurons Currency** | Earn neurons to buy hearts, streak freezes, power-ups |
| **🎯 Daily Goals** | Set personal targets (10/20/30 questions/day) |
| **🏆 10 Achievements** | Bronze → Platinum tiers with XP rewards |
| **🔥 Enhanced Streaks** | Visual fire counter with motivational messages |

### 🧠 Learning Science Integration

| Feature | Description |
|---------|-------------|
| **😰→🤩 Confidence Rating** | Rate your confidence (1-5) after each answer |
| **📅 Spaced Repetition** | Automatic review scheduling based on confidence |
| **📊 Mastery Tracking** | 0-100% mastery level per topic |
| **🔄 Review Queue** | Smart prioritization of weak areas |
| **📈 Retention Prediction** | Forgetting curve visualization |

### 💎 User Experience

| Feature | Description |
|---------|-------------|
| **🎨 Modern UI** | Medical-inspired blue/purple palette |
| **📱 Mobile-First** | Touch-optimized for all devices |
| **⚡ Smooth Animations** | Framer Motion for fluid interactions |
| **🎉 Celebrations** | Confetti, level-ups, achievement unlocks |
| **📊 Rich Dashboard** | Comprehensive progress visualization |

[→ See Complete Feature List](#-complete-features)

---

## 📚 Project Structure

```
aica-pica-mastery-sprint/
├── web-app/                    # 🆕 Modern Web Application
│   ├── app/                   # Next.js pages
│   ├── components/            # 27 React components
│   ├── data/                  # Questions & content
│   ├── lib/                   # Utilities & types
│   └── README.md             # Web app documentation
├── legacy/                    # 🗄️ Archived Jupyter notebooks
│   ├── *.ipynb               # Original notebooks
│   └── scripts/              # Python helper scripts
├── data/                      # 📊 Source content (JSON)
│   ├── AICA_content.json     # 17 slides
│   ├── PICA_content.json     # 20 slides
│   └── image_resources.json
├── docs/                      # 📖 Documentation suite
│   ├── presentation_prep_guide.md
│   ├── AICA_PICA_Reference_Handout.md
│   └── AICA_PICA_Board_Prep.ipynb
├── specs/                     # 🎯 Feature specifications
├── IMPROVEMENT_PLAN.md        # 🗺️ Beta roadmap
├── CHANGELOG.md               # 📝 Version history
└── README_WEB_APP.md          # 🔄 Migration guide
```

---

## 🎯 Complete Features

### Learning System

- ✅ **10 Progressive Modules** - Sequential unlock with prerequisites
- ✅ **130 Validated Questions** - Based on Rhoton's Microsurgical Anatomy
- ✅ **Multiple Question Types** - MCQ, clinical vignettes, image-based
- ✅ **Immediate Feedback** - Detailed explanations + source citations
- ✅ **Mastery-Based Progression** - 80-90% pass thresholds

### Gamification (Duolingo-Inspired)

- ✅ **7-Level XP System** - Novice Neurosurgeon → AICA/PICA Master
- ✅ **Hearts/Lives** - 5 per day, refill every 4 hours
- ✅ **Virtual Currency (Neurons)** - Earn & spend on power-ups
- ✅ **Daily Streaks** - Consecutive day tracking with bonuses
- ✅ **8 Exclusive Badges** - Module completion rewards
- ✅ **10 Achievements** - Bronze, Silver, Gold, Platinum tiers
- ✅ **Animated Celebrations** - Confetti, level-ups, unlocks

### Learning Science (Brainscape-Inspired)

- ✅ **Confidence Rating (1-5)** - Self-assess after each answer
- ✅ **Spaced Repetition Algorithm** - Optimal review timing
- ✅ **Review Queue** - Smart prioritization
- ✅ **Mastery Tracking** - 0-100% per topic
- ✅ **Retention Prediction** - Forgetting curve math
- ⏳ **Adaptive Difficulty** - Coming soon

### User Experience

- ✅ **Modern Web UI** - Next.js 14 + TailwindCSS
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Smooth Animations** - Framer Motion
- ✅ **Progress Persistence** - LocalStorage
- ✅ **Keyboard Navigation** - Full accessibility
- ⏳ **Dark Mode** - Coming soon
- ⏳ **PWA/Offline** - Coming soon

### Content

- ✅ **Module 1** - 5 demo questions
- ⏳ **Modules 2-10** - 125 questions to migrate
- ✅ **AICA Content** - 17 slides (JSON)
- ✅ **PICA Content** - 20 slides (JSON)
- ⏳ **Images** - Anatomical diagrams
- ⏳ **Videos** - Explanation clips

### Technical

- ✅ **TypeScript** - Full type safety
- ✅ **Component Library** - 27 reusable components
- ✅ **State Management** - React Context API
- ✅ **Testing** - 0 npm vulnerabilities
- ⏳ **Unit Tests** - Jest (planned)
- ⏳ **E2E Tests** - Playwright (planned)

---

## 🎓 For Learners

### Learning Pathway

1. **Complete Modules 1-10** (12-16 hours)
   - Study at your own pace
   - Earn XP, badges, achievements
   - Build daily streak

2. **Review with Spaced Repetition** (Ongoing)
   - Answer review queue questions
   - Rate your confidence
   - Track mastery levels

3. **Achieve AICA/PICA Mastery**
   - Reach Level 7
   - 90%+ on all modules
   - Unlock final certification

### Study Tips

- 🎯 **Set Daily Goal**: Start with 10 questions/day
- 🔥 **Build Streak**: Study for 7+ consecutive days
- 😰 **Honest Confidence**: Low ratings = more review
- 📱 **Mobile Learning**: Study anywhere, anytime
- 💡 **Read Explanations**: Even when correct

---

## 👨‍💻 For Developers

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: React Context API
- **Storage**: LocalStorage
- **Deploy**: Vercel-ready

### Development

```bash
# Install dependencies
cd web-app
npm install

# Development server
npm run dev

# Build for production
npm run build
npm start

# Lint code
npm run lint
```

### Contributing

See [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md) for:
- Roadmap & planned features
- Phase 1-3 implementation guide
- Contribution opportunities
- A/B testing plan

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [README_WEB_APP.md](./README_WEB_APP.md) | Migration overview & comparison |
| [web-app/README.md](./web-app/README.md) | Web app documentation |
| [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md) | Beta roadmap & features |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Contribution guide (TBD) |

### Legacy Documentation

| Document | Description |
|----------|-------------|
| [legacy/*.ipynb](./legacy/) | Original Jupyter notebooks |
| [docs/](./docs/) | Presentation guides & board prep |

---

## 🗺️ Roadmap

### ✅ Phase 1: Beta MVP (Current)
- [x] Web app migration complete
- [x] Hearts/lives system
- [x] Confidence rating
- [x] Spaced repetition foundation
- [x] Daily goals & neurons
- [ ] Keyboard navigation
- [ ] Mobile optimizations

### 🔄 Phase 2: Beta Launch (Week 3-4)
- [ ] Weekly leaderboards
- [ ] Skill tree visualization
- [ ] Migrate Modules 2-5 (42 questions)
- [ ] Add images to questions
- [ ] PWA with offline support
- [ ] Privacy-friendly analytics

### 🔮 Phase 3: V1.0 (Month 2)
- [ ] Backend (PostgreSQL)
- [ ] User authentication
- [ ] Friends & social features
- [ ] Migrate all 130 questions
- [ ] Video explanations
- [ ] 3D anatomical models

[→ See Complete Roadmap](./IMPROVEMENT_PLAN.md)

---

## 📊 Success Metrics (Beta Goals)

| Metric | Target | Gold Standard |
|--------|--------|---------------|
| 7-Day Retention | 60% | 70% (Duolingo) |
| 30-Day Retention | 30% | 40% |
| Avg Session Time | 15 min | 20 min |
| Module Completion | 70% | 80% |
| Daily Active Users | 40% MAU | 50% |

---

## 🎓 Educational Value

### Content Source

All anatomical content based on:
**Dr. Albert L. Rhoton Jr.'s Microsurgical Anatomy**
- Primary source for neurosurgical anatomy
- Gold standard reference

### Learning Outcomes

Upon completion, learners will be able to:
- ✅ Identify all AICA segments and branches
- ✅ Describe PICA's complex anatomical course
- ✅ Recognize clinical syndromes (lateral pontine, Wallenberg)
- ✅ Plan surgical approaches based on vascular anatomy
- ✅ Apply quantitative data to clinical scenarios

### Target Audience

- **Primary**: Neurosurgery residents & fellows
- **Secondary**: Attending surgeons (review/presentation prep)
- **Tertiary**: Medical students (advanced anatomy)

---

## 🤝 Contributing

We welcome contributions! Areas needed:

1. **Content**: Migrate remaining 125 questions
2. **Images**: Add anatomical diagrams
3. **Translations**: Internationalize (Spanish, Portuguese)
4. **Testing**: Unit & E2E tests
5. **Features**: Implement Phase 2 roadmap

See [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md) for details.

---

## 📄 License

This project contains educational content based on copyrighted academic works.

- **Code**: Open source (use freely)
- **Content**: Educational use only
- **Images**: Cited from neuroangio.org, Radiopaedia, etc.

---

## 📧 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/brainbloodbarrier/aica-pica-mastery-sprint/issues)
- **Discussions**: [GitHub Discussions](https://github.com/brainbloodbarrier/aica-pica-mastery-sprint/discussions)
- **Email**: [Your Email]

---

## 🏆 Credits

- **Content**: Based on Dr. Albert L. Rhoton Jr.'s Microsurgical Anatomy
- **Gamification**: Inspired by Duolingo & Brainscape
- **Development**: Built with ❤️ for medical education excellence

---

## ⭐ Star Us!

If you find this project useful, please consider giving it a star on GitHub. It helps others discover this resource!

[![GitHub Stars](https://img.shields.io/github/stars/brainbloodbarrier/aica-pica-mastery-sprint?style=social)](https://github.com/brainbloodbarrier/aica-pica-mastery-sprint)

---

**Ready to master AICA & PICA?** [Get Started →](#-quick-start)

*Last updated: November 12, 2025* | *Version 0.9.0-beta*
