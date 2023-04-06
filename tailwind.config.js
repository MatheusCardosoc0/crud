/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      animation: {
        alert: 'infinite 3s alert'
      },
      keyframes: {
        alert: {
          '50%': {
            color: '#AB0505'
          }
        }
      }
    },
  },
  plugins: [],
}

