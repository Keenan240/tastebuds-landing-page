/** Tunable intro timing, copy, and design tokens. */

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

/** Bowl starts tilted; first (leftmost) piece levels it. */
export const BOWL_START_TILT = 16;

export const FOOD_COUNT = 4;

/**
 * Drop order: orange/tomato first (leftmost) → levels the bowl,
 * then the rest fall into a straight bowl.
 */
export const FOOD_IDS = ['tomato', 'leek', 'radish', 'pepper'] as const;
export type FoodId = (typeof FOOD_IDS)[number];

export const DURATIONS = {
  /** First piece into the tilted bowl — snappier so the catch reads clearly */
  firstDrop: 620,
  /** Rest of pieces into the leveled bowl */
  restDrop: 580,
  restStagger: 85,
  /**
   * When the orange "hits" / bowl starts leveling, as a fraction of firstDrop.
   * Earlier than visual settle so leveling reads with the contact, not after.
   */
  impactAt: 0.48,
  /** Beat after level starts before the rest cascade in */
  holdAfterLevel: 90,
  holdAfterFull: 260,
  collapse: 420,
  holdEmpty: 360,
  /** Short beat with smile on but still buried, then rise */
  holdBeforePeek: 80,
  peek: 380,
  holdAfterPeek: 320,
  launch: 520,
} as const;

export const SPRINGS = {
  drop: { damping: 15, stiffness: 170, mass: 0.85 },
  /** Fast straighten on contact — no laggy pause after the hit */
  bowlLevel: { damping: 14, stiffness: 280, mass: 0.55 },
  peek: { damping: 20, stiffness: 120, mass: 1 },
  launch: { damping: 14, stiffness: 190, mass: 0.8 },
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
  foodCascadeGap: 140,
  logoPeekSize: 52,
  logoTopSize: 48,
  logoTopOffset: 52,
  logoFinalOffset: 44,
  hungryFontSize: 61,
  hungryLineHeight: 66,
} as const;

export const SMILE_ASPECT = 71 / 53;

export const FOOD_PEEK: Record<
  FoodId,
  { x: number; y: number; rotate: number; scale: number }
> = {
  // Smaller orange, tucked deeper so it doesn't crest the tilted rim
  tomato: { x: -58, y: 8, rotate: -8, scale: 0.72 },
  leek: { x: -6, y: -40, rotate: -36, scale: 1.05 },
  radish: { x: 34, y: -28, rotate: 20, scale: 1 },
  pepper: { x: 66, y: -8, rotate: 16, scale: 1.02 },
};

export const FOOD_START: Record<FoodId, { x: number; rotate: number }> = {
  tomato: { x: -40, rotate: -10 },
  leek: { x: -4, rotate: 20 },
  radish: { x: 8, rotate: 12 },
  pepper: { x: 20, rotate: -6 },
};
