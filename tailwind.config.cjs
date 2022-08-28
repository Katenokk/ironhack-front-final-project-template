/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,js,vue}',
    './src/components/**/*.{html,js,vue}',
    "./index.html",
    "./src/App.vue"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

