#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { getComponentExportName } from '../internal/build-constants/src/pkg.ts'

/**
 * 组件聚合入口生成脚本。
 *
 * 根据 `packages/components` 下的一级组件目录自动生成两个文件：
 * - `packages/components/index.ts`：统一导出所有组件。
 * - `packages/hd-custom/component.ts`：生成业务包整体安装所需的组件插件数组。
 *
 * 常见触发方式：
 * - 手动执行 `pnpm gen-component-import`。
 * - 新建组件脚本完成后自动执行。
 * - 删除组件脚本完成后自动执行。
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const COMPONENTS_DIR = path.resolve(__dirname, '../packages/components')
const COMPONENTS_INDEX = path.join(COMPONENTS_DIR, 'index.ts')
const HD_CUSTOM_COMPONENTS = path.resolve(__dirname, '../packages/hd-custom/component.ts')

/**
 * 把 kebab-case 组件目录名转换为组件导出名。
 *
 * 示例：
 * - `date-picker` -> `HdDatePicker`
 * - `water-mark` -> `HdWaterMark`
 */
function toComponentExportName(component: string) {
  return getComponentExportName(component)
}

/**
 * 获取所有一级组件目录。
 *
 * 约定：
 * - 每个一级目录对应一个组件包。
 * - `node_modules` 不是组件目录，需要排除。
 */
function getComponentDirs(): string[] {
  return fs.readdirSync(COMPONENTS_DIR).filter((file) => {
    const stat = fs.statSync(path.join(COMPONENTS_DIR, file))
    return stat.isDirectory() && file !== 'node_modules'
  })
}

/**
 * 更新 `packages/components/index.ts`。
 *
 * 输出示例：
 * export * from './button'
 * export * from './date-picker'
 */
function updateComponentsIndex(components: string[]) {
  const exportStatements = components.map((component) => `export * from './${component}'`).join('\n')

  fs.writeFileSync(COMPONENTS_INDEX, `${exportStatements}\n`)
  console.log('已更新 packages/components/index.ts')
}

/**
 * 更新 `packages/hd-custom/component.ts`。
 *
 * 该文件用于整体安装组件：
 * - 先逐个导入统一前缀的组件，例如 `HdXxx`。
 * - 再把组件组成 `Plugin[]` 数组默认导出。
 */
function updateCustomComponents(components: string[]) {
  const importStatements = components
    .map((component) => `import { ${toComponentExportName(component)} } from '@hd-custom/components/${component}'`)
    .join('\n')

  const componentsList = components.map(toComponentExportName).join(',\n  ')

  const fileContent = `${importStatements}
import type { Plugin } from 'vue'

export default [
  ${componentsList}
] as Plugin[]
`

  fs.writeFileSync(HD_CUSTOM_COMPONENTS, fileContent)
  console.log('已更新 packages/hd-custom/component.ts')
}

/**
 * 生成所有自动维护的入口文件。
 */
function generateFiles() {
  const components = getComponentDirs()
  updateComponentsIndex(components)
  updateCustomComponents(components)
  console.log('组件入口文件生成完成')
}

// 脚本入口：直接执行生成流程。
generateFiles()
