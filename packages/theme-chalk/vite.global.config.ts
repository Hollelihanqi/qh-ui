import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath } from 'url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS({
      mode: 'per-module',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: './entry.ts',
      },
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, './entry.ts'),
      },
      output: [
        {
          sourcemap: false,
          generatedCode: {
            symbols: false,
          },
        },
      ],
      external: [
        'vue',
        'vue-router',
        'echarts',
        'axios',
        '@vue/runtime-core',
        'gold-core',
        'element-plus',
        'immutable',
        'simple-uploader.js',
        'spark-md5',
      ],
    },
    cssCodeSplit: true,
    outDir: resolve(__dirname, './dist'),
    emptyOutDir: false,
  },
})
