# Davion Website — UI/UX Action Plan

**Date:** 2026-05-21
**Source:** `ui-ux-analysis-report-2026-05-21.md`
**Branch:** `rebrand/davion` @ `1a6bc31`
**Mode:** Opinion-led. Highest-leverage fixes first. Mid-Beta → Production-grade path.

---

## How to read

- **P0** = blocks the primary task (institutional buyer evaluating Davion). Ship this week.
- **P1** = this sprint (next 1–2 weeks). Removes the loudest friction.
- **P2** = next sprint (weeks 3–4). Depth + system fixes that protect what shipped.
- **P3** = polish backlog. Real but not urgent.

Each action carries: title, audit-section reference, estimated effort (1 day = 6 focused hours), a measurable acceptance criterion, and notes on whether the fix should be **promoted into the design system** vs. **patched locally**.

---

## Priority register

### 🔴 P0 — Block-the-core-task fixes (≤ 5 days total)

| # | Action | Audit ref | Effort | Acceptance criterion | DS promotion? |
|---|---|---|---|---|---|
| **P0.U1** | Real-device mobile pass (iPhone + Android) | §1 Dim 6, §3 Blocker #1 | 4 hrs | Home, AlpOS, FS industry, Newsroom, Trust, Contact all render correctly on iPhone SE / 13 / Pro Max + 1 mid-range Android. No horizontal scroll. All tap targets ≥ 44 px. Hero spiral visible without clipping the headline. Punch list of remaining issues filed. | No — fix-in-place |
| **P0.U2** | Branded `error.vue` (404 + 500) | §3 Blocker #3, §4 broken states | 3 hrs | `/404` and `/500` paths render Davion-voice copy + return-to-home CTA + Newsroom suggestion + Trust suggestion. Lighthouse a11y on the error page ≥ 95. | Yes — error-state template |
| **P0.U3** | Replace "Book a demo" mailto with real scheduling | §3 Blocker #6, §5 missing flows | 4 hrs | Every "Book a demo" CTA opens a Cal.com / Calendly inline scheduler. mailto fallback preserved for users who block JS. The 22 site-wide CTAs all route through the same flow. | Yes — single source for scheduling URL |
| **P0.U4** | Card-hover consistency pass | §1 Dim 5, §4 unclear affordances | 2 hrs | Industry-hub cards, capability-hub cards, BlogCard, HorizontalBlogCard, solutions-hub cards all carry `.card-hover` (the 200 ms translate-y + shadow lift from `docs/motion.md`). FeatureCard already done. | Yes — make `.card-hover` the default for interactive cards |
| **P0.U5** | Add `pauseOnFocus` to AlpOS console carousel | §1 Dim 7, §3 Blocker #5 Solution A | 30 min | Keyboard-only users can Tab into the carousel without slides auto-advancing under them. `aria-live="polite"` announces slide changes. | No — local |

**P0 subtotal: ~14 hrs (≈ 2.5 days).** Reasonable for a focused week.

---

### 🟠 P1 — This sprint (≤ 12 days)

| # | Action | Audit ref | Effort | Acceptance criterion | DS promotion? |
|---|---|---|---|---|---|
| **P1.U1** | Write a customer story (or honest-anonymous case) | §5 missing flows | 8 hrs (writing) | `/customer-stories/index.vue` + 1 story page. Page contains at least 3 hard numbers ("60% reduction in case-review time"). Story has problem → engagement → numbers → quote (attributed as permitted) → cross-link to the relevant industry. Home gets a card linking to it. Was P1.3 — surfaces when founder approves the first engagement for naming or anonymization. | Yes — `CustomerStoryLayout` |
| **P1.U2** | Skeleton-loader component + apply to Newsroom + Home Newsroom showcase | §1 Dim 10, §3 Blocker #3 Solution B | 6 hrs | `<SkeletonBlock variant="card"\|"line"\|"image"/>` ships. Newsroom hub + home Newsroom block render skeletons during `useFetch` pending. Slow-network test (Chrome DevTools throttling to "Slow 3G") shows skeleton, not empty space. | Yes — design-system primitive |
| **P1.U3** | Page scroll-progress bar (Blocker #7 Solution A) | §1 Dim 11, §3 Blocker #7 | 3 hrs | A 3-px-tall sticky bar at the top of every page fills primary-text colour as the reader scrolls. Disabled in `prefers-reduced-motion`. | Yes — global layout primitive |
| **P1.U4** | Header dropdown arrow-key navigation (WAI-ARIA menubar pattern) | §1 Dim 7, §3 Blocker #5 Solution B | 8 hrs | Open dropdown via Enter / Space / ↓. Navigate items with ↓ / ↑. Home / End jumps. Escape closes and returns focus to the trigger. `role="menu"` + `role="menuitem"` + `aria-haspopup="menu"` markup. Tested with VoiceOver (macOS) + NVDA (Windows). | Yes — menu primitive |
| **P1.U5** | Standardise date format to ISO | §4 inconsistent patterns | 1 hr | All visible dates render as `2026-05-21` (Newsroom, legal pages, status page, About). One shared `formatDate` util in `composables/`. | Yes — date util |
| **P1.U6** | Pastel palette collapse: drop aliceblue, keep azure / honeydew / whitesmoke | §1 Dim 3, §3 Blocker #8 Solution A | 2 hrs | aliceblue removed from `tailwind.config.ts`. Every `bg-aliceblue` swapped to `bg-azure` or `bg-whitesmoke-100`. Visual scan confirms section rhythm reads as 3 colours, not 4. | Yes — design-token change |
| **P1.U7** | Extract `IndustryLayout` + `CapabilityLayout` | §1 Dim 4, §3 Blocker #4 Solution B | 12 hrs | The 12 inner pages each shrink to a `<script setup>` data object + `<IndustryLayout :data="..." />` or `<CapabilityLayout :data="..." />`. Net code reduction ≥ 70 %. Visual regression: zero pixel-level differences vs. pre-extraction. | Yes — major DS additions |
| **P1.U8** | Add "What is sovereign AI?" 200-word anchor section | §5 persona mismatch (novice-buyer case) | 3 hrs | Home page gains a single new section between the Sovereignty strip and the Sectors marquee — short explainer for novice readers, with a "Read the worldview" link to /company/about §1. | No — content-only |

**P1 subtotal: ~43 hrs (≈ 7–8 days).** One real two-week sprint.

---

### 🟡 P2 — Next sprint (≤ 12 days)

| # | Action | Audit ref | Effort | Acceptance criterion | DS promotion? |
|---|---|---|---|---|---|
| **P2.U1** | Real `<TableOfContents>` on long pages | §1 Dim 11, §3 Blocker #7 Solution B | 12 hrs | New `<TableOfContents>` component lives in a right-rail on ≥ lg, collapses to a sticky top-bar dropdown on < lg. IntersectionObserver highlights current section. Applied to AlpOS, Trust, About, and long-form Newsroom posts. | Yes — primitive |
| **P2.U2** | Build a "Davion compared to" page | §5 missing flows | 8 hrs | `/compare` exists. Side-by-side table comparing Davion to ChapsVision / Aleph Alpha / Palantir / Mistral on 6 dimensions (deployment posture, audit lineage, modularity, target buyer, geographic provenance, age of company). Honest about where Davion currently loses. Linked from AlpOS + Industries hub. | No — single page |
| **P2.U3** | Real engagement form (backend + spam control + success state) | §1 Dim 10, §3 Blocker #6 Solution B | 24 hrs | New POST endpoint validates input, sends email via configured SMTP, returns success or specific error. Spam control (turnstile or reCAPTCHA Enterprise). Branded success state. Failure state with retry. Lead-source tracking (UTM + referrer captured). | Yes — `<EngagementForm>` |
| **P2.U4** | Pre-filled SIG-lite (security questionnaire) PDF on Trust page | §5 missing flows | 6 hrs (writing) | Trust page gains a "Download our security questionnaire response" link to a PDF that pre-fills the SANS SIG-Lite v1 spec. PDF lives in `public/docs/`. Last-updated date in the file footer. | Yes — pattern for future docs |
| **P2.U5** | 90-second demo Loom embed on AlpOS page | §5 missing flows | 4 hrs (assumes recording exists) | AlpOS page §2 (after the hero) embeds a 90-s demo. Lazy-loaded (no JS unless visible). Captions for accessibility. Falls back to the existing static console mockup if Loom is unreachable. | No — surface-specific |
| **P2.U6** | Empty-state pattern propagation | §1 Dim 10 | 4 hrs | Every surface with a list (Newsroom, future customer-stories, future search) has a branded empty state with recovery CTA. Documented as `<EmptyState>` design-system component. | Yes — primitive |
| **P2.U7** | Mobile-specific spiral asset (if Blocker #1 finds the current crop is wrong) | §3 Blocker #1 | 4 hrs | A dedicated `section_background-mobile.webp` (or adjusted scale ratio per breakpoint) keeps the spiral elegant on iPhone SE → Pro Max widths. | No — fix-in-place |
| **P2.U8** | Auto-status badge on `/status` (managed provider) | §1 Dim 10 | 8 hrs | Once production deploy lands (P3.6 of the technical action plan), wire StatusPage or Better Stack so `/status` reflects real component state. Until then, P0.U6 stays static. | No — infra |

**P2 subtotal: ~70 hrs (≈ 12 days).** Achievable in 2 weeks with focus; otherwise split P2.U3 (the engagement form, 24 hrs) into its own slice.

---

### ⚪ P3 — Polish backlog

| # | Action | Audit ref | Effort |
|---|---|---|---|
| P3.U1 | i18n scaffold (DE / FR / TR for institutional audience) | §4 copy issues | 24 hrs (scaffold) + ongoing translation cost |
| P3.U2 | Replace base1 icon set with a Davion-specific icon family | §1 Dim 12, §4 iconography | 24 hrs (once P2.3 identity lands) |
| P3.U3 | Page-transition speed-tune (drop to 220 ms or 180 ms) | §5 decorative complexity | 30 min |
| P3.U4 | Move Status link off the legal bar | §5 realignment | 15 min |
| P3.U5 | Reveal-on-scroll speed-tune (test 400 ms vs 600 ms) | §5 decorative complexity | 1 hr |
| P3.U6 | Cookie-consent confirmation toast | §4 missing feedback | 2 hrs |
| P3.U7 | Real photographs (founder portrait, Zurich / Istanbul ambient) | §1 Dim 12, §2.1 About | photo shoot |
| P3.U8 | Cross-link "Status" CTA at bottom of /status | §4 navigation drift | 30 min |
| P3.U9 | Code-block syntax highlighting on technical newsroom posts (P3.1 from tech plan) | §1 Dim 9 | 4 hrs |
| P3.U10 | Per-card hover-reveal explainer on Numbers Strip | §2.2 | 4 hrs |
| P3.U11 | Footer mobile spacing audit at 320 px | §3 Blocker #1 follow-up | 2 hrs |
| P3.U12 | Subset the Switzer + Degular fonts to the glyphs the site uses | perf adjacent | 6 hrs |

---

## Two-week sprint grouping

### **Sprint 1 (Week 1–2): "Land the conversions"**

Goal: every CTA-clicker can actually convert. Every mobile visitor sees a working page. Every error path is branded.

**Week 1 (P0 — ship by Friday):**
- Mon morning: P0.U1 (real-device mobile pass) + P0.U5 (carousel pauseOnFocus) — small/parallel.
- Mon afternoon: P0.U2 (branded error.vue) — 3 hrs.
- Tue full day: P0.U3 (Book-a-demo scheduling integration) — needs a Cal.com / Calendly account first.
- Wed morning: P0.U4 (card-hover consistency pass).
- Wed afternoon onward: roll into P1.

**Week 2 (P1 — ship as ready):**
- Mon: P1.U2 (skeleton loader component + apply).
- Tue: P1.U3 (scroll-progress bar) + P1.U5 (date format ISO).
- Wed: P1.U6 (palette collapse) + P1.U8 (What is sovereign AI? section).
- Thu–Fri: P1.U4 (header dropdown arrow-keys — full WAI-ARIA menubar pattern).

(Defer P1.U1 customer story to Week 3 because it's blocked on founder approval of an engagement to write about; defer P1.U7 layout extraction to Week 4 because it's an investment, not a fix.)

### **Sprint 2 (Week 3–4): "Polish + protect what shipped"**

- Mon–Tue: P2.U1 (TableOfContents) — biggest single UX leverage on AlpOS page.
- Wed: P2.U2 (Davion compared to page) — content + design.
- Thu: P1.U1 (customer story — assumes founder approval has landed).
- Fri: P2.U4 (SIG-Lite PDF).

**Week 4:**
- Mon–Thu: P2.U3 (real engagement form) — the biggest chunk in P2.
- Fri: P2.U5 (Loom embed) + P2.U6 (empty-state pattern).
- Buffer: P2.U7 (mobile spiral if needed) and P1.U7 (layout extraction) absorb spillover.

### **Sprint 3+ (Week 5+)**
- P3 items as priority allows.
- P2.U8 (managed status) lands once production deploy lands.

---

## Dependency map

```
P0.U1 (mobile pass) ─► P2.U7 (mobile-specific spiral, if findings demand)
P0.U2 (error.vue) ─► P2.U6 (empty-state pattern — shares system)
P0.U3 (Book-a-demo scheduling) ─► P2.U3 (real form supersedes; both can coexist via the same /contact page)
P0.U4 (card-hover) ─► P1.U7 (layout extraction inherits the consistent hover)
P1.U2 (skeleton) ─► P2.U6 (empty-state pattern — uses same primitives folder)
P1.U6 (palette collapse) ─► (parent of) all visual-debt micro-fixes in P2
P1.U7 (layout extraction) ─► P3.U2 (icon replacement is easier on extracted layouts)
P2.U1 (TOC) ─► (parent of) AlpOS page polish in P3

External dependencies:
  P1.U1 customer story → BLOCKED on founder approval of an engagement
  P2.U3 real form → BLOCKED on backend/email infra decision (Resend / Postmark / SES)
  P2.U7 mobile spiral → BLOCKED on P0.U1 findings
  P2.U8 managed status → BLOCKED on P3.6 production deploy
```

**Critical path:** P0.U1 → P0.U4 → P1.U7 (the visual consistency thread that lets every subsequent change land on a clean foundation).

---

## Quick wins (≤ 1 hour each)

Bundle as a "Friday quick-wins PR." Every item is ≤ 1 hr and should not need design review.

| # | Action | Effort |
|---|---|---|
| QW.U1 | Drop page-transition from 280 ms to 220 ms | 5 min |
| QW.U2 | Standardise date format to ISO (`2026-05-21`) | 30 min |
| QW.U3 | Add cookie-consent change confirmation (inline text below buttons after click) | 30 min |
| QW.U4 | Move Status off the legal bar; keep `/status` reachable from footer | 15 min |
| QW.U5 | Add a `<meta name="theme-color" content="#e0f1f3">` for mobile browser chrome on the bg-azure home (currently #60E576 stands out against the light header) | 5 min |
| QW.U6 | Add `aria-current="page"` to header link of the active route | 15 min |
| QW.U7 | Add `loading="lazy"` to every below-the-fold `<img>` (audit) | 30 min |
| QW.U8 | Add a "Looking for the product?" CTA at the bottom of `/status` | 20 min |
| QW.U9 | Add `aria-label="External link"` to every `target="_blank"` link | 15 min |
| QW.U10 | Apply `.card-hover` to BlogCard + HorizontalBlogCard (subset of P0.U4) | 30 min |
| QW.U11 | Wrap the footer "Cookie preferences" button in `<button>` (currently mixed inline JS) so it's keyboard-accessible | 20 min |
| QW.U12 | Pin `font-display: swap` on Switzer @import URL (already on Degular faces) | 10 min |

**Bundle:** ~3 hrs of work. Ship as one PR on a Friday.

---

## Design-system implications

Promote **into** the design system (these should live in `components/` or `composables/`, not be patched per-page):

1. `.card-hover` utility — applied to every interactive card site-wide.
2. `<SkeletonBlock variant="card"\|"line"\|"image"/>` — new primitive.
3. `<EmptyState>` — new primitive.
4. `<ErrorState>` — branded 404 / 500 / network handler.
5. `IndustryLayout.vue` + `CapabilityLayout.vue` — major architectural primitives.
6. WAI-ARIA menubar dropdown — keyboard pattern that the existing header consumes.
7. `<TableOfContents>` — long-page primitive.
8. `<EngagementForm>` — real form replacing mailto.
9. ISO `formatDate` util.
10. Branded `error.vue` template.

Keep **local** (per-page patches):

- Mobile spiral image asset (page-specific).
- Loom embed wrapper on AlpOS (single use).
- "What is sovereign AI?" anchor section (one-off content).
- Status auto-badge integration (infra, not pattern).

This split keeps the design system tight (10 promotions in a 12-month review) and avoids the trap of promoting one-off content into shared components.

---

## Mood-board reminder

Continues from `redesign-action-plan-2026-05-20.md` §"Mood-board direction":

- **Stripe Press** — typographic discipline; long-reading rhythm.
- **Palantir post-2020** — institutional restraint.
- **Linear** — product-preview craft (the AlpOS console mockup aspires here).
- **Anduril** — calm operational tonality.
- **Mistral** — European-confident positioning.

Add for this round:

- **Vercel docs** — for the `<TableOfContents>` right-rail pattern. Industry-standard for long technical content.
- **Tailwind UI / Refactoring UI** — for the skeleton-loader + empty-state visual vocabulary.
- **GOV.UK Design System** — for the WAI-ARIA menubar pattern (their nav-pattern docs are the canonical reference).

---

## Executive summary

### Verdict (3 sentences)

The Davion site sits firmly in **🟡 Refined (Beta)** territory — past Functional, ahead of most competitor sites visited during the audit, but two specific dimensions (real-device responsiveness coverage and state-coverage gaps) hold it back from production-grade. The brand and content systems are in excellent shape thanks to the P0–P3 work that shipped this week; what remains is mostly *interaction polish* (real-device verification, real scheduling, real loading/error states) and one investment item (component extraction across the 12 industry/capability pages). With ~14 hours of P0 work this week and ~43 hours of P1 work over the following two weeks, the site moves into 🟢 Polished without requiring the brand-identity refresh to land first.

### Top 3 most critical findings (ranked by leverage)

1. **🟠 Major — "Book a demo" doesn't book a demo** *(Blocker #6, §3 + §5)*. Every primary CTA — 22 of them — routes to `/contact` and then to `mailto:engagement@davion.com`. Buyers click expecting a calendar; they get "compose an email." This is the single highest-leverage friction point on the site, affecting the conversion event that matters most.
2. **🟠 Major — Mobile breakpoint coverage is unverified end-to-end** *(Blocker #1, §1 Dim 6)*. Zero real-device testing during the build. Hero spiral at `max-[980px]:scale-[3]`, sectors-marquee at 60 px font, newsroom filter chips at ~32 px tap height — all are plausibly broken on iPhone widths and we don't yet know. 30–50 % of buyer traffic typically arrives via LinkedIn / press shares on mobile.
3. **🟠 Major — No skeleton loaders / no branded error pages / no empty-state vocabulary beyond Newsroom filter** *(Blocker #3, §1 Dim 10)*. State coverage is the dimension that most reliably separates Beta from Polished sites; Davion is comprehensively at Beta on this axis. Buyers who hit a slow network, a 404, or a transient API error see generic-Nuxt or empty-flash.

### Recommended first move (this week, ≤ 4 hrs)

**Ship a "Conversions + Mobile" PR this Wednesday: P0.U1 + P0.U3.**

- P0.U1 (real-device mobile pass) — 4 hrs. Open the site on your iPhone + a friend's Android. Walk the 6 key pages. Fix the worst three issues inline. File a punch list.
- P0.U3 (replace mailto with Cal.com / Calendly embed on `/contact`) — 4 hrs. The mailto fallback stays for users who block JS, but every clicker who arrives expecting a calendar finds one.

That's 8 hrs of work — half a focused day — and it closes the two biggest gaps between *"buyer evaluates Davion"* and *"buyer becomes a meeting on the founder's calendar."* Everything else in the action plan is necessary; nothing else is as immediately leveraged.

---

*End of action plan. Companion file: `ui-ux-analysis-report-2026-05-21.md`. Related technical plan: `redesign-action-plan-2026-05-20.md`.*
