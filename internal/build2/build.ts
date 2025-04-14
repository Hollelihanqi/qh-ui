import { build } from 'vite'
import { copyFile, mkdir } from 'fs/promises'
import { copy, remove } from 'fs-extra'
import path, { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { consola } from 'consola'
import { spawn } from 'child_process'
import type { SpawnOptions } from 'child_process'
import { projRoot, ytoPackage, ytoOutput } from '@yto-custom/build-utils'
import { generateTypesDefinitions } from './types-definitions2'

// 在 ESM 中获取当前文件路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function buildComponents() {
  consola.info(chalk.blue('构建 YTO UI 组件...'))

  try {
    await build({
      configFile: resolve(__dirname, 'vite.config.ts'),
      logLevel: 'info',
    })
    consola.success(chalk.green('组件构建成功！'))
  } catch (error) {
    consola.error(chalk.red('组件构建失败：'), error)
    throw error
  }
}

async function buildThemeChalk() {
  consola.info(chalk.blue('构建主题样式...'))

  try {
    // 执行主题构建
    await new Promise<void>((resolve, reject) => {
      const child = spawn('pnpm', ['run', '-C', 'packages/theme-chalk', 'build'], {
        stdio: 'inherit',
        cwd: projRoot,
      } as SpawnOptions)

      child.on('close', (code: number) => {
        if (code === 0) resolve()
        else reject(new Error(`主题构建失败，退出码: ${code}`))
      })
    })
  } catch (error) {
    consola.error(chalk.red('主题构建失败：'), error)
    throw error
  }
}

async function copyResolvers() {
  consola.info(chalk.blue('构建解析器...'))

  try {
    // 执行解析器构建
    await new Promise<void>((resolve, reject) => {
      const child = spawn('pnpm', ['run', '-C', 'internal/resolvers', 'build'], {
        stdio: 'inherit',
        cwd: projRoot,
      } as SpawnOptions)

      child.on('close', (code: number) => {
        if (code === 0) resolve()
        else reject(new Error(`解析器构建失败，退出码: ${code}`))
      })
    })

    // 复制解析器文件
    const resolversDistPath = resolve(projRoot, 'internal/resolvers/dist')
    const targetPath = resolve(ytoOutput, 'resolvers')
    await mkdir(targetPath, { recursive: true })
    await copy(resolversDistPath, targetPath)

    consola.success(chalk.green('解析器构建并复制成功！'))
  } catch (error) {
    consola.error(chalk.red('解析器构建失败：'), error)
    throw error
  }
}

async function copyMiscFiles() {
  consola.info(chalk.blue('复制附加文件...'))

  try {
    await Promise.all([
      copyFile(ytoPackage, path.join(ytoOutput, 'package.json')),
      copyFile(path.resolve(projRoot, 'README.md'), path.resolve(ytoOutput, 'README.md')),
      copyFile(path.resolve(projRoot, 'typings', 'global.d.ts'), path.resolve(ytoOutput, 'global.d.ts')),
    ])
    consola.success(chalk.green('附加文件复制成功！'))
  } catch (error) {
    consola.error(chalk.red('附加文件复制失败：'), error)
    throw error
  }
}

async function main() {
  try {
    // 清空输出目录
    consola.info(chalk.blue('清理输出目录...'))
    await remove(ytoOutput)
    await mkdir(ytoOutput, { recursive: true })
    consola.success(chalk.green('输出目录已清理！'))

    // 记录开始时间
    const startTime = Date.now()

    // 开始按顺序构建所有内容
    consola.info(chalk.blue('开始按顺序构建所有内容...'))
    // await Promise.all([
    //   // buildComponents(),
    //   generateTypesDefinitions(),
    //   // buildThemeChalk(),
    //   // copyResolvers(),
    // ])

    // 改为顺序执行
    await buildComponents()
    await generateTypesDefinitions()
    // await buildThemeChalk();
    // await copyResolvers();

    // 复制附加文件
    await copyMiscFiles()

    // 计算总耗时
    const endTime = Date.now()
    const timeUsed = (endTime - startTime) / 1000

    consola.success(chalk.green(`构建完成！总耗时: ${timeUsed.toFixed(2)}秒`))
  } catch (error) {
    consola.error(chalk.red('构建失败:'), error)
    process.exit(1)
  }
}

main()
