import reactHotReloadPlugin from 'craco-plugin-react-hot-reload';

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [
    {
      plugin: reactHotReloadPlugin,
    },
  ],
};
