/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sea: '#0E7490',
        foam: '#ECFEFF',
        sand: '#FDE68A',
        coral: '#FB7185'
      }
    }
  },
  plugins: []
};
