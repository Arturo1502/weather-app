/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'blue-1': '#1E213A',
        'blue-2': '#100E1D',
        'blue-3': '#3C47E9',
        'gray-1': '#E7E7EB',
        'gray-2': '#A09FB1',
        'gray-3': '#6E707A',
        'gray-4': '#616475',
        'gray-5': '#585676',
        'yellow-1': '#FFEC65'
      }
    },
    fontFamily: {
      sans: ['Raleway', 'sans-serif']
    }
  },
  plugins: []
}
