// 导入Node.js的内置模块
import path from 'node:path' // 用于处理文件路径
import { readFile, writeFile } from 'node:fs/promises' // 用于异步文件读写操作
import fs from 'node:fs' // 用于同步文件检查

// 导入第三方库
import glob from 'fast-glob' // 用于快速查找匹配指定模式的文件
import { copy, remove, ensureDir } from 'fs-extra' // 增强的文件系统操作库，用于文件复制和删除

// 导入自定义构建工具
import { buildOutput, projRoot } from '@yto-custom/build-utils' // 获取构建输出目录路径
import { pathRewriter, run } from './utils' // 导入工具函数，用于路径重写和命令执行

const copyTypesDefinitions = () => {
  // const src = path.resolve(buildOutput, 'types', 'packages')
  // const copyTypes = (module: any) =>
  //   withTaskName(`copyTypes:${module}`, () => copy(src, buildConfig[module].output.path, { recursive: true }))
  // return parallel(copyTypes('esm'))(done)
}

/**
 *
 * 生成类型定义文件
 * 该函数负责生成、处理和组织TypeScript类型声明文件
 */
export const generateTypesDefinitions = async () => {
  // 使用Vue的TypeScript编译器生成类型声明文件
  // 直接指定正确的目标目录
  const tsConfigPath = path.resolve(projRoot, 'tsconfig.web.json')
  const outputTypesDir = path.resolve(projRoot, 'dist/types')

  console.log('TypeScript 配置文件路径:', tsConfigPath)
  console.log('类型文件输出目录:', outputTypesDir)

  await run(`npx vue-tsc -p ${tsConfigPath} --declaration --emitDeclarationOnly --declarationDir ${outputTypesDir}`)

  // console.log(`开始检查生成的类型文件`)

  // const typesDir = path.join(buildOutput, 'types', 'packages')
  // const filePaths = await glob(`**/*.d.ts`, {
  //   cwd: typesDir,
  //   absolute: true,
  //   ignore: ['**/yto-utils/**']
  // })

  // const rewriteTasks = filePaths.map(async (filePath) => {
  //   const content = await readFile(filePath, 'utf8')
  //   await writeFile(filePath, pathRewriter('esm')(content), 'utf8')
  // })

  // await Promise.all(rewriteTasks)

  // const sourceDir = path.join(typesDir, 'yto-custom')

  // await copy(sourceDir, typesDir)
  // await remove(sourceDir)
  // copyTypesDefinitions()
}
