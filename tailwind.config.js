/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'xamnhat':'#c5c5c5',
        'cam':'#ff9442'
      }
    },
  },
  plugins: [],
}