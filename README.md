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

Other motion: word-by-word blur-in on the hero, a self-typing code block that writes the six-step process out as real code, a scroll-drawn process spine, count-up metrics, magnetic buttons, and route transitions. All of it collapses under `prefers-reduced-motion` — the code block still appears, it just arrives instead of typing.

### Adding the portrait

**Save your photo as `public/portrait.png`.** It appears at 20% opacity behind the hero (right side) and behind the contact header — the two places a face earns its keep: hello and goodbye.

- **Cut out, transparent background.** The layer is sized with `contain` and edge-masked, so a cut-out composites cleanly on the dark page. A photo that still has its studio background works too — the mask dissolves the rectangle — but it lifts a faint haze where the backdrop used to be, so the cut-out is noticeably better.
- **Export around 900–1200px wide, under ~300KB.** It's a 20%-opacity grayscale backdrop, so quality demands are low and the file shouldn't be a megabyte.
- Portrait aspect (roughly 2:3) suits the layout best.

If the file isn't there the site renders exactly as it does now — the layer is a CSS background rather than an `<img>` specifically so a missing file degrades to nothing instead of a broken-image box. The trade is losing `next/image`'s automatic format conversion, which is why the export guidance above matters.

Tone is handled in CSS (`.portrait` in `globals.css`): desaturated to stay out of the orange palette's way, slightly brightened so dark hair doesn't sink into a dark page, and radially masked so the figure emerges from the page rather than sitting on it like a sticker.

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
