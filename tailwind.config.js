/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'fadeOut': 'fadeOut 0.5s ease-in-out',
        'scaleIn': 'scaleIn 0.4s ease-out',
        'scaleOut': 'scaleOut 0.4s ease-in',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slideUp': 'slideUp 0.4s ease-out',
        'slideDown': 'slideDown 0.4s ease-in',
        'fade-in': 'fadeIn 0.3s ease-in-out forwards',
        'lang-change': 'langChange 0.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(10px)', opacity: '0' },
        },
        langChange: {
          '0%': { opacity: '0', transform: 'translateY(-5px)' },
          '50%': { opacity: '0.5', transform: 'translateY(-2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 255, 255, 0.5)',
        'glow-rose': '0 0 15px rgba(244, 63, 94, 0.5)',
        'glow-emerald': '0 0 15px rgba(52, 211, 153, 0.5)',
        'glow-blue': '0 0 15px rgba(96, 165, 250, 0.5)',
        'glow-zinc': '0 0 15px rgba(161, 161, 170, 0.3)',
      },
      backgroundColor: {
        'black': '#000000',
      },
    },
  },
  plugins: [],
} 