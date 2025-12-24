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
        'brand-primary': '#34F5A3',
        'brand-secondary': '#6D5DF6',
        'brand-accent': '#3AF2E9',
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
        'bg-base': '#020617',
        'bg-panel': '#0B1220',
        'bg-card': '#0F172A',
        'bg-hover': '#111A2F',
        'border-stroke': '#1E293B',
        'divider': '#273247',
        // Typography
        'text-heading': '#F9FAFB',
        'text-body': '#CBD5E1',
        'text-muted': '#94A3B8',
        'text-disabled': '#64748B'
      }
    }
  },
  plugins: [primeUI]
}
