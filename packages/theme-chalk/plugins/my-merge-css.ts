import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  copyFileSync,
  rmSync,
} from 'node:fs'
import { Plugin, PluginOption } from 'vite'
import { hdOutput } from '@hd-custom/build-utils'
import { consola } from 'consola'
import { getComponentStyleName } from '@hd-custom/build-constants'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
// 确保目标目录存在
const targetDir = resolve(hdOutput, 'theme-chalk')

async function mergeCssFiles(distPath: string): Promise<void> {
  // 获取所有的组件名称（通过某种方式，这里需要您提供组件列表）
  const components = getComponentNames()

  const cssFiles = readdirSync(distPath).filter((file) => file.endsWith('.css'))

  // 为没有样式文件的组件创建空的 CSS 文件
  for (const component of components) {
    const cssFileName = `${component}.css`
    if (!cssFiles.includes(cssFileName)) {
      writeFileSync(resolve(distPath, cssFileName), '', 'utf-8')
      cssFiles.push(cssFileName)
    }
  }

  const cssMap = cssFiles.reduce((map, file) => {
    const baseName = file.replace(/\d*\.css$/, '.css')
    const content = readFileSync(resolve(distPath, file), 'utf-8')

    if (map.has(baseName)) {
      map.set(baseName, map.get(baseName)! + content)
      unlinkSync(resolve(distPath, file))
    } else {
      map.set(baseName, content)
    }

    return map
  }, new Map<string, string>())

  // 写入合并后的文件
  for (const [fileName, content] of cssMap.entries()) {
    writeFileSync(resolve(distPath, fileName), content, 'utf-8')
  }
}

// 获取所有组件名称的函数
function getComponentNames(): string[] {
  const indexPath = resolve(__dirname, '../../components/index.ts')
  const content = readFileSync(indexPath, 'utf-8')

  // 匹配所有 export * from './xxx' 的组件名
  const componentMatches = content.matchAll(/export \* from '\.\/([^']+)'/g)

  return Array.from(componentMatches)
    .map((match) => match[1])
    .map((name) => getComponentStyleName(name))
}

export default function myMergeCssPlugin(): PluginOption {
  return {
    name: 'my-merge-css',
    enforce: 'post',
    closeBundle: async () => {
      const distPath = resolve(__dirname, '../dist')
      try {
        consola.start('开始合并 CSS 文件')
        // 先合并文件
        await mergeCssFiles(distPath)

        // 确保目标目录存在，如果存在则先清空
        if (existsSync(targetDir)) {
          rmSync(targetDir, { recursive: true, force: true })
        }
        mkdirSync(targetDir, { recursive: true })

        // 复制合并后的文件
        const finalCssFiles = readdirSync(distPath).filter((file) => file.endsWith('.css'))
        for (const file of finalCssFiles) {
          const sourcePath = resolve(distPath, file)
          const targetPath = resolve(targetDir, file)
          copyFileSync(sourcePath, targetPath)
        }

        consola.success('合并 CSS 文件完成, 文件已复制到目标目录')
      } catch (error) {
        consola.error('合并 CSS 文件时发生错误:')
        throw error // 抛出错误以确保构建失败
      }
    },
  } as Plugin
}
