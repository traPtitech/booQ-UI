const postcssNormalize = require('postcss-normalize')

module.exports = {
  plugins: [require('autoprefixer'), postcssNormalize()]
}
