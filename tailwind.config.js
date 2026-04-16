/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tree: {
          blue: '#5b9bd5',
          'blue-dark': '#4a8bc4',
          body: '#e8f0f8',
        },
      },
    },
  },
  plugins: [],
};
