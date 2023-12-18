/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'my-font': ['Caveat','cursive','Noto Sans',' sans-serif','Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}