import path from 'path'

module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  proxy: {
    '/api': {
      target: 'https://booq-dev.trapti.tech',
      changeOrigin: true
    }
  }
}
