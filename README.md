# personalwebsite

Personal portfolio for Sabir Ud Din — built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## The idea

Most portfolios dump everything on one scrolling page and let the visitor sort it out. This one is a **guided sequence** instead: seven pages, one idea each, with a Next button captioned by the question the following page answers. A visitor can land on page one and keep pressing forward without ever deciding where to go.

```
/           An engineer who thinks in systems.   ← the whole first page
/thinking   Six mental models I bring to every system
/process    How a vague request becomes production software
/work       Where I've done it — roles, toolkit, education
/projects   What I've built — problem, solution, measurable outcome
/why-me     Six claims, each backed by evidence
/contact    How to start
```

Navigation is by Next/Back buttons, the left progress rail, or the ← → arrow keys.

## Design notes

Dark warm-black canvas with a single orange accent (`#ff6a1a`). A few deliberate choices:

- **One idea per page** keeps cognitive load low — the reason the hero carries nothing but the headline.
- **The progress rail** shows position in a seven-step sequence, so leaving early feels like an unfinished thing.
- **Accent colour is rationed** to the one word or number that matters on each screen, so it never stops meaning "look here".
- **Every claim carries proof.** The why-me page pairs each assertion with a specific number or shipped project, because unfalsifiable adjectives are what makes most portfolios interchangeable.

**Readability** is held deliberately high for a dark theme: body copy sits at 15px minimum and every text token clears WCAG AAA (7:1) against both the page and card backgrounds — `muted` at 9.4:1, `muted-strong` at 13.5:1. Mono micro-labels are 12px with opened tracking; below that they stop being readable and start being texture.

### The pointer field

The background is a live network (`src/components/interactive-field.tsx`) in which **the pointer is a node, not a spectator**. Move, and the nearest nodes link to you, brighten, and drift your way. Click, and the network takes the shock — a ripple expands and pushes nodes outward. It's the site's one sentence rendered as behaviour rather than decoration, and it runs on every page.

Canvas rather than SVG, because this draws several hundred lines per frame; as DOM nodes that would be thousands of style recalculations. It caps particle count by viewport area, pauses on hidden tabs, and degrades to a single static frame under `prefers-reduced-motion`.

A ring also trails the pointer and opens over anything clickable. The native cursor is deliberately left visible — a replaced cursor that lags even slightly makes precise clicking feel broken.

Other motion: word-by-word blur-in on the hero, a scroll-drawn process spine, count-up metrics, magnetic buttons, and route transitions. All of it collapses under `prefers-reduced-motion`.

## The chat assistant

The floating chat answers questions about my experience, stack, process, and availability. It runs **entirely in the browser against a fixed knowledge base** (`src/lib/chat-knowledge.ts`) — there is no model behind it, by design. Every answer is one I'd actually give, so it can't hallucinate a project I never built or quote a rate I never agreed to. Matching is weighted keyword scoring; unmatched questions say so and point to email rather than guessing.

## Structure

```
src/
  app/            one route per journey step, plus template.tsx for transitions
  components/     shared UI and motion primitives
  lib/
    profile.ts    single source of truth for all CV content
    journey.ts    the page sequence
    chat-knowledge.ts
```

Content lives in `src/lib/profile.ts` — edit it there and every page updates.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```
