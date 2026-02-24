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
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        spotlight: {
          "0%": {
            opacity: '0',
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: '1',
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
