import { series } from 'gulp'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { ytoCustomRoot, excludeFiles, pkgRoot } from '@yto-custom/build-utils'
import { generateExternal, writeBundles, withTaskName } from '../utils'
// import { YtoCustomAlias } from '../plugins/yto-custom-alias'
import { buildConfigEntries, target } from '../build-info'
// import json from '@rollup/plugin-json';
import type { OutputOptions, Plugin } from 'rollup'
import type { TaskFunction } from 'gulp'

const plugins: Plugin[] = [
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
          }
        }
      }),
      vueJsx: vueJsx(),
    },
  }),
  nodeResolve({
    extensions: ['.mjs', '.js', '.json', '.ts'],
    preferBuiltins: true,
  }),
  commonjs(),
  esbuild({
    sourceMap: true,
    target,
    loaders: {
      '.vue': 'ts',
    },
  }),
]

async function buildModulesComponents() {
  const input = excludeFiles(
    await glob('**/*.{js,ts,tsx,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
      ignore: ['**/yto-eslint/**', '**/yto-utils/**', '**/theme-chalk/**',"**/style/index.ts"],
    }),
  )
  const bundle = await rollup({
    input,
    plugins,
    external: await generateExternal({ full: false }),
    treeshake: {
      moduleSideEffects: false
    }
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: undefined,
        preserveModules: true,
        preserveModulesRoot: ytoCustomRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    }))

}

// export const buildModules = async () => {
//   const input = excludeFiles(
//     await glob('**/*.{js,ts,tsx,vue}', {
//       cwd: pkgRoot,
//       absolute: true,
//       onlyFiles: true,
//       ignore: ['**/yto-eslint/**', '**/yto-utils/**', '**/theme-chalk/**'],
//     }),
//   )
//   console.log(input)
//   const bundle = await rollup({
//     input,
//     plugins: [
//       // YtoCustomAlias(),
//       VueMacros({
//         setupComponent: false,
//         setupSFC: false,
//         plugins: {
//           vue: vue({
//             isProduction: true,
//             template: {
//               compilerOptions: {
//                 hoistStatic: false,
//                 cacheHandlers: false,
//               },
//             },
//           }),
//           vueJsx: vueJsx(),
//         },
//       }),
//       nodeResolve({
//         extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'],
//         preferBuiltins: true,
//       }),
//       json(),
//       commonjs(),
//       esbuild({
//         sourceMap: true,
//         target,
//         loaders: {
//           '.vue': 'ts',
//         },
//       }),
//     ],
//     external: await generateExternal({ full: false }),
//     treeshake: false,
//     onwarn(warning, warn) {
//       if (warning.code === 'THIS_IS_UNDEFINED' || warning.code === 'CIRCULAR_DEPENDENCY') return
//       warn(warning)
//     },

//   })
//   await writeBundles(
//     bundle,
//     buildConfigEntries.map(([module, config]): OutputOptions => {
//       return {
//         format: config.format,
//         dir: config.output.path,
//         exports: module === 'cjs' ? 'named' : undefined,
//         preserveModules: true,
//         preserveModulesRoot: ytoCustomRoot,
//         sourcemap: true,
//         entryFileNames: `[name].${config.ext}`,
//       }
//     }),
//   )
// }





export const buildModules: TaskFunction = series(
  withTaskName('buildModulesComponents', buildModulesComponents)
)