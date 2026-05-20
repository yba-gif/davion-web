# Davion Website — Redesign Action Plan

**Date:** 2026-05-20
**Source:** `website-audit-report-2026-05-20.md` (same directory)
**Branch:** `rebrand/davion` @ `d38103a`
**Mode:** Opinion-led. Ship the highest-leverage work first. No backlog hoarding.

---

## How to read this plan

- **P0** = ship this week. Conversion-killers; AA-blockers; broken infra.
- **P1** = this sprint (next 2 weeks). Removes the loudest "early-stage" tells.
- **P2** = next sprint (weeks 3–4). Depth + craft — what turns the site from "competent" into "ownable."
- **P3** = backlog. Real but not urgent; revisit at the next planning cadence.

Every action is anchored back to an audit-report section so you can re-read the case for it. Effort is dev-day equivalent (1 day = 6 focused hrs).

---

## Priority register

### 🔴 P0 — Ship this week (≤ 5 days total dev effort)

| # | Action | Audit ref | Effort | Direction | Done looks like… |
|---|---|---|---|---|---|
| P0.1 | **Replace TrustedByStrip placeholders with honest framing** (or remove the strip until real proof lands) | §3 Blocker #1, §5 "Cut" | 2 hrs | Either (a) delete the 6 placeholder tiles + footnote and replace with a one-sentence "Davion is early; first deployments are under engagement contracts" statement, or (b) replace with 1–3 real in-progress certification badges + status ("ISO 27001 — in progress · target Q4 2026") | The home page no longer contains anonymous "Defense Ministry / Tier-1 Global Bank" tiles. A buyer who sees the section gets either a real signal or no signal — never a fake one. |
| P0.2 | **Fix `text-primary` WCAG AA contrast failure as text color** | §3 Blocker #3 | 3 hrs | Add `primary-text: #2A8B3C` token (≈5.3 : 1 on white). Replace `text-primary` with `text-primary-text` everywhere it carries text (CommonSup labels, "Featured" badges, link hovers, the `.` punctuation in headlines). Leave `bg-primary` / `border-primary` untouched — those are decoration. | Every text use of green passes WCAG AA at 4.5 : 1 minimum. `bg-primary` fills still use #60E576. Document the rule in the design tokens README. |
| P0.3 | **Rewrite the home hero to ONE positioning statement** | §3 Blocker #2, §1 Dim 7 | 1 day (incl. variant testing) | Replace the three stacked slogans with a single headline + one concrete subhead + one primary CTA. Use variant A from this document's "Hero copy samples" section as the starting point. Update OG meta + `nuxt.config.ts` `app.head` to match. | The home `/` hero has one headline and one subhead. The phrase appears verbatim on the OG image, in the home `<title>`, and in the contact-page intro. A stranger can recite the one-liner after 10 seconds. |
| P0.4 | **Standardize CTA labels site-wide** | §3 Blocker #7 | 2 hrs | Reduce 12 labels to 2 (+1 special case): `Book a demo` (primary, every page), `Speak to an expert` (secondary, every page), `Connect confidentially` (Defense & Intelligence pages only). Find/replace across `pages/**/*.vue` + `components/**/*.vue`. Update `CommonButton` defaults if needed. | A grep for "Request a briefing / Speak to / Get in touch / Pitch us / Meet us / Assess your posture / Talk to our team / Talk to your sector lead / Contact press / Join the mission" returns zero hits in user-facing copy. |
| P0.5 | **Fix `analytics.country VARCHAR(2)` overflow** | §2.1 row 3 | 30 min | In `composables/useAnalytics.ts`, send `null` instead of the string `'unknown'` for missing country. Or migrate the column to `VARCHAR(8)`. | No 500s on every page-view; analytics log is clean. |
| P0.6 | **Image performance pass — kill 30+ MB first-paint** | §3 Blocker #6, §2.2 row 2 | 1 day | Pre-process `section_background.png` (27 MB) and `cta_bg1.png` (4.4 MB) to responsive WebP variants at 480/960/1600/2400 widths via a build script. Wire `<picture>` with explicit srcset. Add `preload` for the hero image. | Home `/` first-paint weight drops from ~30 MB to ≲ 1 MB. Lighthouse Performance ≥ 70 on desktop, ≥ 50 on mobile (full ≥95 lands in P2). |
| P0.7 | **Hide stub pages from header nav until they're written** | §3 Blocker #5 (quick-fix variant) | 2 hrs | In `components/layout/header.vue`, remove the 11 stub items (5 industries, 6 capabilities, About, Careers, Events, Venture) from the desktop + mobile menus until real content ships. Keep the routes alive for any direct-link traffic. | Header dropdowns advertise only pages with real depth (AlpOS, Cybersecurity, Digital Transformation, OSINT, Financial Services, Newsroom, Trust, Contact). No buyer click can land on "In progress. Full page lands in a subsequent slice." |

**P0 total effort:** ~3.5 dev-days. Reasonable for one focused week.

---

### 🟠 P1 — This sprint (weeks 1–2, ≤ 10 days total dev effort)

| # | Action | Audit ref | Effort | Direction | Done looks like… |
|---|---|---|---|---|---|
| P1.1 | **Write the About page** — Davion's specific opinion on AI/sovereignty/institutions, founder note, 3–5 values, presence (HQ, founding year, team size if any) | §3 Blocker #5, §5 Realignment "Add" | 2 days (1.5 days writing, 0.5 day build) | Conviction-led essay format: 600–900 words. Sections: "Why Davion exists" (point of view), "What we believe" (3–5 values written as sentences not nouns), "How we work" (engagement model), "Who's behind this" (founder + key hires, real names + faces). End with one CTA: `Speak to an expert`. | About has real content. The opinion is specific enough that a buyer could argue with it (and that's a feature — bland is the failure mode). The page is linked back into the header nav once it ships. |
| P1.2 | **Define and apply Davion's signature copy move** | §3 Blocker #4, §5 Distinctiveness move #1 | 1 day | Pick one of three angles (clarity / emotional / contrarian — see §"Copy-rewrite samples" below). Write a one-page voice doc: 10-phrase vocabulary, 10-phrase forbidden list (chiefly: don't reuse ChapsVision's signature phrases), one signature copy move. Apply across home hero, AlpOS hero, FS hero, About. | A grep of the site returns zero hits for "Agentic AI", "We're on the AI journey with", "Modular by design", "In the field" verbatim. Each page hero uses Davion's signature move at least once. The voice doc lives at `/docs/brand-voice.md`. |
| P1.3 | **Write 2 customer-story pages with hard numbers** (anonymized as needed) | §3 Blocker #8, §5 Realignment "Add" | 2 days | New route `/customer-stories/index.vue` + 2 detail pages. Each story: problem → engagement → numbers → quote (attributed-as-permitted). Use only numbers Davion can defend. If no real numbers exist yet, surface that honestly — "Engagement in progress; results land Q3 2026." | The home page has a "Customer stories" section that links to /customer-stories. Each story page has at least one hard number ("60% reduction in case-review time" / "12,400 events/hr ingested across 4 sources" / etc.). |
| P1.4 | **Convert the Energy industry stub into real content** | §3 Blocker #5 (right answer variant) | 2 days | Use the FS template: hero with industry pain → 4 problem areas with bullets → 6 solution cards → "In the field" story → CTA. Source content from publicly available Energy-sector AI/sovereignty thesis. | `/industries/energy` no longer reads "In progress." Page has parity with FS. Re-introduce Energy to the Industries dropdown. |
| P1.5 | **Convert the Defense & Intelligence industry stub into real content** | §3 Blocker #5 | 2 days | Same FS template. This page uses `Connect confidentially` as its primary CTA. | `/industries/defense-intelligence` has parity with FS. Re-introduced to nav. |
| P1.6 | **Add OG images + per-page SEO metadata** | §2.1 row 5 | 1 day | Generate `/og-cover.svg` (Davion wordmark + signature mark + headline placeholder). Build a per-page OG card via a runtime SVG → PNG or Satori at build time. Add `useSeoMeta` to all 6 depth pages. | Sharing any depth page on LinkedIn / Slack / Twitter shows a custom OG card with the page's headline. `nuxt.config.ts` defaults are sane. |
| P1.7 | **Numbers strip — surface the real stats Davion has today** | §3 Blocker #8 quick-fix | 4 hrs | Replace TrustedByStrip slot with a small 3–5 card "stats strip" showing what's true today: founding date, country presence, languages supported, connector count. If a stat isn't true, don't put it there. | Home page has a real numbers strip. No invented metrics. Each card is a noun + a verifiable number. |

**P1 total effort:** ~10 dev-days. One real two-week sprint.

---

### 🟡 P2 — Next sprint (weeks 3–4, ≤ 10 days total dev effort)

| # | Action | Audit ref | Effort | Direction | Done looks like… |
|---|---|---|---|---|---|
| P2.1 | **Convert 3 more industry stubs to real content** (Manufacturing, Life Sciences, Government) | §3 Blocker #5 | 4 days | Same FS template + voice doc applied. Re-introduce each to the Industries dropdown as it lands. | All 6 industry pages have parity. The Industries dropdown shows 6 real items, zero stubs. |
| P2.2 | **Convert the 6 Capability stubs to real content** (RAG, Geospatial, Video, Audio, Translation, Data Acquisition) | §3 Blocker #5 | 3 days | Lighter template than industries (these are technical reference pages). Hero + what it does + how it works (1 diagram) + when to use it + which industries lean on it + CTA. | All 6 capability pages have at least 400 words + 1 diagram + 1 cross-link to a relevant industry. Capabilities dropdown shows 6 real items. |
| P2.3 | **Brand identity refresh — commission a real D-mark + license a real display face** | §1 Dim 4, §2.3 row 2 | 5 days (with external designer) | Brief an outside designer (1 day to write the brief; 3 days designer turnaround; 1 day to integrate). Pair with a real display face license — Söhne, Migra, or similar institutional sans — replacing demo-licensed Degular. | Davion has a logo and wordmark that aren't templated. Font files are properly licensed. The identity is documented in `/docs/brand-identity.md`. |
| P2.4 | **Define and apply motion language** | §1 Dim 6, §2.3 row 3 | 3 days | Pick 3 signature motions and apply them consistently: (a) section reveal-on-scroll using `transform: translateY(20px) → 0` + opacity, 600ms ease-out; (b) hover lift on cards (`shadow-md → shadow-lg` + `translateY(-2px)`, 200ms); (c) the existing page transition (keep). Document in `/docs/motion.md`. Remove ad-hoc Swiper / SMIL motions that don't follow the system. | Every interactive element on the site uses one of the three documented motions. No bespoke `transition-all` strings. |
| P2.5 | **Performance overhaul to Lighthouse ≥ 95** | §2.3 row 4, §3 Blocker #6 right-answer | 5 days | Font subsetting, code splitting, prefetching, lazy-loading non-critical components, restore NuxtImg with correct usage, audit bundle, add `unhead` properly. | Lighthouse on `/` ≥ 95 across all 4 categories. LCP < 2.0s on 4G throttling. CLS ≈ 0. |
| P2.6 | **Build a real Careers page** (open roles, hiring process, EVP) | §2.2 row 8 | 1 day | Even with 3–5 placeholder roles (Senior Distributed Systems Eng / Solutions Engineer / Sales Engineer, etc.), buyers check careers to gauge team caliber. Include hiring process (3-step) + EVP paragraph. | `/company/careers` has real role listings, hiring process, EVP. Re-introduced to nav. |
| P2.7 | **Newsroom categorization + 3 real editorial pieces** | §2.2 row 7 | 2 days | Add `category` enum to `blog` schema migration. Categorize the 3 seeded posts. Write 3 new posts: one announcement, one insight (Davion's POV on sovereignty), one technical (engineering blog). | Newsroom has filtering chips. 6 posts live. At least one is engineering-flavored. |

**P2 total effort:** ~10 dev-days. Real but achievable in 2 weeks with focus.

---

### ⚪ P3 — Backlog (revisit at week 5 planning)

| # | Action | Audit ref | Effort |
|---|---|---|---|
| P3.1 | Engineering blog setup — RSS, code blocks with syntax highlighting, code-review reaction emojis | §5 "Add" | 2 days |
| P3.2 | Press kit page — downloadable logos, brand colors, executive bios, recent coverage | §5 Audience "press" | 1 day |
| P3.3 | Status / uptime page (statuspage.io or a simple custom) | §5 Audience "ops" | 1 day |
| P3.4 | 4 legal pages — Privacy, Terms, Cookie, Responsible AI | §2.1 row 4 | 1 day |
| P3.5 | Cookie consent banner (GDPR-compliant; consent-first, not pre-checked) | §4 UX anti-patterns | 1 day |
| P3.6 | Production deploy — Vercel + Neon Postgres + custom `davion.com` + Sentry + Plausible | §2.3 row 6 | 5 days |
| P3.7 | Trust page — real certification statuses with dates (`engineered to` / `in progress for` / `achieved`) | §2.2 row 9 | 1 day |
| P3.8 | Mobile breakpoint pass — verify hero spiral crop on iPhone widths, fix sectors marquee on small viewports, retune typography below md | §2.2 row 10 | 2 days |
| P3.9 | Brand voice + content style guide document (codifies P1.2) | §2.3 row 7 | 5 days |
| P3.10 | Lint rule — flag `text-primary` on light backgrounds in PRs (P0.2 enforcement) | §3 Blocker #3 right-answer | 4 hrs |
| P3.11 | Tablet (768–1024px) layout audit — 12-col grids on inner pages | §1 Dim 6 | 2 days |
| P3.12 | A11y full sweep — focus rings visible against pastel backgrounds, keyboard-only navigation, screen-reader labels for the AlpOS console mockup carousel | §4 UX, §1 Dim 2 | 3 days |

---

## Two-week sprint grouping

### **Sprint 1 (Week 1–2): "Stop the bleeding"**

Goal: make every page tell the truth. No fake proof, no illegible green text, no broken images, no hero that hedges.

**Week 1 (P0 — ship by Friday):**
- Mon: P0.1 (TrustedByStrip) + P0.4 (CTA labels) + P0.5 (analytics 500) — small / parallel
- Tue: P0.2 (WCAG green) — full day
- Wed: P0.3 (hero rewrite + variant test) — full day
- Thu: P0.6 (image perf) — full day
- Fri: P0.7 (nav prune) + buffer / QA

**Week 2 (P1 — ship as ready):**
- Mon–Tue: P1.1 (About page) — 2 days
- Wed: P1.2 (voice doc) — 1 day, must complete before P1.4/P1.5 start
- Thu–Fri: P1.3 (2 customer stories) — 2 days, requires source material

### **Sprint 2 (Week 3–4): "Make it ownable"**

Goal: Davion has an identity, a voice, and depth where the nav promises it. By end of sprint 2, the site survives institutional buyer scrutiny.

**Week 3:**
- Mon–Tue: P1.4 (Energy industry depth) — 2 days
- Wed–Thu: P1.5 (Defense & Intelligence industry depth) — 2 days
- Fri: P1.6 (OG meta) + P1.7 (numbers strip) — 1 day combined

**Week 4:**
- Mon–Thu: P2.1 (3 industries) — 4 days
- Fri: P2.2 (3 of 6 capabilities) — 1 day (remainder rolls into week 5)

*P2.3 (identity refresh) and P2.5 (performance overhaul) run in parallel as longer-running tracks across both sprints — start P2.3 the moment a designer is briefed (week 1, Friday).*

### **Sprint 3+ (Week 5+):**
- Finish P2.2, P2.4 (motion), P2.6 (careers), P2.7 (newsroom)
- Begin P3 in priority order

---

## Dependency map

```
P0.2 (WCAG green) ─────────────────────┐
                                       ├──► P0.3 (hero rewrite — uses the corrected token)
P0.4 (CTA labels) ─────────────────────┤
                                       ├──► P1.1 (About — uses standardized CTA)
P0.7 (nav prune) ──────────────────────┘    │
                                            │
                                            ▼
                                       P1.2 (voice doc — applied to About first)
                                            │
                                            ▼
                                       P1.4 / P1.5 / P2.1 / P2.2
                                       (every depth page uses the voice doc)

P0.1 (TrustedByStrip removal) ─► P1.7 (numbers strip replaces it)
                                            │
                                            ▼
                                       P1.3 (customer stories — real proof
                                            slots into where TrustedByStrip was)

P2.3 (identity refresh) — INDEPENDENT, starts week 1 in parallel
                          ► all P2/P3 work picks up new identity once delivered

P2.5 (performance) ─► includes P0.6 cleanup; can absorb its work
P3.10 (lint rule) requires P0.2 done

P0.6 (image perf) ─► partial fix; P2.5 supersedes
```

**Critical path:** P0.2 → P0.3 → P1.2 → P1.4 / P1.5 / P2.1. The voice doc is the chokepoint that unblocks every depth-content rewrite. Write it early in week 2 and protect that day.

---

## Quick wins (≤ 1 hour each — ship today)

| # | Action | Effort |
|---|---|---|
| QW.1 | Fix `analytics.country VARCHAR(2)` overflow — send `null`, not `'unknown'` (= P0.5) | 30 min |
| QW.2 | Replace `Read more` → `Read dispatch` in `BlogCard` / `HorizontalBlogCard` defaults | 15 min |
| QW.3 | Replace `Explore` → page-specific verbs (`See AlpOS`, `Read the FS playbook`, `Open the Trust page`) on the home Solutions triad and Industries hub | 30 min |
| QW.4 | Remove dead `components/section/{cta,reference,blog,features}.vue` originals (verify no imports first) | 30 min |
| QW.5 | Verify `pages/blog/[slug].vue` orphan is gone; delete if present | 15 min |
| QW.6 | Add `<meta name="theme-color" content="#60E576">` for mobile browser chrome — small but visible | 5 min |
| QW.7 | Add a single `prefetch` hint for `/icon.svg` to remove a 50ms FOUC blip on first paint | 5 min |
| QW.8 | Rename the AlpOS console copilot avatar letter from `D` to a non-letter mark (small dot or chevron) — currently reads as "Davion" + "D" copilot, redundant | 15 min |
| QW.9 | Trim the word "sovereign" usage by 30% — find/replace half of `sovereign` with `governed` / `defensible` / `in-perimeter` / `auditable` on pages where it appears 3+ times | 1 hr |
| QW.10 | Add a `last-updated` line in the Trust page footer (e.g. "Last reviewed: 2026-05-20") | 15 min |
| QW.11 | Standardize section eyebrow casing — lowercase the `CommonSup` data so `class="uppercase"` rendering is consistent | 1 hr |

**Bundle as a "Friday quick-wins PR"** — every item ≤ 1 hr means the whole stack ships in half a day with no architectural risk.

---

## Mood-board direction

Five references the redesign should learn from. For each: what they do well and the *specific* thing to borrow — not the surface look, the *move underneath*.

### 1. **Palantir** (`palantir.com`)
- **What they do well:** Mission gravity without bombast. Editorial confidence. Long-form thinking sits comfortably beside product. The `/impact` and `/blog` pages let density breathe.
- **Specific thing to borrow:** Their willingness to publish actual operational stories (military, hospital, manufacturing) with named outcomes. Davion needs this when real customers permit.
- **Where it applies in our plan:** P1.3 (customer stories voice/structure), P2.1 (industry-page voice).
- **Where to NOT copy:** Their black-and-amber visual identity — it's iconic to them and looking like Palantir-lite would be worse than looking like base1.

### 2. **Stripe Press** (`press.stripe.com`)
- **What they do well:** Editorial typography that signals seriousness without aggression. Genuine reading-flow rhythm. Headings that introduce ideas, not features.
- **Specific thing to borrow:** Their treatment of the headline as a complete thought, never a slogan. Stripe Press headlines are sentences. Davion's home hero is currently three nouns; the move toward a real sentence is the win.
- **Where it applies in our plan:** P0.3 (hero rewrite), P1.1 (About essay).
- **Where to NOT copy:** Their cream-and-serif aesthetic is too literary for a security-grade buyer.

### 3. **Linear** (`linear.app`)
- **What they do well:** Product preview craft. Every visual is a real-feeling, screenshot-grade UI fragment that earns trust the moment you see it.
- **Specific thing to borrow:** The Linear feel of "this is a real product you can see working" — applied to Davion's AlpOS console (which already gestures at this; sharpen further with two more product-preview cards on other depth pages so it isn't a one-off).
- **Where it applies in our plan:** AlpOS page (already done), P2.2 capabilities pages (need diagrammatic content), P2.4 (motion language — Linear's hover/transition vocabulary is exemplary).
- **Where to NOT copy:** The dark theme. Davion is light and that's working.

### 4. **Anduril** (`anduril.com`)
- **What they do well:** Defense-adjacent positioning without theatrical seriousness. Hard mission language ("Mission first") without uniforms-and-flags imagery. The site is calm. It signals competence by *not* trying too hard to signal competence.
- **Specific thing to borrow:** The discipline of one clear value claim per page, repeated. And their commitment to specific operational language — "We build autonomous systems for national security" — that doesn't hide behind abstractions.
- **Where it applies in our plan:** P0.3 (hero), P1.2 (voice doc — write Davion's "Mission first" equivalent), P1.5 (Defense & Intelligence industry page tone).
- **Where to NOT copy:** Don't go dark/military. Davion sells across financial services + energy + life sciences + manufacturing too; a defense-coded site narrows.

### 5. **Mistral AI** (`mistral.ai`)
- **What they do well:** European sovereign-AI positioning without "we're the European one" defensiveness. Numbers-first proof — model benchmarks, parameter counts, customer logos. Confident product visuals.
- **Specific thing to borrow:** Their numbers-first sections. The home page hits you with concrete metrics inside the first scroll. Davion has zero numbers; Mistral's discipline of leading with concrete proof is the corrective.
- **Where it applies in our plan:** P1.7 (numbers strip), P1.3 (customer-story format).
- **Where to NOT copy:** Their wider "frontier AI" framing — Davion isn't competing on model performance, it's competing on deployment posture.

**The composite Davion should aim for:** Palantir's editorial confidence + Stripe Press's headline discipline + Linear's product-preview craft + Anduril's calm + Mistral's numbers-first proof — applied to base1's already-functional light-and-green visual chassis.

---

## Copy-rewrite samples — Hero

Three variants for the home `/` hero. Each takes a different angle. Each is shippable as-is for P0.3.

### Variant A — **Clarity-first** (recommended default)

> **Headline:** Sovereign AI for institutions whose data can't leave.
>
> **Subhead:** Davion is the platform banks, ministries, and energy operators use when their decisions must be defensible, auditable, and made on data that never enters a public cloud.
>
> **Primary CTA:** Book a demo
> **Secondary CTA:** See how AlpOS works

**Why it works:** One sentence. Concrete buyer ("banks, ministries, energy operators"). Concrete promise ("data never enters a public cloud"). Survives a 5-second comprehension test. Easy to repeat on the OG image, in email signatures, and on a pitch deck cover slide.

**Risk:** Slightly long. If "institutions" sounds vague, swap for "regulated institutions" or "critical institutions."

---

### Variant B — **Emotional / operational**

> **Headline:** The decisions that matter most can't wait for the cloud.
>
> **Subhead:** Davion gives banks, ministries, and operators sovereign AI that runs where the work happens — air-gapped, on-prem, or in a perimeter you control — so the call is yours, not your vendor's.
>
> **Primary CTA:** Book a demo
> **Secondary CTA:** Read our worldview

**Why it works:** Tension in the headline ("decisions that matter most" / "can't wait"). Implies stakes without naming them, which sophisticated buyers complete in their head. Subhead resolves the tension by naming the deployment modes.

**Risk:** Dramatic. If Davion wants to be the calm institutional vendor, this is too operatic. Best for the front-page of the brand site if Davion wants to project urgency; less appropriate on a Trust page.

---

### Variant C — **Contrarian**

> **Headline:** Most "sovereign AI" isn't.
>
> **Subhead:** It's hosted AI with an EU postcode. Davion is the platform you deploy *inside* your perimeter — your data, your weights, your decisions, every audit traceable, every model defensible.
>
> **Primary CTA:** Book a demo
> **Secondary CTA:** See the deployment matrix

**Why it works:** Picks a fight with the category. Memorable in a way A and B aren't. Defines Davion against ChapsVision / Cohere-for-EU / Aleph-Alpha by claiming the rest of the market is doing sovereignty-theatre. Most distinctive of the three variants.

**Risk:** Highest. If Davion isn't ready to publicly stand behind the claim — i.e. if AlpOS does ship any hosted-mode components — this becomes a liability. The voice doc (P1.2) should resolve this: either commit to the contrarian position or pick A.

---

### Recommendation

Ship **Variant A** as P0.3 this week. It's the safest, the clearest, and converts the broadest buyer set.

Workshop **Variant C** with the founder during P1.2 (voice doc). If Bek can defend the contrarian claim publicly (which he can, on operational grounds — air-gap deployment is materially different from hosted-mode "sovereign" cloud), swap A for C at the start of Sprint 2. That gives Davion something nobody else is saying — which is the only durable brand-moat.

---

## Anti-goals (don't do these even if asked)

These look productive but actively make the site worse. Capturing them so they don't slip back in.

1. **Don't add more anonymous proof tiles** — better-designed placeholder tiles are still placeholder tiles. P0.1 removes; do not regrow.
2. **Don't add a video hero** — auto-playing video on first paint is a performance + accessibility regression that no buyer asked for.
3. **Don't add a chatbot widget** — Davion sells human consultative engagement; a Drift bubble undermines the brand.
4. **Don't add a "Trusted by 1,000+ teams"–style social-proof line** without 1,000+ actual teams. Same anti-pattern as P0.1 in different syntax.
5. **Don't redesign the spiral or replace the green** until the identity refresh (P2.3). The base1-inherited visuals are working; new ones aren't free.
6. **Don't add a "Solutions" mega-menu** until depth content lands (P2.1 / P2.2). The current click-dropdown is honest and accessible.
7. **Don't gate the Contact page with a form** before the brand earns it. Mailto + intent list converts better for institutional buyers at Davion's stage.

---

## Executive summary

### 3-sentence verdict

The site is competent — base1's chassis is sound, the spiral hero is striking, and the IA gestures at real product depth — but it advertises an institutional credibility it can't yet back with proof, in a voice borrowed visibly from ChapsVision, with a brand color that fails the accessibility floor the brief itself sets. The single biggest gap is between *what the nav and copy promise* (sovereign AI deployed at scale across regulated industries) and *what the site delivers* (one striking image, six placeholder logo tiles, eleven stub pages, and three near-equal slogans where competitors give one promise). The fix is not more pages or more sections — it's **less, said better, with one specific opinion repeated everywhere a buyer might land**.

### Top 3 most damaging findings (ranked)

1. **🔴 The TrustedByStrip placeholder section is a credibility-killer the moment it scrolls into view.** Six anonymous "Defense Ministry / Tier-1 Global Bank" tiles confirm exactly what the footnote claims to deflect: that there's nothing real here yet. Sophisticated buyers — the same audience the rest of the site claims to serve — pattern-match placeholder proof in seconds. *(Audit §3 Blocker #1)*
2. **🔴 The home hero gives three slogans where every credible competitor gives one promise.** `Agentic AI. / Sovereign data. / Decisions defended.` reads as a brainstorm, not a positioning. The visitor cannot recite what Davion is after 10 seconds because Davion hasn't decided what to say. *(Audit §3 Blocker #2, §1 Dim 7)*
3. **🟠→🔴 The brand color (`text-primary` #60E576) fails WCAG AA contrast on white at ~1.45 : 1, site-wide, in every eyebrow, badge, link hover, and decorative `.` accent.** The brief explicitly requires AA. The buyer audience (governments, regulated institutions, defense) requires AA. Davion's own brand currently disqualifies it from its own procurement processes. *(Audit §3 Blocker #3, §1 Dim 2)*

### The single recommended first move (shippable in 48 hours)

**Ship a "Truth & Contrast" PR this Wednesday containing P0.1 + P0.2 + P0.3 + P0.4.**

- P0.1 deletes the TrustedByStrip placeholders (or replaces with one honest line).
- P0.2 fixes the WCAG green failure across the site.
- P0.3 rewrites the home hero to Variant A — one sentence, one promise, one CTA.
- P0.4 collapses 12 CTA labels into 2.

Estimated effort: ~9 dev-hours total — single focused day plus QA on day two. Estimated impact: removes the three loudest "early-stage" tells a sophisticated buyer notices in the first 15 seconds of the home page. None of these decisions are reversible later if better proof / better positioning lands; all are improvements that compound with every subsequent depth-content shipment.

Everything else in this plan builds from that foundation.

---

*End of action plan. Companion file: `website-audit-report-2026-05-20.md`.*
