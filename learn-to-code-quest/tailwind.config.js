/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        arcane: {
          950: '#09090f',
          900: '#111122',
          800: '#1b1b31',
          700: '#272745'
        }
      },
      boxShadow: {
        rune: '0 0 0 1px rgba(59, 130, 246, 0.25), 0 10px 30px rgba(0,0,0,0.45)'
      }
    }
  },
  plugins: []
};
