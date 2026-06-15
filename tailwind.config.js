/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Public Sans"', '"Noto Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        dbs: {
          red: {
            50:  '#fff0f0',
            100: '#ffdada',
            200: '#ffb3b3',
            300: '#ff7a7a',
            400: '#ff3d3d',
            500: '#ff0000',
            600: '#d60000',
            700: '#b30000',
            800: '#8a0000',
            900: '#5e0000',
          },
          navy: {
            600: '#324a5e',
            700: '#243748',
            800: '#1a2a38',
            900: '#14242f',
          },
          amber: {
            400: '#ffb020',
            500: '#f59300',
            600: '#d97d00',
          },
          gray: {
            50:  '#f6f7f9',
            100: '#eef0f3',
            200: '#e3e6ea',
            300: '#cdd2d9',
            400: '#aab0b9',
            500: '#858d98',
            600: '#69727e',
            700: '#4a525c',
            800: '#2c333b',
            900: '#1a1f24',
          },
          green: {
            50:  '#e7f6ee',
            500: '#1ca65b',
          },
          blue: {
            50:  '#e8f1fb',
            500: '#0a6ed1',
          },
        },
      },
      borderRadius: {
        'dbs': '4px',
        'dbs-md': '8px',
        'dbs-lg': '12px',
        'dbs-xl': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(20,36,47,0.08)',
        'md':   '0 4px 16px rgba(20,36,47,0.10)',
        'lg':   '0 12px 32px rgba(20,36,47,0.14)',
        'sheet':'0 -6px 24px rgba(20,36,47,0.12)',
      },
    },
  },
  plugins: [],
};
