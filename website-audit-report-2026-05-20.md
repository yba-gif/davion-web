# Davion Website — Design & Content Audit

**Date:** 2026-05-20
**Auditor brief:** Award-winning UI lead + senior content strategist; ruthless, specific, opinion-led.
**Scope:** Every page, every breakpoint, every interactive state, every line of written content shipped on `rebrand/davion` through commit `d38103a`.

---

## 1 — Design X-Ray (Visual + Content Scoring)

| # | Dimension | Score | Justification | Critical Gap |
|---|---|---|---|---|
| 1 | Visual Hierarchy & Typographic System | **6/10** | Degular Display + Switzer is a sound pairing; type scale is generous; primary-green `.` accent gives the headings a signature beat. | Every section uses the same `text-h2 md:text-[44px] md:leading-[1.05]` heading inside the same `bg-{pastel} rounded-3xl px-6/md:px-12/lg:px-16 py-16/md:py-20` container. Nine almost-identical rounded cards stacked → monotonous rhythm, no editorial variation. |
| 2 | Color System, Contrast & Accessibility | **5/10** | Light theme is consistent; focus-visible outline + prefers-reduced-motion are honored; the four pastel section backgrounds (azure / aliceblue / honeydew / whitesmoke-100) read as a deliberate palette. | `text-primary` (#60E576) on white background is **~1.45 : 1 contrast — fails WCAG AA**. We use it as text in every `CommonSup` eyebrow, every "Featured" badge, every `Read more` hover, every link, the `.` punctuation flourish. Government and defense buyers — the audience the site explicitly courts — refuse non-AA. This is non-negotiable and currently broken site-wide. |
| 3 | Layout, Grid Discipline & Whitespace | **7/10** | Base1's `flex flex-col gap-4` outer + `rounded-3xl` section rhythm is well-disciplined. Generous internal padding (`px-6 → lg:px-16, py-16 → lg:py-24`). The 3+9 / 12-col document grids used on AlpOS / Industries / Trust pages have real Pentagram-y discipline. | The discipline IS the problem: there's no layout *variation* across sections. Hero gets the spiral; everything below it is a stack of rounded pastel containers with a left eyebrow and a right body. No editorial spread, no full-bleed moment, no asymmetric break. The page reads like a Notion doc. |
| 4 | Brand Identity & Visual Distinctiveness | **4/10** | The base1 spiral hero is the one striking thing. Green-dot punctuation (`Innovate.` / `Secure.` / `Perform.` / `decisions defended.`) is a base1 inherited tic that works for Davion. | Nothing else is Davion. The icon (white "D" on green rounded square) is a generic template mark. The wordmark is Degular Bold set tight — that's it. Color palette is base1's. Component aesthetic (rounded-3xl pastel sections, white inner cards) is base1's. Strip the spiral and the wordmark and this site could be any of 200 sovereign-AI / data-platform startups. |
| 5 | Imagery, Iconography & Illustration Craft | **4/10** | The spiral is iconic. The AlpOS architecture SVG (Ingest → Ontology → Analyze → Decide → Act inside a Sovereign Perimeter) is on-brief and ownable. | Icons are base1's stock `base:chart-square / base:verified / base:chart-2 / base:arrow` — generic linear icons used everywhere. Zero custom illustration. The new AlpOS console mockup is good but it's the *only* product visualization on the site. Other pages have no diagrammatic content at all. One striking image carries an entire 25-page site. |
| 6 | Responsive Behavior & Micro-interactions | **5/10** | Sections collapse from 12-col to single column. Mobile drawer for nav works. Page transitions (fade + blur) are tasteful. The AlpOS console carousel auto-rotates every 5s. Lenis smooth scroll is base1-inherited and feels good on desktop. | Tablet is untested — the 12-col grids at 768–1024px probably get cramped. The hero spiral image at mobile (`max-[980px]:scale-[3]`) hasn't been visually verified. Touch users get a hover-dependent solutions dropdown (mitigated by click-to-open but still feels desktop-first). Most "micro-interactions" are just `hover:text-primary` color swaps — no real motion language. |
| 7 | Headline Power & Value-Proposition Clarity | **5/10** | The pain-led AlpOS hero (`Sovereign AI infrastructure for decisions that can't wait. And can't leak.`) is strong. Industries hub (`Sovereign AI across the institutions that run the world.`) is OK. | The HOME hero stacks three nearly-equal-weight phrases: `Agentic AI. / Sovereign data. / Decisions defended.` Three slogans, no headline. The visitor doesn't know which is the lead. Worse, the home and AlpOS and Industries each pitch a *different* one-liner. There's no single positioning statement a stranger can recite after 10 seconds. |
| 8 | Voice, Tone & Content Rhythm | **6/10** | Declarative sentences. Short paragraphs. No exclamation marks. No "revolutionary." The `From X to Y` framing and the green-dot punctuation create a recognizable cadence. | The voice is borrowed — almost transparently — from ChapsVision. "Agentic AI", "Modular by design", "Sovereign by design", "From data to decision", "In the field" vertical use-cases, the four-problem-areas industry template, "We're on the AI journey with" — all directly studied from chapsvision.com. The audit trail is in the git history: `commit 8303669: Inspired by ChapsVision`. A buyer who knows ChapsVision will recognize it in 30 seconds. |
| 9 | CTA Strategy, Conversion Path & Trust Signals | **4/10** | The primary green `CommonButton` with the `base:arrow` icon is consistent. The Contact page is consultative (intent list) rather than a lead-grab form. | CTA labels are inconsistent across the site: `Request a briefing`, `Book a demo`, `Speak to an expert`, `Connect confidentially`, `Pitch us`, `Talk to your sector lead`, `Talk to our team`, `Assess your posture`, `Request an OSINT demo`, `Meet us`, `Contact press`, `Get in touch`, `Join the mission`. Twelve variants for the same action — "talk to us." More damaging: **zero real trust signals**. The TrustedByStrip is six placeholder tiles ("Defense Ministry", "Tier-1 Global Bank") with a footnote saying customer names are withheld. No customer logos. No testimonials. No team. No founder. No analyst quotes. No press. No certifications with status. No deployment counts. No revenue. No funding. Nothing for a buyer to validate against. |
| 10 | Information Architecture, Navigation & Scannability | **6/10** | Header nav is logical (Solutions / Capabilities / Industries / Company / Venture). Dropdowns are click-to-open with proper aria-expanded. Mobile drawer is accessible. The expanded sitemap (24+ pages) signals product depth. | The IA promises a depth the content doesn't deliver. Click `Industries → Energy` and you get: "In progress. Full page lands in a subsequent slice." Same for Manufacturing, Life Sciences, Government, Defense & Intelligence — 5 of 6 industry pages. Same for 6 of 6 Capability pages (RAG, Geospatial, Video, Audio, Translation, Data Acquisition). Same for About, Careers, Events, Venture. Out of ~25 pages routed, only ~6 have real depth (Home, AlpOS, Solutions hub, Financial Services industry, Trust, Newsroom). The nav is currency the content can't redeem. |

**Weighted average:** ≈ 5.2 / 10
**Overall Design Maturity:** 🟡 **Functional but Forgettable**

The site is ahead of an average startup landing page — type scale is deliberate, the spiral is striking, the editorial grid on inner pages is real. But it is *behind* what an institutional buyer expects from a sovereign-AI/data-platform pitch: behind ChapsVision on proof and IA depth, behind Palantir on mission gravity and editorial confidence, behind Linear on visual ownership and product preview craft. It is competent and forgettable.

---

## 2 — Revision Complexity Map

### 2.1 — 🟢 Cosmetic Fixes (under 1 day each)

| Item | Page / Location | Effort | Expected Impact |
|---|---|---|---|
| Fix `text-primary` contrast failure as text color — define `primary-text: #2A8B3C` (AA-safe) and swap site-wide where green appears on white | All pages | 3 hrs | Removes a hard accessibility blocker; legally required for gov buyers |
| Standardize CTA labels: 1 primary ("Book a demo"), 1 secondary ("Speak to an expert"), 1 sensitive-buyer alternative ("Connect confidentially" — defense pages only) | All pages | 2 hrs | Single conversion funnel; reduces decision friction |
| Fix `analytics.country VARCHAR(2)` overflow — write `null` instead of `'unknown'` in `useAnalytics.ts` | `composables/useAnalytics.ts` | 30 min | Stops 500s on every page view (currently spamming logs) |
| Add Privacy / Terms / Cookie / Responsible-AI legal stubs with one-paragraph placeholders + last-updated date | `pages/legal/*.vue` | 3 hrs | Required for any institutional buyer; signals seriousness |
| Add OG image (`/og-cover.svg`) + per-page `ogImage` meta — currently empty for every shared link | `nuxt.config.ts` + per-page `useSeoMeta` | 2 hrs | Shared links currently preview blank; cheap social-credibility lift |
| Remove dead `components/section/*` originals (cta, reference, blog, features — none are imported by any Davion page anymore) | `components/section/` | 1 hr | Removes ~30KB of dead code; cleans component auto-imports |
| Remove `pages/blog/[slug].vue` orphan if it sneaked back during edits (verify) | `pages/` | 15 min | IA cleanliness |
| Replace `Read more` defaults in `BlogCard` / `HorizontalBlogCard` with `Read dispatch` (matches the Newsroom framing) | `components/blog-card.vue`, `components/horizontal-blog-card.vue` | 30 min | Single-word specificity over the worst CTA label in marketing |
| Standardize section eyebrow casing: `CommonSup` titles are mixed-case ("Sovereign by design") + UPPERCASE rendering — pick one — recommend leaving as-is, but lowercase the data ("sovereign by design") so capitalize-on-render is consistent | `CommonSup` + all usage sites | 1 hr | Tiny but visible |
| Trim duplicate `sovereign` usage — appears 50+ times site-wide; replace half with `governed`, `defensible`, `in-perimeter`, `auditable` | All pages | 2 hrs | Reduces "sovereign-word fatigue" |
| Add a 1-line "early-stage honest" line on the TrustedByStrip OR remove the strip pending real proof | Home, Industries hub, FS industry | 30 min | See Blocker #2 |

### 2.2 — 🟡 Component-Level Rework (1–5 days each)

| Item | Page / Location | Effort | Expected Impact |
|---|---|---|---|
| Hero rewrite — pick ONE positioning statement and rebuild the home + meta around it | `components/section/hero.vue` + `pages/index.vue` SEO + OG | 1 day (incl. workshop) | The single biggest conversion lift available |
| Image performance pass — fix NuxtImg/IPX so `section_background.png` (27 MB raw) ships as a responsive webp at ~200–500 KB; same for `cta_bg1.png` (4.4 MB) | All pages using `/section_background.png` and `/cta_bg1.png` | 1 day | Likely 80% reduction in first-paint weight; Lighthouse will go from ~30 to ~80 |
| About page content — conviction-led essay + founder note + values + presence | `pages/company/about.vue` | 2 days (1.5 days writing) | The single biggest brand-differentiation lift; gives the site a human |
| Customer Stories page + 2–3 anonymized stories with hard numbers ("60% case-review-time reduction at a European defense ministry") | `pages/customer-stories/index.vue` + 3 stories | 2 days | Real proof, scoped to what can be said publicly |
| Convert 5 Industry stubs into real content (Energy, Manufacturing, Life Sciences, Government, Defense & Intelligence) using the FS template | `pages/industries/*` | 3 days | Removes 5 of the 11 "in progress" pages — biggest IA-honesty repair |
| Convert 6 Capability stubs into real content (RAG, Geospatial, Video, Audio, Translation, Data Acquisition) | `pages/capabilities/*` | 3 days | Removes 6 of the 11 "in progress" pages |
| Newsroom: add categorized filtering (Press release / Announcement / Recognition / Insight) — current schema needs a `category` column added | `packages/database/src/db/schema/blog.ts` + `pages/company/newsroom/index.vue` | 1 day | Newsroom becomes a real editorial channel rather than a flat list |
| Careers depth: open-roles list (real placeholders), hiring process, EVP | `pages/company/careers.vue` | 1 day | Critical for institutional credibility — buyers check careers to gauge the team |
| Trust page: add real certification statuses (engineered to / in progress for / achieved), with dates | `pages/trust.vue` | 1 day | Buyer-grade honesty replaces aspirational language |
| Mobile breakpoint pass — verify hero spiral crop on iPhone widths, fix the sectors marquee on small viewports, retune typography below md | All pages | 2 days | Untested currently; assume there are real bugs |

### 2.3 — 🔴 Structural Redesign (1–4 weeks each)

| Item | Page / Location | Effort | Expected Impact |
|---|---|---|---|
| Brand voice rewrite — write Davion's specific opinion on AI/sovereignty/institutions that no competitor would say. From it derive a vocabulary list and a forbidden-phrases list (chiefly: don't say what ChapsVision says). Apply across every page hero + section head + body. | All pages | 2 weeks | Removes the "borrowed voice" perception; gives Davion a defensible brand |
| Identity refresh — distinctive logo + wordmark + typographic system. The current D-mark is template; commission a real mark that ownably represents Davion (likely tied to the sovereign-perimeter motif). License a real display face (Söhne / Migra / something institutional) instead of demo-licensed Degular. | Brand system | 3–4 weeks | Removes the "looks like base1" perception |
| Motion language definition — choose 2–3 signature motions (reveal-on-scroll, hover, transition) and apply them consistently. Currently: page transitions exist, Swiper auto-plays exist, SVG SMIL animations exist on the AlpOS mockup, but each is separate. | All pages | 5 days | A coherent motion identity that protects the site from feeling static |
| Performance overhaul — image optimization, font subsetting, code splitting, prefetching, service-worker. Target Lighthouse ≥95 across categories. | All pages | 1 week | The brief's own acceptance bar |
| IA prune + commit — either delete the stub pages from nav until they're real, OR commit to writing all 11 (~3 weeks of content work). Hybrid recommended: keep what's writable, prune what isn't. | Header nav + page tree | 5 days (if writing) | Aligns the nav contract with the actual content |
| Production deploy with Vercel + Neon + custom `davion.com` + analytics + error monitoring + status page | Infrastructure | 5 days | Site moves from `localhost:3000` to a real institutional URL |
| Brand voice doc + content style guide — document the rules so future content stays on-voice | New file | 1 week | Protects everything that's been built |

---

## 3 — Design & Content Blockers

### Blocker #1: The TrustedByStrip placeholder tiles undermine credibility site-wide

- **Category:** Content / Brand
- **Severity:** 🔴 Conversion-Killer
- **Location:** `components/trusted-by-strip.vue`, rendered on Home (between hero and Solutions), Industries hub, Financial Services industry page
- **What's Wrong:** Six anonymous tiles labelled `Defense Ministry`, `Tier-1 Global Bank`, `National Energy Operator`, `EU Regulator`, `Sovereign Cloud Op.`, `Critical Infra Op.` under the heading `We're on the AI journey with` and the footnote *"Davion engagements are sovereign by contract. Customer names are withheld unless explicitly approved for press."*
- **Why It Matters:** Sophisticated buyers — the same CIOs and Heads of AI the site claims to serve — instantly clock placeholder proof. The footnote tries to rescue the placeholders ("customer names withheld...") but actually confirms the absence. Worse than nothing: an empty space invites imagination; explicit placeholders confirm there's nothing there. This single component is the most damaging element on the home page.
- **Quick Fix (A):** Delete the strip entirely. Replace with a single, *honest* positioning line: "Davion is early. Our first deployments are under engagement contracts — customer names will be shared when they're approved for press." Or move forward with one in-progress certification badge (ISO 27001 — in progress, target Q4 2026).
- **Right Answer (B):** Secure 1–3 real customer relationships with permission to be named or commission 1–2 anonymized case studies with hard numbers ("A European defense ministry reduced case-review time by 60% in 8 weeks"). Until those exist, do not put a logo / proof strip on the site at all.
- **Effort:** A: 2 hrs · B: 80+ hrs (mostly business development)

### Blocker #2: Hero is three stacked slogans, not a single pitch

- **Category:** Content / UX
- **Severity:** 🔴 Conversion-Killer
- **Location:** Home `/`, `components/section/hero.vue` lines 16–28
- **What's Wrong:** Three near-equal-weight phrases stack vertically: `Agentic AI.` / `Sovereign data.` / `Decisions defended.` Each with a primary-green dot. The body underneath says *"Davion builds the sovereign AI and data platform organisations use to turn data into decisions — across financial services, energy, life sciences, manufacturing, government, and critical industries. Run where you require. Defensible end to end."* Six broad nouns and three verbs of value. A visitor doesn't know what Davion *does* or what they should do.
- **Why It Matters:** Compare to ChapsVision (`The Trusted Partner For Your Agentic AI Journey` — one promise) or Palantir (`Make Better Decisions` — one outcome) or Mistral (`Frontier AI in your hands` — one position). Davion gives three slogans where competitors give one promise. Every page after also uses a slightly different positioning, so a visitor never lands on what the company is.
- **Quick Fix (A):** Pick one. Demote the others. Try: *"The sovereign AI platform institutions deploy when their data can't leave."* + a single subhead with one concrete proof point ("In production with banks, ministries, and energy operators across Europe.") + one primary CTA.
- **Right Answer (B):** Workshop the hero with 5 senior engineers in target industries (banks, defense, energy). Test 3 variants for 5-second comprehension. Pick the winner. Apply across the page hero, OG meta, email signatures, and pitch deck slide 1.
- **Effort:** A: 2 hrs · B: 40 hrs

### Blocker #3: Green primary fails WCAG AA as text color

- **Category:** Accessibility
- **Severity:** 🟠 Major (becomes 🔴 if pursuing any government deal)
- **Location:** Every page. `text-primary` (#60E576) is used as text in `CommonSup` eyebrow tick + label, every "Featured" badge, every "Explore" hover state, every green `.` punctuation, every cited-bullet dot, every link hover.
- **What's Wrong:** Contrast ratio `#60E576` on `#FFFFFF` is **~1.45 : 1**. WCAG AA requires 4.5 : 1 for normal text and 3.0 : 1 for large text (18pt+ / 14pt+ bold). The green only passes when it's a small visual mark (dot, icon — decoration, not text). As text it fails.
- **Why It Matters:** The brief explicitly states *"WCAG 2.2 AA minimum (contrast, focus states, keyboard nav, semantic landmarks, reduced-motion)"*. Government and defense procurement processes screen for AA compliance. The site advertises serving exactly that audience. Currently, the brand color fails its own buyers' procurement test.
- **Quick Fix (A):** Define `primary-text: #2A8B3C` (passes AA at ~5.3 : 1 against white). Add to `tailwind.config.ts`. Find/replace `text-primary` → `text-primary-text` everywhere it's used as text. Leave `bg-primary` / `border-primary` alone — those are decoration, not text.
- **Right Answer (B):** Define a 2-shade green system: `primary` (#60E576 — fills, backgrounds, decoration) and `primary-text` (deeper shade for text on white). Document the rule in the design tokens. Add a Stylelint or eslint-plugin rule to flag `text-primary` on light backgrounds in future PRs.
- **Effort:** A: 3 hrs · B: 12 hrs (incl. docs + lint rule)

### Blocker #4: Brand voice is borrowed from ChapsVision

- **Category:** Brand / Content
- **Severity:** 🟠 Major
- **Location:** Every page. Specifically:
  - "Agentic AI" — ChapsVision's hero headline phrase
  - "Modular by design" — ChapsVision's repeated phrase
  - "Sovereign by design" — also ChapsVision
  - "We're on the AI journey with" — directly lifted from ChapsVision homepage section
  - "From [X] to [Y]" architectural framing — ChapsVision's signature copy move
  - "In the field" vertical use-cases pattern — ChapsVision's `In the field` AlpOS-page move
  - 4-problem-areas industry template — ChapsVision's Financial Services / Defense pages
  - Commit log: `8303669 Inspired by ChapsVision`
- **What's Wrong:** A sophisticated reader who's seen ChapsVision can pattern-match Davion to it in 30–60 seconds. The voice is functional but not earned. There's no Davion-specific phrase, framing, or perspective.
- **Why It Matters:** Brands defend themselves through originality. Buyers compare sites side-by-side; the moment the borrowing is visible, trust degrades. Long-term, a derivative brand is impossible to defend — every move ChapsVision makes is a move Davion has to track. A brand is the position you can hold that others can't.
- **Quick Fix (A):** Add ONE original phrase Davion owns and repeats 5+ times. Two candidate angles:
  - **Operational:** "Decisions you can defend" (half-there already; sharpen).
  - **Contrarian:** "Most sovereign AI isn't — it's hosted AI with an EU postcode."
- **Right Answer (B):** Brand voice doc — Davion's specific opinion. From it: 10-phrase vocabulary list, 10-phrase forbidden list (mostly: don't say what ChapsVision says), one signature copy move (the equivalent of Stripe's `Stripe is X for Y`). Apply across every page hero + section head + body.
- **Effort:** A: 8 hrs · B: 80 hrs

### Blocker #5: The IA promises depth the content doesn't deliver

- **Category:** UX / Brand
- **Severity:** 🟠 Major
- **Location:** Header dropdowns (Capabilities — 6/6 are stubs; Industries — 5/6 are stubs; Company — 4/4 are stubs); 11 of ~25 pages.
- **What's Wrong:** Click most nav items and land on a one-paragraph page with the literal text *"In progress. Full page lands in a subsequent slice."* The Industries dropdown advertises Financial Services / Energy / Manufacturing / Life Sciences / Government / Defense & Intelligence as if all six have parity. Five of six are stubs. Capabilities advertises 6 dedicated capability pages; all 6 are stubs. About is a stub. Careers is a stub. Events is a stub. Venture is a stub.
- **Why It Matters:** A buyer who clicks "Industries → Energy" expecting depth and lands on a stub loses faith that the nav is honest. They generalize: if Energy is empty, what else is performative? They click less. They convert worse.
- **Quick Fix (A):** Add a `Coming` badge (mono uppercase, drygray-default text, no background) next to stub items in the dropdowns. Or hide stub items from the nav entirely until they're real.
- **Right Answer (B):** Write depth content for the 4 most-trafficked stubs in priority order: About (highest impact) → Energy (because we sell Energy on home + AlpOS) → Defense & Intelligence (highest-margin buyer) → Careers. Hide everything else from nav until written.
- **Effort:** A: 2 hrs · B: 4 weeks of content work

### Blocker #6: 30+ MB first-paint weight

- **Category:** Performance
- **Severity:** 🟠 Major
- **Location:** Home `/` and every page that uses `/section_background.png` (the spiral) or `/cta_bg1.png`.
- **What's Wrong:** `apps/web/public/section_background.png` is **27,269,214 bytes** (27 MB) raw. We tried Nuxt Image / IPX optimization and the dev server served a broken `w_2` variant — so the production fallback ships the raw PNG. Combined with `cta_bg1.png` (4.4 MB), Google Fonts, and the rest, the home page first-paint is over 30 MB.
- **Why It Matters:** Brief's own acceptance bar is *"Lighthouse ≥ 95 across the board; LCP < 2.0s; CLS ~ 0"*. Current Lighthouse Performance is likely under 40. Mobile users on cellular will wait 10–15 s for the spiral to load.
- **Quick Fix (A):** Pre-process the spiral to a 1600px-wide webp (~200–400 KB) at build, swap the `<img src>` to the pre-processed file. Same for `cta_bg1.png`.
- **Right Answer (B):** Restore NuxtImg with explicit `width`/`height` + correct `sizes` syntax (`100vw lg:50vw` not the HTML5 spec), so IPX generates a real srcset. Add `preload` for the hero image. Subset Google Fonts. Lazy-load CTA. Audit bundle size.
- **Effort:** A: 4 hrs · B: 1 day

### Blocker #7: Twelve different CTA labels for the same conversion action

- **Category:** UX / Content
- **Severity:** 🟡 Polish (but death by a thousand cuts on a long site)
- **Location:** Every page. Audit:
  - `Request a briefing` (home, AlpOS, Industries, Trust, Solutions hub, About)
  - `Book a demo` (Newsroom, Industries hub, capability pages, FS industry, AlpOS new section)
  - `Speak to an expert` (AlpOS CTA, FS CTA)
  - `Connect confidentially` (Defense & Intelligence)
  - `Talk to our team` (Digital Transformation)
  - `Assess your posture` (Cybersecurity)
  - `Request an OSINT demo` (OSINT)
  - `Meet us` (Events)
  - `Pitch us` (Venture)
  - `Contact press` (Newsroom)
  - `Get in touch` (Careers)
  - `Talk to your sector lead` (Industries hub)
- **What's Wrong:** Twelve labels for "talk to us." Each page invents its own. There's no funnel; just a vocabulary problem.
- **Why It Matters:** Single primary CTA reinforces the conversion path. Twelve labels diffuse it. Worse, the buyer can't predict what they're being asked to do.
- **Quick Fix (A):** Standardize. Pick ONE primary (`Book a demo`) and one defense-sensitive alternative (`Connect confidentially` — only on Defense & Intelligence). Secondary CTAs all become `Speak to an expert`. Find/replace site-wide.
- **Right Answer (B):** Build a real CTA strategy with 2–3 funnels (intent-based): "Evaluate the platform" (demo), "Engage commercially" (briefing/sales), "Press / Analyst" (different inbox). Map every page to the right one.
- **Effort:** A: 2 hrs · B: 1 day

### Blocker #8: Zero numbers, zero specifics, zero proof

- **Category:** Content
- **Severity:** 🟠 Major
- **Location:** Every page.
- **What's Wrong:** Davion makes claims (`200+ connectors`, `60+ languages`) but no business proof. ChapsVision shows €350m invested, 29 acquisitions, 2,000+ customers, 1,000 employees, 40 countries, EcoVadis Gold, French Tech Next40. Palantir shows specific deployment stories. Davion shows: the spiral, the architecture diagram, three seeded blog posts, and 6 placeholder logo tiles.
- **Why It Matters:** Institutional buyers convert on numbers. Without any — without team size, without country deployments, without case-study metrics, without funding, without founding date — the site reads as a startup pre-launch. Which it is. But the brand voice claims institutional readiness.
- **Quick Fix (A):** Add the few real numbers we *do* have, if any: founding date, headquarters, team size (if there is a team), languages supported (60+), connectors built (200+ — if that's actually true). Even small numbers are better than zero.
- **Right Answer (B):** Build a "stats strip" — 4–6 cards with real numbers — and update it as the company grows. Same place ChapsVision's "track record" sits. As real proof lands (customers, certifications, funding), promote it here.
- **Effort:** A: 3 hrs · B: 1 day, then ongoing

---

## 4 — Anti-patterns & Generic-AI Aesthetic Detection

### Visual anti-patterns

| Present? | Anti-pattern | Finding |
|---|---|---|
| ✗ | Generic gradient hero | Spiral hero is specific and ownable. |
| ✗ | Bento grid used without reason | Not used. |
| 🟡 | Glassmorphism on busy bg | Used tastefully on header nav (`bg-white/80 backdrop-blur`), CTA frosted overlay, and console mockup annotation pill. Borderline; works because the underlying images carry the section. |
| ✗ | Center-aligned everything | Most copy is left-aligned. Only the final home CTA is centered (intentional). |
| 🟡 | Default Tailwind / shadcn look | Uses base1's custom tokens, not stock Tailwind. But the *feel* (rounded-3xl pastel sections, white inner cards, green accent) is recognizably modern-SaaS-template. → **Address by introducing custom layout breaks and at least one full-bleed moment.** |
| ✗ | Stock photos of diverse people | None. |
| ✗ | AI-generated imagery with telltale artifacts | The spiral may have been AI/3D-rendered but has no telltale artifacts. |
| ✓ | Inconsistent corner radii | Section containers are `rounded-3xl`. Inner cards `rounded-2xl`. Inner-inner elements vary: `rounded-xl` (some cards), `rounded-lg` (chip-style elements), `rounded-md` (some buttons). → **Codify as a 4-step radius scale.** |
| 🟡 | Drop shadow + border + gradient stacked | Console mockup uses `shadow-xl ring-1 ring-drygray-200` + bg gradient on chrome strip — three effects on the same component. → **Pick one — likely just `shadow-xl`.** |
| ✗ | Type set wrong size | Hero is large; body is readable. PASS. |
| ✗ | Only one font weight | Uses 300 / 400 / 500 / 600 / 700 across Switzer and Degular. PASS. |

### Content anti-patterns

| Present? | Anti-pattern | Finding |
|---|---|---|
| 🟡 | Hollow buzzwords | We use "sovereign" 50+ times; it's becoming a buzzword in our own copy. "Agentic AI" is borrowed from ChapsVision and itself borderline. → **Diversify with "governed", "defensible", "in-perimeter", "auditable" — 30% of "sovereign" usage replaced.** |
| ✗ | Headline describes the company | Davion hero leads with outcome ("Decisions defended") not "Davion is an AI company that..." PASS. |
| ✓ | Generic CTAs | `Read more` (BlogCard default), `Explore` (every solution / industry / capability card), `Learn more` (anywhere). → **Replace with specific verbs.** |
| ✗ | Walls of text without structure | Pages have decent rhythm — mostly card grids and short paragraphs. PASS. |
| ✓ | Vague social proof | **TrustedByStrip is literally this anti-pattern.** See Blocker #1. |
| ✗ | Feature list without benefit | AlpOS layer deep-dives have body (capability) + specifics list (features). PASS. |
| 🟡 | Inconsistent voice | Mostly consistent declarative voice; some pages slip into corporate ("Davion delivers advanced AI and data intelligence" — FS hero). → **Sharpen.** |
| ✓ | About page reads like LinkedIn | About is a *stub* — one headline, no content. Worse than a LinkedIn summary; empty. → **Write it.** |
| ✓ | No specificity, no numbers, no proof | See Blocker #8. |

### UX anti-patterns

| Present? | Anti-pattern | Finding |
|---|---|---|
| ✗ | Hamburger on desktop | Desktop has full nav with dropdowns. PASS. |
| 🟡 | Carousels nobody clicks | The AlpOS console mockup auto-rotates every 5 s. The Sectors marquee auto-scrolls. Both are passive. Justified for product-preview / marquee, but verify with real users. |
| ✗ | Sticky elements covering content | Sticky header is `h-16` (64px); doesn't cover content. PASS. |
| ✗ | Mystery-meat nav | All nav items labelled. PASS. |
| ✗ | Cookie banners that block content | None implemented. → **Add a tasteful cookie consent before GDPR audit.** |
| ✓ | Broken focus states | `:focus-visible { outline: 2px solid theme('colors.primary'); }` added — but inherits the same green that fails contrast. Focus rings need to be visible against pastel backgrounds too. → **Test.** |
| ✗ | Hover-dependent reveals on touch | Dropdowns are click-to-open. PASS. |
| ✗ | Forms before value | Contact page lists intents + mailto, no gated form. PASS. |
| ✓ | Page weight > 3 MB | First-paint is **30+ MB**. See Blocker #6. |

---

## 5 — Brand & Mission Drift Analysis

### 1. Brand Promise vs. Delivery

- **Stated positioning:** "Sovereign software for data intelligence and AI" → "The platforms institutions decide on" → "Agentic AI. Sovereign data. Decisions defended." → "Sovereign AI infrastructure for decisions that can't wait. And can't leak." → "The sovereign AI platform underneath every Davion solution." → "Sovereign AI across the institutions that run the world."
- **Visual + verbal delivery (5-second test):** A polished modern startup site about "sovereign AI" with a striking spiral hero, a competent product mockup, lots of "we're here to serve big institutions" language — but no logos, no team, no numbers, no founder, no specifics.
- **Gap:** The promise *implies* "we are an institutional vendor already deployed at scale." The delivery *reads* "we are a thoughtful early-stage company with a vision." These two are not compatible without proof, and the proof is missing. Sophisticated buyers feel this dissonance immediately.

### 2. Audience Fit

- **Who the site appears to be talking to:** Enterprise CIOs, defense procurement officers, compliance leaders, government program managers — sophisticated institutional buyers.
- **Who it should also be talking to:**
  - **Analysts** (Gartner / Forrester / IDC) — fact-sheet, executive bios, recent funding/press, market positioning
  - **Partners** — integration list, technology alliances, SI partner page
  - **Press** — press-kit, media contact, recent coverage, founder interview availability
  - **Engineering talent** — actual jobs, blog, engineering culture, the founders' backgrounds
  - **Investors** — traction metrics, market size framing, capital efficiency, board, advisors
  - **Ecosystem (developers, AI researchers)** — repo presence, blog, podcast appearances
- **What's missing for the real audience:**
  - For CIOs: real customer logos, named deployments, certifications with status, security questionnaire link
  - For analysts: factsheet, named executives with credentials, funding history
  - For compliance officers: specific regulatory framework alignments with evidence (not "engineered to")
  - For press: press kit, named PR contact, recent coverage
  - For talent: real roles with seniority/location, team page with names and faces
  - For investors: stats / metrics / market thesis

### 3. Competitive Distinctiveness

- **Three direct competitors (verbally + visually):**
  1. **ChapsVision** (`chapsvision.com`) — sovereign AI from France. Same "agentic AI" hero, same "modular by design" repeating phrase, same 4-problem-area industry template, same trust-as-design framing. Davion's voice and IA were studied directly from theirs.
  2. **Palantir** (`palantir.com`) — US institutional AI/data. Similar "platforms institutions decide on" framing, ontology focus, decision-cycle. Davion's `From X to Y` architectural framing echoes Palantir's mission-grade voice.
  3. **Aleph Alpha** (`aleph-alpha.com`) — sovereign AI from Germany. Same sovereignty claims, same on-prem/air-gapped/sovereign-cloud matrix, similar institutional positioning.
- **Where Davion is indistinguishable:**
  - **From ChapsVision:** ~80% — vocabulary, IA, page templates, CTA vocabulary, industry template, capability framing.
  - **From Palantir:** ~40% — mission gravity, ontology focus, decision-cycle architecture.
  - **From every other sovereign AI platform:** the sovereignty matrix, the audit-trail emphasis, the "your data stays yours" framing — all category table-stakes now, not differentiators.
- **Three moves to break out:**
  1. **A point of view nobody else has.** Examples:
     - "Sovereignty is a liability shift, not a feature." (legal framing — provocative)
     - "Most sovereign AI isn't. It's hosted AI with an EU postcode." (contrarian — distinctive)
     - "The decisions that matter most can't wait for the cloud." (operational — clear)
     Pick one. Defend it. Repeat it everywhere.
  2. **A signature visual nobody else has.** Beyond the spiral (which is base1's, not Davion's), commission a recurring visual element that's specifically Davion: a typographic system, a recurring diagram language, a single signature motion. Even something as simple as a particular bracket / annotation style used consistently on every page.
  3. **A specific founder voice in public.** Bek as a person has more potential differentiation than any company page — interviews, essays on sovereignty/AI/institutions, podcast appearances, public technical writing. A polished company site is forgettable; a founder with a specific opinion is followable.

### 4. Realignment Recommendations

**Cut:**
- TrustedByStrip placeholder (until real proof lands)
- Stub pages from nav (until written)
- "Innovate. Secure. Perform." remnants (already replaced on home but echoes in the Davion brief / other materials)
- 10 of the 12 CTA labels — keep 2
- 30% of the word "sovereign" — replace with synonyms

**Sharpen:**
- Home hero → ONE positioning statement, applied consistently across page hero + OG meta + email signatures
- About → a real conviction-led essay with the founder's specific opinion
- Trust page certifications → honest "engineered to" / "in progress for" / "achieved" statuses with dates
- FS industry page voice — currently slips into "ChapsVision delivers advanced AI..." corporate; sharpen to Davion's voice

**Add:**
- One real customer story (or honestly-anonymized) with hard numbers
- A `/worldview` or `About` essay stating Davion's specific opinion on AI/sovereignty/institutions
- A press kit + named PR contact
- A team page (even just founder + 1–2 key hires)
- Real numbers somewhere — founding date, headquarters, capital raised, team size, country presence
- A status / uptime page (signals operational seriousness)
- An engineering blog (one post is enough to signal it exists)
- Specific certification statuses with dates (not "engineered to")
- Cookie consent banner (GDPR)
- OG cards for every page
- 4 legal pages (Privacy, Terms, Cookie, Responsible AI)

---

*End of audit report.*
