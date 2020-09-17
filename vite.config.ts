import { UserConfig } from 'vite'
import path from 'path'
import packageJson from './package.json'

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

const config: UserConfig = {
  alias: {
    '/@/': srcPath
  },
  proxy: {
    '/api': {
      target: 'https://booq-dev.trapti.tech',
      changeOrigin: true
    }
  },
  cssPreprocessOptions: {
    scss: {
      additionalData: `@import "${srcPath}/styles/common.scss";`
    }
  },
  define: {
    __VERSION__: `"${packageJson.version}"`
  }
}

export default config
