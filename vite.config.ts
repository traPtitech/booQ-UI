import { UserConfig } from 'vite'
//@ts-expect-error: to avoid installing @types/node
import path from 'path'
import packageJson from './package.json'
import VuePlugin from '@vitejs/plugin-vue'
import PurgeIcons from 'vite-plugin-purge-icons'

declare const __dirname: string

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

const config: UserConfig = {
  alias: {
    '/@': srcPath
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://booq-dev.trapti.tech',
        changeOrigin: true,
        ws: false
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${srcPath}/styles/common.scss";`
      }
    }
  },
  define: {
    __VERSION__: packageJson.version
  },
  plugins: [VuePlugin(), PurgeIcons()]
}

export default config
