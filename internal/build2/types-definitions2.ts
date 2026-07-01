import path from 'node:path'
import { existsSync } from 'node:fs'
import { copyFile, rm, readFile, writeFile } from 'node:fs/promises'
import glob from 'fast-glob'
import { ensureDir, pathExists, remove } from 'fs-extra'
import { buildOutput, hdOutput, projRoot } from '@hd-custom/build-utils'
import { pathRewriter, run } from './utils'

/**
 * 生成并整理主包类型声明文件。
 *
 * 这里的职责类似 Element Plus 构建链里的 generateTypesDefinitions + copyTypesDefinitions：
 * 先用 vue-tsc 生成临时 .d.ts 文件，再把真正要发布的声明文件复制到 dist/hd-custom/es。
 *
 * 注意：
 * 1. dist/types 只是临时目录，不应该发布。
 * 2. dist/hd-custom/es 才是 npm 包最终暴露给用户的 ESM 类型目录。
 * 3. 发布目录里的类型声明不能保留 @hd-custom/* 源码别名。
 * 4. 发布目录里的类型声明也不能保留 @rdeam/hd-ui/es/* 包名自引用。
 * 5. 相对导入需要补成 .js / index.js，和最终 ESM 产物保持一致。
 */
export const generateTypesDefinitions = async () => {
  // TypeScript / vue-tsc 使用的配置文件。
  const tsConfigPath = path.resolve(projRoot, 'tsconfig.web.json')

  // vue-tsc 的临时类型输出目录，例如 dist/types。
  const outputTypesDir = path.resolve(buildOutput, 'types')

  // TypeScript 增量构建缓存文件，不属于发布产物，构建前后都需要清理。
  const tsBuildInfoPath = path.resolve(buildOutput, 'tsconfig.web.tsbuildinfo')

  // vue-tsc 会按 rootDir 保留 packages 目录结构，真正的源码类型在 dist/types/packages 下。
  const packagesTypesDir = path.join(outputTypesDir, 'packages')

  // 最终 npm 包发布用的 ESM 类型目录，例如 dist/hd-custom/es。
  const publishTypesDir = path.join(hdOutput, 'es')

  console.log('TypeScript 配置文件路径:', tsConfigPath)
  console.log('类型文件临时输出目录:', outputTypesDir)
  console.log('类型文件发布输出目录:', publishTypesDir)

  // 清理上一次类型生成留下的中间文件，避免旧声明或 tsbuildinfo 影响本次构建结果。
  await remove(outputTypesDir)
  await remove(tsBuildInfoPath)

  // 只生成 .d.ts 声明文件，不生成 JS。
  // 生成结果会先落到 dist/types，后续再复制进真正的发布目录。
  await run(
    `pnpm exec vue-tsc -p ${tsConfigPath} --declaration --emitDeclarationOnly --declarationDir ${outputTypesDir}`,
  )

  // 找到 vue-tsc 生成的所有声明文件。
  // share 现在是随 @rdeam/hd-ui 发布的内部工具产物，需要保留它的类型声明。
  const filePaths = await glob('**/*.d.ts', {
    cwd: packagesTypesDir,
    absolute: true,
  })

  // 第一轮路径重写：把源码别名 @hd-custom/* 改成发布包路径 @rdeam/hd-ui/es/*。
  // 这一步仍发生在临时目录里，目的是先把源码别名统一成发布语义。
  await Promise.all(
    filePaths.map(async (filePath) => {
      const content = await readFile(filePath, 'utf8')
      await writeFile(filePath, pathRewriter('esm')(content), 'utf8')
    }),
  )

  // 发布目录里可能已经存在上一轮构建生成的 .d.ts，先删掉，避免脏文件残留。
  await cleanPublishTypes(publishTypesDir)

  // 将临时类型目录里真正属于主包发布面的类型复制到 dist/hd-custom/es。
  await copyPackageTypesToPublishDir(packagesTypesDir, publishTypesDir)

  // share 使用 unbuild 单独生成 dist，随 @rdeam/hd-ui 发布时需要把它的类型一起放进主包。
  await copyBuiltShareTypes(publishTypesDir)

  // 第二轮路径重写：从最终发布目录视角，把包名自引用改成相对路径，并补齐 .js 后缀。
  await rewritePublishTypeImports(publishTypesDir)

  // 构建结果硬校验：避免入口文件缺失，或声明文件里残留内部别名。
  await assertPublishEntrypoints(publishTypesDir)

  // 清理临时类型目录和 TypeScript 缓存，保证 dist 根目录只保留发布产物。
  await remove(outputTypesDir)
  await remove(tsBuildInfoPath)
}

/**
 * 复制 share 自己构建出来的类型入口。
 *
 * share 现在不独立发布 npm 包，但它的 JS 会随主包落到：
 * dist/hd-custom/es/share/dist/index.mjs
 *
 * 为了让 @rdeam/hd-ui/share 这个子路径同时拥有类型声明，这里把：
 * packages/share/dist/index.d.ts
 *
 * 复制到：
 * dist/hd-custom/es/share/dist/index.d.ts
 */
async function copyBuiltShareTypes(publishTypesDir: string) {
  const sourceFile = path.resolve(projRoot, 'packages/share/dist/index.d.ts')
  const targetFile = path.join(publishTypesDir, 'share/dist/index.d.ts')

  if (!(await pathExists(sourceFile))) {
    return
  }

  await ensureDir(path.dirname(targetFile))
  await copyFile(sourceFile, targetFile)
}

/**
 * 删除发布目录中已有的 .d.ts 文件。
 *
 * 这里只删除类型声明，不删除 .mjs。
 * 因为 JS 模块已经由 ui 阶段生成，types 阶段只负责刷新声明文件。
 */
async function cleanPublishTypes(publishTypesDir: string) {
  const filePaths = await glob('**/*.d.ts', {
    cwd: publishTypesDir,
    absolute: true,
    onlyFiles: true,
  })

  await Promise.all(filePaths.map((filePath) => rm(filePath, { force: true })))
}

/**
 * 把临时类型目录里的声明文件复制到最终发布目录。
 *
 * 临时目录结构大致是：
 * dist/types/packages/hd-custom
 * dist/types/packages/components
 * dist/types/packages/directives
 * dist/types/packages/hooks
 * dist/types/packages/utils
 * dist/types/packages/share
 *
 * 发布目录结构需要变成：
 * dist/hd-custom/es/index.d.ts
 * dist/hd-custom/es/components/...
 * dist/hd-custom/es/directives/...
 * dist/hd-custom/es/hooks/...
 * dist/hd-custom/es/utils/...
 * dist/hd-custom/es/share/...
 */
async function copyPackageTypesToPublishDir(packagesTypesDir: string, publishTypesDir: string) {
  // 只复制 @rdeam/hd-ui 发布包需要暴露或内部引用需要的类型目录。
  const publishTypeDirs = ['hd-custom', 'components', 'directives', 'hooks', 'utils', 'share']

  for (const dirName of publishTypeDirs) {
    const sourceDir = path.join(packagesTypesDir, dirName)
    if (!(await pathExists(sourceDir))) {
      continue
    }

    // packages/hd-custom 是主包源码目录，里面的 index/defaults/version 等文件应直接落在 es 根目录。
    // 其它目录保持原目录名，方便按需导入和内部相对引用。
    const targetDir = dirName === 'hd-custom' ? publishTypesDir : path.join(publishTypesDir, dirName)

    const dtsFilePaths = await glob('**/*.d.ts', {
      cwd: sourceDir,
      absolute: true,
      onlyFiles: true,
    })

    await Promise.all(
      dtsFilePaths.map(async (sourceFilePath) => {
        const relativePath = path.relative(sourceDir, sourceFilePath)
        const targetFilePath = path.join(targetDir, relativePath)

        await ensureDir(path.dirname(targetFilePath))
        await writeFile(targetFilePath, await readFile(sourceFilePath, 'utf8'), 'utf8')
      }),
    )
  }
}

/**
 * 重写最终发布目录里的所有类型导入路径。
 *
 * 处理两类问题：
 * 1. @rdeam/hd-ui/es/components 这种包名自引用，改成 ./components/index.js。
 * 2. ./components 这种无后缀相对导入，改成 ./components/index.js 或 ./xxx.js。
 */
async function rewritePublishTypeImports(publishTypesDir: string) {
  const dtsFilePaths = await glob('**/*.d.ts', {
    cwd: publishTypesDir,
    absolute: true,
    onlyFiles: true,
  })

  await Promise.all(
    dtsFilePaths.map(async (filePath) => {
      const content = await readFile(filePath, 'utf8')

      // 先把 @rdeam/hd-ui/es/* 和 @hd-custom/* 改成发布目录内部的相对路径。
      const withoutSelfAlias = rewriteSelfPackageImports(content, filePath, publishTypesDir)

      // 再把相对路径补成真实 ESM 产物可以对应上的 .js / index.js 形式。
      const withJsSpecifiers = rewriteRelativeTypeImports(withoutSelfAlias, filePath)

      await writeFile(filePath, withJsSpecifiers, 'utf8')
    }),
  )
}

/**
 * 将内部别名或发布包自引用改成相对路径。
 *
 * 示例：
 * @rdeam/hd-ui/es/components -> ./components
 * @hd-custom/utils -> ../../utils
 */
function rewriteSelfPackageImports(content: string, filePath: string, publishTypesDir: string) {
  return content.replace(
    /(["'])(@rdeam\/hd-ui\/es(?:\/[^"']*)?|@hd-custom\/(?:components|directives|hooks|utils|share)(?:\/[^"']*)?)\1/g,
    (matched, quote: string, moduleId: string) => {
      const relativeModuleId = getRelativePublishModuleId(moduleId, filePath, publishTypesDir)
      return relativeModuleId ? `${quote}${relativeModuleId}${quote}` : matched
    },
  )
}

/**
 * 给相对导入补齐 JS 后缀。
 *
 * TypeScript 声明文件里可以写 './foo'，但最终 ESM 发布包更推荐显式对应 './foo.js'。
 * Element Plus 的发布类型也是这种风格。
 */
function rewriteRelativeTypeImports(content: string, filePath: string) {
  return content.replace(/(["'])(\.{1,2}\/[^"']+)\1/g, (matched, quote: string, moduleId: string) => {
    const rewrittenModuleId = getJsTypeModuleId(moduleId, filePath)
    return rewrittenModuleId ? `${quote}${rewrittenModuleId}${quote}` : matched
  })
}

/**
 * 根据当前 .d.ts 文件位置，把发布包内路径转换成相对路径。
 *
 * 例如当前文件是：
 * dist/hd-custom/es/components/date-picker/index.d.ts
 *
 * moduleId 是：
 * @rdeam/hd-ui/es/utils
 *
 * 那么会转换成：
 * ../../utils
 */
function getRelativePublishModuleId(moduleId: string, filePath: string, publishTypesDir: string) {
  const publishSubPath = getPublishSubPath(moduleId)
  if (publishSubPath === undefined) {
    return undefined
  }

  const targetPath = path.join(publishTypesDir, publishSubPath)
  const sourceDir = path.dirname(filePath)
  const relativePath = path.relative(sourceDir, targetPath).replaceAll(path.sep, '/')

  // 如果当前文件引用的就是 es 根目录本身，则使用 ./index，后续会被补成 ./index.js。
  return relativePath ? (relativePath.startsWith('.') ? relativePath : `./${relativePath}`) : './index'
}

/**
 * 把各种内部模块名映射成 dist/hd-custom/es 下的子路径。
 *
 * 示例：
 * @rdeam/hd-ui/es/components/date-picker -> components/date-picker
 * @hd-custom/components/date-picker -> components/date-picker
 * @hd-custom/utils -> utils
 * @hd-custom/share -> share
 */
function getPublishSubPath(moduleId: string) {
  if (moduleId === '@rdeam/hd-ui/es') {
    return ''
  }

  if (moduleId.startsWith('@rdeam/hd-ui/es/')) {
    return moduleId.slice('@rdeam/hd-ui/es/'.length)
  }

  for (const aliasName of ['components', 'directives', 'hooks', 'utils', 'share']) {
    const aliasPrefix = `@hd-custom/${aliasName}`
    if (moduleId === aliasPrefix) {
      return aliasName
    }

    if (moduleId.startsWith(`${aliasPrefix}/`)) {
      return `${aliasName}/${moduleId.slice(aliasPrefix.length + 1)}`
    }
  }

  return undefined
}

/**
 * 判断某个相对类型导入最终应该对应哪个 JS 模块路径。
 */
function getJsTypeModuleId(moduleId: string, filePath: string) {
  // 已经有明确扩展名的路径不再处理，避免把 .js / .css 等路径重复改写。
  if (hasKnownModuleExtension(moduleId)) {
    return moduleId
  }

  const sourceDir = path.dirname(filePath)
  const absoluteModulePath = path.resolve(sourceDir, moduleId)

  // Vue 单文件组件会生成 xxx.vue.d.ts 和 xxx.vue.mjs，对外声明里引用 xxx.vue.js。
  if (moduleId.endsWith('.vue')) {
    return `${moduleId}.js`
  }

  // 如果存在同名 .d.ts，说明它对应同名 JS 模块。
  // 例如 ./defaults -> ./defaults.js。
  if (pathExistsSync(`${absoluteModulePath}.d.ts`)) {
    return `${moduleId}.js`
  }

  // 如果存在 index.d.ts，说明它对应目录入口。
  // 例如 ./components -> ./components/index.js。
  if (pathExistsSync(path.join(absoluteModulePath, 'index.d.ts'))) {
    return `${moduleId}/index.js`
  }

  return undefined
}

/**
 * 判断导入路径是否已经带有明确扩展名。
 */
function hasKnownModuleExtension(moduleId: string) {
  return /\.[cm]?[jt]s$|\.json$|\.css$|\.scss$/.test(moduleId)
}

/**
 * 轻量同步文件存在判断。
 *
 * 这里在字符串重写中会被频繁调用，同步判断比异步 Promise 更简单直接。
 */
function pathExistsSync(filePath: string) {
  return existsSync(filePath)
}

/**
 * 校验最终发布入口是否完整。
 *
 * 这一步是保护构建质量的兜底：
 * 1. 必须存在 es/index.d.ts。
 * 2. 必须存在 es/index.mjs。
 * 3. es/index.d.ts 不能残留内部别名或包名自引用。
 */
async function assertPublishEntrypoints(publishTypesDir: string) {
  const indexDtsPath = path.join(publishTypesDir, 'index.d.ts')
  const indexMjsPath = path.join(publishTypesDir, 'index.mjs')

  if (!(await pathExists(indexDtsPath))) {
    throw new Error(`缺少发布类型入口：${indexDtsPath}`)
  }

  if (!(await pathExists(indexMjsPath))) {
    throw new Error(`缺少发布模块入口：${indexMjsPath}`)
  }

  const indexDts = await readFile(indexDtsPath, 'utf8')
  if (indexDts.includes('@rdeam/hd-ui/es') || indexDts.includes('@hd-custom/')) {
    throw new Error(`发布类型入口仍包含内部别名或包名自引用：${indexDtsPath}`)
  }
}
