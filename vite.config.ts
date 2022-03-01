import { defineConfig } from 'vite'
import path from 'path'
import packageJson from './package.json'
import VuePlugin from '@vitejs/plugin-vue'
import PurgeIcons from 'vite-plugin-purge-icons'
import brotli from 'rollup-plugin-brotli'
import { PluginTrapAuth } from '@traptitech/vite-plugin-trap-auth'

export default defineConfig({
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://booq-dev.trapti.tech',
        changeOrigin: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @import "/@/styles/common.scss";
        `
      }
    }
  },
  define: {
    __VERSION__: `"${packageJson.version}"`
  },
  plugins: [VuePlugin(), PurgeIcons(), brotli(), PluginTrapAuth()]
})
