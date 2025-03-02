/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')], // Plugins array should only include require statements
  daisyui: {
    themes: ["light"], // Only use the "light" theme
  },
}