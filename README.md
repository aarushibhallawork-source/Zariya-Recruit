# Zariya Recruit — Landing Page

Pixel-exact implementation of the Figma frame
[`725-8078`](https://www.figma.com/design/dmDyjMYMxUyPJGqsfIk6zO/Zariya-Recruit-%F0%9F%9A%A7?node-id=725-8078&m=dev)
(design frame: **1812 × 3077**).

```bash
npm run dev
```

## How the design maps to the code

- [`app/page.tsx`](app/page.tsx) — markup, one block per Figma frame.
- [`app/landing.css`](app/landing.css) — all layout, positioned absolutely with the exact
  Figma coordinates.
- [`app/globals.css`](app/globals.css) — fonts + the scaling rule.

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
| 22        | 30          |
| 20        | 27          |
| 18        | 24          |
| 16        | 22          |

## Fonts

`public/fonts/` holds **GT Alpina Trial** (Standard Bold + Standard Medium Italic) and
**General Sans** (Regular / Medium / Semibold), copied from the local font library.

> GT Alpina is a **trial** licence. Swap in the licensed cuts before this ships.

## Assets

All artwork in `public/assets/` is exported from the Figma node — nothing is a stand-in.

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

## Known deltas from Figma

`.badgeRow` renders ~3px narrower than Figma's 1120.679px. This is glyph-advance
difference between Figma's text engine and the browser accumulating across the three
labels ("Built at" measures 58.2px vs Figma's 59, etc.). Closing it would mean forcing
`letter-spacing` on the labels, which distorts the type for less than a pixel each — so
it's left alone. Every other block sits within ~1px of the design.
