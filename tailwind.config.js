/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 自訂顏色
      colors: {
        primary: '#007FAB',
        secondary: '#FF5136',
        info: '#A46039',
        background: '#ffc37d',
        // success: '#065f46',
        // danger: '#991b1b',
      },
    },
  },
  plugins: [],
}
