#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

type TemplateType = 'sfc' | 'tsx'

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

function toPascalCase(name: string) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function toCamelCase(name: string) {
  const pascalName = toPascalCase(name)
  return pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
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

    console.log('请选择有效的选项 (1 或 2)')
  }
}

function createScssContent(componentName: string) {
  return `.yto-${componentName} {
  // 在此处添加样式
}
`
}

function createSfcContent(componentName: string, pascalName: string, camelName: string) {
  return `<template>
  <div class="yto-${componentName}">
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

function createSfcPropsContent(pascalName: string, camelName: string) {
  return `import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const ${camelName}Props = buildProps({
  // 在此处定义 props
  // 示例:
  // title: {
  //   type: String,
  //   default: '',
  // },
  // data: {
  //   type: Array as PropType<{ [key: string]: any }[]>,
  //   default: () => [],
  // },
})

export const ${camelName}Emits = []

export type ${pascalName}Props = ExtractPropTypes<typeof ${camelName}Props>
`
}

function createTsxContent(componentName: string, pascalName: string, camelName: string) {
  return `import { defineComponent } from 'vue'
import { ${camelName}Props, ${camelName}Emits } from './i${componentName}'

export default defineComponent({
  name: '${pascalName}',
  props: ${camelName}Props,
  emits: ${camelName}Emits,
  setup(props, { emit }) {
    return () => (
      <div class="yto-${componentName}">
        {/* 组件内容 */}
      </div>
    )
  },
})
`
}

function createInstanceContent(componentName: string, pascalName: string, templateType: TemplateType) {
  const importPath = templateType === 'sfc' ? `./${componentName}.vue` : `./${componentName}`

  return `import type ${pascalName} from '${importPath}'

export type ${pascalName}Instance = InstanceType<typeof ${pascalName}>
`
}

function createIndexContent(componentName: string, pascalName: string, templateType: TemplateType) {
  const importPath = templateType === 'sfc' ? `./src/${componentName}.vue` : `./src/${componentName}`
  const exportPath = templateType === 'sfc' ? `./src/${componentName}` : `./src/i${componentName}`

  return `import { withInstall } from '@yto-custom/utils'

import ${pascalName} from '${importPath}'
import type { SFCWithInstall } from '@yto-custom/utils'

export const Yto${pascalName}: SFCWithInstall<typeof ${pascalName}> = withInstall(${pascalName})
export default Yto${pascalName}

export * from '${exportPath}'
export type { ${pascalName}Instance } from './src/instance'
`
}

function createStyleIndexContent(componentName: string) {
  return `import '@yto-custom/components/${componentName}/src/${componentName}.scss'
`
}

function printCreatedTree(componentName: string, templateType: TemplateType) {
  console.log(`组件 ${componentName} 创建完成！`)
  console.log('目录结构：')
  console.log(`packages/components/${componentName}/`)
  console.log('├── src/')
  console.log(`│   ├── ${componentName}.scss`)
  if (templateType === 'sfc') {
    console.log(`│   ├── ${componentName}.vue`)
    console.log(`│   ├── ${componentName}.ts`)
  } else {
    console.log(`│   ├── ${componentName}.tsx`)
    console.log(`│   ├── i${componentName}.ts`)
  }
  console.log('│   └── instance.ts')
  console.log('├── style/')
  console.log('│   └── index.ts')
  console.log('└── index.ts')
}

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
    await writeFile(resolve(srcDir, `${componentName}.ts`), createSfcPropsContent(pascalName, camelName), 'utf8')
  } else {
    await writeFile(
      resolve(srcDir, `${componentName}.tsx`),
      createTsxContent(componentName, pascalName, camelName),
      'utf8',
    )
    await writeFile(resolve(srcDir, `i${componentName}.ts`), createSfcPropsContent(pascalName, camelName), 'utf8')
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
    throw new Error(`组件 '${componentName}' 已存在于 ${componentDir}，请换个名称或先删除现有组件`)
  }

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
