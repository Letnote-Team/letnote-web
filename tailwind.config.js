/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#37A2F0',
        "primary-600": '#2483C7',
        "primary-700": '#237AB9'
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(40px)' },
        }
      },
      animation: {
        float: 'float 1s ease-in-out infinite'
      }
    },
    fontFamily: {
      body: ['Inter', 'sans-serif']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
