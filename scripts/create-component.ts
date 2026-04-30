#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'
import {
  getComponentExportName,
  getComponentStyleName,
  toCamelCase,
  toPascalCase,
} from '../internal/build-constants/src/pkg.ts'

type TemplateType = 'sfc' | 'tsx'

/**
 * 组件创建脚本。
 *
 * 支持两种用法：
 * - 交互式：`pnpm gc`
 * - 命令式：`pnpm gc date-picker sfc`
 *
 * 生成内容：
 * - `packages/components/<component>/src`
 * - 组件源码文件：`.vue` 或 `.tsx`
 * - props/emits 类型文件
 * - `instance.ts`
 * - 组件入口 `index.ts`
 * - 样式入口 `style/index.ts`
 *
 * 生成完成后会自动执行 `pnpm gen-component-import`，刷新组件聚合入口。
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
 * kebab-case 转 PascalCase。
 *
 * 示例：`date-picker` -> `DatePicker`
 */
/**
 * 执行外部命令。
 *
 * 新建组件后需要刷新组件聚合入口，所以会调用 `pnpm gen-component-import`。
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

/**
 * 选择组件模板类型。
 *
 * - sfc：生成 `.vue` 单文件组件。
 * - tsx：生成 `.tsx` 函数组件。
 */
async function askTemplateType(): Promise<TemplateType> {
  while (true) {
    console.log('请选择模板类型：')
    console.log('1) sfc')
    console.log('2) tsx')

    const answer = await ask('请输入选项 (1/2，默认 1)：')
    if (!answer || answer === '1' || answer.toLowerCase() === 'sfc') {
      return 'sfc'
    }

    if (answer === '2' || answer.toLowerCase() === 'tsx') {
      return 'tsx'
    }

    console.log('请选择有效选项：1 或 2')
  }
}

/**
 * 生成组件 SCSS 文件内容。
 */
function createScssContent(componentName: string) {
  return `.${getComponentStyleName(componentName)} {
  // 在此处添加组件样式
}
`
}

/**
 * 生成 SFC 组件主体。
 */
function createSfcContent(componentName: string, pascalName: string, camelName: string) {
  return `<template>
  <div class="${getComponentStyleName(componentName)}">
    <!-- 组件内容 -->
  </div>
</template>

<script lang="ts" setup>
import { ${camelName}Props, ${camelName}Emits } from './${componentName}'

defineOptions({
  name: '${pascalName}',
})

const props = defineProps(${camelName}Props)
const emit = defineEmits(${camelName}Emits)
</script>
`
}

/**
 * 生成 props/emits 类型定义文件。
 *
 * SFC 分支会写入 `<component>.ts`；
 * TSX 分支会写入 `i<component>.ts`。
 */
function createPropsContent(pascalName: string, camelName: string) {
  return `import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@hd-custom/utils'

export const ${camelName}Props = buildProps({
  // 在此处定义 props
  // 示例:
  // title: {
  //   type: String,
  //   default: '',
  // },
})

export const ${camelName}Emits = []

export type ${pascalName}Props = ExtractPropTypes<typeof ${camelName}Props>
`
}

/**
 * 生成 TSX 组件主体。
 */
function createTsxContent(componentName: string, pascalName: string, camelName: string) {
  return `import { defineComponent } from 'vue'
import { ${camelName}Props, ${camelName}Emits } from './i${componentName}'

export default defineComponent({
  name: '${pascalName}',
  props: ${camelName}Props,
  emits: ${camelName}Emits,
  setup(props, { emit }) {
    return () => (
      <div class="${getComponentStyleName(componentName)}">
        {/* 组件内容 */}
      </div>
    )
  },
})
`
}

/**
 * 生成组件实例类型文件。
 */
function createInstanceContent(componentName: string, pascalName: string, templateType: TemplateType) {
  const importPath = templateType === 'sfc' ? `./${componentName}.vue` : `./${componentName}`

  return `import type ${pascalName} from '${importPath}'

export type ${pascalName}Instance = InstanceType<typeof ${pascalName}>
`
}

/**
 * 生成组件包入口。
 *
 * 入口负责：
 * - 引入组件。
 * - 使用 `withInstall` 包装安装方法。
 * - 导出 props 类型和实例类型。
 */
function createIndexContent(componentName: string, pascalName: string, templateType: TemplateType) {
  const importPath = templateType === 'sfc' ? `./src/${componentName}.vue` : `./src/${componentName}`
  const exportPath = templateType === 'sfc' ? `./src/${componentName}` : `./src/i${componentName}`

  const exportName = getComponentExportName(componentName)

  return `import { withInstall } from '@hd-custom/utils'

import ${pascalName} from '${importPath}'
import type { SFCWithInstall } from '@hd-custom/utils'

export const ${exportName}: SFCWithInstall<typeof ${pascalName}> = withInstall(${pascalName})
export default ${exportName}

export * from '${exportPath}'
export type { ${pascalName}Instance } from './src/instance'
`
}

/**
 * 生成样式入口。
 */
function createStyleIndexContent(componentName: string) {
  return `import '@hd-custom/components/${componentName}/src/${componentName}.scss'
`
}

/**
 * 打印生成后的目录结构，便于用户确认。
 */
function printCreatedTree(componentName: string, templateType: TemplateType) {
  console.log(`组件 ${componentName} 创建完成`)
  console.log('目录结构：')
  console.log(`packages/components/${componentName}/`)
  console.log('|-- src/')
  console.log(`|   |-- ${componentName}.scss`)
  if (templateType === 'sfc') {
    console.log(`|   |-- ${componentName}.vue`)
    console.log(`|   |-- ${componentName}.ts`)
  } else {
    console.log(`|   |-- ${componentName}.tsx`)
    console.log(`|   |-- i${componentName}.ts`)
  }
  console.log('|   `-- instance.ts')
  console.log('|-- style/')
  console.log('|   `-- index.ts')
  console.log('`-- index.ts')
}

/**
 * 按模板类型创建组件文件。
 */
async function createComponentFiles(componentName: string, templateType: TemplateType) {
  const pascalName = toPascalCase(componentName)
  const camelName = toCamelCase(componentName)
  const componentDir = resolve(COMPONENTS_DIR, componentName)
  const srcDir = resolve(componentDir, 'src')
  const styleDir = resolve(componentDir, 'style')

  await mkdir(srcDir, { recursive: true })
  await mkdir(styleDir, { recursive: true })

  await writeFile(resolve(srcDir, `${componentName}.scss`), createScssContent(componentName), 'utf8')

  if (templateType === 'sfc') {
    await writeFile(
      resolve(srcDir, `${componentName}.vue`),
      createSfcContent(componentName, pascalName, camelName),
      'utf8',
    )
    await writeFile(resolve(srcDir, `${componentName}.ts`), createPropsContent(pascalName, camelName), 'utf8')
  } else {
    await writeFile(
      resolve(srcDir, `${componentName}.tsx`),
      createTsxContent(componentName, pascalName, camelName),
      'utf8',
    )
    await writeFile(resolve(srcDir, `i${componentName}.ts`), createPropsContent(pascalName, camelName), 'utf8')
  }

  await writeFile(
    resolve(srcDir, 'instance.ts'),
    createInstanceContent(componentName, pascalName, templateType),
    'utf8',
  )
  await writeFile(
    resolve(componentDir, 'index.ts'),
    createIndexContent(componentName, pascalName, templateType),
    'utf8',
  )
  await writeFile(resolve(styleDir, 'index.ts'), createStyleIndexContent(componentName), 'utf8')
}

async function main() {
  printNameRules()

  // 第一个参数可直接传组件名；未传时进入交互式输入。
  const inputName = process.argv[2]?.trim()
  const componentName = inputName || (await ask('请输入组件名称：'))

  if (!componentName) {
    throw new Error('组件名称不能为空')
  }

  if (!COMPONENT_NAME_REGEXP.test(componentName)) {
    printNameRules()
    throw new Error('组件名称格式不正确')
  }

  const componentDir = resolve(COMPONENTS_DIR, componentName)
  if (existsSync(componentDir)) {
    throw new Error(`组件 '${componentName}' 已存在：${componentDir}，请换个名称或先删除现有组件`)
  }

  // 第二个参数可直接指定模板类型；未传或非法时进入交互式选择。
  const templateType = process.argv[3]?.trim() as TemplateType | undefined
  const selectedTemplateType = templateType === 'sfc' || templateType === 'tsx' ? templateType : await askTemplateType()

  await createComponentFiles(componentName, selectedTemplateType)
  printCreatedTree(componentName, selectedTemplateType)

  console.log('执行 gen-component-import 命令')
  await runCommand('pnpm', ['gen-component-import'])
}

try {
  await main()
} catch (error) {
  console.error(`错误：${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
} finally {
  rl.close()
}
