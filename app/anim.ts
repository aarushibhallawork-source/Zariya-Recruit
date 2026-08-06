"use client";

import { useEffect, useState } from "react";
import type { Variants } from "motion/react";

/**
 * Expo-out. Decelerates hard, so movement reads as deliberate rather than
 * springy. Shared by every transition here — one curve is what makes the
 * separate elements feel like a single move.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Hero load sequence, in seconds. Read this as a timeline, top to bottom.
 * The headline leads; the nav follows rather than opening, so nothing moves
 * before the words do.
 */
export const CUE = {
  photo: 0,
  line1: 0,
  line2: 0.15, // 0.15s behind line 1 — enough to read as line-by-line
  nav: 0.35,
  sub: 0.9,
  eyebrow: 1.3,
} as const;

/* ---------------------------------------------------------------- hero */

export const photoFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 0.75, transition: { duration: 1.6, delay: CUE.photo, ease: EASE } },
};

export const photoZoom: Variants = {
  hidden: { scale: 1.06 },
  show: { scale: 1, transition: { duration: 1.6, delay: CUE.photo, ease: EASE } },
};

/** Descends from above the canvas edge. 1s exactly, per the brief's minimum. */
export const navDrop: Variants = {
  hidden: { opacity: 0, y: "-120rem" },
  show: {
    opacity: 1,
    y: "0rem",
    transition: { duration: 1, delay: CUE.nav, ease: EASE },
  },
};

/**
 * Masked line reveal, descending from above. Pairs with the `clip-path` on
 * `.heroHeadline h1`, which sits flush to the TOP edge (the ink starts ~12.7rem
 * below it, so ascenders clear) and runs long past the bottom so descenders
 * never clip. -115% rather than -100% keeps the incoming line behind that edge
 * with room to spare.
 */
export const lineReveal = (delay: number): Variants => ({
  hidden: { y: "-115%" },
  show: { y: "0%", transition: { duration: 1, delay, ease: EASE } },
});

/** Pure opacity. "Gentle appear" — deliberately without travel. */
export const fadeIn = (delay: number, duration = 1): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration, delay, ease: EASE } },
});

/** Small descent, sharing the nav's direction. */
export const dropSoft = (delay: number, y = "-24rem", duration = 0.8): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: "0rem", transition: { duration, delay, ease: EASE } },
});

/* -------------------------------------------------------- scroll reveals */

export const inView = { once: true, amount: 0.25 } as const;

/** Thin viewport margin for the 1px rules — `amount` is meaningless at that height. */
export const inViewLine = { once: true, amount: 0 } as const;

export const group = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const item: Variants = {
  hidden: { opacity: 0, y: "24rem" },
  show: { opacity: 1, y: "0rem", transition: { duration: 0.75, ease: EASE } },
};

export const lift: Variants = {
  hidden: { opacity: 0, y: "40rem" },
  show: { opacity: 1, y: "0rem", transition: { duration: 0.9, ease: EASE } },
};

/** Rules draw themselves: horizontals left-to-right, verticals top-to-bottom. */
export const wipeX: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } },
};

export const wipeY: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.1, ease: EASE } },
};

/* ------------------------------------------------------------------ gate */

/**
 * The fonts load with `display: block`, so text is invisible until they arrive.
 * Starting the timeline before that animates an empty stage, then pops. The
 * timeout is a safety net: a font that never resolves must not strand the page.
 */
export function useFontsReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let settled = false;
    const go = () => {
      if (!settled) {
        settled = true;
        setReady(true);
      }
    };

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(go);
    } else {
      go();
    }

    const timeout = setTimeout(go, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return ready;
}
