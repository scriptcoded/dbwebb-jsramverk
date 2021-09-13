module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Azeret Mono', 'monospace']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'li > *:first-child': {
              marginTop: '0 !important'
            },
            'li > *:last-child': {
              marginBottom: '0 !important'
            }
          }
        }
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}
