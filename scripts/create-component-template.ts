#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
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
 * 基于 `template/` 目录的组件创建脚本。
 *
 * 这个脚本用于承接旧 Bash 版 `create-component.sh` 的能力：
 * - 从 `template/component.vue`、`template/component.tsx` 等模板文件读取内容。
 * - 按组件名替换占位符。
 * - 生成组件目录和入口文件。
 *
 * 与 `scripts/create-component.ts` 的区别：
 * - 本脚本复用模板文件，适合团队维护统一模板。
 * - `create-component.ts` 使用内联模板，适合快速生成基础结构。
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projRoot = resolve(__dirname, '..')
const componentsDir = resolve(projRoot, 'packages/components')
const templateDir = resolve(projRoot, 'template')
const componentNameRegexp = /^[a-z]+(-[a-z]+)*$/

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
 * 批量替换模板中的固定占位符。
 *
 * 这里使用简单字符串替换，是因为模板占位内容都是明确的代码片段；
 * 不需要引入 AST 或模板引擎，保持脚本轻量。
 */
function replaceAll(input: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce((output, [from, to]) => output.split(from).join(to), input)
}

/**
 * 读取终端输入。
 */
async function ask(question: string) {
  return (await rl.question(question)).trim()
}

/**
 * 选择组件模板类型。
 *
 * - sfc：生成 `.vue` 单文件组件。
 * - tsx：生成 `.tsx` 组件。
 */
async function askTemplateType(): Promise<TemplateType> {
  while (true) {
    console.log('请选择模板类型：')
    console.log('1) sfc')
    console.log('2) tsx')

    const answer = (await ask('请输入选项 (1/2，默认 1)：')).toLowerCase()
    if (!answer || answer === '1' || answer === 'sfc') {
      return 'sfc'
    }
    if (answer === '2' || answer === 'tsx') {
      return 'tsx'
    }

    console.log('请选择有效选项：1 或 2')
  }
}

/**
 * 从 `template/` 目录读取模板文件。
 */
async function readTemplate(name: string) {
  return readFile(resolve(templateDir, name), 'utf8')
}

/**
 * 根据组件名和模板类型创建所有组件文件。
 */
async function createComponentFiles(componentName: string, templateType: TemplateType) {
  const pascalName = toPascalCase(componentName)
  const camelName = toCamelCase(componentName)
  const exportName = getComponentExportName(componentName)
  const componentDir = resolve(componentsDir, componentName)
  const srcDir = resolve(componentDir, 'src')
  const commonReplacements = {
    Component: pascalName,
    componentProps: `${camelName}Props`,
    componentEmits: `${camelName}Emits`,
  }

  await mkdir(srcDir, { recursive: true })
  await writeFile(resolve(srcDir, `${componentName}.scss`), '', 'utf8')

  if (templateType === 'sfc') {
    const vueTemplate = await readTemplate('component.vue')
    const vueContent = replaceAll(vueTemplate, {
      ...commonReplacements,
      "defineOptions({name: 'Component'})": `defineOptions({name: '${pascalName}'})`,
      'class="hd-component"': `class="${getComponentStyleName(componentName)}"`,
      "from './component'": `from './${componentName}'`,
      "name: 'Component'": `name: '${pascalName}'`,
    })

    await writeFile(
      resolve(srcDir, `${componentName}.vue`),
      vueContent.includes('</script>') ? vueContent : `${vueContent}\n</script>\n`,
      'utf8',
    )

    const propsTemplate = await readTemplate('component.ts')
    await writeFile(
      resolve(srcDir, `${componentName}.ts`),
      replaceAll(propsTemplate, {
        ...commonReplacements,
        "from './component'": `from './${componentName}.vue'`,
      }),
      'utf8',
    )
  } else {
    const tsxTemplate = await readTemplate('component.tsx')
    await writeFile(
      resolve(srcDir, `${componentName}.tsx`),
      replaceAll(tsxTemplate, {
        "from './component'": `from './i${componentName}'`,
        'class="hd-component"': `class="${getComponentStyleName(componentName)}"`,
        '{ componentProps, componentEmits }': `{ ${camelName}Props, ${camelName}Emits }`,
        'props: componentProps': `props: ${camelName}Props`,
        'emits: componentEmits': `emits: ${camelName}Emits`,
        "'Component'": `'${pascalName}'`,
      }),
      'utf8',
    )

    const propsTemplate = await readTemplate('component.ts')
    await writeFile(
      resolve(srcDir, `i${componentName}.ts`),
      replaceAll(propsTemplate, {
        ...commonReplacements,
        "from './component'": `from './${componentName}'`,
        'import type Component': `import type ${pascalName}`,
      }),
      'utf8',
    )
  }

  const instanceTemplate = await readTemplate('instance.ts')
  await writeFile(
    resolve(srcDir, 'instance.ts'),
    replaceAll(instanceTemplate, {
      Component: pascalName,
      "'./xxx'": templateType === 'sfc' ? `'./${componentName}.vue'` : `'./${componentName}'`,
    }),
    'utf8',
  )

  const srcIndexTemplate = await readTemplate('src-index.ts')
  await writeFile(
    resolve(componentDir, 'index.ts'),
    replaceAll(srcIndexTemplate, {
      ComponentExport: exportName,
      Component: pascalName,
      "from './src/component.vue'":
        templateType === 'sfc' ? `from './src/${componentName}.vue'` : `from './src/${componentName}'`,
      "from './component'": templateType === 'sfc' ? `from './src/${componentName}'` : `from './src/i${componentName}'`,
    }),
    'utf8',
  )
}

/**
 * 打印生成后的目录结构，便于用户确认本次创建结果。
 */
function printCreatedTree(componentName: string, templateType: TemplateType) {
  console.log(`组件 ${componentName} 创建完成`)
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
  console.log('`-- index.ts')
}

async function main() {
  printNameRules()

  const componentName = process.argv[2]?.trim() || (await ask('请输入组件名称：'))
  if (!componentName) {
    throw new Error('组件名称不能为空')
  }
  if (!componentNameRegexp.test(componentName)) {
    printNameRules()
    throw new Error('组件名称格式不正确')
  }

  const componentDir = resolve(componentsDir, componentName)
  if (existsSync(componentDir)) {
    throw new Error(`组件 '${componentName}' 已存在：${componentDir}`)
  }

  const templateTypeArg = process.argv[3]?.trim().toLowerCase()
  const templateType =
    templateTypeArg === 'sfc' || templateTypeArg === 'tsx' ? templateTypeArg : await askTemplateType()

  await createComponentFiles(componentName, templateType)
  printCreatedTree(componentName, templateType)
}

try {
  await main()
} catch (error) {
  console.error(`错误：${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
} finally {
  rl.close()
}
