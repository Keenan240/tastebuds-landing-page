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

export const HUNGRY_TEXT = 'you hungryyyyyyyyyyyyyyyyyyyy?';

/** Bowl starts tilted clockwise (degrees). */
export const BOWL_START_TILT = 16;

export const FOOD_COUNT = 4;

/** Drop order: pepper first (lowest), then leek, tomato, radish (top of cascade). */
export const FOOD_IDS = ['pepper', 'leek', 'tomato', 'radish'] as const;
export type FoodId = (typeof FOOD_IDS)[number];

export const DURATIONS = {
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
  bowlWidth: 200,
  bowlHeight: 100,
  bowlBottomRatio: 0.34,
  foodSize: 58,
  /** Smile mark width; height = width * SMILE_ASPECT */
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
 * Landed peek offsets relative to rim anchor.
 * y negative = above rim; bottoms still sit behind the bowl.
 */
export const FOOD_PEEK: Record<
  FoodId,
  { x: number; y: number; rotate: number; scale: number }
> = {
  pepper: { x: 36, y: -18, rotate: 14, scale: 0.92 },
  leek: { x: -6, y: -34, rotate: -32, scale: 0.95 },
  tomato: { x: -34, y: -14, rotate: -10, scale: 0.88 },
  radish: { x: 14, y: -28, rotate: 18, scale: 0.9 },
};

export const FOOD_START: Record<
  FoodId,
  { x: number; y: number; rotate: number }
> = {
  pepper: { x: 4, y: -380, rotate: -10 },
  leek: { x: -4, y: -480, rotate: 22 },
  tomato: { x: 2, y: -580, rotate: -6 },
  radish: { x: -6, y: -680, rotate: 12 },
};
