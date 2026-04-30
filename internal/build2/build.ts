import { build } from 'vite'
import { copyFile, mkdir } from 'fs/promises'
import { copy, remove } from 'fs-extra'
import path, { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { consola } from 'consola'
import { buildOutput, hdOutput, hdPackage, projRoot } from '@hd-custom/build-utils'
import { generateTypesDefinitions } from './types-definitions2'
import { run } from './utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

type BuildStep = {
  description: string
  run: () => Promise<void>
}

const steps: Record<string, BuildStep> = {
  clean: {
    description: '清理主包输出目录',
    run: cleanOutput,
  },
  ui: {
    description: '构建组件 ES 模块',
    run: buildComponents,
  },
  theme: {
    description: '构建主题样式',
    run: buildThemeChalk,
  },
  types: {
    description: '生成类型声明',
    run: generateTypesDefinitions,
  },
  'copy-resolvers': {
    description: '复制解析器产物',
    run: copyResolvers,
  },
  'copy-files': {
    description: '复制发布附加文件',
    run: copyMiscFiles,
  },
  summary: {
    description: '输出构建完成摘要',
    run: printSummary,
  },
}

async function withTiming(name: string, task: () => Promise<void>) {
  const startTime = Date.now()
  consola.info(chalk.blue(`开始：${name}`))

  await task()

  const timeUsed = ((Date.now() - startTime) / 1000).toFixed(2)
  consola.success(chalk.green(`完成：${name}，耗时 ${timeUsed}s`))
}

async function cleanOutput() {
  // 根 dist 只作为最终发布产物目录，不保留 TypeScript/Nx 的中间输出。
  // internal 工具包自己的产物应留在 internal/*/dist 中，而不是混入根 dist。
  await remove(buildOutput)
  await mkdir(hdOutput, { recursive: true })
}

async function buildComponents() {
  await build({
    configFile: resolve(__dirname, 'vite.config.ts'),
    logLevel: 'info',
  })
}

async function buildThemeChalk() {
  await run('pnpm run -C packages/theme-chalk build')
}

async function copyResolvers() {
  const resolversDistPath = resolve(projRoot, 'internal/resolvers/dist')
  const targetPath = resolve(hdOutput, 'resolvers')

  await mkdir(targetPath, { recursive: true })
  await copy(resolversDistPath, targetPath)
}

async function copyMiscFiles() {
  await mkdir(hdOutput, { recursive: true })
  await Promise.all([
    copyFile(hdPackage, path.join(hdOutput, 'package.json')),
    copyFile(path.resolve(projRoot, 'README.md'), path.resolve(hdOutput, 'README.md')),
    copyFile(path.resolve(projRoot, 'typings', 'global.d.ts'), path.resolve(hdOutput, 'global.d.ts')),
  ])
}

async function printSummary() {
  consola.success(chalk.green(`构建完成，输出目录：${hdOutput}`))
}

async function runStep(stepName: string) {
  const step = steps[stepName]
  if (!step) {
    const names = Object.keys(steps).concat('all').join(', ')
    throw new Error(`未知构建阶段：${stepName}。可用阶段：${names}`)
  }

  await withTiming(step.description, step.run)
}

async function runAll() {
  const startTime = Date.now()

  for (const stepName of ['clean', 'ui', 'theme', 'types', 'copy-resolvers', 'copy-files']) {
    await runStep(stepName)
  }

  const timeUsed = ((Date.now() - startTime) / 1000).toFixed(2)
  consola.success(chalk.green(`全部构建完成，总耗时 ${timeUsed}s`))
}

async function main() {
  const stepName = process.argv[2] ?? 'all'

  try {
    if (stepName === 'all') {
      await runAll()
    } else {
      await runStep(stepName)
    }
  } catch (error) {
    consola.error(chalk.red('构建失败：'), error)
    process.exit(1)
  }
}

main()
