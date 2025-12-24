import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const D2Cast = definePreset(Aura, {
  semantic: {
    // Brand Colors
    primary: {
      50: '#e6fef5',
      100: '#ccfdeb',
      200: '#99fbd7',
      300: '#66f9c3',
      400: '#34F5A3', // Brand Primary
      500: '#2ae693',
      600: '#22b673',
      700: '#1a8653',
      800: '#115632',
      900: '#092b19',
      950: '#04150c'
    },
    secondary: {
      50: '#ede9ff',
      100: '#dbd3ff',
      200: '#b7a7ff',
      300: '#937bff',
      400: '#6D5DF6', // Brand Secondary
      500: '#5a4dc5',
      600: '#473e94',
      700: '#352e63',
      800: '#231f32',
      900: '#120f19',
      950: '#09070c'
    },
    accent: {
      50: '#e6fffe',
      100: '#ccfffd',
      200: '#99fffb',
      300: '#66fff9',
      400: '#3AF2E9', // Accent
      500: '#2ec2ba',
      600: '#24928b',
      700: '#1b625c',
      800: '#12312e',
      900: '#091917',
      950: '#040c0b'
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
          0: '#020617', // Background base
          50: '#0B1220', // Background 2 (painéis)
          100: '#0F172A', // Card / Section
          200: '#111A2F', // Hover BG subtle
          300: '#1E293B', // Stroke / Border
          400: '#273247', // Divider suave
          500: '#334155',
          600: '#475569',
          700: '#64748B',
          800: '#94A3B8',
          900: '#CBD5E1',
          950: '#F9FAFB'
        },
        primary: {
          color: '{primary.400}',
          contrastColor: '{surface.0}',
          hoverColor: '{primary.500}',
          activeColor: '{primary.600}'
        },
        highlight: {
          background: '{primary.400}',
          focusBackground: '{primary.500}',
          color: '{surface.0}',
          focusColor: '{surface.0}'
        }
      }
    }
  }
})

export default D2Cast
