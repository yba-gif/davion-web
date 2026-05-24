# Davion — Website Action Plan
**Date:** 2026-05-24
**Source audit:** `website-audit-report-2026-05-24.md` (same directory)
**Branch:** `rebrand/davion`
**Sprint cadence:** 1-week sprints, ship-on-merge

---

## EXECUTIVE SUMMARY

The site is **conceptually sharp, technically uneven**. The brand voice, IA, and copy positioning (post-today's repositioning to "Decision infrastructure") all land; the underlying perf and proof scaffolding lag behind.

**Three most critical findings, by business impact:**

1. **Home page TTFB is 1.12s** because SSR blocks on two sequential Postgres round-trips (`/api/blog` + `/api/settings`). Every 100ms of TTFB costs ~1% conversion. Fix: add Nitro `routeRules` cache. **Effort: 1 hour. Impact: massive.**

2. **No proof block anywhere on the site.** Zero named customers, zero certification badges, zero quoted operators. A CIO reading "regulator-grade lineage" with no logo backing it walks away. Fix: at minimum, an honest "Early-stage, references under NDA" line + 1 named advisor/partner card. **Effort: 2 hours for honest stop-gap. Impact: unblocks B2B conversation.**

3. **3.6MB orphan `cover.jpg` + 938KB main JS bundle.** Mobile users on slow 4G see Lighthouse Perf <50. Fix: delete the orphan (5 min) + bundle audit (4h). **Impact: LCP drops from ~3.2s to ~1.8s on mid-range mobile.**

**Ship this Monday:** the Blocker #1 cache fix. 1 hour, no design risk, instantly improves every visitor's first impression. Everything else is queueable.

**Honest verdict:** **Incremental polish, not redesign.** The framework is right; the polish is partial. Two focused sprints close the gap. No need for ground-up rebuild.

---

## PRIORITY ORDERING

### P0 — Ship this week (broken / risk / cheap win that compounds)

| # | Action | Source | Owner | Effort | Acceptance criteria |
|---|--------|--------|-------|--------|---------------------|
| P0.1 | Add Nitro cache for `/api/settings` (5min TTL) + `/api/blog` (60s + SWR) | Blocker #1 / M1 | frontend | 1h | `time curl /` from origin shows TTFB < 100ms after warm. Verified for /, /tr, /de. No stale-content complaints from CMS edits. |
| P0.2 | Delete `apps/web/public/cover.jpg` (orphan, 3.6MB) | Blocker #2 / S1 | frontend | 5min | `ls public/cover.jpg` returns no such file. Build succeeds. No broken-image reports on any page. |
| P0.3 | Add `sitemap.xml` via `@nuxtjs/sitemap` | Blocker #6 / S2 | frontend | 1h | `curl https://davion.com.tr/sitemap.xml` returns 200 XML with all 35 routes × 3 locales. Submitted to Google Search Console. |
| P0.4 | Add `robots.txt` with explicit Allow + Sitemap line | S3 | frontend | 15min | `curl https://davion.com.tr/robots.txt` returns 200; references the sitemap URL; disallows `/api/` |
| P0.5 | Fix skipped heading level on home (newsroom card h3 → h2 with `text-h3` visual) | Blocker #4 / S5 | frontend | 30min | axe-core or WAVE shows zero "Heading levels skipped" warnings on `/`. NVDA H-key navigation reports clean outline. |
| P0.6 | Pull /company/events and /venture from primary nav until publishable | §5.3 | content+frontend | 30min | Header nav has no Events/Venture link. Footer keeps both (they're still routable). Sitemap still includes them. |
| P0.7 | Add JSON-LD Organization schema to home + WebSite to all pages | Blocker #6 / S4 | frontend | 1h | View-source on / shows `<script type="application/ld+json">`. Google Rich Results Test passes. |

**P0 total: ~5 hours. Single afternoon for one engineer.**

### P1 — This sprint (week 1 starting 2026-05-25)

| # | Action | Source | Owner | Effort | Acceptance criteria |
|---|--------|--------|-------|--------|---------------------|
| P1.1 | Hero responsive pass — reduce `h-[640px]` on screens ≤400px to `h-[480px]`; tighten py + scale | §6, M7 | design+frontend | 3h | At 320px viewport, the section below hero is visible without scroll OR the hero ends with a clear visual indicator that there's more. Test on iPhone SE 1st-gen, Galaxy Fold. |
| P1.2 | Trust-page deployment-matrix → stacked-card layout below 820px | §5.2 step 3 | design+frontend | 4h | At 320/375/768px the matrix displays as one card per attribute, each containing 4 mode rows. No horizontal scroll. WCAG 1.4.10 reflow at 400% zoom. |
| P1.3 | Add proof block to home — honest stop-gap | Blocker #5 / M3 (partial) | content+design | 2h | Above the engage CTA, a `<TrustStrip>` shows: 1-2 named advisors OR 1 quantified outcome from /alpos OR "Early-stage; references under NDA". Copy approved by founder. |
| P1.4 | `min-h-[44px]` + `[touch-action:manipulation]` on all CommonButton variants | S7 | frontend | 30min | Every button on the site renders ≥44px tall at min-text-size. Verified via DevTools on iPhone 13 mini emulation. |
| P1.5 | Bundle audit: identify top 3 contributors to the 938KB chunk | Blocker #3 / M2 (partial) | frontend | 4h | A document `docs/bundle-2026-05-25.md` lists every chunk >50KB with what it contains. Top-3 contributors identified with proposed lazy-load strategy. |
| P1.6 | Wrap repeated period-dot pattern into `<DotAccent>` component | S8 | frontend | 1h | `git grep '<span class="text-primary-text">.</span>'` returns 0 hits in pages/components. Replaced by `<DotAccent />`. No visual regression. |
| P1.7 | Migrate raw `<img>` in `reference-card.vue` → `<NuxtImg>` | S6 | frontend | 30min | Component uses NuxtImg with proper alt; srcset emitted; same render. |
| P1.8 | Add `loading="lazy"` to non-hero NuxtImg (executive photos, newsroom thumbnails) | S9 | frontend | 30min | Lighthouse "Defer offscreen images" passes. Visual smoke test on /press, /company/about, /company/newsroom. |

**P1 total: ~16 hours. Comfortable for 1 engineer in a week.**

### P2 — Next sprint (week 2)

| # | Action | Source | Owner | Effort | Acceptance criteria |
|---|--------|--------|-------|--------|---------------------|
| P2.1 | Code-split: lazy-load Lenis, cookie banner, newsroom carousel | Blocker #3 / M2 | frontend | 6h | Main bundle ≤ 500KB. Lighthouse "Reduce JavaScript execution time" passes. Verified no functional regression on smooth-scroll or cookie close. |
| P2.2 | Pre-render static pages with Nitro `routeRules: prerender: true` for solutions/capabilities/industries/legal/trust/venture/status | Hard #H2 | frontend | 2 days | At build, `.output/public/` contains static HTML for these routes. SSR only kicks in for home + newsroom/[slug]. TTFB on prerendered pages < 30ms cold. |
| P2.3 | Per-page OG card generation via Satori | M8 | design+frontend | 8h | `og:image` per page generates an SVG with page title + Davion mark. Tested on LinkedIn / Twitter / Slack share preview. Cached on Cloudflare. |
| P2.4 | Add `@nuxtjs/schema-org` Article schema to newsroom posts | Blocker #6 / S4 (extend) | frontend | 2h | Each newsroom post emits JSON-LD Article. Google Rich Results Test passes for at least 3 sample posts. |
| P2.5 | Tablet (768px) nav: expose Solutions/Capabilities/Industries dropdowns instead of hamburger | §4 responsive anti-pattern | design+frontend | 4h | At 768-1023px viewport, nav shows dropdowns; mobile menu retains for <768px. WAI-ARIA menubar still correct. |
| P2.6 | Mobile menu: full focus trap + Esc-to-close | M12 | frontend | 4h | Open menu → Tab stays inside drawer → Esc closes → focus returns to hamburger. Verified with NVDA. |
| P2.7 | Fix off-system spacing values (`gap-[26px]`, `gap-[49px]` in nav) | §4 visual drift | design+frontend | 1h | All gap values resolve to Tailwind tokens (gap-6/7/8 etc) or documented one-offs. |
| P2.8 | Color-token unification: move SVG inline hex to `currentColor` + CSS vars | M10 | design+frontend | 4h | `grep -r '#[0-9a-fA-F]\{6\}' apps/web/pages apps/web/components` returns only design-token files, no raw hex in attributes. |

**P2 total: ~5 days. Possibly 2 engineers in parallel for 1 week.**

### P3 — Backlog (sprint 3+, prioritize after P0-P2 land and measure)

| # | Action | Source | Owner | Effort |
|---|--------|--------|-------|--------|
| P3.1 | Real customer-logo proof system (DB-backed, opt-in per logo) | Hard #H6 | content+design+frontend+backend | 4 days |
| P3.2 | Per-locale URL slugs (`/tr/cozumler/alpos`) | Hard #H4 | frontend+SEO | 2 days |
| P3.3 | Design-token unification (Tailwind v4 @theme block or `tokens.ts` re-export) | Hard #H5 | design+frontend | 3 days |
| P3.4 | Granular cookie preferences (analytics opt-in toggle) | M9 | frontend | 4h |
| P3.5 | Headlines + body lock-step audit across 35 pages — enforce single hero type-scale | §4 visual drift, M11 | design+frontend | 8h |
| P3.6 | Compress section bg images → AVIF with WebP fallback | M4 | frontend | 3h |
| P3.7 | Form: persist success + "we'll be in touch" toast across reload | M6 | frontend | 4h |
| P3.8 | 2× spiral asset for retina ultrawide displays | §6 | design | 2h |
| P3.9 | `og:locale` + `og:locale:alternate` meta for tr/de | S11 | frontend | 15min |
| P3.10 | Lighthouse perf 95+ verification (real-device run, not lab) | Validation | frontend | 4h |

---

## SPRINT GROUPING

### Sprint 1 (week of 2026-05-25, 5 days)
- **Day 1 (Monday):** P0.1 through P0.7 — all the cheap wins. Push, deploy, measure TTFB delta.
- **Day 2:** P1.4, P1.6, P1.7, P1.8 — small polish + bundle audit kickoff (P1.5).
- **Day 3:** P1.1 hero responsive pass + P1.2 trust matrix mobile stack.
- **Day 4:** P1.3 proof block — needs founder copy approval, schedule a 30-min slot.
- **Day 5:** Buffer + Lighthouse measurement + ship the sprint.

### Sprint 2 (week of 2026-06-01, 5 days)
- **Days 1-2:** P2.2 prerender static pages. Biggest perf win.
- **Day 3:** P2.1 bundle code-split (informed by P1.5 audit).
- **Day 4:** P2.3 + P2.4 OG cards + Article schema.
- **Day 5:** P2.5 + P2.6 + P2.7 tablet nav + mobile menu focus + spacing cleanup. Polish day.

### Sprint 3+ (week of 2026-06-08 onward)
- **P3 items in priority order, gated by measurement.** If sprint-2 Lighthouse hits ≥90 and TTFB stable <100ms, P3.1 (proof system) and P3.2 (locale slugs) become the focus. If not, P3.10 (Lighthouse drill-in) first.

---

## DEPENDENCY MAP

```
P0.1 (cache routeRules) ──┐
                          ├── unblocks: P2.2 (prerender — depends on cache architecture)
P0.3 (sitemap) ───────────┤
                          ├── unblocks: P0.7 (JSON-LD references sitemap URL)
P0.4 (robots.txt) ────────┘

P1.5 (bundle audit) ────── unblocks: P2.1 (code-split — needs to know what to split)

P1.6 (DotAccent component) ── unblocks: P3.5 (type-scale audit — easier once dot pattern is component)

P2.2 (prerender) ──────── unblocks: P3.2 (locale slugs — only worth implementing once prerender architecture is settled)

P2.8 (color tokens) ───── unblocks: P3.3 (design-token unification)

P1.3 (proof block placeholder) ── unblocks: P3.1 (real proof system — placeholder establishes the slot first)
```

The critical path is **P0.1 → P1.5 → P2.1 → P2.2** for performance. **P0.5 → P1.3 → P3.1** for trust. Everything else is parallel-safe.

---

## QUICK WINS (under 1 hour each, ranked by visible-impact-per-minute)

| Rank | Action | Effort | Visible impact |
|------|--------|--------|----------------|
| 1 | P0.1 — Nitro cache routeRules | 1h | 1.1s → <100ms TTFB on home. Every visitor feels this. |
| 2 | P0.2 — delete cover.jpg | 5min | Lighthouse perf +1-2 points, cleaner build artifact |
| 3 | P0.5 — heading h3 → h2 | 30min | A11y compliance, no visual change, ESLint-style satisfaction |
| 4 | P0.4 — robots.txt | 15min | Bot guidance, no UX impact, foundational |
| 5 | P1.4 — button min-h:44px | 30min | Mobile tap reliability across entire site |
| 6 | P0.6 — pull events/venture from nav | 30min | Cleaner nav, less cognitive load |
| 7 | P1.7 — img → NuxtImg | 30min | One less inconsistency in the system |
| 8 | P1.8 — lazy-load offscreen images | 30min | Lighthouse perf +2-3 points |
| 9 | P3.9 — og:locale meta | 15min | Better social-share rendering in TR/DE locale |
| 10 | P2.7 — fix gap-[26px] / gap-[49px] | 1h | One less spacing-system violation |

If you have one focused hour: **P0.1 is the move.** No other action returns more visible improvement per minute spent.

---

## MEASUREMENT PLAN

### After Sprint 1 — re-measure on 2026-05-30
- **TTFB (origin):** Target < 100ms p50 on all routes. Method: `time curl -sk --resolve davion.com.tr:443:127.0.0.1 https://davion.com.tr/{home,industries,solutions/alpos,trust,contact}`.
- **Lighthouse Performance (mobile, throttled 4G):** Target ≥ 75. Method: PageSpeed Insights run, 3 runs, take median.
- **Lighthouse Accessibility:** Target ≥ 95. Pre-fix expected ~90 (heading hierarchy + button tap-targets).
- **Lighthouse SEO:** Target = 100. Sitemap + robots + meta tags should clear it.
- **Visible-pixel-rendered above fold at 320px:** Target = hero h1 + body + first CTA all visible on first paint. Tested via DevTools mobile emulation.

### After Sprint 2 — re-measure on 2026-06-06
- **Lighthouse Performance:** Target ≥ 90.
- **JS bundle main chunk size:** Target ≤ 500KB.
- **CLS:** Target < 0.05 (was likely fine; verify after font + image changes).
- **INP:** Target < 200ms via Chrome UX Report or RUM if instrumented.
- **Cumulative SSR latency for home:** Target < 50ms p95 (includes /api/blog cache hit + /api/settings cache hit).

### After Sprint 3+ — measure on 2026-06-14
- **Conversion (engagement form submissions / unique homepage visit):** baseline today, target +25% by end of June.
- **Time-to-first-action (engagement form open OR demo-CTA click):** target median < 45s on home.
- **Mobile bounce rate:** baseline (likely high), target -15% after hero responsive pass + perf wins.

---

## CHANGE LOG (this audit's commits, already landed)

Today's session before this audit closed these gaps:

| Commit | Issue closed |
|--------|--------------|
| `f4d109c` | Home headline "Sovereign AI" → "Decision infrastructure" (positioning) |
| `f24d9c8` | Global "Sovereign AI" → "Sovereign infrastructure" sweep across 30+ instances |
| `47526a6` | Industries 6 card descriptions tightened (ChapsVision flavor) |
| `e0ce618` | AlpOS hero "data that can't leak" subject fix |
| `7cbe581` | Fixed hardcoded nuxt.config.ts fallback meta + regenerated OG cover |
| `d95c5f9` | Fixed AI-cycle headline rendering raw vue-i18n AST (`$tm` → `$rt`) |
| `7dde2d0` | Removed `app.vue` loading-spinner SSR gate; cookie banner tap targets |
| `4450135` | Fixed `v-reveal` directive SSR registration (was client-only) |

This audit's P0/P1/P2 items pick up from here.

---

## CALL — what to do Monday morning

Pick **P0.1** (Nitro cache). One hour. No risk. Massive impact. Everything else queues behind that.

If you also have 30 minutes: P0.5 (heading fix) + P0.2 (delete cover.jpg) + P0.4 (robots.txt). Cheap, foundational, sets up Sprint 1.

If you have a full afternoon: blast through all of P0 (5h total). End of day Monday, the site is materially better and you're set up for Sprint 1 polish.
