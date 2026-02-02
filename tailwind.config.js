/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary-tec': '#1B396A',
        'secundary': '#1B399C',
        'instagram': '#F12179',
        'facebook': '#0862F7',
        'twiter': '#1A95E1'
      }
    },
  },
  plugins: [],
}

