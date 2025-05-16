/**@type {import('tailwindcss').config} */
export default {
  content:[],
    theme: {
      extend:{
      colors: {
        'primary': '#5F6FFF',
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  Plugins: [],
  }