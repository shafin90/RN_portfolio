# Legato — Product Engineering Case Study

> **One line:** A mobile-first social network that turns a musician’s wish to collaborate into a local, intent-aware discovery loop: profile, search, follow or message, keep it safe.

**Role:** Mobile & Backend Engineer · Full-time
**Period:** Jul 2025 — Mar 2026
**Scope:** Mobile app + backend API + collaboration discovery loop
**Market:** Local musician collaboration
**Stack:** Expo React Native / React Native 0.81, React Native / MobX-State-Tree, React Navigation, Better Auth, Stream Chat, Firebase, Sentry, OpenAI, PostgreSQL + PostGIS / Express + Bun, Sequelize, MinIO/S3.

---

## TL;DR

A musician does not need another endless directory of profiles. They need someone nearby who plays the right instrument, has relevant experience, and is actually open to the same kind of collaboration. Legato is a mobile-first network for musicians to discover one another, share their work, follow or message people, and find partners for jamming, teaching, learning or joining a band.

The case study focuses on four decisions:

1. **Open To is a product primitive, not a profile field.**
2. **Keep discovery eligibility in the database, not the client.**
3. **Keep social boundaries server-owned.**
4. **Let the chat provider own delivery; the app owns context.**

Each decision is written as **Problem ? Decision ? Trade-off ? Engineering solution ? Impact**, because that is the part of product engineering that is hardest to copy.

---

## 01. Product Overview

### What is it?

Legato is a mobile-first social network that connects musicians for collaboration, jamming, teaching, learning and band joining.

- **Profile layer:** stage name, bio, location, instruments, skill levels, musical styles, education, YouTube/Spotify work, and what the person is open to or looking for.
- **Discovery layer:** name and skill search, nearby artists, distance radius, profile-photo filtering, pagination, Open To filters.
- **Social layer:** follow or request, block/report, chat.
- **Realtime layer:** one-to-one and group chat with threads, over Stream Chat, with push notifications and deep links.

The product loop is: profile ? intent ? discovery ? connection ? conversation.

### Who uses it?

- **Musicians** who want a collaborator for a band, jam session, lesson or audience.
- **Teachers and learners** who want structured teaching or practice partners.
- **Bands and groups** that want to recruit or join.

### What market is it for?

Local musician collaboration. The network is only useful when discovery is local, skill-relevant and honest about intent.

### What is the business model?

The source material describes a positioning as a mobile-first network for musicians finding collaborators locally; no commercial model detail was available to claim here.

### My role and ownership

I worked as a core mobile developer on the React Native (Expo) app and contributed to the Node.js backend.

- Built and shipped primary mobile features end-to-end: authentication, social graph, chat, onboarding, search.
- Integrated third-party services: Better Auth (auth), Stream Chat (messaging), Firebase (push + auth), Sentry (crash/error tracking), PostHog/Vexo (analytics), Google & Apple sign-in.
- Fixed production bugs, upgraded the Expo SDK, and kept the app releasable across builds.

---

## 02. The Problem

### The musician problem: a directory is not a recommendation

A musician does not need another endless directory of profiles. They need someone nearby who plays the right instrument, has relevant experience, and is actually open to the same kind of collaboration.

Without intent and freshness, a list sorted by city is not a recommendation; it is just a list.

### The network problem: profiles without intent are directories

Search combines stage-name or skill filters with location, distance, pagination and profile constraints. The hard part is not rendering more data; it is deciding what makes a match relevant, how to rank it, and how to keep social and safety rules consistent across search, follow and chat.

### The loop problem: discovery is only useful when its rules hold at the data boundary

Search applies geo and skill conditions through PostgreSQL and PostGIS; the mobile state layer keeps search modes, filters, loading states and paginated results explicit.

---

## 03. Product Decisions

### Decision 1 — Open To is a product primitive, not a profile field

**Problem:** Collaboration wishes were not modelled as a first-class primitive, so onboarding, profile editing and search could drift apart.

**Decision:** Model Open To and Looking For with fast boolean flags plus JSONB preference details that carry types, skills, teach modes and intent levels.

**Trade-off:** A richer schema plus migrations for the flags and details, and staleness handling for availability.

**Engineering solution:** One source of truth across onboarding, profile editing and discovery.

**Impact:** Onboarding, profile editing and discovery share one source of truth instead of parallel copies.

### Decision 2 — Keep discovery eligibility in the database, not the client

**Problem:** Radius, skill, intent, pagination and profile constraints multiply across a growing set of users.

**Decision:** Apply skill, location and intent filters and pagination inside PostgreSQL with PostGIS geo queries.

**Trade-off:** Geo queries are heavier and need indexes, but keep eligibility and paging consistent.

**Engineering solution:** Database-side geospatial filtering keeps relevance and pagination together.

**Impact:** Result eligibility and paging no longer depend on a growing client-side filter set.

### Decision 3 — Keep social boundaries server-owned

**Problem:** Follows and blocks are trust-critical and cross profile, inbox and chat surfaces.

**Decision:** Backend owns follow relationships, mutual status, private requests, blocks and reports; the app calls the product API.

**Trade-off:** More round trips and state reconciliation across surfaces.

**Engineering solution:** Follow relationships and block rules are relationship changes, not local UI state.

**Impact:** Blocks change real relationships in both directions and reports can carry reasons.

### Decision 4 — Let the chat provider own delivery; the app owns context

**Problem:** Real-time delivery is commodity infrastructure, but push to the right thread still needs product glue.

**Decision:** Use Stream Chat for one-to-one, group and thread messaging, with backend identity/channel mapping plus app context-preserving navigation.

**Trade-off:** An integration boundary to maintain between app, API and provider.

**Engineering solution:** Stream handles delivery; the app maps identity and preserves navigation context.

**Impact:** Real-time messaging without owning delivery infrastructure, while keeping the collaboration loop native and dependable.

---

## 04. System Design & Architecture

### High-level architecture

Mobile app ? Product API ? PostgreSQL/PostGIS; Stream Chat; Firebase push; OpenAI moderation; S3/MinIO storage; Better Auth.

### Backend layering

Routes ? Controllers ? Services ? Models ? Database, with feature modules for chat, skills, moderation and social behaviour.

### Data model (core records)

User, UserSkill, Skill, Follow, OpenToDetails, Block, Report, Education, Spotify, Youtube.

### API and service communication

Search endpoints: `/api/search/nearby`, `searchByName`, `findUsersBySkills`, `searchByOpenTo`, `searchSkills`, `fetchNearbyArtists`.

### State management by surface

MobX-State-Tree RootStore with authentication, following, generalData, search and location stores; React Navigation stacks and tabs; AsyncStorage persistence.

### Technology choices and why

Better Auth with custom Sequelize adapter and registration lifecycle hooks; Stream Chat; Firebase; OpenAI moderation; PostgreSQL + PostGIS.

---

## 05. Key Product Flows

### Flow A — Profile to intent

Stage name + skills ? Open To + Looking For ? save preferences.

### Flow B — Intent to discovery

Debounce query ? apply Open To + radius ? paginate ? open profile.

### Flow C — Discovery to connection

Follow or request ? block or report ? open chat.

### Flow D — Connection to conversation

Stream identity ? channel and thread ? group create or edit ? deep link + unread.

---

## 06. Engineering Challenges & Trade-offs

### Challenge 1 — Protected-state mutation crashes

MobX-State-Tree threw protected object mutation errors during async flows in production.

### Challenge 2 — Long lists crashing the UI

VirtualizedList crashed on certain chat and feed screens.

### Challenge 3 — Expo SDK upgrade under load

The app moved from Expo SDK 53 to React 19 while keeping auth, push and image pickers working.

### Challenge 4 — Image integrity in profiles

Stretched avatars and image-compression states caused garbled or failed profile photos.

### Smaller challenges worth naming

Backend query fixes, null or empty-string avatar filtering, Sentry error context, API error handling for 409 and 429 responses.

---

## 07. Results & Business Impact

### What shipped

- Mobile: Better Auth with Google/Apple/email sign-in; onboarding with stage name, skills and Open To presets; follow/unfollow with push; block/report behind a flag; Stream Chat one-to-one/group/thread flows; Sentry, image handling and list crash fixes; day/night theme and account deletion.
- Backend: Better Auth with custom Sequelize adapter and lifecycle hooks; Open To flags plus JSONB details with GIN/PostGIS indexes; search endpoints for nearby, name, skills and Open To; follow/block/report models and relationship rules; forgot-password OTP, user delete and block endpoints; image upload, moderation and API error handling.

### Verified engineering outcomes

- Registration lifecycle hooks create the linked profile, Stream Chat user and initial skills.
- Availability can go stale; search excludes stale intent rather than presenting last month’s availability as current.

### What I am not claiming

Adoption, retention, conversion and store-rating improvement numbers were not part of the verified source for this case, so they are not claimed here. The reliability work is described as shipped fixes.

### Metrics I would instrument next

Profile completion from signup to first skill or Open To; search ? follow ? message ? group join funnel; zero-result and relevance rates by radius and intent; Open To refresh rate; crash-free sessions.

---

## 08. What I Would Improve

### If I rebuilt it

- Add feature flags and automated E2E tests earlier instead of retrofitting them around release builds.
- Add typed API contracts between mobile and backend to prevent drift in search, social and chat payloads.
- Add a CI/CD pipeline with automated builds earlier instead of manual EAS builds.
- Make Open To freshness and staleness a first-class search signal with explicit user refresh prompts.
- Add observability for chat delivery failures, moderation latency and search index freshness.

### Architectural decisions I would revisit

- Open To freshness as a first-class search signal.
- Social safety maturity (circles, band connections, requests, blocks).

### Next product priorities

Follow the collaboration loop: profile completion, first relevant result, profile opens, follows or messages, whether conversations continue.

### What I would keep

The hybrid Open To storage, server-owned social boundaries and geo-aware search.

---

## Visual plan

| Visual | What it must prove | Where it goes |
|---|---|---|
| **System architecture** (3D system map) | Mobile, API, Postgres/PostGIS, Stream Chat, Firebase, auth/moderation boundaries. | Section 04 |
| **Discovery sequence** | Profile ? intent ? search ? follow/message. | Section 05, Flows |
| **Open To storage** | Fast booleans + JSONB details with GIN/PostGIS indexes. | Section 03, Decision 1 |

### Screenshot checklist

Capture only screens that explain a decision:

- **Mobile app:** onboarding, profile edit/Open To modal, search results, artist profile, chat list/thread/group.
- **Backend:** search endpoint behaviour, Open To storage, follow/block/report models.

For each screenshot, write a one-line caption that names the decision it demonstrates.

---

## Evidence map

| Claim | Source |
|---|---|
| Product features, onboarding, search, chat, reliability | `legato/LEGATO-CASE-STUDY.md` |
| Backend architecture, auth, search, Open To, follow | `legato/old-backend/Docs/*` |
| Mobile flows, state, navigation, search/chat | `legato/old-mobile/docs/*` |
| Expo SDK upgrade, MobX fixes, image handling | `legato/LEGATO-CASE-STUDY.md` |

### Verification note

Business metrics such as adoption, retention, conversion and store-rating improvement were not available in the source material, so they are not claimed. The case study distinguishes verified implementation facts from metrics that still need instrumentation.

---

## One-paragraph version (for an interview or a portfolio intro)

Legato is a mobile-first social network that turns a musician’s wish to collaborate into a local, intent-aware discovery loop. I worked across the React Native app and backend paths that make profile, intent, search, social and realtime hold together, using Better Auth, Stream Chat, Firebase, PostgreSQL/PostGIS and an Open To model that keeps fast flags with structured details. The hard part was not rendering more data; it was making discovery eligibility, intent freshness and social safety server-owned while keeping the collaboration loop usable on weak mobile state and real-time context.
