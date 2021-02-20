module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        theme: '#0f078e',
        'light-theme': '#0f078e',
        secondary: '#fbaf1b',
        off: '#1976d2',
        approved: '#09ac23',
        light: '#f8fafd',
        fade: '#aaa4a4',
        txt: '#565656',
        txt_fade: '#6f6f6f',
        light_fade: '#f7f7f7',
      },
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      maxHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
