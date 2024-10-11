/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'de-york': {
        50: '#F9FCFA',
        100: '#DBEFDF',
        200: '#BEE2C4',
        300: '#A0D5A9',
        400: '#81C08D',
        500: '#71A87B',
        600: '#618F69',
        700: '#507757',
        800: '#405F46',
        900: '#304734',
        950: '#1F2E22',
      },
    },
    extend: {
      fontFamily: {
        robot: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

