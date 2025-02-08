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
import { ytoOutput } from '@yto-custom/build-utils'
import { consola } from 'consola'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
// 确保目标目录存在
const targetDir = resolve(ytoOutput, 'theme-chalk')

async function mergeCssFiles(distPath: string): Promise<void> {
  const cssFiles = readdirSync(distPath).filter((file) => file.endsWith('.css'))

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
