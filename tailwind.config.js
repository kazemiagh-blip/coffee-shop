/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#FDFBF7',
          100: '#F5EBE1',
          200: '#EADBCC',
          300: '#D5C0A9',
          400: '#A98467',
          500: '#8C6239',
          600: '#6F4E37',
          700: '#4A2C1D',
          800: '#3D2314',
          900: '#2C1810',
          950: '#1A0E0A',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FCF9F2',
          200: '#F7F1E5',
          300: '#EFE5D1',
          400: '#E3D3B5',
        },
        gold: {
          100: '#FBF3D5',
          200: '#F5E39F',
          300: '#ECCF64',
          400: '#DFB82E',
          500: '#C59B27',
          600: '#A8801C',
          700: '#876414',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
