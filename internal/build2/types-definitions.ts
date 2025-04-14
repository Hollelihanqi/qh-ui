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

/**
 * 生成类型定义文件
 * 该函数负责生成、处理和组织TypeScript类型声明文件
 */
export const generateTypesDefinitions = async () => {
  // 定义类型文件的输出目录路径
  const typesRootDir = path.join(buildOutput, 'types')
  const typesDir = path.join(typesRootDir, 'packages')

  // 确保类型根目录存在
  await ensureDir(typesRootDir)

  // 确保typesDir目录存在
  await ensureDir(typesDir)

  // 使用Vue的TypeScript编译器生成类型声明文件
  // 直接指定正确的目标目录
  await run(`npx vue-tsc -p tsconfig.web.json --declaration --emitDeclarationOnly --declarationDir ${typesRootDir}`)

  console.log(`开始检查生成的类型文件，目录: ${typesRootDir}`)

  // 检查是否存在类型文件
  const allFilePaths = await glob(`**/*.d.ts`, {
    cwd: typesRootDir,
    absolute: true,
  })

  console.log(`找到 ${allFilePaths.length} 个类型文件`)

  // 如果yto-custom目录不存在，但找到了类型文件，可能是生成到了不同的位置
  const expectedSourceDir = path.join(typesDir, 'yto-custom')
  if (!fs.existsSync(expectedSourceDir) && allFilePaths.length > 0) {
    // 查找所有类型文件并将它们重新组织
    console.log(`yto-custom目录不存在，但找到了类型文件，尝试整理...`)

    // 处理类型文件，重写和整理它们
    for (const filePath of allFilePaths) {
      try {
        const content = await readFile(filePath, 'utf8')
        const rewrittenContent = pathRewriter('esm')(content)
        await writeFile(filePath, rewrittenContent, 'utf8')
      } catch (err) {
        console.warn(`处理文件 ${filePath} 时出错:`, err)
      }
    }

    // 尝试通过检查目录结构来查找实际的yto-custom目录
    const dirsInTypes = fs
      .readdirSync(typesRootDir)
      .filter((name) => fs.statSync(path.join(typesRootDir, name)).isDirectory())

    console.log(`在types目录下找到以下目录: ${dirsInTypes.join(', ')}`)

    // 如果找到了yto-custom目录或者有任何source目录
    let foundSourceDir = null
    for (const dir of dirsInTypes) {
      if (dir === 'yto-custom' || dir === 'packages' || dir === 'components') {
        foundSourceDir = path.join(typesRootDir, dir)
        break
      }
    }

    if (foundSourceDir) {
      console.log(`找到源目录: ${foundSourceDir}，复制到: ${typesDir}`)
      await copy(foundSourceDir, typesDir)
      await remove(foundSourceDir)
    } else {
      console.warn(`未能找到源目录，跳过复制操作`)
    }

    return
  }

  // 查找所有生成的.d.ts类型声明文件，但排除yto-utils目录下的文件
  const filePaths = await glob(`**/*.d.ts`, {
    cwd: typesDir,
    absolute: true,
    ignore: ['**/yto-utils/**'],
  })

  // 并行处理每个类型文件，重写文件中的路径引用
  const rewriteTasks = filePaths.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8')
    await writeFile(filePath, pathRewriter('esm')(content), 'utf8')
  })
  await Promise.all(rewriteTasks)

  // 将yto-custom目录中的类型文件复制到types目录下
  const sourceDir = path.join(typesDir, 'yto-custom')

  // 检查sourceDir是否存在，不存在则创建一个空目录
  if (!fs.existsSync(sourceDir)) {
    console.warn(`警告: ${sourceDir} 目录不存在，将跳过复制操作`)
    return // 直接返回，不执行后续复制和删除操作
  }

  await copy(sourceDir, typesDir)

  // 清理完成后删除原始的yto-custom目录
  await remove(sourceDir)
}
