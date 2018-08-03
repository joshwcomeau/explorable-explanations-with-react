// @flow
import type { WaveformShape } from '../types';

// Logic
export const WAVEFORM_ASPECT_RATIO = 0.5;
export const DEFAULT_WAVEFORM_SHAPE = 'sine';
export const DEFAULT_WAVEFORM_SIZE = 200;
export const DEFAULT_WAVEFORM_NUM_OF_CYCLES = 1;
export const DEFAULT_WAVEFORM_AMPLITUDE = 1;

export const SHAPES: Array<WaveformShape> = [
  'sine',
  'triangle',
  'square',
  'sawtooth',
];

export const SPRING_SETTINGS = {
  stiffness: 170,
  damping: 26,
};

type Colors = {
  [color: string]: { [label: string | number]: string } | string,
};
export const COLORS: Colors = {
  red: {
    '100': '#FFCDD2',
    '300': '#E57373',
    '500': '#F44336',
    '700': '#D32F2F',
    '900': '#B71C1C',
  },
  orange: {
    '100': '#FFECB3',
    '300': '#FFD54F',
    '500': '#FFC107',
    '700': '#FFA000',
    '900': '#ee7314',
  },
  yellow: {
    '100': '#FFF9C4',
    '300': '#FFF176',
    '500': '#FFEB3B',
    '700': '#FBC02D',
    '900': '#F57F17',
  },
  green: {
    '100': '#DCEDC8',
    '300': '#AED581',
    '500': '#8BC34A',
    '700': '#689F38',
    '900': '#33691E',
  },
  indigo: {
    '100': '#b3defc',
    '300': '#4f9ef7',
    '500': '#0380f4',
    '700': '#0268d1',
    '900': '#01499b',
  },
  blue: {
    '100': '#B3E5FC',
    '300': '#4FC3F7',
    '500': '#3f6cff',
    '700': '#304FFE',
    '900': '#151942',
  },
  purple: {
    '100': '#E1BEE7',
    '300': '#BA68C8',
    '500': '#9C27B0',
    '700': '#7B1FA2',
    '900': '#4A148C',
  },
  pink: {
    '100': '#F8BBD0',
    '300': '#F06292',
    '500': '#E91E63',
    '700': '#C2185B',
    '900': '#880E4F',
  },
  gray: {
    '50': '#f8f8f8',
    '100': '#f2f2f2',
    '200': '#eaeaea',
    '300': '#cccccc',
    '400': '#aaaaaa',
    '500': '#888888',
    '600': '#666666',
    '700': '#444444',
    '800': '#2A2A2A',
    '900': '#111111',
  },
  cream: {
    '50': '#FFFEFC',
  },
  white: '#FFFFFF',
};

COLORS.primary = COLORS.indigo;
COLORS.secondary = COLORS.pink;
COLORS.tertiary = COLORS.orange;

// Media queries
export const BREAKPOINT_SIZES = {
  xs: 320,
  sm: 540,
  md: 900,
  lg: 1100,
  xl: 1440,
};

export const BREAKPOINTS = {
  xs: `(max-width: ${BREAKPOINT_SIZES.xs}px)`,
  sm: `(max-width: ${BREAKPOINT_SIZES.sm}px)`,
  md: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
  lg: `(max-width: ${BREAKPOINT_SIZES.lg}px)`,
  xl: `(max-width: ${BREAKPOINT_SIZES.xl}px)`,
  xsMin: `(min-width: ${BREAKPOINT_SIZES.xs}px)`,
  smMin: `(min-width: ${BREAKPOINT_SIZES.sm}px)`,
  mdMin: `(min-width: ${BREAKPOINT_SIZES.md}px)`,
  lgMin: `(min-width: ${BREAKPOINT_SIZES.lg}px)`,
  xlMin: `(min-width: ${BREAKPOINT_SIZES.xl}px)`,
  desktop: `(min-width: ${BREAKPOINT_SIZES.sm + 1}px)`,
};

export const MAX_WIDTH = {
  sm: '100%',
  md: BREAKPOINT_SIZES.md + 'px',
  base: BREAKPOINT_SIZES.lg + 'px',
};

const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i;
export const IS_MOBILE_USER_AGENT = mobileRegex.test(navigator.userAgent);
