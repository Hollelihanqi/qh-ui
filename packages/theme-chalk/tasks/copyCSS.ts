import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'url'
import glob from 'glob'
import { ytoOutput } from '@yto-custom/build-utils'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function copyCSS() {
  // 获取所有 CSS 文件
  const cssFiles = glob.sync('dist/*.css', {
    cwd: resolve(__dirname, '..'),
    absolute: true
  })

  // 确保目标目录存在
  const targetDir = resolve(ytoOutput, 'theme-chalk')
  await mkdir(targetDir, { recursive: true })

  // 复制所有 CSS 文件
  for (const file of cssFiles) {
    const fileName = file.split('/').pop()
    const targetPath = resolve(targetDir, fileName!)
    await copyFile(file, targetPath)
  }
}

export default copyCSS 