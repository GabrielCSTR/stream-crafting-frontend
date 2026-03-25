import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const D2Cast = definePreset(Aura, {
  semantic: {
    // Brand Colors
    primary: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fd6b75',
      500: '#FD2A36', // CSWatch primary
      600: '#e60011',
      700: '#c1000e',
      800: '#9f0712',
      900: '#881337',
      950: '#4c0519'
    },
    secondary: {
      50: '#fff7e6',
      100: '#ffefcc',
      200: '#ffdf99',
      300: '#ffcf66',
      400: '#ffbf33',
      500: '#FFAF0E', // CSWatch secondary
      600: '#d88f00',
      700: '#a66e00',
      800: '#734d00',
      900: '#402b00',
      950: '#211600'
    },
    accent: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#2671F4', // CSWatch accent
      600: '#1d5fd6',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    // Semantic Colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22C55E', // Success
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },
    warning: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#FACC15', // Warning
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '#422006'
    },
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#EF4444', // Danger
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a'
    },
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38BDF8', // Info
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#000000', // Background base
          50: '#090909', // Cards
          100: '#121212', // Panels
          200: '#1d1d1d', // Hover BG subtle
          300: '#242424', // Stroke / Border
          400: '#333333', // Divider
          500: '#525252',
          600: '#737373',
          700: '#a4a4a4',
          800: '#d4d4d4',
          900: '#f5f5f5',
          950: '#ffffff'
        },
        primary: {
          color: '{primary.500}',
          contrastColor: '{surface.950}',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}'
        },
        highlight: {
          background: '{primary.500}',
          focusBackground: '{primary.600}',
          color: '{surface.950}',
          focusColor: '{surface.950}'
        }
      }
    }
  }
})

export default D2Cast
