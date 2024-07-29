/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grey-stone': "url('https://wallpapers.com/images/hd/simple-background-nfe3kq9cr13oqs3l.jpg')",
      }
    },
  },
  plugins: [],
}