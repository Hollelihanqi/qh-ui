import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path, { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import VueMacros from 'unplugin-vue-macros/rollup'
import { pkgRoot, ytoOutput, ytoCustomRoot, excludeFiles } from '@yto-custom/build-utils'
import glob from 'fast-glob'
import { generateExternal } from '../build/src/utils'
// 在 ESM 中获取当前文件路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取包依赖
// const { dependencies, peerDependencies } = getPackageDependencies(ytoPackage)

// // 外部依赖
// const external = [
//   'vue',
//   'vue-router',
//   '@vueuse/core',
//   ...Object.keys(dependencies || {}),
//   ...Object.keys(peerDependencies || {}),
// ]

// 获取目标环境
const target = 'es2018'

export default defineConfig(async (): Promise<UserConfig> => {
  return {
    plugins: [
      // 使用与原 modules.ts 相同的 Vue 配置
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue({
            isProduction: true,
            template: {
              compilerOptions: {
                hoistStatic: false,
                cacheHandlers: false,
              },
            },
          }),
          vueJsx: vueJsx(),
        },
      }),
    ],
    build: {
      outDir: path.resolve(ytoOutput, 'es'),
      emptyOutDir: true,
      minify: false,
      sourcemap: true,
      target, // 使用与原构建系统相同的目标
      lib: {
        entry: resolve(__dirname, '../..', 'packages/yto-custom/index.ts'),
        name: 'YtoCustom',
        formats: ['es'], // 只输出 ES 格式
        fileName: () => `index.mjs`,
      },
      rollupOptions: {
        input: excludeFiles(
          await glob('**/*.{js,ts,tsx,vue}', {
            cwd: pkgRoot,
            absolute: true,
            onlyFiles: true,
            ignore: ['**/yto-eslint/**', '**/yto-utils/**', '**/theme-chalk/**', '**/style/index.ts'],
          }),
        ),
        external: await generateExternal({ full: false }),
        treeshake: {
          moduleSideEffects: false,
        },
        exports: undefined,
        output: {
          // 与原 modules.ts 相似的输出配置
          preserveModules: true,
          preserveModulesRoot: ytoCustomRoot,
          entryFileNames: `[name].mjs`,
          // 避免跳过样式文件
          assetFileNames: `[name].[ext]`,
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target,
      },
    },
  }
})
