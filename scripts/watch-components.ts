#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as chokidar from 'chokidar'
import { getComponentExportName } from '../internal/build-constants/src/pkg.ts'

/**
 * 组件目录监听脚本。
 *
 * 用途：
 * - 监听 `packages/components` 下组件目录的新增和删除。
 * - 自动刷新组件聚合入口，减少开发时的重复手工操作。
 *
 * 监听范围：
 * - 只关心组件包目录级别变化。
 * - 不监听组件内部源码文件变化，因为源码改动不影响聚合入口。
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const COMPONENTS_DIR = path.resolve(__dirname, '../packages/components')
const COMPONENTS_INDEX = path.join(COMPONENTS_DIR, 'index.ts')
const HD_CUSTOM_COMPONENTS = path.resolve(__dirname, '../packages/hd-custom/component.ts')

/**
 * 把组件目录名转换为组件导出名。
 */
function toComponentExportName(component: string) {
  return getComponentExportName(component)
}

/**
 * 读取所有一级组件目录。
 */
function getComponentDirs(): string[] {
  return fs.readdirSync(COMPONENTS_DIR).filter((file) => {
    const stat = fs.statSync(path.join(COMPONENTS_DIR, file))
    return stat.isDirectory() && file !== 'node_modules'
  })
}

/**
 * 写入 `packages/components/index.ts`。
 */
function updateComponentsIndex(components: string[]) {
  const exportStatements = components.map((component) => `export * from './${component}'`).join('\n')

  fs.writeFileSync(COMPONENTS_INDEX, `${exportStatements}\n`)
  console.log('已更新 packages/components/index.ts')
}

/**
 * 写入 `packages/hd-custom/component.ts`。
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
 * 统一刷新所有由组件目录派生出来的入口文件。
 */
function updateAllFiles() {
  const components = getComponentDirs()
  updateComponentsIndex(components)
  updateCustomComponents(components)
}

/**
 * 启动目录监听。
 *
 * 说明：
 * - `addDir`：新建组件目录时触发。
 * - `unlinkDir`：删除组件目录时触发。
 * - 忽略自动生成文件，避免生成文件写入后触发循环更新。
 */
function watchComponents() {
  const watcher = chokidar.watch(COMPONENTS_DIR, {
    ignored: ['**/node_modules/**', COMPONENTS_INDEX, HD_CUSTOM_COMPONENTS, '**/*.spec.ts', '**/*.test.ts'],
    persistent: true,
    ignoreInitial: false,
  })

  watcher
    .on('addDir', (changedPath) => {
      if (changedPath !== COMPONENTS_DIR) {
        console.log(`检测到新组件目录：${changedPath}`)
        updateAllFiles()
      }
    })
    .on('unlinkDir', (changedPath) => {
      if (changedPath !== COMPONENTS_DIR) {
        console.log(`检测到组件目录被删除：${changedPath}`)
        updateAllFiles()
      }
    })

  console.log('开始监听 packages/components 目录变化...')
}

// 脚本入口：启动监听进程。
watchComponents()
