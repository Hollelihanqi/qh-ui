#!/usr/bin/env node
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as fs from 'fs'
import * as path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const COMPONENTS_DIR = path.resolve(__dirname, '../packages/components')
const COMPONENTS_INDEX = path.join(COMPONENTS_DIR, 'index.ts')
const YTO_CUSTOM_COMPONENTS = path.resolve(__dirname, '../packages/yto-custom/component.ts')

// 获取所有组件目录
function getComponentDirs(): string[] {
  return fs.readdirSync(COMPONENTS_DIR).filter((file) => {
    const stat = fs.statSync(path.join(COMPONENTS_DIR, file))
    return stat.isDirectory() && file !== 'node_modules'
  })
}

// 更新 components/index.ts 文件
function updateComponentsIndex(components: string[]) {
  const exportStatements = components.map((component) => `export * from './${component}'`).join('\n')

  fs.writeFileSync(COMPONENTS_INDEX, exportStatements + '\n')
  console.log('已更新 components/index.ts 文件')
}

// 更新 yto-custom/component.ts 文件
function updateCustomComponents(components: string[]) {
  const importStatements = components
    .map((component) => {
      const componentName = `Yto${component
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')}`
      return `import { ${componentName} } from '@yto-custom/components/${component}'`
    })
    .join('\n')

  const componentsList = components
    .map(
      (component) =>
        `Yto${component
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('')}`,
    )
    .join(',\n  ')

  const fileContent = `${importStatements}
import type { Plugin } from 'vue'

export default [
  ${componentsList}
] as Plugin[]
`
  fs.writeFileSync(YTO_CUSTOM_COMPONENTS, fileContent)
  console.log('已更新 yto-custom/component.ts 文件')
}

// 执行文件生成
function generateFiles() {
  const components = getComponentDirs()
  updateComponentsIndex(components)
  updateCustomComponents(components)
  console.log('所有文件生成完成')
}

// 执行生成
generateFiles()
