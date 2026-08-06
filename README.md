# Zariya Recruit — Landing Page

**Live: https://zariya-recruit.vercel.app**

Pixel-exact implementation of two stacked Figma frames, both 1812 wide:

| Frame | Height | Content |
| ----- | ------ | ------- |
| [`725-8078`](https://www.figma.com/design/dmDyjMYMxUyPJGqsfIk6zO/Zariya-Recruit-%F0%9F%9A%A7?node-id=725-8078&m=dev) | 3077 | Hero, credibility strip, "doesn't scale" |
| [`725-8510`](https://www.figma.com/design/dmDyjMYMxUyPJGqsfIk6zO/Zariya-Recruit-%F0%9F%9A%A7?node-id=725-8510&m=dev) | 1424 | "Your Entire Hiring Stack" + tabs + panel |

Canvas total: **1812 x 4501**. `.stack` carries the 3077 offset, so everything
inside it uses frame `725-8510`'s own coordinates straight from Figma.

To run it locally:

```bash
npm install && npm run dev
```

There is no `.html` file to open — Next.js generates the HTML from
[`app/page.tsx`](app/page.tsx). Opening a built file over `file://` won't work either,
since the asset URLs are absolute; use the dev server or the live link above.

## Deployment

Hosted on Vercel (project `zariya-recruit`), which runs Next.js natively at the domain
root, so `next.config.ts` needs no configuration at all:

```bash
npx vercel --prod
```

Fonts load through `next/font/local` in [`app/layout.tsx`](app/layout.tsx) rather than
hand-written `@font-face`, so Next fingerprints them and emits the right URLs.

## How the design maps to the code

- [`app/page.tsx`](app/page.tsx) — markup, one block per Figma frame.
- [`app/landing.css`](app/landing.css) — all layout, positioned absolutely with the exact
  Figma coordinates.
- [`app/globals.css`](app/globals.css) — reset + the scaling rule.
- [`app/layout.tsx`](app/layout.tsx) — font loading.

### The `1rem === 1 Figma pixel` rule

`app/globals.css` sets:

```css
html { font-size: min(1px, calc(100vw / 1812)); }
```

so every value in `landing.css` can be copied straight out of Figma (`68px` → `68rem`),
and the whole page scales proportionally on viewports narrower than 1812px. Hairline
borders stay in real `px` so they don't get floored to half a device pixel on HiDPI
screens; the padding around them is reduced by 1 to compensate, matching Figma's
inside-stroke rendering.

Line heights are pinned to the text-box heights Figma reports rather than
`line-height: normal`, which drifts ~0.5px per line:

| font-size | line-height |
| --------- | ----------- |
| 68        | 77          |
| 20        | 27          |
| 18        | 24          |
| 16        | 22          |

Figma's 22 and 24 steps were dropped to 20 by request, so the scale no longer has them —
their leading moved to 27 to keep the ~1.35 ratio the design uses. Two blocks reflowed as
a result: `.problemCards` sits 3px higher and `.tabRow` 6px higher, both because the text
above them is shorter. That's the same way the Figma auto-layout would respond.

`.panelBody` and `.step p` later went to 18/24, following an updated `727:9470`. The steps
resize themselves with it (82 tall rather than 85, so the column is 400 rather than 412) —
those heights come from the content, not from hard-coded values.

## Fonts

`app/fonts/` holds **GT Alpina Trial** (Standard Bold + Standard Medium Italic) and
**General Sans** (Regular / Medium / Semibold), loaded through `next/font/local`.

> GT Alpina is a **trial** licence. Swap in the licensed cuts before this ships.

## Assets

All artwork in `public/assets/` is exported from the Figma node — nothing is a stand-in.

The two photographs are WebP, re-encoded from the Figma PNGs (3.7MB → 365KB, -90%):

| File            | Source                | Shipped                    |
| --------------- | --------------------- | -------------------------- |
| `hero-bg.webp`  | 1672 × 941 PNG, 2.6MB | same size, q82, 209KB      |
| `dashboard.webp`| 4096 × 3001 PNG, 1.2MB| 2400 × 1758, q92, 151KB    |

The dashboard is downscaled because it only ever renders ~1195 CSS px wide — 2400px
covers a 2× display exactly, and 4096 was wasted bytes. It's held at q92 rather than the
q82 used for the photo because it's full of small UI text, where WebP artefacts show.
Measured against the original at display resolution: RMSE 2.22/255.

`isb-logo.svg` is the one composite: Figma ships the ISB mark as **seven** separate
vectors positioned by percentage inset inside a 110 × 53 box. They're flattened into a
single file, each nested at its computed `x/y/width/height`, so the markup needs only one
`<img>`. To regenerate it, re-export the seven vectors and re-run the composition with the
insets recorded in the Figma node (`725:8124` … `725:8130`).

Two values live in CSS rather than as images, taken from the exported vectors:

- eyebrow dot → `#e7b275` (amber — notably *not* the cream used for the text)
- grid rules → `#6b5b54`, 1px

### Grid rules

Five 1px strokes, all `#6b5b54`, rendered as `div`s rather than images and painted last
to match Figma's layer order:

| Class     | Figma node  | Position                        |
| --------- | ----------- | ------------------------------- |
| `.ruleH1` | `736:85351` | y 2279 — divider under the shot |
| `.ruleH2` | `736:85352` | y 2355.227 — band top           |
| `.ruleH3` | `736:85353` | y 3012.907 — band bottom        |
| `.ruleV1` | `727:9385`  | x 118.218, y 2356, h 656.877    |
| `.ruleV2` | `727:9386`  | x 1697, y 2356, h 657.385       |

The horizontals span the full 1812 frame; the verticals start at y 2356, so they sit
0.773px below `.ruleH2`. That gap is in the design — don't "fix" it.

The nav arrow is a 12.375px vector centred in a 22px slot (Figma inset 21.87%), not a
22px icon — scaling it to fill the slot makes it ~78% too large.

`panel-blob.svg` is 493 x 493 for a 193px circle — it carries 150px of Gaussian blur
padding per side. Position it by the blurred box, not the circle.

### Two different rule strokes

Don't unify these; the design uses both:

| Where | Colour |
| ----- | ------ |
| `.rule` (frame 725-8078, all five) | `#6b5b54` |
| `.stackRuleH` (frame 725-8510, horizontals) | `rgba(255,255,255,.2)` |
| `.stackRail` (frame 725-8510, verticals) | `#6b5b54` |

## Animation

[`app/anim.ts`](app/anim.ts) holds the whole motion system. One expo-out curve
(`[0.16, 1, 0.3, 1]`) is shared throughout — that's what makes separate elements read as
one move rather than several.

The hero plays a single timeline on load, held in `CUE`. The headline leads and the nav
follows, so nothing moves before the words do:

| Cue | Element | Motion | Duration |
| --- | ------- | ------ | -------- |
| 0.00 | Headline line 1 | masked, descends from above | 1.0s |
| 0.15 | Headline line 2 | masked, descends from above | 1.0s |
| 0.35 | Nav | descends from above the canvas | 1.0s |
| 0.90 | Sub-copy | pure opacity, no travel | 1.0s |
| 1.30 | Eyebrow pill | descends 24 | 0.8s |

Everything else reveals on scroll via `whileInView` with `once: true`.

### The headline mask

Lines descend from behind the **top** edge of their `h1`. That edge is a `clip-path`, not
`overflow: hidden`, for two reasons: clip-path doesn't affect layout, and it can be pushed
past the box on the other sides. The bottom runs 40 long because the 77 line box leaves the
descenders in "your" only ~1.4 of clearance, which `overflow: hidden` would shave.

Measured against the live render: ascenders clear the top edge by 12.72 (italic included),
and the incoming line sits 11.55 above it before it starts. Both margins have to hold at
once — that's the constraint the mask is solving.

If you flip the direction back, the clip edges swap with it: entering from below needs the
clip on the bottom and the start at `+115%`.

Only `transform` and `opacity` animate, so the resting layout is exactly the measured
design. `prefers-reduced-motion` renders that resting state with no movement, and a
`<noscript>` block does the same if JS never arrives.

## The tab row is not interactive

Figma designs a single panel state — AI Interviews, with the cream cap on tab 1. Copy for
the other four panels doesn't exist in the frame, so the tabs render as designed and don't
switch. `TABS` / `STEPS` in [`app/page.tsx`](app/page.tsx) are already data-driven; wiring
this up needs panel copy for the remaining four, not a refactor.

A "Screening Calls" panel does exist off-artboard (node `728:9548`) with its own copy, but
it sits at different dimensions (40 vs 57 padding, 290 vs 272 step width) and repeats the
AI Interviews steps verbatim, so it reads as an earlier exploration rather than final.

Figma also reuses one icon export across the first three tabs. That repetition is in the
design, not a mistake in the code.

## Known deltas from Figma

`.badgeRow` renders ~3px narrower than Figma's 1120.679px. This is glyph-advance
difference between Figma's text engine and the browser accumulating across the three
labels ("Built at" measures 58.2px vs Figma's 59, etc.). Closing it would mean forcing
`letter-spacing` on the labels, which distorts the type for less than a pixel each — so
it's left alone. Every other block sits within ~1px of the design.
