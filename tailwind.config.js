import primeUI from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    './node_modules/tailwindcss-primeui/**/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [primeUI]
}
