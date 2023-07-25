const autoprefixer = require('autoprefixer');

const config = {
  plugins: [
    require('postcss-nested'),
    require('@davidwells/postcss-math'),
    autoprefixer
  ]
};

module.exports = config;
