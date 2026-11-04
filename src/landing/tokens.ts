/** Part 2 landing tokens from Figma. */

export const LANDING = {
  bg: '#FBFCEE',
  cream: '#FCFAEE',
  cocoa: '#421C00',
  carrot: '#E17426',
  carrotShadow: '#C7641D',
  chestnut: '#A14E13',
  grey: '#949494',
  beige: '#F0E9CF',
  pistachio: '#BFD3AA',
  black: '#323232',
  chipBg: '#FFFEF8',
  peachBand: '#F7E4CF',
  buttonBorder: '#CCC1A0',
  openGreen: '#6B705C',
} as const;

/** Landing entrance motion. */
export const ENTRANCE = {
  duration: 560,
  /** ms between eager (above-the-fold) pieces */
  stagger: 70,
  /** px the piece rises while fading in */
  rise: 14,
  /** fraction of viewport height — reveal when element crosses this line */
  revealAt: 0.88,
} as const;
