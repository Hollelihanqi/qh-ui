import path from 'path'
import { PKG_NAME } from '@yto-custom/build-constants'
import { ytoOutput } from '@yto-custom/build-utils'
export const modules = ['esm'] as const
export type Module = (typeof modules)[number]
export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: any
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    /** e.g: `es` */
    name: string
    /** e.g: `dist/element-plus/es` */
    path: string
  }

  bundle: {
    /** e.g: `element-plus/es` */
    path: string
  }
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(ytoOutput, 'es'),
    },
    bundle: {
      path: `${PKG_NAME}/es`,
    },
  },
  // cjs: {
  //   module: 'CommonJS',
  //   format: 'cjs',
  //   ext: 'js',
  //   output: {
  //     name: 'lib',
  //     path: path.resolve(ytoOutput, 'lib'),
  //   },
  //   bundle: {
  //     path: `${PKG_NAME}/lib`,
  //   },
  // },
}
export const buildConfigEntries = Object.entries(buildConfig) as BuildConfigEntries

export type BuildConfig = typeof buildConfig
export type BuildConfigEntries = [Module, BuildInfo][]

export const target = 'es2018'
