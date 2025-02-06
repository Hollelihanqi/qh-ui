import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { readdirSync } from 'node:fs'
import { generateComponentEntry } from './gen-entry'
import myMergeCssPlugin from './plugins/my-merge-css'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 使用 generateComponentEntry 生成入口
generateComponentEntry()

// 动态生成组件入口对象
const entries = readdirSync(resolve(__dirname, 'entries'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => `entries/${dirent.name}/index.ts`)

const input = entries.reduce((acc, path) => {
  const componentName = basename(dirname(path))
  acc[`yto-${componentName}`] = resolve(__dirname, path)
  return acc
}, {})

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS({
      mode: 'per-module',
    }),
    myMergeCssPlugin(),
  ],
  build: {
    lib: {
      entry: {},
      formats: ['es'],
    },
    rollupOptions: {
      input,
      output: [
        {
          sourcemap: false,
          generatedCode: {
            symbols: false,
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              if (assetInfo.name.startsWith('yto-')) {
                return assetInfo.name
              }
              const name = assetInfo.name.replace('.css', '')
              return `yto-${name}.css`
            }
            return assetInfo.name
          }
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
    emptyOutDir: false
  }
}) 