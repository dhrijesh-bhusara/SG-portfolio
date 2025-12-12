/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0A0A0A',
          charcoal: '#1A1A1A',
          'charcoal-light': '#2A2A2A',
          grey: '#3A3A3A',
          'grey-medium': '#6A6A6A',
          'grey-light': '#9A9A9A',
          beige: '#E8E4DF',
          'beige-light': '#F5F3F0',
          'off-white': '#FAFAF8',
          white: '#FFFFFF',
          accent: '#C9B896',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h2': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3' }],
        'body-lg': ['1.25rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      maxWidth: {
        'container': '1440px',
        'content': '1200px',
        'narrow': '800px',
      },
      borderRadius: {
        'luxury': '0.125rem',
      },
      boxShadow: {
        'luxury': '0 4px 40px rgba(0, 0, 0, 0.08)',
        'luxury-lg': '0 8px 60px rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
