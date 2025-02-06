import path from 'path'
import fs from 'fs/promises'
import glob from 'glob'
import CleanCSS from 'clean-css'
import { ytoOutput } from '@yto-custom/build-utils'

// 配置路径
const unocssDir = './unocss'
const bscssDir = './bscss'
const distDir = './dist'

// CleanCSS 实例
const cleanCSS = new CleanCSS({
  level: 2,
  compatibility: 'ie10'
})

// 将 glob 转换为 Promise
const globAsync = (pattern: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob(pattern, (err, matches) => {
      if (err) reject(err)
      else resolve(matches)
    })
  })
}

// 读取文件内容
async function readFile(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf-8')
  } catch (err) {
    console.warn(`读取文件失败: ${filePath}`, err)
    return ''
  }
}

export async function mergeCSSFiles() {
  try {
    // 确保输出目录存在
    await fs.mkdir(distDir, { recursive: true })
    await fs.mkdir(path.join(ytoOutput, 'theme-chalk'), { recursive: true })

    // 读取 unocss 目录下的所有 CSS 文件
    const unoFiles = await globAsync(path.join(unocssDir, '*.css'))

    for (const unoFile of unoFiles) {
      const componentName = path.basename(unoFile, '.css')
      // console.log(`处理组件: ${componentName}`)

      // 读取 unocss 文件内容
      const unoCss = await readFile(unoFile)

      // 查找对应的 bscss 目录下的 CSS 文件
      const bscssSrcDir = path.join(bscssDir, componentName, 'src')
      const bscssFiles = await globAsync(path.join(bscssSrcDir, '**/*.css'))

      // 读取并合并所有 bscss 文件内容
      let bscssCss = ''
      for (const bscssFile of bscssFiles) {
        const content = await readFile(bscssFile)
        bscssCss += content + '\n'
      }

      // 合并 CSS 内容（unocss 在前）
      const mergedCss = unoCss + '\n' + bscssCss

      // 压缩合并后的 CSS
      const minifiedCss = cleanCSS.minify(mergedCss).styles

      // 写入到输出目录
      const outputPath = path.join(distDir, `${componentName}.css`)
      await fs.writeFile(outputPath, minifiedCss)

      // console.log(`已生成合并文件: ${outputPath}`)
      // console.log(`已复制到: ${ytoOutputPath}`)
    }

    // 复制 dist 目录下的所有 CSS 文件到 ytoOutput/theme-chalk
    const distFiles = await globAsync(path.join(distDir, '*.css'))
    for (const file of distFiles) {
      const fileName = path.basename(file)
      const targetPath = path.join(ytoOutput, 'theme-chalk', fileName)
      await fs.copyFile(file, targetPath)
    }

    console.log('CSS 合并和复制完成！')
  } catch (err) {
    console.error('合并过程出错：', err)
    throw err
  }
}