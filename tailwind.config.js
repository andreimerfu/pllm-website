/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Brand color palette (indigo-based, replaces heavy blue-purple gradients)
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Accent palette (teal-based for highlights)
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Surface colors for backgrounds
        surface: {
          DEFAULT: '#ffffff',
          elevated: '#f8fafc',
          muted: '#f1f5f9',
        },
        // Status colors
        status: {
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
        // Legacy dark colors (keeping for compatibility)
        dark: {
          primary: '#0F172A',
          secondary: '#1E293B',
          tertiary: '#334155',
          quaternary: '#475569',
        }
      },

      // Typography scale
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'section': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'section-sm': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },

      // Shadow scale (subtle, modern)
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-hover': '0 4px 12px -2px rgb(0 0 0 / 0.12), 0 2px 6px -2px rgb(0 0 0 / 0.08)',
        'elevated': '0 8px 24px -4px rgb(0 0 0 / 0.12), 0 4px 8px -4px rgb(0 0 0 / 0.08)',
      },

      // Border radius scale
      borderRadius: {
        '4xl': '2rem',
      },

      // Animation timing
      transitionDuration: {
        DEFAULT: '200ms',
        'fast': '150ms',
        'slow': '300ms',
      },

      // Custom animations for theme transitions
      transitionProperty: {
        'colors-transform': 'color, background-color, border-color, text-decoration-color, fill, stroke, transform',
      },
    },
  },
  plugins: [],
};
