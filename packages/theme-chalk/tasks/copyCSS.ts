import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'url'
import { globSync } from 'glob'
import { hdOutput } from '@hd-custom/build-utils'
import { consola } from 'consola'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function copyCSS() {
  consola.start('开始复制 CSS 文件')
  // 获取所有 CSS 文件
  const cssFiles = globSync('dist/*.css', {
    cwd: resolve(__dirname, '..'),
    absolute: true,
  })

  // 确保目标目录存在
  const targetDir = resolve(hdOutput, 'theme-chalk')
  await mkdir(targetDir, { recursive: true })

  // 复制所有 CSS 文件
  for (const file of cssFiles) {
    const fileName = file.split('/').pop()
    const targetPath = resolve(targetDir, fileName!)
    await copyFile(file, targetPath)
  }

  consola.success('CSS 文件复制完成')
}

export default copyCSS
