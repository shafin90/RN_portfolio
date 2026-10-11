# SRKAN — Devotional Platform, Offline-First Across Continents

**Role:** Mobile Product Developer (Full Stack: Client + API + Infrastructure)  
**Timeline:** Ongoing (v1 shipped in 6 months, continuous iteration)  
**Platforms:** iOS (App Store) + Android (Play Store)  
**Stack:** Expo (React Native), EAS, TypeScript, PostgreSQL, PayU, Expo Notifications, PostGIS

---

## The Constraint

A devotional platform serving communities across **India, Africa, and the Middle East** where:
- Networks are 2G/intermittent — users in villages with no coverage
- Devices are low-end — 2GB RAM, Android Go, old iOS versions
- Users are non-technical — prayer reminders, donation flows, program discovery must "just work"
- **Zero server dependency for core features** — reminders must fire in airplane mode

**Failure isn't a bug report.** It's a user who stops praying because the reminder didn't fire, or a donor who loses trust because the receipt never arrived.

---

## Architecture Decisions

### 1. Offline-First Reminders via Local Scheduling

**Expo Notifications with a Scheduler Provider** — rebuilt from programs & daily schedules on every app launch.

**Platform constraints respected:**
- **iOS 60-item limit** — scheduler prunes to nearest 60 reminders across 6 weeks ahead
- **10-minute lead time** per reminder (gives OS time to wake app)
- **Android notification channels** — importance levels per category (prayer, event, donation)
- **Provisional iOS permissions** — quiet reminders prove value before the prompt
- **Multilingual titles** — stored per-program, rendered locally (Gujarati, Hindi, Arabic, English, Swahili)

**Zero server dependency.** The reminder fires in airplane mode. The scheduler is a pure function: `programs + schedules + now → reminders[]`.

---

### 2. Multi-Field Search with Tenant-Aware Indexing

**Three modules, different shapes:**
| Module | Searchable Attributes | Filters |
|--------|----------------------|---------|
| Programs | name, description, branch, date | status, featured, date range |
| Testimonials | author, content, program | approval state, date |
| Donations | donor name, amount, currency, program | status, date range |

**PostgreSQL indexing strategy:**
- `pg_trgm` on name/description for fuzzy search
- B-tree on status, featured, date
- Composite indexes matching exact query shapes
- **Cursor pagination** (not offset) — new content mid-browse doesn't duplicate/swallow rows
- Filters applied in index scan, not post-query

**Sub-100ms p95 on cold start.** Even on 2G.

---

### 3. Donation Flow: Idempotent by Design

**PayU integration — never trust client callback.**

```
Client → PayU → Server verification → Webhook → Status update
```

**Key guarantees:**
- **Server-side verification** — order status checked against PayU before any DB write
- **Webhook deduplication** — unique event ID per transaction, dedup table in same transaction as status change
- **Multi-currency tracking** — rates frozen at payment initiation
- **Receipt uploads** for manual bank transfer verification, stored encrypted
- **Automated SWIFT instructions** emailed for international donors
- **Idempotency key = donation intent ID** — retry on dropped connection reuses same key, never double-charges

**Result:** Donor on 2G taps "pay" three times → charged once, receipt delivered.

---

### 4. Performance on 2GB RAM

| Technique | Implementation |
|-----------|----------------|
| **Image loading** | `expo-image` with thumbnail cache, aspect-aware compression, lazy-load below fold |
| **Lists** | `VirtualizedList` everywhere (programs, testimonials, donations) — `windowSize=5`, `removeClippedSubviews=true` |
| **Bundle splitting** | Expo Router lazy routes — donation flow, search, admin loaded only on navigation |
| **JS bundle** | < 3MB gzipped |
| **State persistence** | Critical state (auth token, donation drafts, reminder prefs) in `expo-secure-store` / `AsyncStorage` with versioned migrations |

---

### 5. Multi-Region, Multi-Language, Multi-Currency

| Dimension | Approach |
|-----------|----------|
| **Regions** | India, Africa (Nigeria, Kenya, Ghana), Middle East (UAE, Qatar) |
| **Languages** | English, Hindi, Gujarati, Arabic, Swahili, French — stored per-content, rendered locally |
| **Currencies** | INR, NGN, KES, GHS, AED, QAR, USD — rates frozen at payment initiation |
| **Timezones** | Program schedules stored in UTC, rendered in user's local timezone |

**No region-specific builds.** Single binary, config-driven.

---

## Result

| Metric | Outcome |
|--------|---------|
| **App Store + Play Store** | ✅ Live |
| **Store ratings** | **4.7+ ★** across all regions |
| **Offline reminder delivery** | 99.2% (measured via local log upload on next sync) |
| **Donation success rate** | 94%+ (including retries on bad networks) |
| **Search p95 latency** | < 100ms cold start |
| **Bundle size** | 2.8MB gzipped |

**The app works in places with no coverage, on devices with 2GB RAM, and survives OS kills because every piece of state assumes the process is dead.**

---

## What I'd Do Differently Next Time

1. **Local-first sync engine from day 1** — Built a custom WatermelonDB sync at month 4. Should've started with it. The "sync on next launch" logic for donations/reminders was reimplemented three times.

2. **Structured logging for offline events** — Added custom event logging at month 5. Before that, "why didn't the reminder fire?" was a support mystery. Now every reminder logs: scheduled, fired, dismissed, snoozed — uploaded on next sync.

3. **Progressive image quality** — Added `expo-image` with quality ladder (thumbnail → medium → full) at month 6. Before that, full-res images OOM'd on 2GB devices during donation receipt upload.

---

## Key Takeaway

**Offline-first isn't a feature. It's a constraint that shapes every layer** — scheduler, search index, payment flow, image pipeline, state persistence. When you design for "no network, 2GB RAM, OS kills app," the product works everywhere. When you design for "good network, modern phone, app stays alive," it works nowhere that matters.

---

*Built with founders in the USA, Canada, and Africa.  
Mobile Product Developer — Mashrafi Ahnam Shafin  
mashrafiahnam1@gmail.com*