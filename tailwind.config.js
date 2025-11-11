/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '2xs': '375px',
        xs: '550px',
      },
      colors: {
        main: '#eca2c6',
        subMain: '#6552b6',
      },
    },
  },
  plugins: [],
};
