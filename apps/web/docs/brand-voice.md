# Davion — Brand Voice & Content Style Guide

**Status:** v1 — Sprint 1 (2026-05-20). To be tested against P1.1 (About) and reviewed before Sprint 2 cycle.
**Owner:** Bek (founder) + writer-on-duty.
**Audit anchor:** §3 Blocker #4, §5 Distinctiveness move #1.

---

## 1. The Opinion

Davion holds one specific position the rest of the category does not:

> **Sovereignty isn't a feature. It's where the work happens.**

The category has confused regulatory residency with operational sovereignty. Most platforms calling themselves "sovereign AI" today are hosted AI services with European billing addresses — your data crosses their network, lands in their tenancy, gets inferenced on their weights, and returns to you alongside a contractual promise that the postcode was European all along.

Davion deploys *inside* the customer's perimeter. The data does not leave. The weights are auditable on-prem. The inference runs where the work runs — air-gapped, on-prem, or in a sovereign cloud bound by contract. Every decision is traceable to the data it was made on.

This is not marketing copy. It is the operational difference between a platform an air-gapped defense ministry can use and a platform it cannot.

We say this everywhere. We do not hedge it. We do not let it get diluted into "secure" or "trusted" or "responsible." Those words are true of Davion but they are also true of every competitor. The one thing the competitors cannot say with a straight face is *we deploy inside your perimeter*, and that is the one thing we lead with.

---

## 2. The Signature Copy Move

Every page hero should be a single declarative sentence built from one of these two structural moves:

**Move A — Position by buyer + constraint:**
> *"[Concrete buyer] use Davion when [concrete operational constraint]."*

Examples that ship today:
- *"Banks, ministries, and energy operators use Davion when decisions must be defensible, auditable, and made on data that never enters a public cloud."* (home subhead)

**Move B — Position by category claim:**
> *"Davion is the [specific category] for [specific buyer or constraint]."*

Examples that ship today:
- *"Sovereign AI for institutions whose data can't leave."* (home headline)
- *"Sovereign AI infrastructure for decisions that can't wait. And can't leak."* (AlpOS hero)

Both moves are concrete, declarative, and pass the 5-second comprehension test. They are the Davion equivalent of Stripe's "Stripe is a financial infrastructure platform for the internet."

A hero that does not use one of these two moves is not Davion's hero.

---

## 3. Vocabulary — Phrases We Use

Use these. Repeat them. They are the vocabulary that, taken together, sounds like Davion and not like a competitor.

1. **Sovereign** — Use sparingly (≤ 3× per page). Burnout is real. If a page needs the concept four times, the other three should be the synonyms below.
2. **Defensible** — A decision is *defensible* when an auditor can reconstruct it from the data it was made on. Davion's strongest single word.
3. **In-perimeter** / **Inside your perimeter** — Concrete deployment claim. Beats "secure."
4. **Air-gapped** — The deepest sovereignty mode. Use it when speaking to defense / critical-infrastructure buyers.
5. **On-prem** / **On-premise** — Concrete deployment fact. Beats "private."
6. **Auditable** — Specific accountability claim. Every action has a trace.
7. **Cite its sources** — RAG-aware claim. The decision points back to the data.
8. **Governed end to end** — Pipeline-wide guarantee, from ingest through act.
9. **Decisions you can defend** — Pairs operational urgency with operational accountability.
10. **Where the work happens** — The signature phrase. Used in §1 of this doc. Should appear in About + at least one inner page.

---

## 4. Forbidden — Phrases We Don't Use

Hard ban list. Each entry below is either (a) directly copied from a competitor, (b) corporate vendorese that means nothing, or (c) inherited from base1 and no longer Davion.

1. **"Agentic AI"** — ChapsVision's hero headline phrase. Recognizable in 30 seconds.
2. **"We're on the AI journey with"** — directly lifted from ChapsVision's homepage trust strip.
3. **"Modular by design"** — ChapsVision's repeated phrase.
4. **"In the field"** as a section eyebrow — ChapsVision's vertical-use-case framing. We say *Where it lands* or *On the ground* instead.
5. **"From X to Y"** as architectural framing — ChapsVision's signature copy move. Avoid unless the X→Y is a real, specific Davion pipeline beat (e.g. "Data → Decision" is OK; "From inspiration to execution" is not).
6. **"Innovate. Secure. Perform."** — base1's inherited tagline. Replace everywhere.
7. **"Trusted partner"** / **"Strategic partner"** — corporate vendorese. We are a *platform vendor*, not a *partner*.
8. **"Revolutionary"** / **"Cutting-edge"** / **"Next-generation"** / **"Industry-leading"** / **"World-class"** / **"Best-in-class"** — vendor brag. None of these is a claim, just a tone.
9. **"Empower"** / **"Unlock"** / **"Leverage"** / **"Unleash"** — corporate verbs that hide what the product actually does.
10. **"Solutions"** as a noun when we mean *products* or *capabilities* — except in the literal nav label `/solutions/*`. (Tolerated there because the IA convention is established; do not propagate.)

---

## 5. Tone Rules

1. **Declarative, not performative.** Say what is true. Do not perform expertise.
   - Bad: *"Davion empowers institutions to navigate the complexity of sovereign AI."*
   - Good: *"Davion deploys inside your perimeter."*

2. **Concrete buyers, not "organisations."** Name the buyer when you can.
   - Bad: *"For organisations seeking enterprise-grade AI."*
   - Good: *"For banks, ministries, and energy operators."*

3. **Operational verbs, not abstract nouns.** Verbs commit. Nouns hedge.
   - Bad: *"Davion's decisioning capability."*
   - Good: *"Davion decides."*

4. **Specific constraints, not generic claims.** A specific constraint earns trust; a generic claim costs it.
   - Bad: *"Davion is secure."*
   - Good: *"Davion's data never enters a public cloud."*

5. **Numbers when defensible. Honest in-progress when not.** Never invent.
   - Bad: *"Trusted by 500+ enterprises."* (when it isn't)
   - Good: *"First production deployments under engagement contract; customer names withheld until approved for press."*

6. **One sentence per claim.** If a paragraph carries three claims, split it into three sentences.

7. **Punctuation has weight.** The green `.` at the end of headings is Davion's punctuation accent. It says *we are done*. Use it on headings. Never inside body copy.

8. **No exclamation marks.** Anywhere. Davion is a platform for decisions that get audited. Audited decisions are not exclaimed.

---

## 6. Before / After Examples

These are real lines from the site, rewritten to voice. Pattern-match against them.

| Before (off-voice) | After (Davion) |
|---|---|
| "Davion delivers advanced AI and data intelligence for banks…" | "Banks use Davion when their decisions must be defensible — and made on data that never leaves the bank." |
| "Sovereign by design" | "Sovereign because that is where the work happens." (when expanded) |
| "Modular by design" | "Composed end to end. Replaceable end to end." |
| "Agentic AI for the public sector" | "AI that decides — and points to the data it decided on." |
| "Innovate. Secure. Perform." | (delete; this is a base1 tagline, not Davion's) |
| "We're on the AI journey with leading institutions." | "First production deployments under engagement contract. Customer names withheld until approved for press." |
| "In the field — Energy" | "Where it lands — Energy operators" |
| "Trusted partner for digital transformation" | "We rebuild the data layer institutions decide on. Then we leave." |

---

## 7. Where this lives

| Surface | Status |
|---|---|
| Home hero | Variant A (clarity-first) shipped P0.3. Uses Move B + Vocabulary 1, 3. |
| Home subhead | Uses Move A. |
| AlpOS hero | Uses Move B + Vocabulary 4, 6. |
| Financial Services hero | Rewrite to Move A: *"Banks use Davion when their decisions must be defensible, auditable, and made on data that never leaves the bank."* (P1 sweep) |
| About | Built ground-up against this doc in P1.1. |
| Energy / Defense / other depth pages | Each hero must use Move A or Move B. (P1.4, P1.5) |
| Footer brand line | Rewrite from "Sovereign software for data intelligence... Innovate. Secure. Perform." → *"Davion deploys inside your perimeter."* |

---

## 8. Maintenance

- Review this doc at the start of every sprint.
- Add to the Forbidden list when a phrase starts pattern-matching a competitor.
- When in doubt, default to: *what is the operational fact under the claim?* — and say that.
