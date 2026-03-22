/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Updated from purge to content
  darkMode: 'class', // Enable class based dark mode if needed in future
  theme: {
     extend: {
       colors: {
         'custom-blue': '#2563EB', // blue-600
         'custom-pink': '#DB2777', // pink-600
         'brand-light': '#F8FAFC',
         'brand-dark': '#0F172A',
       },
       boxShadow: {
         'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
         'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
       },
       backgroundImage: {
         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
       }
     },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

