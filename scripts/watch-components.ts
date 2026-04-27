#!/usr/bin/env node
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as fs from 'fs'
import * as path from 'path'
import * as chokidar from 'chokidar'

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

// 更新所有相关文件
function updateAllFiles() {
  const components = getComponentDirs()
  updateComponentsIndex(components)
  updateCustomComponents(components)
}

// 监听文件变化
function watchComponents() {
  const watcher = chokidar.watch(COMPONENTS_DIR, {
    ignored: ['**/node_modules/**', COMPONENTS_INDEX, YTO_CUSTOM_COMPONENTS, '**/*.spec.ts', '**/*.test.ts'],
    persistent: true,
    ignoreInitial: false,
  })

  watcher
    .on('addDir', (path) => {
      if (path !== COMPONENTS_DIR) {
        console.log(`检测到新组件目录: ${path}`)
        updateAllFiles()
      }
    })
    .on('unlinkDir', (path) => {
      if (path !== COMPONENTS_DIR) {
        console.log(`检测到组件目录被删除: ${path}`)
        updateAllFiles()
      }
    })

  console.log('开始监听 components 目录变化...')
}

// 开始监听
watchComponents()
