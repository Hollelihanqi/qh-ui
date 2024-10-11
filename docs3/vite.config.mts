import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import prismjs from 'vite-plugin-prismjs'
import UnoCSS from 'unocss/vite'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'
import VueMacros from 'unplugin-vue-macros/vite'
// import mkcert from "vite-plugin-mkcert";
import type { Alias } from 'vite'
// import dns from "dns";
// dns.setDefaultResultOrder("verbatim");
// // https://vitejs.dev/config/

const alias: Alias[] = [
  {
    find: '~/',
    replacement: `${path.resolve(__dirname, './.vitepress/vitepress')}/`,
  },
]

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    resolve: {
      alias,
    },
    optimizeDeps: {
      exclude: ['vitepress'],
    },
    plugins: [
      vueJsx({
        transformOn: true,
        mergeProps: true,
      }),
      AutoImport({
        ignore: ['h'], //解决h报错
        imports: ['vue'],
      }),
      MarkdownTransform(),
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vueJsx: vueJsx(),
        },
      }),
      // mkcert(),
      UnoCSS()
    ],
    server: {
      hmr: {
        overlay: false,
      },
      proxy: {
        '/service-api': {
          target: 'http://10.130.16.149:8082',
          changeOrigin: true,
        },
        '/api/v2': {
          target: 'http://10.130.137.53:8000', // sit
          changeOrigin: true,
        },
      },
    },
  }
})
