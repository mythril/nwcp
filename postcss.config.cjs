const autoprefixer = require('autoprefixer');

const config = {
  plugins: [
    require('postcss-nested'),
    require('@davidwells/postcss-math'),
    autoprefixer,
    require('cssnano')({
      preset: 'default'
    })
  ]
};

module.exports = config;
