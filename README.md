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

Motion: word-by-word blur-in on the hero, a pointer-parallax node field, a scroll-drawn process spine, count-up metrics, magnetic buttons, cursor spotlight, and route transitions. All of it collapses under `prefers-reduced-motion`.

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
