import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { ytoCustomRoot, excludeFiles, pkgRoot, projRoot } from '@yto-custom/build-utils'
import { generateExternal, writeBundles } from '../utils'
import { YtoCustomAlias } from '../plugins/yto-custom-alias'
import { buildConfigEntries, target } from '../build-info'
import alias from '@rollup/plugin-alias';
import type { OutputOptions } from 'rollup'
import { resolve } from 'path'
import json from '@rollup/plugin-json';

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,tsx,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
      ignore: ['**/yto-eslint/**', '**/yto-utils/**', '**/theme-chalk/**'],
    }),
  )
  const bundle = await rollup({
    input,
    plugins: [
      // YtoCustomAlias(),
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
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'],
        preferBuiltins: true,
      }),
      json(),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    external: await generateExternal({ full: false }),
    treeshake: false,
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED' || warning.code === 'CIRCULAR_DEPENDENCY') return
      warn(warning)
    },

  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: ytoCustomRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    }),
  )
}
