/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ This is critical
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#5F6FFF'
      }
    },
  },
  plugins: [],
}
