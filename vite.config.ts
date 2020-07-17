import { UserConfig } from 'vite'
import path from 'path'

interface Patched {
  cssPreprocessOptions?: {
    prependData?: string
  }
}

const config: UserConfig | Patched = {
  minify: 'esbuild',
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  proxy: {
    '/api': {
      target: 'https://booq-dev.trapti.tech',
      changeOrigin: true
    }
  },
  cssPreprocessOptions: {
    prependData: `@import "${path
      .resolve(__dirname, 'src')
      .replace(/\\/g, '/')}/styles/common.scss";`
  }
}

export default config
