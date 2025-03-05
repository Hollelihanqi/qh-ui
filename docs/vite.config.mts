import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'
import VueMacros from 'unplugin-vue-macros/vite'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { YtoCustomResolver } from '@yto/custom/resolvers'
import { getPackageDependencies, ytoPackage, docPackage, projRoot } from '@yto-custom/build-utils'

//主要用于在本地开发环境中创建和管理 HTTPS 证书。
// import mkcert from "vite-plugin-mkcert";
import type { Alias } from 'vite'
// import dns from "dns";
// dns.setDefaultResultOrder("verbatim");
// // https://vitejs.dev/config/

const { dependencies: epDeps } = getPackageDependencies(ytoPackage)
const { dependencies: docsDeps } = getPackageDependencies(docPackage)

const optimizeDeps = [...new Set([...epDeps, ...docsDeps])].filter(
  (dep) =>
    !dep.startsWith('@types/') &&
    !['@yto-custom/metadata', 'yto-custom'].includes(dep)
)

const alias: Alias[] = [
  {
    find: '~/',
    replacement: `${path.resolve(__dirname, './.vitepress/vitepress')}/`,
  },
  ...(process.env.DOC_ENV === 'production'
    ? []
    : [
      {
        find: /^yto-custom(\/(es|lib))?$/,
        replacement: path.resolve(projRoot, 'packages/yto-custom/index.ts'),
      },
      {
        find: /^yto-custom\/(es|lib)\/(.*)$/,
        replacement: `${path.resolve(projRoot, 'packages')}/$2`,
      },
    ]),
]

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    resolve: {
      alias,
    },
    optimizeDeps: {
      exclude: [
        'vitepress',
        'fsevents'
      ],
      include: optimizeDeps
    },
    plugins: [
      vueJsx({
        transformOn: true,
        mergeProps: true,
      }),
      Components({
        resolvers: [
          IconsResolver(),
          ElementPlusResolver({
            importStyle: false,
            directives: true,
          }),
          // YtoCustomResolver(),
        ],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
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
      Icons({
        autoInstall: true,
      }),
      // mkcert(),
      UnoCSS(),
      groupIconVitePlugin()
    ],
    build: {
      chunkSizeWarningLimit: 1000, // 调整 chunk 大小限制（临时方案）
    },
    server: {
      fs: {
        allow: [projRoot],
      },
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
