# 🚀 DEPLOY WS2 NOW - Step-by-Step Guide

Follow these steps **in order** to deploy WS2 to production!

---

## 📋 Pre-Flight Checklist

- [x] Code complete (100%)
- [x] Tests passing (53/53)
- [x] Documentation ready
- [x] PR created (#5)
- [ ] CI checks passing
- [ ] Vercel account ready

---

## 🎯 Step 1: Check PR Status

```bash
# Check if CI is green
gh pr checks 5

# If all checks pass, continue
# If not, wait or fix issues
```

Current PR: <https://github.com/brainbloodbarrier/aica-pica-mastery-sprint/pull/5>

---

## 🚀 Step 2: Deploy to Staging

### Option A: Using Vercel CLI (Recommended)

```bash
cd web-app

# 1. Login to Vercel (first time only)
npx vercel login

# 2. Deploy to staging
npx vercel

# Answer the prompts:
# - Set up and deploy: Y
# - Which scope: (your account)
# - Link to existing project? N
# - Project name: aica-pica-ws2
# - Directory: ./
# - Override settings? N
```

You'll get a URL like: `https://aica-pica-ws2-xyz123.vercel.app`

### Option B: Using Vercel Dashboard

1. Go to <https://vercel.com>
2. Click "Add New Project"
3. Import from GitHub
4. Select `aica-pica-mastery-sprint`
5. Choose branch: `ws2-core-features`
6. Root directory: `web-app`
7. Framework: Next.js (auto-detected)
8. Click "Deploy"

---

## 🧪 Step 3: Test on Staging

### Quick Smoke Tests (5 minutes)

Open staging URL and test:

- [ ] **Homepage loads** - No errors
- [ ] **Dashboard opens** - `/dashboard`
- [ ] **Quiz starts** - `/module/1`
- [ ] **Hearts work** - Answer wrong, lose heart
- [ ] **Neurons earn** - Answer right, gain neurons
- [ ] **Mobile view** - Resize browser

### Full Test Suite (15 minutes)

```bash
# Run E2E tests against staging
cd web-app
CYPRESS_BASE_URL=https://your-staging-url.vercel.app npx cypress open

# Or headless
CYPRESS_BASE_URL=https://your-staging-url.vercel.app npx cypress run
```

### Manual UAT (30 minutes)

#### Test Scenario 1: New User

1. Clear localStorage
2. Visit staging URL
3. Start Module 1
4. Answer 3 questions (mix right/wrong)
5. Check hearts decreased
6. Check neurons increased
7. Check confidence rating appears
8. Visit dashboard
9. Check daily goals progress

✅ Pass Criteria: All features work, no console errors

#### Test Scenario 2: Gamification

1. Complete a module
2. Check achievement unlock
3. Set daily goal to "Easy"
4. Complete 5 questions
5. Claim daily goal reward
6. Buy heart with neurons
7. Check streak counter

✅ Pass Criteria: Gamification engaging, rewards work

#### Test Scenario 3: Persistence

1. Answer some questions
2. Close browser completely
3. Reopen staging URL
4. Check progress saved
5. Check neurons saved
6. Check hearts saved
7. Check streak maintained

✅ Pass Criteria: All data persists correctly

---

## ✅ Step 4: Merge PR

Once staging tests pass:

```bash
# Approve and merge
gh pr review 5 --approve --body "LGTM! Tested on staging ✅"
gh pr merge 5 --merge --subject "feat(ws2): merge core features to main"

# Pull latest main
git checkout main
git pull origin main
```

---

## 🚢 Step 5: Deploy to Production

### Using Vercel CLI

```bash
cd web-app

# Deploy to production
npx vercel --prod

# You'll see:
# 🎉 Production: https://aica-pica.vercel.app
```

### Using Vercel Dashboard

1. Go to your project dashboard
2. Click on the staging deployment
3. Click "Promote to Production"
4. Confirm

---

## 📊 Step 6: Monitor Production

### Immediate Checks (5 minutes)

- [ ] Production URL loads
- [ ] Test critical path (quiz flow)
- [ ] Check browser console for errors
- [ ] Test on mobile device
- [ ] Check performance (should load <3s)

### First Hour Monitoring

```bash
# Watch Vercel logs
npx vercel logs --follow

# Or in dashboard
# https://vercel.com/[your-account]/aica-pica/logs
```

Monitor for:

- Error spikes
- Slow responses
- 404s or 500s
- Memory issues

### Analytics Setup

Add to production (optional):

```javascript
// Add to app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

---

## 🎉 Step 7: Announce Launch

### Internal Announcement

```markdown
🎉 **WS2 Core Features - LIVE IN PRODUCTION!**

Team, I'm excited to announce that our gamification features are now live!

**What's New:**
- ❤️ Hearts/Lives system
- 🧠 Neurons currency
- 🎯 Daily goals
- 🏆 12 achievements
- 📚 Spaced repetition
- And much more!

**Try it out:** https://aica-pica.vercel.app

Please test and share feedback!
```

### User Communication

Update the app with a banner:

```tsx
// Add to app/page.tsx
<Banner>
  🎉 New: Gamification features are here!
  Earn neurons, unlock achievements, and track your progress!
</Banner>
```

---

## 🚨 Emergency Rollback (If Needed)

If critical issues arise:

### Quick Rollback (1 minute)

```bash
# Via CLI
cd web-app
npx vercel rollback

# Or in Dashboard
# Go to Deployments → Find last stable → Promote to Production
```

### Hotfix Process

```bash
# Create hotfix branch
git checkout main
git pull
git checkout -b hotfix/critical-issue

# Fix issue
# ... make changes ...

# Deploy hotfix
git add .
git commit -m "hotfix: resolve critical issue"
git push origin hotfix/critical-issue

# Deploy directly to production
npx vercel --prod
```

---

## 📈 Success Metrics

### Day 1 Goals

- [ ] 0 critical errors
- [ ] <1% error rate
- [ ] >99% uptime
- [ ] <3s load time
- [ ] 50+ users testing

### Week 1 Goals

- [ ] 500+ quiz completions
- [ ] 100+ achievements unlocked
- [ ] 50+ daily goals completed
- [ ] 80% positive feedback
- [ ] <5 bug reports

---

## 📞 Support Channels

### For Issues

- GitHub Issues: <https://github.com/brainbloodbarrier/aica-pica-mastery-sprint/issues>
- Vercel Support: <https://vercel.com/support>

### For Questions

- Check `/web-app/README.md`
- Review `/DEPLOYMENT_CHECKLIST.md`
- See `/WS2_COMPLETION_SUMMARY.md`

---

## 🎊 Celebrate

Once deployed successfully:

1. Take a screenshot of production
2. Share with the team
3. Monitor user feedback
4. Plan next features (WS3)
5. **Celebrate this huge achievement!** 🥳

---

**You're about to launch amazing features that will transform the learning experience!**

## 🚀 GO FOR LAUNCH! 🚀
