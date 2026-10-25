/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#F0F6FC',
          100: '#E0EEF9',
          200: '#BFDCF3',
          500: '#1B65A4',
          700: '#103F6E',
          800: '#0C2F52',
          900: '#0B2545',
          950: '#06162B'
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E48'
        },
        mango: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309'
        },
        sand: {
          50: '#FDFBF7',
          100: '#F7F3EA',
          200: '#EFE7D8',
          300: '#DFD2BC',
          400: '#C7B596',
          500: '#AD956E',
          800: '#4D3F2B',
          900: '#2A2216'
        },
        kokum: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          500: '#F43F5E',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
