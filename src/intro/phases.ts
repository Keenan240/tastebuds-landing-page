/** Tunable intro timing, copy, and design tokens. Swap values here to match design review. */

export const COLORS = {
  background: '#FDFBF4',
  brown: '#3D1F05',
  beige: '#E8DCC8',
  orange: '#E87722',
  chromeBg: 'rgba(255, 255, 255, 0.72)',
  chromeBorder: 'rgba(61, 31, 5, 0.08)',
  chromeIcon: '#8A8578',
  placeholder: '#B5B0A4',
} as const;

export const HUNGRY_TEXT = 'you hungryyyyyyyyyyyyyyyyyyyy?';

/** Bowl starts tilted clockwise (degrees). */
export const BOWL_START_TILT = 16;

export const FOOD_COUNT = 4;

/** Drop order matches screens: pepper first, then leek, tomato, radish (top of cascade). */
export const FOOD_IDS = ['pepper', 'leek', 'tomato', 'radish'] as const;
export type FoodId = (typeof FOOD_IDS)[number];

export const DURATIONS = {
  /** Per-food drop spring settle window */
  foodDrop: 720,
  foodStagger: 110,
  bowlStraighten: 380,
  holdAfterStraighten: 280,
  collapse: 560,
  holdAfterPeek: 360,
  launch: 560,
  holdAfterLaunch: 220,
  typeChar: 42,
  holdAfterType: 280,
  soften: 480,
  holdAfterSoften: 240,
  handoff: 620,
} as const;

export const SPRINGS = {
  drop: { damping: 14, stiffness: 160, mass: 0.9 },
  bowl: { damping: 16, stiffness: 180, mass: 0.85 },
  peek: { damping: 15, stiffness: 170, mass: 0.8 },
  launch: { damping: 13, stiffness: 200, mass: 0.75 },
  soft: { damping: 20, stiffness: 140, mass: 1 },
} as const;

/** Layout anchors as fractions of screen height / fixed sizes. */
export const LAYOUT = {
  bowlWidth: 220,
  bowlHeight: 110,
  bowlBottomRatio: 0.38,
  foodSize: 72,
  logoPeekSize: 56,
  logoTopSize: 48,
  logoFinalSize: 36,
  logoTopOffset: 56,
  logoFinalOffset: 48,
  hungryFontSize: 42,
  hungryLineHeight: 48,
} as const;

/**
 * Final peek positions relative to bowl rim center (x, y above rim).
 * y is negative = above the rim.
 */
export const FOOD_PEEK: Record<
  FoodId,
  { x: number; y: number; rotate: number; scale: number }
> = {
  pepper: { x: 48, y: -28, rotate: 18, scale: 0.55 },
  leek: { x: -8, y: -46, rotate: -28, scale: 0.62 },
  tomato: { x: -42, y: -22, rotate: -12, scale: 0.5 },
  radish: { x: 18, y: -36, rotate: 22, scale: 0.48 },
};

/** Starting off-screen drop offsets (above bowl), staggered vertically. */
export const FOOD_START: Record<
  FoodId,
  { x: number; y: number; rotate: number }
> = {
  pepper: { x: 8, y: -420, rotate: -12 },
  leek: { x: -6, y: -520, rotate: 25 },
  tomato: { x: 4, y: -620, rotate: -8 },
  radish: { x: -10, y: -720, rotate: 15 },
};
