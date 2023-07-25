const autoprefixer = require('autoprefixer');

const config = {
  plugins: [require('postcss-nested'), autoprefixer]
};

module.exports = config;
