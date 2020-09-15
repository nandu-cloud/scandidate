module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {backgroundAttachment: ['responsive', 'hover', 'focus'],},
  plugins: [ require('tailwindcss'),
  require('autoprefixer'),],
}
