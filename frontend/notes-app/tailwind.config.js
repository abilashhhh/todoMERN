/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //colors used in entire proj
      colors: {
        primary : "#2B85FF",
        secondary : "#EF863B",
      }
    },
  },
  plugins: [],
}

