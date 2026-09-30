/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        euro: {
          950: '#060e1a',
          900: '#0b192c',
          850: '#0f243e',
          800: '#143153',
          700: '#1d4576',
          600: '#2563eb',
          500: '#3b82f6',
          400: '#60a5fa',
          100: '#e0edfd',
          50: '#f0f6fe',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
