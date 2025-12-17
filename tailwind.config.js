/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',
          primary: '#1e40af',
          secondary: '#3b82f6',
          light: '#60a5fa',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
