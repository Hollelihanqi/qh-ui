#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const COMPONENT_NAME_REGEXP = /^[a-z]+(-[a-z]+)*$/
const COMPONENTS_DIR = resolve(__dirname, '../packages/components')

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

function printNameRules() {
  console.log('组件名称格式要求：')
  console.log('1. 只能包含小写字母和中横线')
  console.log('2. 必须使用中横线连接单词')
  console.log('3. 不能以中横线开头或结尾')
  console.log('正确示例：my-component, button, date-picker')
  console.log('----------------------------------------')
}

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

async function ask(question: string) {
  return (await rl.question(question)).trim()
}

async function main() {
  printNameRules()

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
    throw new Error(`组件 '${componentName}' 不存在于 ${componentDir}`)
  }

  const confirm = await ask(`确定要删除组件 '${componentName}' 吗？此操作不可恢复 (Y/n)：`)
  if (confirm && confirm !== 'y' && confirm !== 'Y') {
    console.log('操作已取消')
    return
  }

  await rm(componentDir, { recursive: true, force: true })
  console.log(`已删除组件目录：${componentDir}`)

  console.log('正在更新组件索引...')
  await runCommand('pnpm', ['gen-component-import'])

  console.log(`组件 '${componentName}' 已成功移除！`)
}

try {
  await main()
} catch (error) {
  console.error(`错误：${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
} finally {
  rl.close()
}
