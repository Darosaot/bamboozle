# Bamboozle Baby Deluxe - Application Review & Feature Specification

## Executive Summary

Bamboozle Baby Deluxe is a Spanish-language trivia game about babies, pregnancy, and parenting, built with React 18 + Vite on the frontend and Netlify Functions + PostgreSQL (Neon) on the backend. The app features solo and 2-player modes, power-ups, random event cards, leaderboards, achievements, daily streaks, daily challenges, and a referral system.

The codebase has a solid foundation with good content (70+ questions, 31 Wango cards, 15 sabotage cards, 28 achievements) and a playful visual design. However, it has significant gaps in **reliability**, **security**, **accessibility**, **testing**, and **performance** that need addressing before it can be considered production-ready.

This document catalogs every issue found and specifies the changes needed, organized by priority.

---

## Table of Contents

1. [Critical Bugs](#1-critical-bugs)
2. [Security & Anti-Cheat](#2-security--anti-cheat)
3. [State Management & Race Conditions](#3-state-management--race-conditions)
4. [Error Handling & Reliability](#4-error-handling--reliability)
5. [Accessibility (a11y)](#5-accessibility-a11y)
6. [Testing](#6-testing)
7. [Performance](#7-performance)
8. [UX Improvements](#8-ux-improvements)
9. [Feature Completions](#9-feature-completions)
10. [New Features](#10-new-features)
11. [Code Quality & Maintainability](#11-code-quality--maintainability)
12. [Infrastructure & DevOps](#12-infrastructure--devops)

---

## 1. Critical Bugs

### 1.1 Timezone Bug in Daily Streak (`src/utils/dailyStreak.js:45-57`)

**Problem:** `getTodayString()` and `getYesterdayString()` use `toISOString().split('T')[0]`, which returns the UTC date, not the user's local date. A player at UTC-8 playing at 11 PM local time will have their date recorded as the next UTC day. Playing again 2 hours later (still the same local day) will incorrectly extend their streak, or worse, break it entirely for players in positive UTC offsets.

**Fix:** Replace `toISOString()` with local date construction:
```js
const getTodayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
```

### 1.2 Broken Dynamic Tailwind Classes (`src/components/PlayerStats.jsx`)

**Problem:** Template literal class names like `` p-${isSolo ? '6' : '4'} `` are not detected by Tailwind's JIT compiler. The classes `p-6` and `p-4` will not be generated in the CSS output, so the component will always use default padding.

**Fix:** Use conditional full class names:
```js
className={`rounded-2xl shadow-xl ${isSolo ? 'p-6' : 'p-4'} ...`}
```

### 1.3 Daily Bonus Applied Inconsistently (`src/components/GameApp.jsx:132-145`)

**Problem:** In 2-player mode, the `dailyBonusApplied` flag is set to `true` after applying the bonus to player 1, so the second `if` block for player 2 never executes. Player 2 never receives the daily bonus.

**Fix:** Either apply bonus to both players in a single block, or use separate flags per player.

### 1.4 ResultsScreen Reports Success on Failed Saves (`src/components/ResultsScreen.jsx:24-64`)

**Problem:** The score save `fetch` call doesn't check `response.ok`. A 500 error from the server still triggers `setSaved(true)`, showing "Puntuacion guardada" when the score was actually lost.

**Fix:** Check `response.ok` and set an error state when the save fails, with retry UI.

---

## 2. Security & Anti-Cheat

### 2.1 Score Limits Are 6-10x Too High (`netlify/functions/save-score.js:49-53`)

**Problem:** The anti-cheat max scores are:
- Easy: 15,000 (realistic max ~2,400 for 8 rounds)
- Normal: 20,000 (realistic max ~4,000 for 10 rounds)
- Hard: 30,000 (realistic max ~7,200 for 12 rounds)

A cheater can submit any score up to these inflated limits.

**Fix:** Calculate realistic maximums: `rounds * maxBasePoints * maxMultipliers + maxBonuses`. Set limits at 2x the theoretical maximum to allow for Wango card bonuses but still catch fabricated scores.

### 2.2 `add-score.js` Has No Score Validation at All (`netlify/functions/add-score.js`)

**Problem:** This legacy endpoint accepts any score value, any player name length, and no enum validation on difficulty/gameMode. It's a complete bypass of the validation in `save-score.js`.

**Fix:** Either remove this endpoint (it's redundant with `save-score.js`) or add matching validation.

### 2.3 Internal Error Messages Exposed to Clients

**Problem:** Multiple Netlify functions return `error.message` in the response body (`save-score.js:97`, `complete-challenge.js:94-102`). This leaks stack traces, database details, and internal error context.

**Fix:** Return generic error messages in production. Log details server-side only.

### 2.4 No Rate Limiting on API Endpoints

**Problem:** No rate limiting on any endpoint. A malicious user can flood `save-score`, `create-referral`, or `complete-challenge` with automated requests.

**Fix:** Add rate limiting via Netlify Edge Functions or a middleware layer. Start with IP-based throttling (e.g., 10 score saves per minute per IP).

### 2.5 Referral Code Generation Is Inefficient (`netlify/functions/create-referral.js:40-56`)

**Problem:** Code generation uses a loop with up to 10 attempts, making 2 DB queries per attempt. If collisions increase as the user base grows, this becomes unreliable.

**Fix:** Use the database's UNIQUE constraint and catch duplicate key errors to retry, or use UUID-based codes that are practically collision-free.

---

## 3. State Management & Race Conditions

### 3.1 Uncancelled Timeouts Across GameApp (`src/components/GameApp.jsx`)

**Problem:** 17+ `setTimeout` calls are scattered throughout `GameApp.jsx` (lines 206, 213, 217, 223, 229, 247, 249, 276, 302, 451, 465) with no cleanup. If the user quits mid-game or the component unmounts, orphaned timers continue executing, causing:
- State updates on unmounted components (React warnings)
- Corrupt game state if a new game starts before timers fire

**Fix:** Store all timeout IDs in a ref array and clear them on unmount via `useEffect` cleanup. Or use a custom `useSafeTimeout` hook.

### 3.2 Rapid-Click Race Condition in `handleAnswer` (`src/components/GameApp.jsx:168-233`)

**Problem:** Nested `setTimeout` chains (1500ms + 2500ms) for card effects can stack if the user answers questions faster than the timeouts resolve. This corrupts score calculations and card display.

**Fix:** Add a `processingAnswer` state flag that blocks new answers until the current answer's full chain completes. Disable the answer buttons during this period.

### 3.3 Stale Closure in `usePlayer.resetPlayer` (`src/hooks/usePlayer.js:56-64`)

**Problem:** `resetPlayer` reads `player.name` from the closure, which may be stale if called during a rapid state transition.

**Fix:** Use functional `setState`:
```js
setPlayer(prev => ({ ...INITIAL_PLAYER_STATE, name: prev.name, lives, timeLeft, ... }));
```

### 3.4 `useTimer` Re-fires Due to Unstable `onTimeUp` Reference (`src/hooks/useTimer.js`)

**Problem:** `onTimeUp` is in the dependency array, but its reference changes every render in `GameApp.jsx`. This causes the timer effect to re-execute more often than necessary and can trigger `onTimeUp()` multiple times when `timeLeft === 0`.

**Fix:** Wrap `onTimeUp` in `useCallback` in GameApp, or use a ref inside `useTimer` to hold the latest callback.

### 3.5 Question Pool Reset Timing Issue (`src/hooks/useQuestions.js:29-56`)

**Problem:** When all questions are exhausted, `setUsedQuestions([])` is called but the current render still uses the old `filteredQuestions`. The first question after reset may be a duplicate.

**Fix:** When resetting, immediately select from the full pool rather than the stale filtered reference.

---

## 4. Error Handling & Reliability

### 4.1 No `response.ok` Checks on Any Frontend Fetch Call

**Affected files:**
- `src/components/ResultsScreen.jsx` - score saving
- `src/components/Leaderboard.jsx` - leaderboard loading
- `src/components/DailyChallengeCard.jsx` - challenge loading
- `src/components/ReferralCard.jsx` - referral operations
- `src/db/index.js` - score operations

**Fix:** Add `if (!response.ok) throw new Error(...)` after every `fetch()` call.

### 4.2 No Request Timeouts

**Problem:** No `AbortController` timeouts on any fetch call. On a slow network, requests hang indefinitely with no user feedback.

**Fix:** Add `AbortController` with a 15-second timeout to all API calls. Show a timeout-specific error message.

### 4.3 No Retry Mechanism for Failed API Calls

**Problem:** Score saves, leaderboard fetches, and challenge completions fail silently or show a generic error with no retry option (except Leaderboard which has a retry button).

**Fix:** Add retry logic with exponential backoff for critical operations (score saves). Add retry buttons for user-facing data loads.

### 4.4 Race Condition in ReferralCard Fetch (`src/components/ReferralCard.jsx:14-45`)

**Problem:** If `playerName` changes while a fetch is in progress, the second fetch can overwrite the first, showing stale data.

**Fix:** Use `AbortController` to cancel in-flight requests when dependencies change.

### 4.5 `AudioContext.close()` Called Multiple Times (`src/hooks/useSounds.js:156-162`)

**Problem:** If the component unmounts and remounts, closing the AudioContext a second time throws an error.

**Fix:** Check `audioContextRef.current.state !== 'closed'` before calling `.close()`.

---

## 5. Accessibility (a11y)

### 5.1 No Semantic HTML Landmarks in Game Components

**Problem:** `GameScreen.jsx`, `ResultsScreen.jsx`, `ModeSelection.jsx` use only `<div>` elements. Screen readers cannot navigate by regions.

**Fix:** Use `<main>`, `<section>`, `<article>`, `<nav>` appropriately. Add `role` attributes where semantic elements aren't suitable.

### 5.2 Missing ARIA Labels on Interactive Elements

**Affected components:**
- `QuestionCard.jsx` - answer buttons lack `aria-label`
- `PowerUps.jsx` - buttons don't describe what the power-up does
- `Leaderboard.jsx` - filter `<select>` elements lack associated `<label>`
- `CategorySelector.jsx` - category buttons lack context

**Fix:** Add descriptive `aria-label` attributes. Add `<label>` elements for all form controls.

### 5.3 Icons Not Hidden from Screen Readers

**Problem:** Lucide React icons (e.g., `<User>`, `<Trophy>`, `<Star>`) don't have `aria-hidden="true"`, so screen readers attempt to read them.

**Fix:** Add `aria-hidden="true"` to all decorative icons. Add `aria-label` to icons used as the sole content of buttons.

### 5.4 No Focus Management

**Problem:**
- No focus trap in navigation menu overlay
- No focus return after closing dialogs (`QuitConfirmDialog`)
- Skip-to-main-content link exists but `#main-content` target focus is not managed

**Fix:** Implement focus trapping in modal dialogs. Return focus to trigger element when dialogs close.

### 5.5 Color-Only Differentiation

**Problem:** Leaderboard top-3 entries and some card effects use color alone to convey meaning. Colorblind users cannot distinguish them.

**Fix:** Add icons, borders, or text labels alongside color to convey status.

### 5.6 No `prefers-reduced-motion` Respect

**Problem:** Animations and transitions run regardless of user motion preferences.

**Fix:** Add `@media (prefers-reduced-motion: reduce)` overrides to disable/simplify animations.

---

## 6. Testing

### 6.1 No Tests for GameApp.jsx (HIGH)

The 578-line central game orchestrator has zero test coverage. State transitions, card effects, player switching, round progression, and two-player logic are all untested.

**Spec:** Write integration tests covering:
- Solo game flow: setup -> answer questions -> results
- Two-player flow: alternating turns, score comparison
- Power-up usage (50/50, skip, time freeze)
- Wango/Sabotage card triggering and effect application
- Daily bonus application
- Game over conditions (lives lost, rounds completed)

### 6.2 No Tests for Custom Hooks (MEDIUM)

`useTimer`, `usePlayer`, `useQuestions`, `useSounds` are all untested.

**Spec:** Use `@testing-library/react` `renderHook` to test:
- `useTimer`: countdown behavior, onTimeUp callback, cleanup
- `usePlayer`: score updates, lives management, power-up usage, reset
- `useQuestions`: category filtering, question pool exhaustion, reset behavior
- `useSounds`: toggle behavior, sound generation (mock AudioContext)

### 6.3 No Tests for Netlify Functions (HIGH)

Backend validation, database operations, and error handling are untested.

**Spec:** Add unit tests for each function:
- `save-score`: valid/invalid inputs, score limits, SQL injection attempts
- `get-leaderboard`: filtering, pagination, edge cases
- `create-referral`: code generation, duplicate handling
- `complete-challenge`: completion validation, duplicate prevention
- Mock `@netlify/neon` for database operations

### 6.4 Insufficient Data Validation Tests

Current tests check structure but not:
- Duplicate correct answers within a question
- Empty or whitespace-only option strings
- `correct` index out of bounds (not 0-3)
- Points values outside difficulty range

**Spec:** Extend `questions.test.js` with these checks.

### 6.5 No End-to-End Tests

**Spec:** Add Playwright or Cypress E2E tests for:
- Complete solo game flow
- Complete 2-player game flow
- Leaderboard viewing and filtering
- Achievement unlocking

---

## 7. Performance

### 7.1 No Component Memoization

**Problem:** `GameScreen`, `QuestionCard`, `PlayerStats`, and other components receive new object/function references on every render of `GameApp`. Every state change in the parent triggers a full re-render of the entire component tree.

**Fix:**
- Wrap child components in `React.memo()`
- Use `useCallback` for event handlers passed as props
- Use `useMemo` for computed objects (player state, question data)

### 7.2 No Code Splitting for Game Components

**Problem:** Pages use `React.lazy()` but game components (`GameApp`, `GameScreen`, `QuestionCard`, etc.) are all eagerly loaded.

**Fix:** Lazy-load the `GameApp` component and its heavy children. The user sees `ModeSelection` first, so game components can load in the background.

### 7.3 No Service Worker / Offline Support

**Problem:** No PWA capabilities. App fails completely without network.

**Fix:** Add a service worker for:
- Static asset caching
- Offline fallback page
- API response caching for leaderboard data

### 7.4 Leaderboard Loads All 50 Entries Without Pagination

**Problem:** Single fetch of 50 items with no virtual scrolling or pagination.

**Fix:** Add pagination (10 items per page) or virtual scrolling for larger datasets.

### 7.5 Questions/Cards Data Loaded Eagerly

**Problem:** All 70+ questions, 31 Wango cards, and 15 sabotage cards are imported at module level, included in the initial bundle.

**Fix:** Dynamic import these data files when the game actually starts.

---

## 8. UX Improvements

### 8.1 Add First-Time User Onboarding

**Problem:** New users land on `ModeSelection` with no explanation of power-ups, Wango cards, or sabotage mechanics.

**Spec:** Add an optional tutorial overlay that appears on first visit (tracked via localStorage). Show 3-4 slides explaining: game modes, power-ups, Wango cards, scoring. Include a "Skip" button.

### 8.2 Improve Game Transition Feedback

**Problem:** After answering a question, there's a delay with nested timeouts before the next question appears. No visual indicator of what's happening.

**Spec:** Add a transition state indicator: "Processing answer..." -> "Wango Card!" (if triggered) -> "Next question..." with animated transitions.

### 8.3 Add Confirmation Before Leaving Game

**Problem:** No browser `beforeunload` event listener. Users can accidentally close the tab and lose their game progress.

**Spec:** Add `window.addEventListener('beforeunload', ...)` during active games.

### 8.4 Improve PlayerSetup Category Selection UX

**Problem:** Category selection doesn't have a "Select All" / "Deselect All" toggle. It's unclear if selection is required.

**Spec:** Add toggle buttons and a help text: "Selecciona las categorias (deja vacio para todas)".

### 8.5 Add Sound Volume Control

**Problem:** Sound is only toggle on/off. No volume slider.

**Spec:** Add a volume slider (0-100%) stored in localStorage.

### 8.6 Show Achievement Progress

**Problem:** `AchievementsPage` shows locked/unlocked status but not progress toward locked achievements (e.g., "3/5 games played toward 'Jugador Dedicado'").

**Spec:** Add progress bars to locked achievements showing how close the player is.

### 8.7 Add Countdown to Next Daily Challenge

**Problem:** `DailyChallengeCard` shows today's challenge but no countdown to when the next one appears.

**Spec:** Add a timer showing "Proximo desafio en: HH:MM:SS".

### 8.8 Add Toast Notifications

**Problem:** Achievement unlocks, streak bonuses, and score saves have inconsistent notification patterns.

**Spec:** Implement a toast notification system for transient messages (achievements unlocked, bonus applied, score saved, errors).

---

## 9. Feature Completions

### 9.1 Complete the Referral System

**Problem:** `ReferralCard` generates codes and shows stats, but there's no clear UI for a referred player to enter a referral code. The bonus redemption flow is incomplete.

**Spec:**
- Add a "Tengo un codigo de referencia" input in `PlayerSetup`
- Show the referral bonus in the results screen
- Add notifications when your referral code is used

### 9.2 Complete Social Sharing

**Problem:** `SocialShare` component is imported in `ResultsScreen` but the sharing functionality may not work on all platforms. No preview of shared content.

**Spec:**
- Verify Web Share API fallback to clipboard copy
- Add shareable result images (canvas-based)
- Test on iOS Safari, Android Chrome, desktop browsers

### 9.3 Complete Daily Challenge Integration

**Problem:** Daily challenges are created server-side but there's no clear indicator on the main screen of completion status or progress toward the target score during gameplay.

**Spec:**
- Show daily challenge target score in GameScreen when playing a challenge
- Show completion status on ModeSelection (checkmark if completed today)
- Add a mini-leaderboard for today's challenge

### 9.4 Newsletter Signup Needs Backend

**Problem:** `NewsletterSignup` component exists but there's no Netlify function to handle signups. Form submissions go nowhere.

**Spec:** Either connect to a mailing list service (Mailchimp, Buttondown) or remove the component to avoid misleading users.

---

## 10. New Features

### 10.1 User Accounts (Authentication)

**Priority:** High
**Rationale:** Currently players are identified only by name (no uniqueness guarantee). Stats are localStorage-only and don't persist across devices.

**Spec:**
- Add optional authentication via Netlify Identity or Auth.js
- Link scores, achievements, stats, and streaks to authenticated accounts
- Add data sync across devices
- Maintain anonymous play as a fallback

### 10.2 Tournament Mode

**Priority:** Medium
**Rationale:** FAQ page already mentions "modo torneo" as a planned feature.

**Spec:**
- Create bracket-style tournaments for 4-8 players
- Single-elimination format
- Each match is a head-to-head round of questions
- Show bracket progression visually
- Save tournament results to leaderboard

### 10.3 Study Mode

**Priority:** Medium
**Rationale:** FAQ mentions "modo estudio" as planned. Aligns with the educational mission.

**Spec:**
- Untimed mode with no scoring
- Show correct answer and explanation after each question
- Allow bookmarking questions for later review
- Track which questions are frequently missed
- Add category-specific practice sessions

### 10.4 Question Explanations

**Priority:** Medium
**Rationale:** Educational value is limited when players don't understand why an answer is correct.

**Spec:**
- Add an `explanation` field to each question in `questions.js`
- Show explanation after answering (both correct and incorrect)
- Include links to educational resources where relevant

### 10.5 More Questions & Question Categories

**Priority:** Medium
**Rationale:** 70 questions is small; regular players will cycle through them quickly.

**Spec:**
- Expand to 200+ questions
- Add new categories: seguridad (safety), primeros auxilios (first aid), lactancia (breastfeeding), hitos del desarrollo (milestones)
- Add difficulty tiering within categories
- Consider a question submission system for community contributions

### 10.6 Localization / Multi-Language Support

**Priority:** Low
**Rationale:** All content is Spanish-only. Adding English would dramatically increase the addressable audience.

**Spec:**
- Add i18n library (react-i18next or similar)
- Extract all UI strings to translation files
- Start with Spanish (current) and English
- Make questions translatable per locale

### 10.7 Offline Mode (PWA)

**Priority:** Low
**Rationale:** The game is entirely playable offline except for leaderboard and daily challenges.

**Spec:**
- Add service worker and web app manifest
- Cache game assets, questions, and card data
- Queue score saves for when connection returns
- Show offline indicator

### 10.8 Accessibility Mode / Settings

**Priority:** Medium
**Rationale:** Significant a11y gaps exist. A dedicated settings panel would help.

**Spec:**
- High contrast mode toggle
- Font size controls
- Reduced motion toggle
- Screen reader optimized layout
- Dyslexia-friendly font option

---

## 11. Code Quality & Maintainability

### 11.1 Extract Magic Numbers to `gameConfig.js`

**Affected locations:**
- `src/utils/cardEffects.js:28` - mystery effects array `[200, -100, 'double', 'half', 500]`
- `src/utils/dailyStreak.js:92-107` - bonus point thresholds
- `src/utils/scoreCalculator.js:7-14` - rank thresholds
- `src/components/GameApp.jsx` - timeout durations (1500, 2500, 2000ms)
- `src/hooks/useSounds.js` - frequency values

**Fix:** Move all to `gameConfig.js` as named constants.

### 11.2 Add PropTypes or TypeScript

**Problem:** No prop validation on any component. Type errors are only caught at runtime.

**Spec:** Add PropTypes to all components as a minimum. Migrating to TypeScript is the better long-term solution but is a larger effort.

### 11.3 Consolidate Duplicate API Endpoints

**Problem:** `add-score.js` and `save-score.js` serve the same purpose. `get-scores.js` and `get-leaderboard.js` overlap significantly.

**Fix:** Remove `add-score.js` and `get-scores.js`. Update `src/db/index.js` to use the newer endpoints.

### 11.4 Centralize Error Handling Pattern

**Problem:** Error handling is inconsistent: some functions return generic messages, some expose `error.message`, some silently swallow errors.

**Fix:** Create a shared error handler utility:
```js
// netlify/functions/utils/errorResponse.js
export const errorResponse = (status, message) =>
  new Response(JSON.stringify({ error: message }), { status, headers: { 'Content-Type': 'application/json' } });
```

### 11.5 Fix Array Index as React Key (`src/components/QuestionCard.jsx:88`)

**Problem:** Using `index` as key for answer options can cause rendering bugs if options are reordered.

**Fix:** Use option content or a hash as key: `key={option}` or `key={\`opt-${index}-${option}\`}`.

### 11.6 Consistent Number Formatting

**Problem:** Some components use `toLocaleString()` for numbers, others don't.

**Fix:** Create a `formatNumber()` utility and use it consistently.

---

## 12. Infrastructure & DevOps

### 12.1 Add Environment Variable Documentation

**Problem:** No `.env.example` file. Developers don't know what environment variables are needed (`DATABASE_URL`, Google Analytics ID, AdSense ID).

**Fix:** Add `.env.example` with all required variables documented.

### 12.2 Add Pre-commit Hooks

**Spec:** Add `husky` + `lint-staged` for:
- ESLint checks
- Prettier formatting
- Test execution on changed files

### 12.3 Add Error Monitoring

**Problem:** Errors are only logged to `console.error`. No production error tracking.

**Spec:** Integrate Sentry or similar for:
- Frontend error tracking
- Netlify Function error tracking
- Performance monitoring

### 12.4 Add Database Migrations Tooling

**Problem:** Migrations are raw SQL files in `database/migrations/` with no runner or version tracking.

**Spec:** Add a migration runner (e.g., `node-pg-migrate` or custom script) that tracks which migrations have been applied.

### 12.5 Improve CI/CD Pipeline

**Current:** Test + build only.

**Spec additions:**
- Add lint step
- Add coverage threshold (e.g., fail if < 60%)
- Add Lighthouse CI for performance/a11y audits
- Add bundle size check (fail if > threshold)
- Add preview deployments for PRs

---

## Implementation Priority Matrix

| Priority | Item | Impact | Effort |
|----------|------|--------|--------|
| **P0** | 1.1 Timezone bug | Data corruption | Small |
| **P0** | 1.4 Score save feedback | Data loss UX | Small |
| **P0** | 3.1 Cancel timeouts | Crashes/corruption | Medium |
| **P0** | 3.2 Rapid-click race condition | Score corruption | Small |
| **P1** | 2.1 Fix score limits | Cheating prevention | Small |
| **P1** | 2.2 Remove duplicate endpoint | Security hole | Small |
| **P1** | 4.1 Add response.ok checks | Reliability | Small |
| **P1** | 4.2 Add request timeouts | Reliability | Small |
| **P1** | 1.2 Fix Tailwind dynamic classes | Visual bug | Small |
| **P1** | 1.3 Fix daily bonus for P2 | Game fairness | Small |
| **P2** | 6.1 Test GameApp.jsx | Quality assurance | Large |
| **P2** | 6.3 Test Netlify functions | Quality assurance | Medium |
| **P2** | 5.1-5.6 Accessibility fixes | Inclusivity | Medium |
| **P2** | 7.1 Component memoization | Performance | Medium |
| **P2** | 8.1 Onboarding tutorial | User retention | Medium |
| **P2** | 8.8 Toast notifications | UX consistency | Medium |
| **P3** | 10.4 Question explanations | Education value | Medium |
| **P3** | 10.3 Study mode | Education value | Large |
| **P3** | 10.5 More questions | Content depth | Large |
| **P3** | 9.1 Complete referral system | Engagement | Medium |
| **P3** | 9.3 Complete daily challenges | Engagement | Medium |
| **P3** | 11.2 Add PropTypes/TypeScript | Maintainability | Large |
| **P4** | 10.1 User accounts | Multi-device | Large |
| **P4** | 10.2 Tournament mode | Engagement | Large |
| **P4** | 10.6 Localization | Reach | Large |
| **P4** | 10.7 PWA/Offline mode | Availability | Medium |
| **P4** | 12.3 Error monitoring | Observability | Small |
| **P4** | 12.5 Improve CI/CD | DevOps maturity | Medium |

---

## Recommended Implementation Order

**Phase 1 - Stability (P0 + P1):** Fix all critical bugs and security issues. These are small changes with high impact.

**Phase 2 - Quality (P2):** Add test coverage for the core game logic and backend functions. Fix accessibility gaps. Add memoization.

**Phase 3 - Polish (P3):** Complete half-finished features (referrals, daily challenges, social sharing). Add question explanations and study mode. Improve UX with onboarding and toast notifications.

**Phase 4 - Growth (P4):** Add user accounts, tournament mode, localization, and PWA support. Improve infrastructure with error monitoring and CI/CD enhancements.
