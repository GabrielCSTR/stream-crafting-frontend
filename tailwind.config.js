import primeUI from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    './node_modules/tailwindcss-primeui/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'brand-primary': '#FD2A36',
        'brand-secondary': '#FFAF0E',
        'brand-accent': '#2671F4',
        // Radiant (Green Team)
        'radiant': {
          base: '#4ADE80',
          light: '#86EFAC',
          deep: '#16A34A',
          glow: 'rgba(74, 222, 128, 0.25)'
        },
        // Dire (Red Team)
        'dire': {
          base: '#F87171',
          light: '#FDA4A4',
          deep: '#DC2626',
          glow: 'rgba(248, 113, 113, 0.25)'
        },
        // Backgrounds
        'bg-base': '#000000',
        'bg-panel': '#121212',
        'bg-card': '#090909',
        'bg-hover': '#1d1d1d',
        'border-stroke': '#242424',
        'divider': '#333333',
        // Typography
        'text-heading': '#FFFFFF',
        'text-body': '#D4D4D4',
        'text-muted': '#A4A4A4',
        'text-disabled': '#737373'
      }
    }
  },
  plugins: [primeUI]
}
