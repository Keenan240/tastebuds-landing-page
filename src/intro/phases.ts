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
  desktopBackdrop: '#E8E4D9',
} as const;

/**
 * Exactly 3 lines: "you hungry" on line 1, then y's wrapping to lines 2–3.
 * Wide enough at 61px Urbanist to bleed past the phone edges.
 */
export const HUNGRY_LINES = [
  'you hungry',
  'yyyyyyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyyy?',
] as const;

export const HUNGRY_TEXT = HUNGRY_LINES.join('\n');

/** Bowl starts tilted clockwise (degrees). */
export const BOWL_START_TILT = 16;

export const FOOD_COUNT = 4;

/** Drop order: pepper first (lowest), then leek, tomato, radish (top of cascade). */
export const FOOD_IDS = ['pepper', 'leek', 'tomato', 'radish'] as const;
export type FoodId = (typeof FOOD_IDS)[number];

export const DURATIONS = {
  foodDrop: 780,
  foodStagger: 130,
  bowlStraighten: 380,
  holdAfterStraighten: 280,
  collapse: 560,
  holdAfterPeek: 360,
  launch: 560,
  holdAfterLaunch: 220,
  typeChar: 38,
  holdAfterType: 280,
  soften: 480,
  holdAfterSoften: 240,
  handoff: 620,
} as const;

export const SPRINGS = {
  drop: { damping: 13, stiffness: 150, mass: 0.95 },
  bowl: { damping: 16, stiffness: 180, mass: 0.85 },
  peek: { damping: 15, stiffness: 170, mass: 0.8 },
  launch: { damping: 13, stiffness: 200, mass: 0.75 },
  soft: { damping: 20, stiffness: 140, mass: 1 },
} as const;

/** iPhone 14/15 logical frame used for desktop preview shell. */
export const IPHONE = {
  width: 390,
  height: 844,
  radius: 44,
} as const;

/**
 * Layout for a ~390pt-wide phone. Figma hungry type: Urbanist Semibold 61.
 * Smile asset native ratio is 53×71 — always scale with that aspect.
 */
export const LAYOUT = {
  bowlWidth: 248,
  bowlHeight: 124,
  bowlBottomRatio: 0.32,
  /** Large food — packed into the bowl with overlap, no gaps */
  foodSize: 120,
  logoPeekSize: 52,
  logoTopSize: 44,
  logoFinalSize: 32,
  logoTopOffset: 52,
  logoFinalOffset: 44,
  hungryFontSize: 61,
  hungryLineHeight: 66,
} as const;

/** smile.png / mark aspect: height / width */
export const SMILE_ASPECT = 71 / 53;

/**
 * Landed nest positions — overlapping across the rim so the bowl looks full.
 * y negative = above rim; lower half sits behind the bowl.
 */
export const FOOD_PEEK: Record<
  FoodId,
  { x: number; y: number; rotate: number; scale: number }
> = {
  tomato: { x: -62, y: -6, rotate: -12, scale: 1 },
  leek: { x: -10, y: -48, rotate: -38, scale: 1.08 },
  radish: { x: 32, y: -34, rotate: 22, scale: 1.02 },
  pepper: { x: 68, y: -10, rotate: 18, scale: 1.05 },
};

/** Cascade from above the top of the screen into the bowl (column drop). */
export const FOOD_START: Record<
  FoodId,
  { x: number; y: number; rotate: number }
> = {
  pepper: { x: 6, y: -420, rotate: -8 },
  leek: { x: -4, y: -560, rotate: 24 },
  tomato: { x: 2, y: -700, rotate: -6 },
  radish: { x: -8, y: -840, rotate: 14 },
};
