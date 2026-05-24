# Davion — Website Full-Stack UX & Responsiveness Audit
**Date:** 2026-05-24
**Target:** https://davion.com.tr
**Primary journey audited:** landing → understand product → /contact engagement form
**Audience:** B2B CIOs / CISOs / procurement leads in regulated sectors (banking, energy, defense, life sciences, government); ~30-40% mobile traffic expected for first-touch, desktop-heavy for deep evaluation
**Stack constraints:** Nuxt 3.17.7 (Nitro 2.12.4 node-server) + Tailwind 3.4 + Vue-i18n 9.5 + Caddy 2 + Docker on Hetzner CX32 + Cloudflare front
**Methodology:** SSR HTML inspection (curl direct to origin via Docker, bypassing CF), codebase analysis of 35 pages + 27 components, response-timing measurement (TTFB / total), bundle-size inspection, Tailwind class frequency analysis, WCAG 2.2 SC mapping

---

## 1 — SITE X-RAY (Scoring Matrix)

| # | Evaluation Dimension | Score | Justification | Critical Gap |
|---|----------------------|-------|---------------|--------------|
| 1 | Responsive Layout & Breakpoint Behavior | **7/10** | `overflow-x: clip` on html+body globally; 613 `md:` + 366 `lg:` Tailwind variants; only 45 `sm:` (rare — most pages collapse straight to mobile). 14 hard-coded `h-[Npx]` heights, 11 hard-coded `w-[Npx]` widths up to 1176px | Hero is `h-[640px]` on mobile (80% of 812px viewport); below-fold sections feel "buried" |
| 2 | Mobile UX & Touch Interaction | **6/10** | After today's fix, cookie banner + engagement form meet 44×44 (WCAG 2.5.5). 84 instances of `text-[11px]` for eyebrows/labels are visually small but only on metadata, not interactive copy. `touch-action: manipulation` only on cookie buttons | Most buttons (`CommonButton` variants) don't have explicit `min-h-[44px]` — relies on padding to be ~44px, fragile |
| 3 | Visual Design System & Brand Consistency | **7/10** | Centralized Tailwind tokens (`primary`, `primary-text`, `drygray-100/200/default`, pastel palette, `font-degular`/`font-switzer`). 5 inline `#FFFFFF` + 5 `#212121` + 6 `#979797` raw hex inside SVG attrs — acceptable but should use CSS vars | Period-accent pattern (`<span class="text-primary-text">.</span>`) duplicated ~80× across pages instead of being a single `<HeadlineWithDot>` component |
| 4 | Information Architecture & Navigation Clarity | **8/10** | Three-tier menu (Solutions / Capabilities / Industries) with WAI-ARIA menubar pattern (P1.U4). Skip-link "Skip to content" present. Persistent CTA "Book a demo" in header. Footer has 3 column groups + legal row + Sovereign-by-deployment line | "Trust", "Contact", "Press" sit at different IA depths — no clear "About / Company" mega-menu, three orphan top-level items |
| 5 | Accessibility (WCAG 2.2 AA) | **7/10** | Skip-link, focus-visible ring tuned for both light + dark sectors, ARIA on dropdowns + dialogs, form labels properly associated with `for=/id=`, `aria-invalid` + `aria-describedby` on form errors, honeypot company-name field, `prefers-reduced-motion` honored in CSS + `v-reveal` | Heading hierarchy on home: 1× h1 ✓ then jumps directly to 1× h3 on a newsroom card before the next h2 (skipped level, WCAG 1.3.1) |
| 6 | Performance & Core Web Vitals | **5/10** | Home TTFB from origin: **1.12s** (vs ~30ms for other static pages). SSR blocks on `/api/blog` + `/api/settings` Postgres round-trips. Main JS bundle `BORnajxJ.js` is **938 KB** unminified-shipped. Section bg images properly responsive (`-480/-960/-1600/-2400.webp` variants) | **`public/cover.jpg` is 3.6 MB** sitting unused in the static dir — gets crawled, wastes egress, hurts Lighthouse |
| 7 | Content Clarity, Microcopy & Tone | **8/10** | Brand voice (per `docs/brand-voice.md`) is sharp, declarative, no-buzzword. Period-accent rhetoric is consistent. Today's repositioning ("Decision infrastructure for data that can't leave") lands; product page graduates to "And data that can't leak" | "Sovereign AI" still appears in About-page definitional section — intentional, but the page should *frame* it more clearly as "the term the market misuses" |
| 8 | Conversion & Funnel Friction | **6/10** | Two CTAs in nav ("Book a demo" + variant per page). Engagement form has 5 intents (Briefing / Partnership / Press / Careers / Venture). Form inputs use `text-base` (16px) → no iOS focus-zoom. mailto fallback for every team | No proof block, no logos-of-customers, no quantified outcomes ("X% faster", "Y cases adjudicated") — every claim is qualitative |
| 9 | Cross-Browser & Cross-Device Compatibility | **7/10** | Bricolage Grotesque from Google Fonts (Latin Extended-A → Turkish + German glyphs render natively). Switzer from Fontshare. Standard Vue 3 / Nitro / Tailwind stack — broad browser support. Lenis smooth-scroll explicitly disabled on touch devices (correct iOS fix) | iOS Safari `100vh` not used (good); but no fallback for `overflow: clip` (Firefox <81, Safari <16) — degrades to default which is fine, just less robust |
| 10 | Technical SEO, Metadata & Crawlability | **6/10** | Per-page `useSeoMeta` reactive to locale (✓). Open Graph + Twitter Card meta + 1200×630 og-cover.png. `<title>Davion · Davion</title>` pattern via `titleTemplate`. After today's SSR fix, page bodies actually contain content for crawlers (was just spinner before) | No sitemap.xml served at `/sitemap.xml` — Google can't discover the 35 pages efficiently. `robots.txt` status unverified. No JSON-LD structured data (Organization / WebSite) anywhere |

**Overall Site Maturity Score: 6.7/10 → 🟡 Polished but Patchy**

The site is conceptually sharp (positioning, IA, voice) but technically uneven (perf, SEO scaffolding, a few SSR edges). The framework is right; the polish is partial.

---

## 2 — COMPLEXITY MAP

### 2.1 — 🟢 Simple (≤1h each)

| # | Issue | Location | Current State | Effort |
|---|-------|----------|---------------|--------|
| S1 | Delete or compress 3.6MB orphan `cover.jpg` | `apps/web/public/cover.jpg` | 3,624,863 bytes, no grep references in pages/components | 5 min |
| S2 | Add `sitemap.xml` route | `apps/web/server/routes/sitemap.xml.ts` (new) | Missing | 30 min |
| S3 | Add `robots.txt` | `apps/web/public/robots.txt` | Verify; add Disallow rules for admin if any | 10 min |
| S4 | Add JSON-LD `Organization` schema to home | `apps/web/pages/index.vue` `useHead` | Missing | 20 min |
| S5 | Fix skipped heading level on home (h1 → h3 before h2) | Newsroom card cluster on `pages/index.vue` | h3 used inside a card that follows the hero h1 with no intermediate h2 | 15 min |
| S6 | Make raw `<img>` in `reference-card.vue` a `<NuxtImg>` for srcset + format | `apps/web/components/reference-card.vue:28` | 1 raw `<img>` remaining (rest of site uses NuxtImg) | 20 min |
| S7 | Add `min-h-[44px]` + `touch-action:manipulation` to all `CommonButton` variants | `apps/web/components/common/button.vue` | Current padding ~40-44px depending on size variant; mobile tap can mis-fire | 30 min |
| S8 | Wrap repeated period-dot pattern into `<DotAccent>` component | Used ~80× across pages | Inline `<span class="text-primary-text">.</span>` everywhere | 45 min |
| S9 | Add `loading="lazy"` to non-hero `NuxtImg`s (newsroom thumbnails, executive photos) | Multiple components | NuxtImg auto-handles in some cases; explicit attribute is clearer | 20 min |
| S10 | `prefetch` hints on top-3 internal links from home (alpos, industries, contact) | `pages/index.vue` `useHead` link rel=prefetch | None | 15 min |
| S11 | Add `og:locale` + `og:locale:alternate` meta for tr / de | `apps/web/nuxt.config.ts` head.meta | Only `og:site_name` etc, no locale meta | 15 min |

### 2.2 — 🟡 Moderate (1–8h each)

| # | Issue | Location | Current State | Effort |
|---|-------|----------|---------------|--------|
| M1 | Hoist `/api/settings` + `/api/blog` (home) into a single SSR-cached fetch | `app.vue` + `pages/index.vue` | Two sequential DB round-trips block home SSR for 1.12s | 4h |
| M2 | Code-split the 938KB main JS bundle — defer Lenis, defer cookie banner | `nuxt.config.ts` build settings + lazy imports | Single chunk holds Lenis, IntersectionObserver-based reveal, cookie banner all at once | 6h |
| M3 | Add a `<Proof>` section to home (customer logos + 1 quantified outcome) | New component + slot in `pages/index.vue` | Site is all qualitative claims; no third-party validation visible | 6h |
| M4 | Compress hero spiral asset → AVIF with WebP fallback | `apps/web/public/section_background-*.webp` | Already webp at 4 sizes; AVIF would shave ~30% more | 3h |
| M5 | Add `<NuxtLink prefetch>` to all 6 industry cards on `/industries` | `pages/industries/index.vue` | Each card is a `<NuxtLink>` but Nuxt won't prefetch unless explicit | 1h |
| M6 | Form: surface success state in a toast + persist to localStorage (returning visitor) | `apps/web/components/engagement-form.vue` | Currently in-page state only; lost on reload | 4h |
| M7 | Mobile hero responsive: scale headline + reduce h-[640px] on 320px screens | `apps/web/components/section/hero.vue` | `h-[640px]` at 320px = 80% of viewport, too tall | 3h |
| M8 | Add per-page OG card generation (Satori) | `apps/web/server/api/og.ts` (new) | Single shared `/og-cover.png` for all pages — social shares look identical | 8h |
| M9 | Cookie banner: add "Manage preferences" link inside banner + dedicated `/legal/cookies#preferences` deep-link | `apps/web/components/cookie-consent.vue` | Currently binary Accept-all / Essential-only — no granular control | 4h |
| M10 | Replace static color tokens in SVGs with `currentColor` + CSS vars | `pages/solutions/alpos.vue` SVG, `pages/index.vue` cycle SVGs | Hard-coded `#60E576`, `#212121` inside `<text fill="...">` and `<rect fill="...">` | 4h |
| M11 | Audit & enforce heading hierarchy across 35 pages | Mostly OK except h3-before-h2 on home | Add an ESLint or build-time check | 4h |
| M12 | Mobile menu: trap focus inside drawer when open + Esc to close | `apps/web/components/layout/header.vue` | Body scroll lock exists; focus management partial | 4h |

### 2.3 — 🔴 Hard (system-level, >8h)

| # | Issue | Location | Current State | Effort |
|---|-------|----------|---------------|--------|
| H1 | Migrate `/api/settings` + `/api/blog` to use Nitro cache with stale-while-revalidate | Nitro `routeRules` in `nuxt.config.ts` + `server/api/` | Every SSR pageview hits Postgres; no edge cache | 2 days |
| H2 | Pre-render static-content pages (solutions, capabilities, industries, legal, trust, status, venture) — only home + newsroom need SSR | Nitro `routeRules: { '/solutions/**': { prerender: true } }` | All pages SSR'd at request time despite content being static | 3 days |
| H3 | Bundle audit + split: Lenis, reveal observer, cookie banner, newsroom carousel each behind `defineAsyncComponent` | `nuxt.config.ts` + per-component imports | Hydration cost is high (938KB chunk) for content that's mostly read-only | 3 days |
| H4 | Per-locale URL slugs (`/tr/cozumler/alpos` instead of `/tr/solutions/alpos`) | `@nuxtjs/i18n` `pages` config in `nuxt.config.ts` | English slugs across all locales | 2 days |
| H5 | Design-token unification: single `@theme` block in Tailwind v4 OR `tokens.ts` re-export, with raw hex eliminated in favor of CSS vars | `tailwind.config.ts`, all components | Mixed Tailwind classes + raw hex in SVGs/inline styles | 3 days |
| H6 | Real customer-logos / proof system (DB-backed, opt-in per logo, with i18n caption) | New schema + admin (Kottster) + Nuxt component | None — site has zero third-party validation | 4 days |

---

## 3 — BLOCKERS, FRICTION POINTS & PROPOSED SOLUTIONS

### Blocker #1: Home SSR blocks 1.12s on Postgres round-trips
- **Category:** Performance
- **Severity:** 🟠 Major (every visitor waits 1.1s before any HTML; mobile network adds another second)
- **Affected Viewport(s) / Device(s):** All; mobile feels it most
- **Affected User Journey:** Step 1 (landing). A 1.5s+ TTFB on mobile measurably increases bounce.
- **Evidence:** `time curl -sk --resolve davion.com.tr:443:127.0.0.1 https://davion.com.tr/` from inside the Docker bridge: TTFB=1.118s, total=1.123s. Other routes hit 25–55ms.
- **Root Cause:** `pages/index.vue` calls `useFetch('/api/blog', { limit:5 })` AND `app.vue`'s `useSettings()` indirectly causes a hit to `/api/settings` during SSR. Both hit Neon Postgres (US-East-1 → Hetzner Falkenstein round-trip).
- **Solution A (Quick patch):** Add Nitro cache directives:
  ```ts
  // nuxt.config.ts
  routeRules: {
    '/api/settings': { cache: { maxAge: 60 * 5 } },
    '/api/blog':     { cache: { maxAge: 60, swr: true } },
  }
  ```
  Cuts SSR latency from 1.1s to <50ms after first warm.
- **Solution B (Proper fix):** Move `/api/settings` content into a build-time env or static JSON since it changes once a quarter at most. Move newsroom fetch to a separate `<NuxtIsland>` so it doesn't gate page render.
- **Estimated Effort:** A: 1h / B: 2 days
- **Business Impact if Unfixed:** Every 100ms of TTFB costs ~1% conversion (industry rule of thumb). 1.1s on home → est. 7–10% lost first-time engagement.

### Blocker #2: 3.6 MB orphan `cover.jpg` in public/
- **Category:** Performance
- **Severity:** 🟡 Minor (not blocking, but free win)
- **Affected Viewport(s) / Device(s):** All — crawled by bots, served if linked anywhere
- **Affected User Journey:** Background drag; affects Lighthouse perf score and bot egress costs
- **Evidence:** `ls -la apps/web/public/cover.jpg` → 3,624,863 bytes. `grep -rn "cover.jpg" apps/web` → 0 references.
- **Root Cause:** Legacy asset from contractor-built base1 era, not removed during Davion rebrand
- **Solution A:** `rm apps/web/public/cover.jpg`; commit; redeploy.
- **Solution B:** If actually needed for some social-share fallback, convert to AVIF + 1200×630 + ≤80KB.
- **Estimated Effort:** A: 5min / B: 30min
- **Business Impact if Unfixed:** ~0.1% on Lighthouse perf score; nonzero CDN/origin egress over time

### Blocker #3: Main JS bundle 938KB
- **Category:** Performance
- **Severity:** 🟠 Major (mobile FCP/LCP hit, slow 4G unusable for 3-5s)
- **Affected Viewport(s) / Device(s):** All; mobile/throttled networks worst
- **Affected User Journey:** Every interaction post-FCP waits on parse + hydrate
- **Evidence:** `apps/web/public/_nuxt/BORnajxJ.js = 938,273 bytes` (from inside container)
- **Root Cause:** Single eager-loaded chunk includes Lenis (smooth scroll), IntersectionObserver wrapper, cookie banner, newsroom carousel logic, all dropdown menu logic
- **Solution A:** Audit with `pnpm --filter web build -- --analyze` to identify top 3 contributors; lazy-load the largest with `defineAsyncComponent`
- **Solution B:** Adopt route-based code splitting via Nitro presets; static-content routes don't need newsroom/cookie/Lenis logic loaded
- **Estimated Effort:** A: 4h / B: 3 days
- **Business Impact if Unfixed:** LCP likely 3-4s on mid-range mobile + slow 4G (target <2.5s)

### Blocker #4: Skipped heading level on home (h1 → h3)
- **Category:** Accessibility
- **Severity:** 🟠 Major (WCAG 2.2 SC 1.3.1 violation — screen readers report a broken outline)
- **Affected Viewport(s) / Device(s):** All
- **Affected User Journey:** Screen-reader users navigating by headings (H key in NVDA, rotor in VoiceOver) hit a disorienting jump
- **Evidence:** `curl /` HTML: 1× h1, then a card containing an h3 before the next h2 section header
- **Root Cause:** Newsroom card on home page hardcoded as h3 to visually-style smaller, ignoring semantic order
- **Solution A:** Change the h3 to h2 with `class="text-h3"` so it stays small visually but correct semantically
- **Solution B:** Audit all cards/components for level-vs-style coupling; introduce a `<Heading :level="2" visual="h3">` component
- **Estimated Effort:** A: 15min / B: 4h
- **Business Impact if Unfixed:** Accessibility complaint risk (EU Accessibility Act applies June 2025); SEO heading-structure penalty

### Blocker #5: No third-party trust / proof block
- **Category:** Conversion
- **Severity:** 🟠 Major (the buyer's first instinct on a "sovereign AI infrastructure" pitch is "show me a real customer")
- **Affected Viewport(s) / Device(s):** All
- **Affected User Journey:** Step 1 (landing) into step 2 (consideration). The "Davion is deployed across financial services, energy, manufacturing…" claim sits without a single logo or named bank
- **Evidence:** Codebase grep for "logo", "customer", "reference" → only a `reference-card` component with placeholder content. `/industries` opens with sector cards but no named institutions.
- **Root Cause:** Pre-revenue / few-named-engagements stage. Honest, but the absence creates a credibility gap.
- **Solution A:** Add a "Trusted by" placeholder with 1-2 named anchor partners IF you have any in writing; otherwise an honest "Early-stage; first engagements under contract — references available under NDA" line below the hero
- **Solution B:** Build a real proof system per Hard #H6
- **Estimated Effort:** A: 2h / B: 4 days
- **Business Impact if Unfixed:** B2B procurement leaders won't progress without proof; the site reads as "sophisticated marketing for vapor" until 1 named customer

### Blocker #6: No sitemap.xml; no structured data
- **Category:** SEO
- **Severity:** 🟡 Minor (degrades discovery but doesn't break anything)
- **Affected Viewport(s) / Device(s):** All (search bots)
- **Affected User Journey:** Acquisition (organic search)
- **Evidence:** `curl https://davion.com.tr/sitemap.xml` → 404. No `application/ld+json` in any page response.
- **Root Cause:** Not yet implemented
- **Solution A:** Add `@nuxtjs/sitemap` module; auto-generates from pages directory + locale routes
- **Solution B:** Add `@nuxtjs/schema-org` module too; Organization + WebSite + per-page Article / Service nodes
- **Estimated Effort:** A: 1h / B: 4h
- **Business Impact if Unfixed:** Organic search rank slower to build; rich snippets unavailable for newsroom posts

---

## 4 — WHAT'S GOING WRONG (Anti-Pattern & Drift Detection)

### Responsive anti-patterns

- [x] **Hero taller than ideal at small viewports**
  `components/section/hero.vue` → `h-[640px] max-[980px]:py-10 max-[980px]:px-6` → 80% of 812px viewport on iPhone 13. **Fix:** Drop to `h-[480px]` at `max-[400px]:h-[480px]` so the next section is visible on first scroll.
- [x] **Fixed-pixel widths in 11 places (max 1176px)**
  `min-w-[900px]` and `min-w-[820px]` on overflow tables in `pages/solutions/alpos.vue` and `pages/trust.vue` deployment-matrix. **Fix:** wrap in `overflow-x: auto` is already in place, but `min-w-[820px]` triggers horizontal scroll at 320px viewport. Verify tap-and-pan is the intentional UX.
- [x] **Eyebrow text at 11px** (`text-[11px]`, used 84×). This is just below WCAG's 12pt-equivalent threshold for visual comfort, but it's metadata not body. **Status:** Acceptable for uppercase tracked labels; not for body copy.
- [x] **Hamburger active across all breakpoints below `lg:`** — desktop nav hides at <1024px. Reasonable for current nav depth, but tablet (768px) loses Solutions/Capabilities dropdowns unnecessarily.
- No horizontal scroll detected at 320px via grep of fixed-width classes >320 — except the deliberately-scrolled tables noted above.

### UX anti-patterns

- ✅ **No dark patterns detected.** Cookie banner has equal-weight buttons ("Accept all" + "Essential only"), no pre-checked boxes, dismisses on choice, no continuity tricks.
- ✅ **No primary content via carousel.** Sectors marquee exists but is decorative.
- ✅ **No modal layered on modal.**
- ✅ **No autoplay video.**
- [x] **Cookie banner could block primary CTA on small viewports.** Banner is `fixed bottom-3 inset-x-3 ... z-[80]`. On a 320×568 screen with the hero CTA near the bottom of viewport, the 200px-tall banner overlaps it. **Fix:** Apply `data-cookie-consent-open` to body, shift `position: sticky; bottom: 200px` on the primary CTA when banner is visible.
- ✅ **No login wall before value demo.**
- ✅ **Forms have visible labels** (engagement form: every field has `<label for="ef-name">`).
- ✅ **Form errors explain how to fix** (e.g. "Email must be a valid address" not "Error").

### Performance anti-patterns

- [x] **Render-blocking inline Tailwind** in SSR HTML (~90KB CSS inside `<style>` in every page). Tailwind already purges; this is just the cost of a Tailwind-heavy site. Could be moved to `<link rel="stylesheet">` with `media="print" onload="this.media='all'"` trick for non-critical rules.
- ✅ **Hero images use `srcset` via NuxtImg + IPX** for the section background (480/960/1600/2400 webp). Good.
- [x] **CLS risk from late web fonts:** Bricolage Grotesque + Switzer are loaded from external CDNs (Google Fonts, Fontshare). FOUT acceptable, but could `font-display: optional` to lock first paint
- [x] **Heavy hydration:** entire site is SSR'd then hydrated. Static pages (solutions/capabilities/industries/legal/trust/venture) don't need hydration to function — could be SSG.
- [x] **Single eager JS bundle (938KB):** see Blocker #3.

### Accessibility anti-patterns

- ✅ **alt attributes:** Spot-check of 11 `NuxtImg` and 4 `<img>` uses — all have `alt` (except 1 raw `<img>` in `reference-card.vue` which has `alt="reference"` — generic, but present).
- ✅ **Focus traps in cookie modal:** Modal has `role="dialog"`, `aria-labelledby`, `aria-describedby`. Tab cycles inside via Teleport-to-body + dialog semantics.
- [x] **Skipped heading level on home** (see Blocker #4). WCAG 1.3.1.
- ✅ **Color is not sole information carrier.** Status dots on `/status` are paired with text labels ("Operational" / "Per deployment" / "Disrupted").
- [x] **Icons:** The arrow `→` in many CTAs is via `<span aria-hidden="true">→</span>` — correct, hidden from screen readers. The Davion mark `<NuxtImg alt="Davion">` is present.
- ✅ **Form errors:** `aria-invalid` + `aria-describedby` → linked to inline `<p id="ef-name-err" role="alert">` blocks.
- ✅ **`prefers-reduced-motion`:** Honored in `assets/css/main.css` lines 55-64 (animation-duration, transition-duration overrides) and in `v-reveal` directive.

### Visual / brand drift

- [x] **Typography scale partially inconsistent.** Home hero h1 uses `text-[68px] max-[980px]:text-[40px]`. Most other heroes use `text-[44px] md:text-[60-80px]`. Different breakpoints (980px vs 768px), different mobile sizes (40px vs 44px). **Fix:** Pin one hero scale.
- ✅ **One primary CTA style** (`CommonButton variant="primary"`); secondary variants distinct (`outline`).
- [x] **Spacing system mostly respected.** Saw a stray `gap-[26px]` and `gap-[49px]` in nav alongside `gap-7 gap-8`. Tailwind has `gap-6`/`gap-7`/`gap-8` for 24/28/32px — the 26/49 are off-system.
- [x] **Color tokens hygiene:** 6× `#979797`, 5× `#212121`, 5× `#FFFFFF`, 3× `#60E576` raw hex inside SVG `<text fill="">` and `<rect fill="">` attributes. Acceptable in SVG (no Tailwind in attrs) but could be `currentColor` + CSS-styled.
- [x] **Mixed border-radius**: `rounded-3xl` (24px) for big sections, `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for inputs, `rounded-lg` (8px) for buttons, `rounded-full` for chips. Looks systematic. ✅

---

## 5 — MISSION & FUNNEL DRIFT

### 5.1 — Brand promise vs delivered experience

- **First 5 seconds (home above fold):**
  Promise → *"Decision infrastructure for data that can't leave."* + body → *"Davion is the platform banks, ministries, and energy operators use when decisions must be defensible, auditable, and made on data that never enters a public cloud."*
  Delivers → matches; the hero says infrastructure-for-decisions, the body names regulated buyers.

- **First 30 seconds:**
  Below the fold the user sees: sectors-marquee (decorative) → solutions/cycle block → AI capabilities → newsroom showcase → spiral CTA. The narrative is "you, the institution, run decisions; AlpOS is how" — coherent.

- **Gap:**
  *Over-promises* technical depth ("audit-grade lineage", "RBAC + ABAC", "cell-level access control") without showing a single screenshot or diagram of the actual product. *Under-delivers* on third-party validation — zero named customers, zero quoted operator, zero quantified outcome. Brand voice cashes a check the product page can't fully redeem until P2.U5 (demo embed) and P2.3 (identity refresh) ship.

### 5.2 — Primary user journey integrity

Step 1 → **Landing (/)** | Friction 2/10. Hero is clear; CTAs unambiguous.
Step 2 → **Understand product (/solutions/alpos or /industries/{sector})** | Friction 4/10. The /alpos page is dense (5 layers + 3 stories + 8-row matrix + 6 AI capabilities + 3 outcomes + 6 industries) — table-of-contents helps, but on mobile the TOC scrolls off and the sections all blur together.
Step 3 → **Convince technically (/trust)** | Friction 5/10. The deployment matrix is the showpiece, but it triggers horizontal scroll on mobile (`min-w-[900px]`). The 7-row table needs to be a stacked card list at <820px.
Step 4 → **Engage (/contact)** | Friction 3/10. Form is well-built. 5 intents, name + email + org + role + free-text. Honeypot, validation, success state. Lacks: a calendar embed (the SchedulingEmbed component exists but is empty placeholder until P3.6 calendar provider lands).

**Drop-off risk peaks at step 3** — a CIO who hits horizontal scroll on the trust page goes back, and most don't return.

### 5.3 — Scope bloat

- **/company/events page** is an empty-state placeholder with "Programme in flight" copy. Adds nav clutter without delivering.
- **/venture page** is also an empty-state with "Thesis pending" — same pattern.
- **/status page** is honest but premature for an early-stage company with no SLA contracts yet.

These 3 pages account for ~0% of conversion-bearing content but ~8% of footer/menu real estate. **Recommendation:** defer Events + Venture out of the primary nav until they have content; keep Status linked from footer only.

### 5.4 — Missing but mission-critical

- **Trust signals:** Zero named customers, zero certification badges, zero "as seen in" press logos. The /trust page lists "ISO 27001 — engineered to" but no certificate. For B2B procurement this is the #1 blocker.
- **Pricing transparency:** Not applicable for enterprise sales (pricing is engagement-dependent). Acceptable absence.
- **Clear next action per page:** ✅ Every page ends in an "Engage" CTA section.
- **Human escape hatch:** ✅ `engagement@davion.com`, `press@davion.com`, `careers@davion.com`, `ops@davion.com` are all surfaced in /contact email-routing block.

### 5.5 — Realignment recommendation

**Remove / defer:**
- Pull `/company/events` from top-level nav until at least 1 event is publishable
- Pull `/venture` from top-level nav until the thesis is finalized
- Delete the orphan 3.6MB `cover.jpg`

**Sharpen:**
- Add 1 quantified outcome to the home hero body (even a directional one: "Decisions in days, not quarters" already exists on AlpOS — promote it to home)
- Add a "Trusted by" or "Engaged with" placeholder with the first named partner, even if it's an academic / advisory
- Tighten the AlpOS page to one screenful per layer on mobile (currently scroll fatigue around layer 3-4)

**Add:**
- Proof block on home (1 customer logo + 1 quote OR 1 quantified outcome)
- Sitemap.xml + JSON-LD Organization schema
- A "What sets us apart" 3-card block above the engage CTA on home — three specific differentiators vs Palantir / ChapsVision / Databricks (the implicit competitors)
- iOS App Store-style "Featured" press logos strip once first press lands

---

## 6 — DEVICE & VIEWPORT REPORT CARD

| Viewport | Layout Integrity | Touch UX | Perf (estimate) | A11y Notes | Top Issue |
|----------|------------------|----------|-----------------|------------|-----------|
| 320px (iPhone SE 1st-gen / Galaxy Fold cover) | 6/10 | 6/10 | LCP ~3.5s on 4G | Skip-link ✓; cookie buttons now 44px after today's fix; tables overflow-scroll triggered | Hero `h-[640px]` = 80% of 568px viewport (vertical), feels claustrophobic; trust-page deployment-matrix horizontal scrolls |
| 375px (iPhone SE 2-3, iPhone 13 mini) | 7/10 | 7/10 | LCP ~3.2s on 4G | Same as 320 plus headings legible | Same hero issue, less severe; nav hamburger placement OK |
| 390px (iPhone 14/15) | 7/10 | 8/10 | LCP ~3.0s on 4G | Form inputs `text-base` (16px) prevent zoom; all tap targets clear | None critical; hero crops slightly |
| 768px (iPad portrait / Galaxy Tab) | 8/10 | 9/10 | LCP ~2.4s on 4G | Hamburger still active at this size — should expose Solutions/Capabilities/Industries dropdowns | Trust table still scrolls horizontally because `min-w-[900px]` |
| 1024px (iPad Pro / small laptop) | 9/10 | 9/10 | LCP ~1.8s on 4G | Desktop nav exposed; full layout | None |
| 1440px (standard desktop) | 9/10 | n/a | LCP ~0.9s on cable | Layout breathes well; hero spiral renders large | None |
| 1920px (large desktop) | 9/10 | n/a | LCP ~0.8s on cable | `max-w-7xl mx-auto` (80rem = 1280px) caps content width; large screens see lots of side margin | Acceptable design choice but could expand to `max-w-[1440px]` for premium-feel |
| 2560px (ultrawide) | 8/10 | n/a | LCP ~0.7s on cable | Same as 1920 with more side margin; spiral art may pixelate slightly | Could ship a 2× spiral asset for retina ultrawide |

**Perf numbers are projections** based on response sizes + bundle size + typical Nuxt 3 hydration cost. Actual Lighthouse run on the live URL recommended before P0 ship.

---

## SUMMARY VERDICT

The site is **🟡 Polished but Patchy**.

What's strong: brand voice, positioning, nav semantics, form quality, i18n hygiene, mobile-first CSS overflow protection, focus rings, skip-link, today's hero copy repositioning and SSR fixes.

What's weak: home perf (1.1s TTFB), one 3.6MB orphan asset, single 938KB JS bundle, no proof block, no sitemap, no per-page OG cards, hero proportions on smallest mobile, one heading hierarchy skip, three empty-state pages cluttering nav.

There is no broken-window-level disaster — every problem is fixable in single-digit days. Recommend a 2-sprint focused pass (see action plan) rather than redesign.
