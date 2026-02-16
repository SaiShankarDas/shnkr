/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#F2540F', // Brand Orange
          hover: '#CD4108', // Darker shade for hover
          foreground: '#FFFFFF',
        },
        background: '#050505', // Deep dark background
        foreground: '#EFEEED', // Off-white text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        custom: ['CustomFont', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
