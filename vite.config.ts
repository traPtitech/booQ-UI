import { UserConfig } from 'vite'
import path from 'path'
import packageJson from './package.json'
import PurgeIcons from 'vite-plugin-purge-icons'

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

const config: UserConfig = {
  alias: {
    '/@/': srcPath
  },
  proxy: {
    '/api': {
      target: 'https://booq-dev.trapti.tech',
      changeOrigin: true,
      ws: false
    }
  },
  cssPreprocessOptions: {
    scss: {
      additionalData: `@import "${srcPath}/styles/common.scss";`
    }
  },
  define: {
    __VERSION__: `"${packageJson.version}"`
  },
  plugins: [PurgeIcons()]
}

export default config
