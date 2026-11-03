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

/** Kept for Part 2 hero — not used in the bowl intro anymore. */
export const HUNGRY_LINES = [
  'you hungry',
  'yyyyyyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyyy?',
] as const;
export const HUNGRY_TEXT = HUNGRY_LINES.join('\n');

/** Bowl rests slightly tilted before the first hit. */
export const BOWL_START_TILT = 10;

export const FOOD_COUNT = 4;

/** Drop order: pepper first (lowest), then leek, tomato, radish (highest / last). */
export const FOOD_IDS = ['pepper', 'leek', 'tomato', 'radish'] as const;
export type FoodId = (typeof FOOD_IDS)[number];

/**
 * Per-hit bowl kick then settle (degrees). Last settle is level.
 * Timed to land roughly when each springy drop bottoms out.
 */
export const BOWL_IMPACTS: { kick: number; settle: number }[] = [
  { kick: 20, settle: 12 },
  { kick: -10, settle: 6 },
  { kick: 14, settle: 3 },
  { kick: -6, settle: 0 },
];

export const DURATIONS = {
  foodDrop: 900,
  foodStagger: 140,
  /** Fraction of foodDrop when the piece "hits" the bowl */
  impactAt: 0.58,
  holdAfterStraighten: 280,
  collapse: 480,
  holdEmpty: 420,
  peek: 480,
  holdAfterPeek: 380,
  launch: 560,
  holdAfterLaunch: 200,
  handoff: 520,
} as const;

export const SPRINGS = {
  drop: { damping: 14, stiffness: 120, mass: 1.05 },
  bowlKick: { damping: 11, stiffness: 260, mass: 0.7 },
  bowlSettle: { damping: 14, stiffness: 160, mass: 0.9 },
  peek: { damping: 16, stiffness: 140, mass: 0.9 },
  launch: { damping: 13, stiffness: 200, mass: 0.75 },
  soft: { damping: 20, stiffness: 140, mass: 1 },
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
  /** Vertical gap between cascading items while off-screen / falling */
  foodCascadeGap: 130,
  logoPeekSize: 52,
  logoTopSize: 44,
  logoFinalSize: 32,
  logoTopOffset: 52,
  logoFinalOffset: 44,
  hungryFontSize: 61,
  hungryLineHeight: 66,
} as const;

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

/** Horizontal / rotation only — vertical start is computed from viewport height. */
export const FOOD_START: Record<
  FoodId,
  { x: number; rotate: number }
> = {
  pepper: { x: 6, rotate: -8 },
  leek: { x: -4, rotate: 24 },
  tomato: { x: 2, rotate: -6 },
  radish: { x: -8, rotate: 14 },
};
