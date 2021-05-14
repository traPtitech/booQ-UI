import { UserConfig } from 'vite'
import path from 'path'
import packageJson from './package.json'
import VuePlugin from '@vitejs/plugin-vue'
import PurgeIcons from 'vite-plugin-purge-icons'
import brotli from 'rollup-plugin-brotli'

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

const config: UserConfig = {
  resolve: {
    alias: {
      '/@': srcPath
    }
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
    __VERSION__: `"${packageJson.version}"`
  },
  plugins: [VuePlugin(), PurgeIcons(), brotli()]
}

export default config
