/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Custom dark mode color palette
      colors: {
        dark: {
          primary: '#0F172A',    // slate-900
          secondary: '#1E293B',  // slate-800
          tertiary: '#334155',   // slate-700
          quaternary: '#475569', // slate-600
        }
      },
      // Custom animations for theme transitions
      transitionProperty: {
        'colors-transform': 'color, background-color, border-color, text-decoration-color, fill, stroke, transform',
      }
    },
  },
  plugins: [],
};