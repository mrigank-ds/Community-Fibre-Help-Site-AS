module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    colors: {
      'transparent': 'transparent',
      'white': '#ffffff',
      'black': '#000000',
      'primary': '#EC6225',
      'blackLight': '#1d1d1b',
      'secondary': '#370050',
      'purple1': '#370050',
    },
    fontFamily: {
      'main-text-font': ['"Campton", Georgia, Arial, sans-serif'],
      'title-text-font': ['"Larken", Georgia, Arial, sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [ 
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}