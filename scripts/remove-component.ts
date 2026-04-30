#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

/**
 * 组件删除脚本。
 *
 * 支持两种用法：
 * - 交互式：`pnpm rc`
 * - 命令式：`pnpm rc button`
 *
 * 删除流程：
 * 1. 校验组件名格式。
 * 2. 确认组件目录存在。
 * 3. 二次确认后删除目录。
 * 4. 执行 `pnpm gen-component-import` 刷新组件聚合入口。
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const COMPONENT_NAME_REGEXP = /^[a-z]+(-[a-z]+)*$/
const COMPONENTS_DIR = resolve(__dirname, '../packages/components')

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

/**
 * 打印组件命名规则。
 */
function printNameRules() {
  console.log('组件名称格式要求：')
  console.log('1. 只能包含小写字母和中横线')
  console.log('2. 多个单词必须使用中横线连接')
  console.log('3. 不能以中横线开头或结尾')
  console.log('正确示例：my-component, button, date-picker')
  console.log('----------------------------------------')
}

/**
 * 执行外部命令。
 *
 * 删除组件后需要刷新自动生成的入口文件，所以这里复用 pnpm script。
 */
function runCommand(command: string, args: string[]) {
  return new Promise<void>((resolveCommand, rejectCommand) => {
    const child = spawn(command, args, {
      shell: process.platform === 'win32',
      stdio: 'inherit',
    })

    child.on('error', rejectCommand)
    child.on('close', (code) => {
      if (code === 0) {
        resolveCommand()
        return
      }

      rejectCommand(new Error(`${command} ${args.join(' ')} failed with exit code ${code}`))
    })
  })
}

/**
 * 读取终端输入并去掉首尾空白。
 */
async function ask(question: string) {
  return (await rl.question(question)).trim()
}

async function main() {
  printNameRules()

  // 第一个命令行参数可直接作为组件名；没有传参时进入交互式输入。
  const inputName = process.argv[2]?.trim()
  const componentName = inputName || (await ask('请输入要删除的组件名称：'))

  if (!componentName) {
    throw new Error('组件名称不能为空')
  }

  if (!COMPONENT_NAME_REGEXP.test(componentName)) {
    printNameRules()
    throw new Error('组件名称格式不正确')
  }

  const componentDir = resolve(COMPONENTS_DIR, componentName)
  if (!existsSync(componentDir)) {
    throw new Error(`组件 '${componentName}' 不存在：${componentDir}`)
  }

  // 删除是不可逆操作，必须二次确认。默认回车表示确认，输入 n/N 才取消。
  const confirm = await ask(`确定要删除组件 '${componentName}' 吗？此操作不可恢复。(Y/n)：`)
  if (confirm && confirm !== 'y' && confirm !== 'Y') {
    console.log('操作已取消')
    return
  }

  await rm(componentDir, { recursive: true, force: true })
  console.log(`已删除组件目录：${componentDir}`)

  console.log('正在更新组件索引...')
  await runCommand('pnpm', ['gen-component-import'])

  console.log(`组件 '${componentName}' 已成功移除`)
}

try {
  await main()
} catch (error) {
  console.error(`错误：${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
} finally {
  rl.close()
}
