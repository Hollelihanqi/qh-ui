import path from 'node:path'
import { copyFile, mkdir } from 'fs/promises'
import { copy } from 'fs-extra'
import { parallel, series } from 'gulp'
import { buildOutput, ytoOutput, ytoPackage, projRoot } from '@yto-custom/build-utils'
import { buildConfig, run, runTask, withTaskName } from './src'
import type { TaskFunction } from 'gulp'
import type { Module } from './src'

export const copyFiles = () =>
  Promise.all([
    copyFile(ytoPackage, path.join(ytoOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(ytoOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'typings', 'global.d.ts'),
      path.resolve(ytoOutput, 'global.d.ts')
    )
  ])

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () => copy(src, buildConfig[module].output.path, { recursive: true }))

  return parallel(copyTypes('esm'))(done)
}

export const copyFullStyle = async () => {
  await mkdir(path.resolve(ytoOutput, 'dist'), { recursive: true })
  await copyFile(path.resolve(ytoOutput, 'theme-chalk/index.css'), path.resolve(ytoOutput, 'dist/index.css'))
}

export const copyResolversDist = async () => {
  const resolversDistPath = path.resolve(projRoot, 'internal/resolvers/dist')
  const targetPath = path.resolve(ytoOutput, 'resolvers')
  await mkdir(targetPath, { recursive: true })
  await copy(resolversDistPath, targetPath, { recursive: true })
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(ytoOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('generateTypesDefinitions'),
    // runTask('buildHelper'),
    series(
      withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build')),
      withTaskName('buildResolves', () => run('pnpm run -C internal/resolvers build')),
      withTaskName('copyResolvers', copyResolversDist),
    ),
  ),

  parallel(copyTypesDefinitions, copyFiles),
)

export * from './src'
