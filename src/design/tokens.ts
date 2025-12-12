export const colors = {
  black: '#0A0A0A',
  charcoal: '#1A1A1A',
  charcoalLight: '#2A2A2A',
  grey: '#3A3A3A',
  greyMedium: '#6A6A6A',
  greyLight: '#9A9A9A',
  beige: '#E8E4DF',
  beigeLight: '#F5F3F0',
  offWhite: '#FAFAF8',
  white: '#FFFFFF',
  accent: '#C9B896',
} as const;

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
  '3xl': '6rem',   // 96px
  '4xl': '8rem',   // 128px
  '5xl': '12rem',  // 192px
  '6xl': '16rem',  // 256px
} as const;

export const fonts = {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
} as const;

export const fontSizes = {
  hero: 'clamp(3rem, 8vw, 7rem)',
  h1: 'clamp(2.5rem, 6vw, 5rem)',
  h2: 'clamp(2rem, 4vw, 3.5rem)',
  h3: 'clamp(1.5rem, 3vw, 2.5rem)',
  bodyLg: '1.25rem',
  body: '1rem',
  bodySm: '0.875rem',
} as const;

export const radii = {
  none: '0',
  sm: '0.125rem',
  md: '0.25rem',
  lg: '0.5rem',
} as const;

export const transitions = {
  fast: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  slower: '600ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const containerWidths = {
  full: '100%',
  container: '1440px',
  content: '1200px',
  narrow: '800px',
} as const;
