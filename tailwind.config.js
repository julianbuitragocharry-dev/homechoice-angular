/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'blue': {
        50: '#F7FBFE',
        100: '#D0E6FB',
        200: '#A8D0F7',
        300: '#81BBF3',
        400: '#5CA2E4',
        500: '#518DC7',
        600: '#4579AA',
        700: '#39648E',
        800: '#2E5071',
        900: '#223B54',
        950: '#162737',
      },
      'red': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
      }
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

