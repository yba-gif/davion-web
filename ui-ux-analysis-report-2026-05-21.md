# Davion Website — UI/UX Analysis Report

**Date:** 2026-05-21
**Auditor brief:** Senior product designer + UX lead. Ruthless, specific, evidence-led.
**Scope:** Every shipped surface on `rebrand/davion` through commit `1a6bc31` — 10 commits stacked on top of the contractor-built base1 chassis. Audited against the production build, not Figma.
**Companion:** `website-audit-report-2026-05-20.md` (technical/brand audit). The two together cover the full product surface.

## Inputs scanned

- **Shipped routes:** ~30 — home, About, Careers, Contact, Trust, Press, Status, 6 industries, 6 capabilities, 4 solutions (AlpOS / Cybersecurity / Digital Transformation / OSINT), 4 legal pages, Newsroom (index + post template) with 6 posts.
- **Design system:** `tailwind.config.ts` (colors, fonts), `assets/css/main.css` (focus rings, motion, type scale), `docs/brand-voice.md`, `docs/motion.md`, `docs/brand-identity.md` (designer brief).
- **Top 3 JTBDs:**
  1. Institutional buyer evaluating whether Davion is the sovereign-AI vendor to pilot
  2. Senior technical evaluator validating that Davion can be deployed inside their perimeter
  3. Analyst / journalist verifying that Davion is real enough to write about
- **Breakpoints:** desktop (≥1024px) thorough; tablet (768–1024px) untested on real devices; mobile (<768px) untested on real devices.
- **States:** loading via Nuxt page transition (working); empty via Newsroom filter (good pattern, not propagated); error states only via inherited Nuxt 404; success states n/a (no real forms yet).
- **Marketing → product handoff:** product (AlpOS) is institutional, not self-serve; CTA path ends at `/contact` (mailto-based).
- **Microcopy:** voice-doc-enforced, 2 canonical CTAs ("Book a demo" + "Speak to an expert") + 1 special case ("Connect confidentially" for Defense & Intelligence). Zero ChapsVision echoes.
- **Analytics:** wired into useAnalytics, consent-gated; no provider live in dev. Production deploy deferred (founder decision).

## Clarifications resolved before scoring

- **Primary user:** Senior institutional buyer (CIO / CISO / Head of Risk / Compliance Lead / defense procurement officer). Expertise: high. Device context: desktop primary, mobile incidental for press / analyst reading.
- **Most important task:** Form an evidence-based opinion on whether Davion can be put in front of internal stakeholders, in 5–10 minutes of reading + scanning.
- **Brand promise the UI must deliver on:** *"Sovereignty isn't a feature. It's where the work happens."* The platform deploys inside the customer's perimeter; decisions are defensible end to end.

---

## 1 — UI/UX X-RAY (Status Scoring)

| # | Dimension | Score (/10) | Justification | Critical Gap | Reference |
|---|---|---|---|---|---|
| 1 | Visual Hierarchy & Layout Discipline | **8** | Clear H1/H2/H3 hierarchy. Rounded-3xl section rhythm. Generous internal padding (`px-6 → lg:px-16, py-16 → lg:py-24`). 12-col grids on AlpOS / Industries / Trust pages have real Pentagram-y discipline. | Every page uses the same `bg-{pastel} rounded-3xl px-6/md:px-12/lg:px-16 py-16/md:py-20` container 8–10 times in a row. No editorial spread, no full-bleed moment, no asymmetric break. The discipline becomes monotony at scroll. | Home `/`; all industries; all capabilities |
| 2 | Typography System | **7** | Degular Display + Switzer pairing reads serious. Body/heading sizes feel right (44/60/72/80 px headlines, 17–19 px body). `.text-h1/h2/h3` token classes exist in `main.css` for reuse. | Demo-licensed Degular has weak small-size rendering (Demo files are typically 50–70 % of the production glyph count; some letterforms lack proper hinting). Most pages set sizes via raw `text-[44px]` arbitrary values rather than the `.text-h2` tokens — defeats the token system. | `assets/css/main.css` `.text-h1` tokens vs. `pages/**/*.vue` arbitrary sizes |
| 3 | Color System & Contrast | **9** | Two-tone green system enforced site-wide: `primary` #60E576 for decoration, `primary-text` #2A8B3C for text (≈ 5.3 : 1 contrast on white — comfortably above WCAG AA's 4.5 : 1). A lint rule (`scripts/check-aa-contrast.mjs` + `pnpm lint:aa`) flags any banned `text-primary` use; current codebase passes 0 / 0. | The four pastel section backgrounds (azure #e0f1f3, aliceblue #dceff3, honeydew #d9efdf, whitesmoke-100 #f8f8f8) read as almost the same value; on a screenshot they don't separate into distinct categories. Either prune to 2–3 pastels, or differentiate via texture/border/density rather than tone-on-tone hex shifts. | `tailwind.config.ts`; visible across home `/`, all industries |
| 4 | Component Consistency | **7** | CommonButton (3 variants × 2 sizes), CommonSup (eyebrow tick), FeatureCard, BlogCard, HorizontalBlogCard, NumbersStrip, AlposConsole — all behave consistently. | The 6 industry pages each replicate ~90 % of the FS template via copy-paste. Same for the 6 capability pages — each owns a near-identical Hero / What it does / How it works / When to use / Industries / CTA structure. A future template tweak now requires touching 12 files. Should be extracted into `IndustryLayout` and `CapabilityLayout` components with props. | `pages/industries/*.vue` (6 files); `pages/capabilities/*.vue` (6 files) |
| 5 | Interaction Design & Microinteractions | **6** | Three motions documented in `docs/motion.md`: 280 ms page transition (working, prefers-reduced-motion safe), 600 ms reveal-on-scroll (`v-reveal` directive, IntersectionObserver-driven, plays once), 200 ms card hover lift (`.card-hover` utility). | `.card-hover` is applied **only** to FeatureCard. Industry cards, capability cards, solution cards inside the various hub pages do `hover:bg-whitesmoke-200` colour swap but no lift. Inconsistent — either every interactive card lifts, or none of them. Also: the AlpOS console carousel auto-rotates every 5 s but the dots are easy to miss. | `components/feature-card.vue` (has lift); `pages/industries/index.vue` (no lift); `pages/capabilities/index.vue` (no lift) |
| 6 | Responsiveness & Cross-Device Behavior | **5** | `md:` / `lg:` Tailwind breakpoints applied consistently. Mobile drawer for nav works (verified). Lenis smooth scroll feels good on desktop. Page transitions honour reduced-motion. | **Zero real-device testing this session.** Hero spiral uses `max-[980px]:scale-[3]` — that's aggressive and unverified on iPhone widths. Sectors marquee sets 60 px font (`text-[60px]`) — could be illegible at narrow viewports. AlpOS console carousel has fixed-width chrome that may overflow on small phones. Tap targets on chip filters in Newsroom are ~32 px tall — under the 44 px iOS HIG floor. | Hero `components/section/hero.vue` line 16-30 `scale-[3]`; sectors marquee `pages/index.vue` line ~196; newsroom chips `pages/company/newsroom/index.vue` |
| 7 | Accessibility | **8** | WCAG AA contrast enforced by lint. Skip-to-content link added (`layouts/default.vue`). Focus rings strengthened with dark outline + light halo (visible on every section background) and inverted variant for `.bg-black` and `.bg-drygray-100`. AlpOS console carousel has `role="region"`, `aria-roledescription="carousel"`, per-slide ARIA labels, and `pauseOnMouseEnter`. Cookie consent dialog uses `role="dialog"` + `aria-labelledby` + `aria-describedby`. `prefers-reduced-motion` honoured across all three documented motions. | Header dropdowns lack **arrow-key roving tabindex**: Tab works (each child link is focusable in order), but a keyboard user expects ↓ / ↑ within an open menu and Home / End to jump to first / last item. The carousel pauses on `mouseenter` but not on `focus-within` — keyboard-only users see slides advance under them. Form-element default focus styling (radios, checkboxes if any land) hasn't been customised. | `components/layout/header.vue`; `components/alpos-console.vue` autoplay options |
| 8 | Information Architecture & Navigation Clarity | **9** | Clean 5-item header structure: Solutions▾ / Capabilities▾ / Industries▾ / Trust (flat) / Company▾ + canonical "Book a demo" CTA. Each dropdown advertises only real depth (0 stubs). Footer has 3 columns (Solutions / Platform / Company) + a legal/status bar. Mobile drawer mirrors. | No breadcrumbs on inner pages. A buyer landing on `/industries/financial-services` from a direct link / referral / search result sees only the eyebrow ("Industries · Financial Services") — not a clickable trail back to `/industries`. "Trust" as a top-level flat link is slightly off — it sits between Industries (dropdown) and Company (dropdown) without grouping; arguably belongs inside Company or as the first item of a future "Sovereignty" dropdown. | All inner industry/capability/solution pages |
| 9 | UX Writing & Microcopy | **8** | Brand voice doc (`docs/brand-voice.md`) enforces signature opinion + 10-phrase vocabulary + 10-phrase forbidden list (no ChapsVision echoes). CTAs standardised to 2 canonical labels + 1 special case (`Connect confidentially` for Defense). Newsroom empty-state copy ("Nothing in this category yet. The other categories have content. Switch the filter…") is a good pattern. About page is a real conviction-led essay, not LinkedIn-summary boilerplate. | Error messages, 404 copy, and form-validation copy don't exist yet (no real forms; `error.vue` is base1-inherited stub). Empty-state copy pattern from Newsroom hasn't been propagated. Some legacy copy still uses "We" subject overload — a future voice-doc v2 should add a "subject-of-sentence" rule. | `error.vue`; `pages/company/newsroom/index.vue` (good); no other empty states authored |
| 10 | State Coverage (loading / empty / error / success) | **5** | Page transition (280 ms fade + blur) acts as a soft loading state. Newsroom has empty state for zero-filter-results. Cookie consent acts as the one persistent UI banner. | **No skeleton loaders** anywhere — blog list, capabilities grid, industries grid all flash from empty to populated on slow networks. **404 page is generic** Nuxt-default (the brand voice never gets to greet a lost user). Blog API errors silently — no error toast, no retry, no fallback. **No success states** for any forms because no real forms exist (Contact is mailto-only). Async actions (filter chip click, carousel slide change) lack micro-feedback. | All API-driven surfaces; `error.vue`; `pages/contact.vue` |
| 11 | Onboarding & First-Run Experience | **6** | Cookie consent banner appears on first visit (consent-first, no pre-checked boxes). Hero communicates positioning in one sentence (post-P0.3 rewrite). Two clear CTAs (Book a demo + See how AlpOS works). | No "what to do next" affordance after the hero — no scroll cue, no inline mini-table-of-contents, no progress indicator on long pages. Long pages (AlpOS at ~3000 px scroll, FS industry at ~2500 px) have no orientation aid. First-run visitor doesn't know that the page below the hero contains 8 sections; they only learn by scrolling. No demo video or interactive preview for visitors who want to see the platform without booking a demo. | Home `/`; AlpOS `/solutions/alpos`; all industry pages |
| 12 | Brand Alignment & Visual Identity | **6** | Brand voice doc + brand identity designer brief written. Spiral hero is the one striking ownable visual. Green dot punctuation (`Sovereignty isn't a feature.`) is recognisable. Pastel section palette is consistent and feels considered. | Identity is **template-grade** until P2.3 commission lands. Current "D" mark + demo-licensed Degular Display is generic; another sovereign-AI startup could ship the same wordmark in 4 hours from a Tailwind template. Auditor's prediction: brand-alignment score jumps from 6 to ~8–9 immediately once the identity refresh lands. | `/icon.svg`; `/og-cover.png`; `assets/fonts/DegularDisplayDemo-*.otf` |

### Weighted average

```
(8 + 7 + 9 + 7 + 6 + 5 + 8 + 9 + 8 + 5 + 6 + 6) / 12 ≈ 7.0
```

### Overall UX Maturity Score

**🟡 Refined (Beta).** The site is past Functional and approaching Polished, but two dimensions hold it back from production grade: real-device responsiveness verification (Dim 6 — 5/10) and state-coverage gaps (Dim 10 — 5/10). The brand-identity ceiling (Dim 12 — 6/10) is also a known cap until P2.3 ships. Everything else clusters in the 7–9 range.

---

## 2 — COMPLEXITY MAP (UX Surface Triage)

Buckets every shipped UI surface. *Polish level %* = how close to production quality. *Remaining effort hrs* = focused design+dev to reach 95 %+.

### 2.1 — 🟢 Simple Surfaces

| Surface | Polish % | Remaining hrs | Note |
|---|---|---|---|
| Home hero (`components/section/hero.vue`) | 90 % | 4 | Mobile spiral crop verification + tablet test. |
| Numbers Strip (`components/numbers-strip.vue`) | 95 % | 1 | Add 5th card when founding year confirmed. |
| Solutions triad (home section 2) | 95 % | 0 | Done. |
| AlpOS teaser (home section 3) | 90 % | 2 | Wrap inside `.card-hover` consistency pass. |
| Intelligence cycle (home section 4) | 95 % | 0 | Done. |
| Sovereignty strip (home section 5) | 95 % | 0 | Done. |
| Newsroom showcase (home section 7) | 90 % | 2 | Image placeholders on 2 of 3 posts need real assets. |
| Frosted CTA (home section 8) | 90 % | 2 | Mobile scaling on the spiral backdrop untested. |
| `/contact` | 80 % | 6 | Mailto-only; intent-list is good but no real form / no `Cal.com` / no inline calendar. |
| `/trust` | 80 % | 6 | Principles + deployment matrix present; certifications block stays principles-only per founder direction. |
| `/press` | 80 % | 4 | Asset downloads are placeholders; replace once P2.3 identity ships. |
| `/status` | 80 % | 4 | Static; needs managed status provider (StatusPage / Better Stack) for v2. |
| 4 legal pages (`/legal/*`) | 85 % | 4 (1 hr each) | Last-updated dates are hardcoded; lift into a constant. |
| `/company/about` | 90 % | 3 | Founder portrait + Zurich/Istanbul photography. |
| `/company/careers` | 90 % | 4 | Per-role detail pages don't exist; "Apply" routes to /contact. |
| `/company/newsroom` index | 90 % | 2 | URL state for filter chips (shareable). |
| Newsroom post template (`[slug].vue`) | 85 % | 3 | Code blocks in technical posts have no syntax highlighting; engineering blog wants this (P3.1). |
| Footer (`components/layout/footer.vue`) | 90 % | 2 | Brand line works; mobile spacing tight on 320 px widths (unverified). |
| Cookie consent (`components/cookie-consent.vue`) | 95 % | 1 | Add keyboard-focus trap inside the dialog. |

**Subtotal:** ~50 hrs to bring every Simple surface to ≥ 95 %.

### 2.2 — 🟡 Moderate Surfaces

| Surface | Polish % | Remaining hrs | Note |
|---|---|---|---|
| Header desktop dropdowns (`components/layout/header.vue`) | 80 % | 8 | Arrow-key roving tabindex + Home / End jump. |
| Header mobile drawer | 75 % | 6 | Real-device verification; tap targets; backdrop dismiss UX. |
| 6 industry pages | 85 % (shared) | 12 (extraction) + 4 (polish) | Extract `IndustryLayout` component; remove copy-paste; pass content as props. |
| 6 capability pages | 85 % (shared) | 10 (extraction) + 3 (polish) | Same — extract `CapabilityLayout`. |
| AlpOS page (`/solutions/alpos`) | 85 % | 6 | Architecture SVG could be richer; "Where it lands" section could carry one real case study once available. |
| 4 solutions pages (`/solutions/{alpos,cyber,DT,osint}`) | 85 % | 4 | Cybersecurity + DT + OSINT could each use 1 product visualization (like AlpOS console). |
| Solutions hub | 90 % | 2 | Done. |
| Industries hub | 95 % | 1 | Done; consider adding per-industry stat cards. |
| Capabilities hub | 95 % | 1 | Done. |
| Sectors marquee (home section 6) | 75 % | 6 | 60 px font on mobile untested; pause-on-focus missing. |
| AlpOS console carousel (`components/alpos-console.vue`) | 85 % | 6 | Adaptive height per slide on mobile; pause-on-focus; better dot affordance. |
| Numbers Strip → numbers detail | n/a | 4 | Hover-reveal explainer per card (small but adds depth). |

**Subtotal:** ~73 hrs to bring every Moderate surface to ≥ 95 %.

### 2.3 — 🔴 Hard Surfaces (High-Stakes / High-Complexity)

| Surface | Polish % | Remaining hrs | Note |
|---|---|---|---|
| Hero spiral image positioning across breakpoints | 70 % | 12 | Real-device verification on iPhone SE / 13 / Pro Max; tablet landscape + portrait; explicit mobile-spiral asset if crop is wrong. |
| Header dropdown a11y (roving tabindex, escape, return focus) | 80 % | 8 | Industry-standard combobox-pattern build; complex but enforces a11y. |
| AlpOS console — accessible carousel | 85 % | 8 | Real ARIA pattern (live region announces slide change; keyboard ↔ controls); SwiperJS doesn't ship this by default. |
| Future: scroll-progress / table-of-contents on long pages | 0 % | 16 | Build a `<TableOfContents>` reactive nav that highlights current section. Largest UX leverage on long pages. |
| Future: real engagement form with backend (replaces mailto) | 0 % | 24 | Form component + POST handler + spam control + success state + email routing + CRM hook. |
| Future: real-device QA matrix (BrowserStack + Lighthouse CI) | 0 % | 20 | Set up the testing infrastructure that proves Dim 6 score goes from 5 → 9. |

**Subtotal:** ~88 hrs for the Hard bucket. Note that the bottom three rows are *new* surfaces, not polish on existing ones.

### Total polish budget

```
Simple:    ~50 hrs
Moderate:  ~73 hrs
Hard:      ~88 hrs
───────────────────
Total:    ~211 hrs   ≈ 4–6 weeks of focused design+dev for one practitioner
```

---

## 3 — UX BLOCKERS & PROPOSED SOLUTIONS

Eight blockers, ordered by severity then by impact area. Each has Quick / Permanent solution + effort estimate.

### Blocker #1: Mobile breakpoint coverage is unverified end-to-end

- **Category:** Responsiveness
- **Severity:** 🟠 Major (high probability of real failures on mobile; 30–50 % of buyer traffic typically arrives on mobile via LinkedIn / email shares).
- **Impact Area:** Every page on every iPhone / Android phone. Primary at-risk surfaces: home hero (spiral crop), sectors marquee (60 px font), AlpOS console carousel (fixed chrome width), newsroom filter chips (under 44 px tap target).
- **Evidence:** Zero real-device testing during the audit session. All layouts validated only via Chrome DevTools device emulation (which is not authoritative for touch targets, native font rendering, or iOS Safari's quirks). Hero spiral uses `max-[980px]:scale-[3]` — aggressive and unverified.
- **Root Cause:** No mobile device in the build loop. Tablet + mobile breakpoints written confidently but tested by emulation only.
- **Solution A (Quick — 2 hrs):** Open the site on a personal iPhone + an Android device. Walk through home → AlpOS → FS industry → Newsroom → Trust → Contact. Screenshot any breakage. File a punch list. Fix the worst three issues inline.
- **Solution B (Permanent — 20 hrs):** Set up real-device cloud testing (BrowserStack / LambdaTest). Add a Playwright visual-regression suite that captures hero, mid-page, and footer at 320 / 375 / 414 / 768 / 1024 / 1440 widths. Wire into CI so a regression fails the build.
- **Estimated Effort:** A: 2 hrs · B: 20 hrs

### Blocker #2: Identity is still template-grade until P2.3 commission lands

- **Category:** Visual Design / Brand
- **Severity:** 🟠 Major (single biggest visual-distinctiveness lever).
- **Impact Area:** Site-wide. The "D" mark + demo-licensed Degular Display is the most-replicated visual element in the entire IA.
- **Evidence:** Audit Dim 4 + Dim 12 both call this out. Brand identity designer brief (`docs/brand-identity.md`) is written and ready to commission; commission itself is founder action.
- **Root Cause:** Commission requires founder decision on designer selection, budget, and legal entity finalisation. None of those are autonomous.
- **Solution A (Quick — 4 hrs):** Commission a *minimum-viable identity refresh*: just a new mark + a licensed type face (e.g. licensed Söhne / Migra / Inter Display) — skip Tier-2 (templates) and Tier-3 (motion identity). 3-week designer turnaround. ~€8–15 k budget.
- **Solution B (Permanent — 5–8 weeks):** Full P2.3 scope from the brief — mark + wordmark + lockups + type system + colour refinements + engagement-document templates + slide template + email signature. ~€25–60 k budget.
- **Estimated Effort:** A: 4 hrs to commission + ~3 weeks waiting · B: per the brief

### Blocker #3: No skeleton loaders / no error states / generic 404

- **Category:** State Coverage / Performance Perception
- **Severity:** 🟠 Major (loading flash + cold 404 both reduce perceived institutional polish).
- **Impact Area:** Newsroom hub (blog API load); home Newsroom showcase; any future API-driven surface; all 404 / 500 paths.
- **Evidence:** Inspecting Network tab on Newsroom hub shows a brief empty list → populated transition on slow connections. `error.vue` is base1-inherited stub. Blog API errors silently in `try/catch` without surfacing.
- **Root Cause:** State coverage was never explicit P0/P1/P2. Each new surface inherited "happy path only."
- **Solution A (Quick — 4 hrs):** Write a branded `error.vue` (404 + 500 with Davion voice, link back to home). Add a skeleton block to the Newsroom grid that matches the BlogCard footprint while loading. Add a `useFetch` `onResponseError` toast for blog API failures.
- **Solution B (Permanent — 16 hrs):** Build `<SkeletonBlock>` + `<EmptyState>` + `<ErrorState>` as design-system components. Replace all `v-if="pending"` blocks with `<SkeletonBlock variant="..."/>`. Build the 4-tier branded error pages (404 / 500 / network / unauthorized). Wire into every API consumer.
- **Estimated Effort:** A: 4 hrs · B: 16 hrs

### Blocker #4: Component duplication across 12 industry/capability pages

- **Category:** Component Consistency
- **Severity:** 🟡 Minor (works today) but expensive maintenance going forward.
- **Impact Area:** Every future template tweak. Adding a "real case study" callout, changing the eyebrow style, or moving the CTA position now requires touching 12 files.
- **Evidence:** `pages/industries/*.vue` and `pages/capabilities/*.vue` share 90 % structure. The action plan called for "lighter template" — what shipped is inline templates not a shared component.
- **Root Cause:** P2.1 / P2.2 prioritized speed of writing content over component extraction.
- **Solution A (Quick — 0 hrs):** Accept the duplication for now. Next template change *trigger* the extraction.
- **Solution B (Permanent — 12 hrs):** Extract `IndustryLayout.vue` and `CapabilityLayout.vue` — each takes `{ hero, problemAreas, solutions, story, cta }` props. Refactor the 12 pages to a single line each plus a data object. Net code reduction: ~75 %.
- **Estimated Effort:** A: 0 · B: 12 hrs

### Blocker #5: Header dropdowns lack arrow-key keyboard navigation (a11y)

- **Category:** Accessibility / Interaction Design
- **Severity:** 🟡 Minor (Tab navigation works; ↓ / ↑ is a power-user expectation).
- **Impact Area:** Keyboard users (screen-reader users, power users, users with motor disabilities) navigating the 5 header dropdowns.
- **Evidence:** Header dropdowns have `aria-expanded` on the trigger button and `onKeydown` at document level for Escape — but no roving tabindex inside the open menu, no ↓ / ↑ to step through items, no Home / End to jump to first / last. The carousel pauses on `mouseenter` but not on `focus-within` so a Tab into the carousel keeps slides advancing.
- **Root Cause:** P3.12 a11y sweep covered the highest-leverage gaps (skip-link, focus rings, ARIA labels) but stopped short of full WAI-ARIA menu pattern.
- **Solution A (Quick — 2 hrs):** Add `pauseOnFocus: true` to the AlpOS console autoplay options (Swiper supports it). Add `Escape` close-on-keydown inside the dropdown links specifically (not just document-level).
- **Solution B (Permanent — 8 hrs):** Implement the WAI-ARIA menubar pattern: roving tabindex within each open dropdown, ↓ / ↑ to navigate items, Home / End to jump, Tab to close-and-advance to next nav item. Add `aria-haspopup="menu"` + `role="menu"` + `role="menuitem"` markup.
- **Estimated Effort:** A: 2 hrs · B: 8 hrs

### Blocker #6: "Book a demo" doesn't actually book anything

- **Category:** Interaction Design / Conversion
- **Severity:** 🟠 Major (every primary CTA on the site routes to a mailto-style intake; no scheduling).
- **Impact Area:** Every "Book a demo" CTA — there are 22 of them. The principal conversion event on the site.
- **Evidence:** All Book-a-demo buttons → `/contact` → intent list + `mailto:engagement@davion.com`. A buyer who clicks "Book a demo" expects either a calendar widget or a form that books a slot; what they get is "compose an email." Conversion friction is substantial.
- **Root Cause:** No scheduling provider integrated (Cal.com / Calendly / Chili Piper). No backend form endpoint built.
- **Solution A (Quick — 2 hrs):** Embed a Cal.com / Calendly inline scheduler on the engagement page below the intent list. Keep mailto as fallback. CTA label stays accurate.
- **Solution B (Permanent — 24 hrs):** Build a real form with backend POST handler + spam control (turnstile / reCAPTCHA Enterprise) + success state + CRM integration (HubSpot / Pipedrive) + email routing to the right inbox (sales / press / partnerships / careers / venture). Add lead-source tracking.
- **Estimated Effort:** A: 2 hrs · B: 24 hrs

### Blocker #7: Long pages lack scroll orientation (no TOC, no progress)

- **Category:** Information Architecture / Onboarding
- **Severity:** 🟡 Minor (current pages are scannable, but at ~3000 px each on AlpOS and FS, a reader can lose place).
- **Impact Area:** AlpOS page (12 sections), FS industry (5 sections + nested cards), About page (5 sections), Trust page.
- **Evidence:** Audit Dim 11 — "No 'what to do next' affordance after the hero. Long pages have no orientation aid. First-run visitor doesn't know the page below the hero contains 8 sections; they only learn by scrolling."
- **Root Cause:** No `<TableOfContents>` component exists.
- **Solution A (Quick — 3 hrs):** Add a thin, sticky scroll-progress bar at the top of every page (~3 px tall, primary-text colour, fills based on `scrollY / scrollHeight`). Minimum-viable orientation aid.
- **Solution B (Permanent — 16 hrs):** Build a real `<TableOfContents>` reactive nav that lives in a right sidebar on `≥lg`, collapses to a top bar on `<lg`, highlights the current section via IntersectionObserver, and lets readers jump. Used on AlpOS / Trust / About / long-form newsroom posts.
- **Estimated Effort:** A: 3 hrs · B: 16 hrs

### Blocker #8: Pastel section backgrounds don't differentiate

- **Category:** Visual Design / Color System
- **Severity:** 🟡 Minor (works; not broken; not memorable).
- **Impact Area:** Every page that uses ≥ 2 pastels in sequence (i.e. all of them).
- **Evidence:** azure #e0f1f3 vs aliceblue #dceff3 differ by ~4 hex digits and read as the same colour at a glance. honeydew #d9efdf is the only one that lands as a distinct hue. On a screenshot the home page reads as one continuous "white-blue" gradient.
- **Root Cause:** Inherited from base1's pastel system; never re-evaluated when the rest of the colour story tightened.
- **Solution A (Quick — 2 hrs):** Collapse to 3 distinct pastels: azure (sky) / honeydew (green-leaning, for "where it lands" stories) / whitesmoke (neutral). Retire aliceblue. Apply across all pages.
- **Solution B (Permanent — 8 hrs, sequenced after P2.3):** Hand the palette to the brand designer alongside the identity brief. Let them decide: keep 3 pastels, swap to a tone-on-tone neutral system, or introduce one accent (warm/orange?) to break the cool monotony.
- **Estimated Effort:** A: 2 hrs · B: 8 hrs

---

## 4 — ANTI-PATTERN & FRICTION DETECTION

Walk-through findings. Each line: *Location → Problem → Suggested Fix*.

### Dark patterns
- **Forced continuity:** None.
- **Roach motel:** None — every CTA leads to a clear destination; no subscription traps.
- **Confirmshaming:** None.
- **Misdirection:** None — primary CTAs are visually distinct from secondary; no fake-button traps.
- **Hidden costs:** N/A — no pricing.

**Status: ✅ Clean.** Davion treats the visitor with respect.

### Cognitive overload
- **Home page section count:** 8 sections (Hero → Numbers Strip → Solutions triad → AlpOS teaser → Intelligence cycle → Sovereignty strip → Sectors marquee → Newsroom showcase → CTA). Borderline. → **Fix:** consider folding Intelligence cycle into AlpOS teaser; consider moving Sovereignty strip into Trust page only. Drops to 6.
- **Industry / capability pages:** 5 sections each — appropriate.
- **AlpOS page:** 12 sections — long, but the architecture warrants depth. → **Fix:** add Blocker #7 Solution B (TOC) so length feels intentional, not endless.
- **Too many CTAs per screen:** The frosted CTA section near the bottom has 2 CTAs (Book a demo + briefings@davion.com) — appropriate. Most other pages have 1–2. PASS.

### Unclear affordances
- **All button-like elements have icons + labels.** PASS.
- **Card-hover inconsistency:** FeatureCard lifts on hover; industry / capability / blog cards do not. → **Fix:** add `.card-hover` to industry-hub cards, capability-hub cards, and BlogCard.
- **Newsroom filter chips:** Have visible borders + colour-on-active. Read as buttons. PASS.

### Inconsistent patterns
- **CTA labels:** Canonical (Book a demo / Speak to an expert / Connect confidentially). Enforced. PASS.
- **Eyebrow casing:** `CommonSup title="…"` accepts mixed input; rendered uppercase by CSS via `tracking-[0.15em]` + `uppercase` class. PASS.
- **Date format:** Newsroom uses `2026 May 20`-style; Last-updated stamps on legal pages use ISO `2026-05-21`. → **Fix:** pick one. Recommend ISO across all surfaces since it reads institutional and is internationally unambiguous.
- **Icon vocabulary:** `base:arrow` / `base:chart-square` / `base:verified` / `base:chart-2` / `base:menu` / `base:close` — all base1-inherited. PASS but the icon set itself is generic and should evolve with P2.3.

### Missing feedback
- **No destructive actions on the marketing site.** PASS.
- **Cookie consent decision broadcasts a `cookie-consent:changed` event** — good. But the change isn't visually acknowledged inside the banner (it just dismisses). → **Fix:** add a brief toast / inline-confirm so the user knows their choice landed.
- **Newsroom filter clicks:** Instant local filter, no perceptible delay; no loading state needed. PASS.
- **Carousel slide changes:** Auto-rotates; dots highlight; no skeleton or fade-in needed. PASS.

### Broken / empty states
- **Newsroom filter empty state:** Good. Branded copy + recovery CTA.
- **All other potential empty states:** Not authored.
- **404 page:** Default Nuxt 404. → **Fix:** write `error.vue` with Davion voice + return-to-home + search-suggestion.
- **500 / network error:** No coverage. → **Fix:** same `error.vue` with `error.statusCode` branching.
- **No skeleton loaders:** See Blocker #3.

### Accessibility gaps (post-P3.12)
- **Contrast:** 0 violations, lint-enforced. PASS.
- **Focus rings:** Strengthened with dark outline + light halo, visible on all backgrounds, inverted on `.bg-black` / `.bg-drygray-100`. PASS.
- **Skip-to-content link:** Present. PASS.
- **ARIA on carousel:** Full pattern (region + roledescription + per-slide labels). PASS.
- **Header dropdown arrow-keys:** See Blocker #5.
- **Carousel pause-on-focus:** See Blocker #5.
- **Form controls:** No forms yet; n/a.

### Mobile breakage
- **Untested end-to-end.** See Blocker #1.
- **Suspected issues:** Hero spiral crop at `max-[980px]:scale-[3]`; sectors marquee at 60 px font; Newsroom filter chips at ~32 px tap height (under 44 px iOS HIG); AlpOS console carousel chrome on iPhone SE width (320 px).

### Form friction
- **No real forms yet.** Contact uses mailto. Engagement page lists intents. See Blocker #6.

### Navigation drift
- **No breadcrumbs on inner pages.** See Blocker #5 / IA discussion in §1 Dim 8.
- **Back / progress on long pages:** Missing. See Blocker #7.
- **Dead-end screens:** Status page is reachable from footer only — a buyer who lands there has nowhere to go except back. → **Fix:** add a "Looking for the product?" CTA at the bottom of /status.

### Copy issues
- **Jargon:** Brand voice doc prohibits buzzwords. Spot-check passes.
- **Untranslated strings:** Site is English-only; the audience is multilingual (Zurich / Istanbul + European institutional). → **Fix:** flag as P3 / P4 — i18n is a major undertaking but the audience expects at least DE / FR / TR copy eventually.
- **ALL-CAPS shouting:** Used only on eyebrow micro-labels (mono, uppercase, `tracking-[0.15em]`) — design-intentional. PASS.
- **Passive voice in CTAs:** "Book a demo" / "Speak to an expert" / "Connect confidentially" — all active imperative. PASS.
- **Error messages:** Don't exist yet. See Blocker #3.

### Iconography
- **Icons inside labeled buttons:** All have aria-hidden because the label is the accessible name. PASS.
- **Decorative icons:** Green dots (`<span class="w-1.5 h-1.5 rounded-full bg-primary"/>`) have `aria-hidden="true"`. PASS.
- **Culturally inappropriate symbols:** None.

### Visual debt
- **Corner radii:** Codified 4-step scale (`rounded-3xl` section / `rounded-2xl` card / `rounded-xl` element / `rounded-lg` button). PASS.
- **Spacing:** Tailwind utilities applied consistently. `gap-3 / gap-4 / gap-8 / gap-10` covers most of the spec.
- **Off-brand colours:** Lint-enforced. PASS.
- **Misaligned grids:** None spotted in desktop; mobile unverified.
- **Low-quality imagery:** Hero spiral is 50 KB WebP — sharp. OG card is brand-aligned 49 KB PNG. PASS. Newsroom posts ship without featuredImage on 5 of 6, falling back to /icon.svg in a circle — looks deliberate but cold.

---

## 5 — USER JOURNEY / MISSION DRIFT ANALYSIS

### 1. Gap between intended journey and shipped experience

**Aligned with primary JTBD (institutional buyer evaluation):**
- Home → AlpOS → Trust → Contact (the "evaluate the platform" path)
- Home → Industries dropdown → [their industry] → AlpOS → Contact
- Home → Capabilities dropdown → [specific capability] → Trust → Contact
- About → Contact (the conviction-driven path)
- Newsroom → "Most sovereign AI isn't" insight post → Contact (the opinion-discovery path)

**Deviating from / adding friction to primary JTBD:**
- "Book a demo" CTA → mailto (Blocker #6). The single most-clicked path on the site does not actually book a demo.
- Long pages without TOC (Blocker #7). The AlpOS page is excellent depth content but readers without orientation may bounce.
- Sectors marquee mid-page (home section 6) — beautiful brand expression but doesn't advance the evaluation task. Acceptable as a deliberate brand-moment break.

**Missing flows that primary buyer needs:**
- **Customer story / case study** — single highest-impact missing piece. P1.3 deferred. Without one named or anonymized engagement, every other piece of credibility-building works ~30 % less hard than it should.
- **Comparison content** — buyers in this category do side-by-side. A "Davion vs. ChapsVision / Aleph Alpha / Palantir" page (even just a deployment-mode matrix comparison) would directly serve evaluation.
- **Pricing / engagement-scope indication** — "engagements are consultative" is current language; a buyer cannot estimate whether Davion is in their budget range. A "starting scope" or "typical 6–12 week pilot" range card would unblock budget conversations.
- **Real product demo** — the AlpOS console mockup is good but it's static. An interactive demo (even a 90-second loom video embedded on the AlpOS page) would let the buyer see motion without committing to a meeting.
- **Security questionnaire / SIG-lite download** — institutional buyers ask for this in week one of evaluation. A pre-filled SIG-lite PDF on the Trust page would close that loop.

### 2. UI scope creep

**Features/screens that exist but don't serve the primary buyer:**
- Careers page is for recruits, not buyers. Acceptable — it signals the team is real (which buyers care about indirectly). But it sits in the Company dropdown alongside About and Newsroom, which buyers do read.
- Press kit is for journalists. Lives in footer only — appropriately deprioritised in nav. Good IA call.
- Status page is operationally useful but mostly speaks to ops-side stakeholders, not the buyer making the procurement decision.

**Decorative complexity that slows the user:**
- Page transition (280 ms fade + blur) — 280 ms is on the edge. Quick navigation feels slightly sluggish if the buyer is power-scanning. → Consider 180 ms with no blur, or 220 ms with the blur kept.
- Reveal-on-scroll (600 ms) — fine for first scroll but feels long if a buyer is scroll-jumping with the keyboard. The `prefers-reduced-motion` override handles accessibility but not the speed-power-user case.

**Estimated deviation from the lean primary-user experience: ~15 %.** Acceptable for a brand site. Less acceptable for a product surface (which AlpOS' real UI will need to optimise harder for).

### 3. Persona mismatch check

- **Visual register:** Light pastel sections + green accent leans slightly *friendlier* than the strictest defense / intelligence buyer expects. The Defense & Intelligence industry page corrects with a more reserved tone, but the home and Industries hub set the same friendly register that bank / energy buyers see. → **Verdict:** Correct for the broad institutional audience. The risk is that hard-defense buyers feel the brand is "soft." Mitigation: the AlpOS hero pivots harder (`Sovereign AI infrastructure for decisions that can't wait. And can't leak.`) — that's the right tonality for defense buyers and they land there from the Defense & Intelligence page.
- **Density:** Moderate density on hero / inner pages, low density on home. Buyers expect more density on technical pages (capabilities). Currently capability pages are *less* dense than industry pages — the four-step diagram ("Ground · Retrieve · Reason · Cite") could be denser with sub-bullets and links into AlpOS layer pages.
- **Tone of voice:** Declarative, voice-doc-enforced. No exclamation marks. No buzzwords. Correct for institutional. PASS.
- **Expert vs. novice expectations:** Pages assume the reader knows what "sovereign AI" means. A novice buyer (e.g. a CFO not a CIO) lacks an explainer. → A short "What is sovereign AI?" anchor section on the home or About page would catch the novice-buyer case without diluting the expert flow.

### 4. Realignment Recommendations

**Cut (or move out of primary-buyer path):**
- Move Status from the legal footer to just `/status` (still reachable, but no banner-bar placement). Buyers don't read status; ops people do.
- Consider folding Sectors marquee into a smaller, more functional "industries we serve" strip — it's beautiful, but it's a 600-px-tall brand moment in the middle of an evaluation flow.
- Page-transition duration: drop to 220 ms or accept it. Decision today, not a meeting.

**Sharpen:**
- Replace "Book a demo" mailto path with real scheduling (Blocker #6). This is the single highest-leverage conversion fix on the site.
- Add a TOC to the AlpOS page (Blocker #7). The depth content is good; the reader's experience of the depth is not yet good.
- Write the missing customer story page (P1.3 — deferred). Even a single anonymized story with hard numbers makes every other proof element on the site work harder.

**Add:**
- A short "compare" surface (Davion vs. ChapsVision / Aleph Alpha / Palantir / Mistral). 1 page, table-driven, honest about where Davion currently loses (e.g. "Palantir has 20 years of deployments; we have under 1 year — choose us when sovereign deployment posture matters more than incumbency").
- A 90-second demo loom embedded on the AlpOS page. Lower-commitment than booking a meeting.
- A "What is sovereign AI?" 200-word anchor on the home page (or expanded into a short explainer page). Catches novice-buyer paths without slowing expert flow.
- A pre-filled SIG-lite or basic security-questionnaire PDF on the Trust page.

---

*End of analysis report. Companion file: `ui-ux-action-plan-2026-05-21.md`.*
