/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Pantel': ['Pantelleria', 'sans'], // Replace 'MyFont' with your font name
      },
    },
  },
  plugins: [],
}