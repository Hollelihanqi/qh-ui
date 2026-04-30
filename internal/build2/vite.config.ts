import path, { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import glob from 'fast-glob'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/rollup'
import { excludeFiles, hdOutput, pkgRoot } from '@hd-custom/build-utils'
import { generateExternal } from './utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const target = 'es2018'

function formatEntryFileName(chunkName: string) {
  // packages/hd-custom 是发布包自身，不应在 dist/hd-custom/es 下再套一层 hd-custom。
  // 其它源码包仍按 components/hooks/directives 等目录输出，保留按需导入结构。
  const publicName = chunkName.replace(/^hd-custom\//, '')
  return `${publicName}.mjs`
}

export default defineConfig(async (): Promise<UserConfig> => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,tsx,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
      ignore: ['**/hd-eslint/**', '**/share/**', '**/theme-chalk/**', '**/style/index.ts'],
    }),
  )

  return {
    plugins: [
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
      outDir: path.resolve(hdOutput, 'es'),
      emptyOutDir: true,
      minify: false,
      sourcemap: true,
      target,
      lib: {
        entry: resolve(__dirname, '../..', 'packages/hd-custom/index.ts'),
        name: 'HdCustom',
        formats: ['es'],
        fileName: () => 'index.mjs',
      },
      rollupOptions: {
        input,
        external: await generateExternal({ full: false }),
        treeshake: {
          moduleSideEffects: false,
        },
        output: {
          // 对齐 Element Plus 的模块发布思路：保留 packages 下的模块结构，再把主包目录压平。
          preserveModules: true,
          preserveModulesRoot: pkgRoot,
          entryFileNames: (chunkInfo) => formatEntryFileName(chunkInfo.name),
          assetFileNames: '[name].[ext]',
        },
      },
    },
  }
})
