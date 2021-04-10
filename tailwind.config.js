const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.vue',
    ],
    safelist: [
    'bg-white', 'bg-gray-200','dark:bg-gray-600','dark:bg-gray-700',
    'bg-red-300','bg-red-400','bg-red-100','dark:bg-red-800','dark:bg-red-900',
    'bg-blue-300','bg-blue-400','bg-blue-100','dark:bg-blue-800','dark:bg-blue-900',
    'bg-green-300','bg-green-400','bg-green-100','dark:bg-green-800','dark:bg-green-900',
    'bg-yellow-300','bg-yellow-400','bg-yellow-100','dark:bg-yellow-800','dark:bg-yellow-900',
    'bg-gray-300','bg-gray-400','bg-gray-100','dark:bg-gray-800','dark:bg-gray-900',
    ],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        'light-blue': colors.lightBlue
      },
      animation: {
        none: 'none',
        spin: 'spin 1s linear infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        pulse: {
          '50%': { opacity: '.5' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
      cursor: ['disabled'],
      opacity: ['disabled','group-hover'],
      display: ['group-hover', 'responsive'],
      borderWidth: ['dark']
    },
  },
  plugins: [],
}
