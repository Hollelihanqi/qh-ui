import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { readdirSync } from 'node:fs'
import myMergeCssPlugin from './plugins/my-merge-css'
import { COMPONENT_STYLE_PREFIX, getComponentStyleName } from '@hd-custom/build-constants'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 动态生成组件入口对象
const entries = readdirSync(resolve(__dirname, 'entries'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => `entries/${dirent.name}/index.ts`)

const input = entries.reduce((acc, path) => {
  const componentName = basename(dirname(path))
  acc[getComponentStyleName(componentName)] = resolve(__dirname, path)
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
            const assetName = assetInfo.names?.[0] ?? assetInfo.name ?? 'style.css'
            if (assetName.endsWith('.css')) {
              if (assetName.startsWith(`${COMPONENT_STYLE_PREFIX}-`)) {
                return assetName
              }
              const name = assetName.replace('.css', '')
              return `${getComponentStyleName(name)}.css`
            }
            return assetName
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
