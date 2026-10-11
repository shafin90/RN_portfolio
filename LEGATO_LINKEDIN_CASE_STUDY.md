# Legato — Musician Collaboration Platform

**Role:** Mobile Product Developer (Full Stack: Client + API + Infrastructure)  
**Timeline:** 9 months to investor demo  
**Platforms:** iOS (App Store) + Android (Play Store)  
**Stack:** Expo (React Native), EAS, TypeScript, PostgreSQL, Better Auth, Stream Chat, Firebase (FCM), GetStream

---

## The Constraint

Ship a musician collaboration platform to both app stores in **9 months** for an investor demo. The product required:
- Google & Apple Sign-In
- Profiles with skills & onboarding
- Discovery by name, skill, proximity, and collaboration intent
- Real-time chat + collaboration flows
- Push notifications that survive OS kills

**One crash in the demo room = failed round.** The engineering discipline had to guarantee stability, not just features.

---

## Architecture Decisions

### 1. Expo + EAS for Release Velocity & Safety

**Why Expo?** Managed workflow eliminated native divergence between iOS/Android. One codebase, one build pipeline.

**EAS Staged Rollouts** — 5% → 25% → 100%  
Every release went through a percentage gate. A regression caught at 5% never reached the demo device. Zero blast radius.

**Feature Flags as Architecture**  
Every unfinished collaboration path lived behind a flag. The demo build only included flagged-on paths, each proven on staging first. No dead code paths in production.

**Expo SDK Upgrades** — Kept runtime current without native maintenance burden. One `expo upgrade` = both platforms current.

---

### 2. Identity as a Single Transaction

**Better Auth on Custom Postgres Adapter** (not default SQLite)  
Registration = one atomic transaction:
1. Create user
2. Provision profile
3. Create Stream Chat identity
4. Assign initial skills

**No orphan profiles. No race between auth and chat.** Google & Apple Sign-In flowed through the same adapter. Email OTP recovery reused the same session store.

**Why this matters:** In a demo, the investor taps "Sign up" once. If profile/chat/skills aren't all there, the product feels broken.

---

### 3. Dual-Channel Notifications with Deep-Link Integrity

**Two channels, one contract:**
- **GetStream** — in-app chat events (real-time, foreground)
- **Firebase (FCM)** — background push (OS kills app)

**Unified event schema:**
```json
{
  "type": "collaboration_request|chat_message|skill_match",
  "payload": { ... },
  "deepLink": "legato://chat/{conversationId}"
}
```

**Badge integrity:** Synced from `unreadCount` on every foreground resume + every push receipt. No phantom badges.

**Tap handling:** Single router parsed `deepLink` and pushed the exact screen — `ActiveChats`, `CollaborationRequest`, `Profile` — regardless of app state (warm, cold, dead).

---

### 4. Proximity + Skill Matching at Query Time

**Discovery = composed ranking, not client-side merge:**

| Signal | Weight | Implementation |
|--------|--------|----------------|
| Name search | 0.5 | PostgreSQL trigram (`pg_trgm`) |
| Skill match | 0.3 | Array overlap on normalized skill tags |
| Proximity | 0.2 | PostGIS `ST_DWithin` + GIST index |

**Hard filter:** Collaboration intent flags (seeking bandmate, producer, vocalist, etc.)

**Single round trip:** Database returned ranked results. No client-side merge, no N+1 queries.

---

### 5. Offline-First State Assumptions

**Every piece of state assumed the process is dead:**
- Reading position persisted per screen
- Token lifecycle with invalid-token pruning
- Badge counts synced from server on every foreground
- Crash reporting via Sentry (caught 3 pre-demo regressions)

---

## Result

| Metric | Outcome |
|--------|---------|
| **App Store + Play Store** | ✅ Live |
| **Crashes at investor demo** | **Zero** |
| **Launch timeline** | 9 months (planned) |
| **Post-launch stability** | 4.8★ iOS / 4.7★ Android |

**The discipline shipped:** Staged rollouts, feature flags, single-transaction identity, dual-channel push with deep links, composed query ranking — runs in every other product I've built since (SRKAN, JetExpress, Govihari, KavooGo).

---

## What I'd Do Differently Next Time

1. **Invest in E2E automation earlier** — Manual QA on two platforms every release cycle burned 2 days/week. Detox + Maestro would've paid off by week 4.

2. **Observability from day 1** — Added Sentry + custom analytics at week 6. Should've been week 1. "Did the user actually complete onboarding?" was a guessing game too long.

3. **Skill taxonomy as data, not code** — Hardcoded skill list required app updates for new genres. A CMS-backed taxonomy would let product iterate without releases.

---

## Key Takeaway

**Mobile is not a smaller web.** It's a contract with two stores, two runtimes, a hostile OS, and a user who will not wait. The only way to ship senior is to design for the phone as it *is* — not as you wish it were.

---

*Built with founders in the USA, Canada, and Africa.  
Mobile Product Developer — Mashrafi Ahnam Shafin  
mashrafiahnam1@gmail.com*