/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redGradientStart: '#1E90FF',
        redGradientEnd: '#87CEFA',
      },
    },
  },
  plugins: [],
}

