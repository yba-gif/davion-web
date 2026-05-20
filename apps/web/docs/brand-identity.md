# Davion — Brand Identity Brief

**Status:** v1 (2026-05-21). Designer brief, not the identity itself. The work this brief commissions replaces the current template-grade identity (placeholder D-mark + demo-licensed Degular Display).
**Action this unblocks:** outside designer engagement. **Decision the founder owns:** *who* to commission, *when*, *budget*.
**Audit anchor:** §1 Dim 4 (Brand Identity & Visual Distinctiveness), §2.3 row 2.

---

## What this is and isn't

This brief is the input we hand to a designer. It states what Davion is, who it's for, what visual territory we want to claim, what we explicitly do *not* want, and the deliverables. It does not pre-empt the designer's actual creative choices — colour, type, mark, motif. It gives them enough constraint to do that work well.

The current identity — a generic "D" on a green rounded square + demo-licensed Degular Display — is template-grade. The audit's verdict (§1 Dim 4) was *4/10 — "Strip the spiral and the wordmark and this site could be any of 200 sovereign-AI startups."* Replacing it is the single highest-leverage *visual* lift available before the company starts pitching at scale.

---

## The company in one paragraph

Davion is the sovereign AI platform for institutions whose data can't leave. Banks, ministries, defense, energy operators, life sciences companies, and government agencies use Davion when their decisions must be defensible, auditable, and made on data that never enters a public cloud. The platform is called AlpOS and deploys air-gapped, on-prem, or in a sovereign cloud bound by contract. Davion operates from Zurich and Istanbul.

The signature opinion: *"Sovereignty isn't a feature. It's where the work happens."* (Voice doc, `docs/brand-voice.md` §1.)

---

## Audience the identity is performing for

In priority order — the identity must read as native to the *first* group, credible to the *second*, and intelligible to the *third*.

1. **Institutional buyers** — CIOs, CISOs, heads of risk, regulatory compliance leaders, defense and intelligence procurement officers. They have seen Palantir's identity, ChapsVision's identity, IBM's identity, Mistral's identity. They have a calibrated bullshit detector for vendor branding. The identity needs to feel *peer*, not aspirational.

2. **Senior technical evaluators** — staff/principal engineers, architects, ML leads inside those institutions. They will run side-by-side comparisons. They want serious, not stylish.

3. **Analysts, press, and senior engineering talent** — Gartner/Forrester/IDC, FT/Reuters/Politico, the kind of engineer Davion wants to recruit. They glance at the identity and decide whether the company merits a phone call.

The identity does **not** primarily perform for: VC partners, design-Twitter, conference audiences, the broad enterprise SaaS market.

---

## What the identity must do

| Job | What "doing it" looks like |
|---|---|
| Signal **institutional gravity** | A logo a defense ministry can put in a procurement document next to government seals without looking out of place. |
| Signal **technical depth** | A mark that suggests architecture, not aspiration. The kind of identity Palantir or Stripe have, not the kind Asana or Notion have. |
| Signal **European-sovereign provenance** | The identity should read European without being clichéd-European (no flags, no fleur-de-lis, no Alps-and-snowflakes). Zurich and Istanbul are the home offices — neutrality + perimeter-depth — not Berlin or Paris. |
| Be **specifically Davion**, not category-default | Look unlike ChapsVision, Mistral, Aleph Alpha, Palantir, Anduril. The category has converged on dark/serif or all-caps-sans + a generic geometric mark. Davion should not look like any of them. |
| Operate **at small sizes and on documents** | The mark has to read at 16px in a header, 24px in an email signature, 8mm on a one-pager footer, and embossed on a 4 ×4 cm engagement-document cover. |
| Work in **monochrome** | A defense PDF will print this in black-on-white. The identity has to hold up before colour. |

---

## What the identity must NOT do

| Anti-pattern | Why it's banned |
|---|---|
| **A generic "D" rounded-square mark** | What we have now. Recognisable as a template. |
| **A circuit-board / neural-network / data-flow illustration** | The cliché of AI identity since 2019. |
| **A globe / shield / lock motif** | The cliché of sovereignty identity since forever. |
| **Black + electric green / blue gradient** | The Anduril / Shield AI / Skydio defense-tech palette. Davion is light-themed (per the existing site) and the green accent is already established — don't double down on the dark-defense vibe. |
| **A mountain / Alps wordmark** | The temptation is real (Zurich, AlpOS, sovereign). Resist. Aleph Alpha sort-of does this. Boring. |
| **Brutalist all-caps "DAVION"** | Anduril already owns this and we are not trying to be Anduril. |
| **Hand-set custom letterforms inside a roundel** | The fintech-circa-2021 move. |
| **A serif-only wordmark** | Reads as a law firm or a private bank. Wrong category cue. |
| **A monogram inside a hexagon** | Crypto-adjacent connotation. |
| **Animated logo** | We do not need the logo to move. The motion language lives at `docs/motion.md`; the identity is static. |

---

## Existing constraints to design *against* (we don't change these)

The identity refresh must coexist with — not replace — these inherited brand elements that are working:

1. **The spiral image** (`section_background-*.webp`). This is the one striking visual on the site today. It is the LCP image; it appears on the home hero and the frosted CTA. The new identity needs to live alongside the spiral without competing with it. If the designer wants to replace the spiral, that is a separate decision and a bigger ask; default is to keep it.

2. **The `text-primary-text` green accent dot** in headings ("Sovereignty isn't a feature**.**"). This is Davion's punctuation signature — a small green dot at the end of every headline. The new identity should respect this (or replace it deliberately, not accidentally).

3. **The light theme** (white + azure + aliceblue + honeydew + whitesmoke pastels). The site is light by design and that is working for the institutional audience. Do not commission a dark-theme identity unless the company is also rebuilt around it.

4. **The "Davion" wordmark length** — 6 characters, low ascender/descender ratio, easy to set tightly. Whatever face the designer chooses must hold up at the wordmark scale.

---

## Deliverables (what we want back)

In priority order. The designer can pitch additional items but these are the must-haves.

### Tier 1 — must ship in v1

1. **Primary mark.** One sigil — initial, abstract, or typographic — that is the irreducible Davion identity. Reads ≥ 16px. Works monochrome. SVG + PNG export at 1×, 2×, 4×. Sized for `/icon.svg` favicon usage and for header-nav placement.
2. **Wordmark.** The word "Davion" set in the chosen typeface, kerned. Standalone + lockup with the mark.
3. **Lockups.** Mark + wordmark in 3 configurations: horizontal lockup (header), stacked lockup (engagement-document cover), mark-only (favicon/avatar).
4. **Type system.** Display face for headings (replacing demo-licensed Degular Display) + text face for body (Switzer can stay if it survives the designer's review). Licensed and paid for. License document on file.
5. **Colour system.** Confirm or refine the existing palette (`primary #60E576`, `primary-text #2A8B3C`, `drygray-100 #212121`, `drygray-default #979797`, the four pastel section backgrounds). The designer may propose modifications; large changes get a follow-up review.
6. **Logo do's and don'ts.** A one-page rule sheet: minimum sizing, clear space, monochrome variants, banned recompositions.

### Tier 2 — ship in v1 if budget allows, otherwise v2

7. **Engagement-document templates.** Cover layouts for proposals, briefing memos, fact sheets. PDF templates the field team can fill in.
8. **Slide template.** Internal pitch deck cover + content slides. Keynote and PowerPoint.
9. **Email signature.** Standard signature block with mark + wordmark + role + contact.
10. **Social profile templates.** LinkedIn cover, X profile, GitHub org.

### Tier 3 — explicitly out of scope for v1

- Animated logo or motion identity (lives in `docs/motion.md`, separate scope).
- Full product UI redesign (AlpOS UI is product engineering's domain).
- Photography direction or stock image library.
- Brand video or commercial.

---

## References (for inspiration, not to copy)

Three brands the designer should study, with the specific thing to *learn* from each — not the thing to imitate.

1. **Stripe.** Specifically Stripe Press. The discipline of an identity that reads serious without being austere; the comfort of dense reading layouts; the way the wordmark survives at small sizes. *Study the typographic discipline.* Do not copy the cream-and-serif palette.

2. **Palantir** (the post-2020 identity). The way an institutional vendor can hold mission gravity without performing it. The mark is restrained. The wordmark does the work. *Study the restraint.* Do not copy the black-and-amber palette.

3. **Mistral AI.** A European AI vendor that didn't default to the dark-defense playbook. The wordmark is friendly without being soft; the colour system is confident without being loud. *Study the European-not-defensive positioning.* Do not copy the orange.

Optional fourth: **NS&I / Bank of England / Banque de France** style guides. The discipline of marks designed to survive institutional document layouts. This is where the identity will actually live for many of our buyers.

---

## Format of the engagement we expect

- **Type of designer:** independent senior brand designer or small studio. Not a generalist agency. We want someone who has shipped at least one identity for a B2B / institutional / category-defining startup in the last 5 years.
- **Timeline:** 3–4 weeks from kickoff to first concept presentation. 2 rounds of revision. 6–8 weeks to delivery.
- **Budget:** TBD by founder. Reference range: independent senior brand designers in the EU charge €25k–€60k for a Tier-1 deliverable scope.
- **Working pattern:** weekly check-ins. We are not a brand committee; the founder is the single decider. We will respond to questions inside one business day.
- **IP:** all deliverables transfer to Davion. Type licenses held by Davion.
- **NDA:** standard mutual NDA on engagement details (open-source the *end* identity, keep the *process* confidential).

---

## Decision-readiness checklist (founder action before kickoff)

Before commissioning, the founder needs to be ready to answer these on the kickoff call:

- [ ] Is the legal entity registered, and under what name?
- [ ] What is the founding year we will publish?
- [ ] What is the trademark status of "Davion" in the EU, US, UK, Turkey?
- [ ] Are there any restrictions from the trademark search that constrain the mark?
- [ ] Will the company publish a founder bio publicly, and is a portrait approved?
- [ ] Is there a brand-system maintainer on the team (designer hire, or contracted ongoing relationship with the same studio)?

The first two items also unblock the Numbers Strip P1.7 (founding year was deferred), the trademark check unblocks public marketing, and the maintenance question determines whether the identity can keep evolving or becomes static.

---

## Sequencing

The identity refresh runs as an **independent parallel track**. It does not block any other P0/P1/P2/P3 work. As deliverables land:

| Trigger | Update |
|---|---|
| Primary mark + wordmark land | Replace `/icon.svg` and header wordmark. Regenerate `og-cover.png` via `scripts/build-og-cover.mjs`. |
| Type system lands | Swap demo Degular for the licensed face in `assets/css/main.css`. Update `tailwind.config.ts` `fontFamily.degular`. |
| Colour refinements land | Update `tailwind.config.ts` `colors` block. The `primary` / `primary-text` two-tone WCAG-AA system from P0.2 must be preserved. |
| Engagement templates land | Hand off to field team. Link from `/company/about` or a new `/press` page. |

A `brand-identity.md` v2 will be written when v1 lands, documenting what was actually shipped and the do/don't rules.

---

## What success looks like, two weeks after launch

A buyer who sees the new identity on the home page, on a proposal cover, and in a LinkedIn DM in the same week should:

1. Recognise it as Davion in all three places, even at small sizes.
2. Not pattern-match it to ChapsVision, Mistral, Aleph Alpha, Palantir, or Anduril.
3. Feel that the company looks *older* than it is — institutional, not aspirational.
4. Trust that the company can be put on a procurement document.

If a designer's concept fails any of those four tests, send it back.
