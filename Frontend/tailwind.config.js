/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
     extend: {
      colors: {
         'custom-blue': '#1E40AF',
         'custom-pink': '#FF0080',
       },
       backgroundImage: {
         'custom-bg': "url('https://files.123freevectors.com/wp-content/original/131382-abstract-grey-and-white-polygon-pattern-background-illustration.jpg')",
         'customChat-bg': "url('https://t3.ftcdn.net/jpg/03/27/51/56/360_F_327515607_Hcps04aaEc7Ki43d1XZPxwcv0ZaIaorh.jpg')",
       },
     },
  },
  variants: {
     extend: {},
  },
  plugins: [],
 }

