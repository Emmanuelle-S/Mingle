const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        black: '#0B1215',
        white: '#FAF9F6',
        primary: '#DD8F16',
        secondary: '#FFD166',
        light: '#FFEDC5',
        dark: '#263B2B',
        accent: '#0590E5',
      },
    },
  },
  plugins: [],
});