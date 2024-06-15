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
         'customCommunity-bg': "url('https://www.shutterstock.com/image-vector/social-media-seamless-pattern-doodle-600nw-1992018458.jpg')",
         'customLeaderBoard-bg': "url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D')",
         'customLeaderBoardgold-bg': "url('https://t4.ftcdn.net/jpg/05/07/99/07/360_F_507990784_vgmiFy1WksDER1w1jB08bHbSGFA1243B.jpg')",
         'customLeaderBoardsilver-bg': "url('https://png.pngtree.com/thumb_back/fh260/background/20220216/pngtree-beautiful-silver-metallic-texture-atmospheric-banner-background-image_930066.jpg')",
         'customLeaderBoardbronze-bg': "url('https://st4.depositphotos.com/9303990/24178/i/450/depositphotos_241780084-stock-photo-copper-metal-brushed-background-texture.jpg')",
       },
     },
  },
  variants: {
     extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
 }

