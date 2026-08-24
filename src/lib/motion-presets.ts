/**
 * Shared motion system — Emil Kowalski / Linear inspired.
 * Spring-based, subtle, expensive feeling.
 */
import type { Transition, Variants } from "framer-motion";

/** Primary smooth curve — matches Lenis scroll easing for cohesion */
export const smoothTransition: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

/** Snappy entrance — for hero copy, headlines */
export const snapTransition: Transition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1],
};

/** Soft spring — for hover lifts, chip pops */
export const softSpring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.6,
};

/** Hard spring — for icon micro-interactions */
export const tightSpring: Transition = {
  type: "spring",
  stiffness: 360,
  damping: 28,
  mass: 0.5,
};

export const smoothViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
} as const;

/** Staggered reveal — parent variant */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/** Fade-up child — pair with staggerParent */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Scale-in child — subtle */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
