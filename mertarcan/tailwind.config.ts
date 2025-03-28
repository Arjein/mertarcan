import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        ai: {
          background: '#121212',
          card: '#1E1E1E',
          border: '#333333',
          textPrimary: '#E6E6E6',
          textSecondary: '#9E9E9E',
          cyan: '#00E5FF',
          purple: '#BB86FC',
          mutedBlue: '#64748B',
          mutedMagenta: '#CF6679',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        'on-primary': 'rgb(0 0 0 / <alpha-value>)',
        'on-secondary': 'rgb(0 0 0 / <alpha-value>)',
        'on-surface': 'rgb(255 255 255 / <alpha-value>)',
        primary: 'rgb(0 229 255 / <alpha-value>)',
        secondary: 'rgb(187 134 252 / <alpha-value>)',
        surface: 'rgb(18 18 18 / <alpha-value>)',
      },
    },
  },
  plugins: [],
};

export default config;