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

/** Top-to-bottom cascade entrance for landing pieces. */
export const ENTRANCE = {
  duration: 560,
  /** ms between each successive piece */
  stagger: 78,
  /** px the piece rises while fading in */
  rise: 14,
} as const;
