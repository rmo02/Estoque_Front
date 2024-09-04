/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        //paleta de cores do projeto
        color_blue: '#001828',
        color_green: '#00827A',
        color_red: '#C95656',
        color_yellow: '#D7CE09',
        color_grey: '#423F3F',
        color_grey_bg: '#E8E8E8',
        background: '#F5F5F5'
      },
      fontFamily: {
        poppins: ['Poppins']
      }
    }
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'html, body': {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%'
        }
      })
    }
    //require("@tailwindcss/forms"),
  ]
}
