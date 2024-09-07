/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      mono: ['var(--font-mono)', 'PT Mono', 'Roboto Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.625rem', '.95rem'],
      sm: ['0.75rem', '1rem'],
      base: ['0.875rem', '1.35rem'],
    },
    extend: {
      boxShadow: {
        highlight: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      screens: {
        narrow: { raw: '(max-aspect-ratio: 3 / 2)' },
        wide: { raw: '(min-aspect-ratio: 3 / 2)' },
        'taller-than-854': { raw: '(min-height: 854px)' },
      },
    },
  },
  plugins: [],
}
