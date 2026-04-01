/** @type {import('tailwindcss').Config} */
export default {
  /* Ensure Tailwind scans all your React files */
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Defining our brand orange color */
        brand: '#ea580c', 
      }
    },
  },
  plugins: [],
}