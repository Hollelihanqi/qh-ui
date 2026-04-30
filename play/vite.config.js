import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import { HdCustomResolver } from '@hd/custom/resolvers'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

// const __dirname = fileURLToPath(new URL('.', import.meta.url))
// https://vite.dev/config/
// 获取样式副作用
// function getSideEffects(componentName, importStyle) {
//     if (!importStyle)
//         return;
//     return [
//         "@hd/custom/theme-chalk/hd-".concat(componentName, ".css")
//     ];
// }

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~/': ''.concat(path.resolve(__dirname, 'src'), '/'),
    },
  },
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    Unocss(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
      dts: true,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          // importStyle: 'sass',
          directives: true,
        }),
        HdCustomResolver(),
      ],
    }),
    visualizer(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@use "~/assets/styles/variables.scss" as *;`, // 配置全局 scss
      },
    },
  },
  server: {
    port: 3009,
    watch: {
      // 使用 ignored 选项，通过 ! 前缀来包含 dist 目录
      ignored: ['!**/dist/**'],
    },
    headers: {
      //因为qiankun内部请求都是fetch来请求资源，所以子应用必须允许跨域
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api/v2': {
        // target: 'https://api.example.com', // example
        target: 'https://api.example.com',
        changeOrigin: true,
      },
      '/api/v3': {
        // target: 'https://api.example.com', // example
        target: 'https://api.example.com',
        changeOrigin: true,
      },
      '/api': {
        // target: 'https://api.example.com',
        target: 'https://api.example.com',
        changeOrigin: true,
      },
    },
  },
})
