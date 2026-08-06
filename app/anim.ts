"use client";

import { useEffect, useState } from "react";
import type { Variants } from "motion/react";

/**
 * Expo-out. Decelerates hard, so movement reads as deliberate rather than
 * springy. Shared by every transition here — one curve is what makes the
 * separate elements feel like a single move.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Hero load sequence, in seconds. Read this as a timeline, top to bottom. */
export const CUE = {
  photo: 0,
  nav: 0.1,
  eyebrow: 0.45,
  line1: 0.65,
  line2: 0.8, // 0.15s behind line 1 — enough to read as line-by-line
  sub: 1.15,
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
 * Masked line reveal. Pairs with the `clip-path` on `.heroHeadline h1`, which
 * runs 6rem past the bottom edge to protect descenders — hence 115% rather than
 * the usual 100%, so the line still starts out of sight behind that edge.
 */
export const lineReveal = (delay: number): Variants => ({
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.9, delay, ease: EASE } },
});

export const riseIn = (delay: number, y = "12rem", duration = 0.7): Variants => ({
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
