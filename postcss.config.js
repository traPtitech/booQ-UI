/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const postcssNormalize = require('postcss-normalize')

module.exports = {
  plugins: [require('autoprefixer'), postcssNormalize()]
}
