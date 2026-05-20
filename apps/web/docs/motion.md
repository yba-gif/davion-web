# Davion — Motion Language

**Status:** v1 — Sprint 1 (2026-05-21). Reviewed quarterly.
**Owner:** Brand · Engineering.
**Audit anchor:** §1 Dim 6 (Responsive Behavior & Micro-interactions), §2.3 row 3.

---

## The principle

Davion's motion language exists so the platform's product surface — and the marketing site that fronts it — feel *intentional* rather than *animated*. Motion is a typographic decision, not a decoration.

We use three signature motions. We do not use more.

---

## 1 — Page transition (between routes)

**Purpose:** soften the cognitive jolt of route changes; signal that the system is responsive without performing it.

**Spec:**
- Properties animated: `opacity`, `filter: blur()`.
- Duration: **280ms**.
- Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)` (gentle ease-out).
- Initial state: `opacity: 0; filter: blur(6px)`.
- Final state: `opacity: 1; filter: blur(0)`.
- Mode: `out-in` — current page completes its leave before the new page begins to enter.
- Implementation: Nuxt `app.pageTransition` + matching CSS classes in `assets/css/main.css`.

**Reduced motion:** transition disabled; instant swap.

---

## 2 — Reveal on scroll (between sections of a page)

**Purpose:** let content arrive deliberately as the reader earns it. Used on section-level containers, not on every element inside them.

**Spec:**
- Properties animated: `opacity`, `transform: translateY()`.
- Duration: **600ms**.
- Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)`.
- Initial state: `opacity: 0; transform: translateY(20px)`.
- Final state: `opacity: 1; transform: translateY(0)`.
- Trigger: element enters the viewport at threshold **0.15** with `rootMargin: 0px 0px -60px 0px` (small bottom inset so the reveal fires *just* before the section is fully in frame).
- Plays **once** per page load. The IntersectionObserver unobserves after the first hit — re-scrolling does not re-trigger the animation.

**Usage:**

```html
<section v-reveal>
  <!-- the content of this section fades up once when scrolled into view -->
</section>
```

The `v-reveal` directive (registered globally via `plugins/reveal.client.ts`) attaches the IntersectionObserver and toggles the `data-revealed` attribute. The matching CSS lives in `assets/css/main.css` under `[data-reveal-on-scroll]`.

**When to use:**
- Mid-page sections after the hero (hero is already visible at page load and does not need a reveal).
- Major content blocks where the reveal cadence helps reading rhythm.

**When NOT to use:**
- The home hero (visible at load).
- Individual cards inside a section (reveal the section, not every card — staggered card reveals are a 2007 portfolio tic).
- Above-the-fold elements (they're already there).

**Reduced motion:** content is rendered in its final state immediately.

---

## 3 — Card hover lift (interactive cards)

**Purpose:** provide a tactile signal that a card is interactive (clickable / hoverable) without using a colour wash or border swap.

**Spec:**
- Properties animated: `transform: translateY()`, `box-shadow`.
- Duration: **200ms**.
- Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)`.
- Hover state: `transform: translateY(-2px)` + a heavier soft shadow.
- Resting state: no transform, lighter shadow (or the card's existing shadow).

**Usage:**

```html
<NuxtLink to="/..." class="card-hover bg-whitesmoke-100 rounded-2xl p-8">
  <!-- card content -->
</NuxtLink>
```

Apply `.card-hover` to any link-card or button-card. Do not apply to non-interactive cards.

**Reduced motion:** the lift is removed; only colour/shadow changes remain.

---

## Anti-patterns

Things motion language deliberately does not do.

| Anti-pattern | Why it's banned |
|---|---|
| **Staggered card reveals** (each card fades in 100ms after the previous) | Performative; signals "we have motion library" instead of "content is important." |
| **Scroll-linked animations** (parallax, transform-on-scroll) | Hostile to keyboard users, screen readers, and people who jump-scroll. |
| **Hover animations on text** | Distracts from reading. Use colour swap only for hover-state on links. |
| **Marquees that stop on hover with no obvious affordance** | The sectors marquee is the one exception (signature element); do not propagate the pattern. |
| **Spring physics** (overshoot, bounce) | Wrong tonality for institutional buyers. We use ease-out, not spring. |
| **Auto-rotating carousels longer than 5s** | The AlpOS console carousel is the one exception (signature product preview). Keep new carousels out unless there's an editorial reason. |

---

## Token reference

If a future component needs a motion spec, take values from this table — don't invent.

| Token | Value | Used for |
|---|---|---|
| `--motion-easing-primary` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | All three signature motions. |
| `--motion-duration-fast` | `200ms` | Card hover lift. |
| `--motion-duration-medium` | `280ms` | Page transition. |
| `--motion-duration-slow` | `600ms` | Reveal on scroll. |
| `--motion-reveal-distance` | `20px` | Reveal-on-scroll Y-offset. |
| `--motion-blur-page` | `6px` | Page-transition blur. |
| `--motion-hover-lift` | `-2px` | Hover-lift Y-offset. |

These are not (yet) CSS custom properties. They live in `main.css` literals. Codify as variables in P3 once the system has settled.

---

## Implementation files

| File | Role |
|---|---|
| `apps/web/assets/css/main.css` | All three motion definitions + reduced-motion overrides. |
| `apps/web/plugins/reveal.client.ts` | Vue directive `v-reveal` for §2 reveal-on-scroll. |
| `apps/web/nuxt.config.ts` | Page-transition wiring (already in place since P0.3). |
| `apps/web/components/feature-card.vue` | First card consumer of `.card-hover`. |

---

## Review trigger

Re-open this doc when any of the following happen:

1. A new component wants motion that doesn't fit one of the three signatures.
2. The identity refresh (P2.3) lands and motion needs to feel different.
3. A buyer or analyst gives feedback that the site feels "static" or "twitchy."
