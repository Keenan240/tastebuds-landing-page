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

/** Kept for Part 2 hero — not used in the bowl intro. */
export const HUNGRY_LINES = [
  'you hungry',
  'yyyyyyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyyy?',
] as const;
export const HUNGRY_TEXT = HUNGRY_LINES.join('\n');

/** Starting tilt — settles step-by-step as each piece lands. */
export const BOWL_START_TILT = 16;

export const FOOD_COUNT = 4;

export const FOOD_IDS = ['pepper', 'leek', 'tomato', 'radish'] as const;
export type FoodId = (typeof FOOD_IDS)[number];

/**
 * Target bowl angle after each landing (one spring per hit — no kick/settle fight).
 * Timed when the drop visually bottoms out.
 */
export const BOWL_SETTLE_AFTER_HIT = [11, 6, 2, 0] as const;

export const DURATIONS = {
  foodDrop: 920,
  foodStagger: 150,
  /** When the piece hits relative to its drop spring start */
  impactAt: 0.72,
  holdAfterFull: 320,
  collapse: 480,
  holdEmpty: 400,
  peek: 420,
  holdAfterPeek: 360,
  launch: 580,
} as const;

export const SPRINGS = {
  drop: { damping: 14, stiffness: 115, mass: 1.05 },
  bowlSettle: { damping: 18, stiffness: 140, mass: 1 },
  peek: { damping: 18, stiffness: 130, mass: 0.95 },
  launch: { damping: 13, stiffness: 200, mass: 0.75 },
} as const;

export const IPHONE = {
  width: 390,
  height: 844,
  radius: 44,
} as const;

export const LAYOUT = {
  bowlWidth: 248,
  bowlHeight: 124,
  bowlBottomRatio: 0.32,
  foodSize: 120,
  foodCascadeGap: 130,
  logoPeekSize: 52,
  logoTopSize: 48,
  logoTopOffset: 52,
  hungryFontSize: 61,
  hungryLineHeight: 66,
} as const;

export const SMILE_ASPECT = 71 / 53;

export const FOOD_PEEK: Record<
  FoodId,
  { x: number; y: number; rotate: number; scale: number }
> = {
  tomato: { x: -62, y: -6, rotate: -12, scale: 1 },
  leek: { x: -10, y: -48, rotate: -38, scale: 1.08 },
  radish: { x: 32, y: -34, rotate: 22, scale: 1.02 },
  pepper: { x: 68, y: -10, rotate: 18, scale: 1.05 },
};

export const FOOD_START: Record<FoodId, { x: number; rotate: number }> = {
  pepper: { x: 6, rotate: -8 },
  leek: { x: -4, rotate: 24 },
  tomato: { x: 2, rotate: -6 },
  radish: { x: -8, rotate: 14 },
};
