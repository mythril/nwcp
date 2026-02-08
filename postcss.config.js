import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssMath from '@davidwells/postcss-math';
import cssnano from 'cssnano';

export default {
  plugins: [
    postcssNested,
    postcssMath,
    autoprefixer,
    cssnano({
      preset: 'default'
    })
  ]
};
