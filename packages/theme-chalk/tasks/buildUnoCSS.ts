import { createGenerator } from 'unocss'
import { compRoot } from '@yto-custom/build-utils'
import unoConfig from '../uno.config'
import path from 'path'
import fs from 'fs/promises'
import glob from 'glob'
import CleanCSS from 'clean-css'

// 创建 CleanCSS 实例
const cleanCSS = new CleanCSS({
  level: 2, // 使用更激进的优化
  compatibility: 'ie10' // 设置兼容性
})

// 文件路径配置
const vueAndTsxPath = `${compRoot}/**/*.{vue,tsx}`
const outputDir = './unocss'

// 将 glob 转换为 Promise
const globAsync = (pattern: string) => {
  return new Promise<string[]>((resolve, reject) => {
    glob(pattern, (err, matches) => {
      if (err) {
        reject(err)
      } else {
        // console.log(`找到文件 (${pattern}):`, matches)
        resolve(matches)
      }
    })
  })
}

// 移除重复的 CSS 规则
function deduplicateCSS(css: string): string {
  const rules = css.split('\n')
  const uniqueRules = new Set<string>()
  let currentLayer = ''

  return rules
    .filter(rule => {
      // 保留层注释
      if (rule.startsWith('/* layer:')) {
        currentLayer = rule
        return true
      }

      // 如果是空行，保留
      if (!rule.trim()) {
        return true
      }

      // 为每条规则添加所属层信息，确保不同层的相同规则不会被去重
      const ruleWithLayer = `${currentLayer}:${rule}`
      if (!uniqueRules.has(ruleWithLayer)) {
        uniqueRules.add(ruleWithLayer)
        return true
      }
      return false
    })
    .join('\n')
}

export async function buildUnoCSS() {
  try {
    // 创建 UnoCSS 生成器
    const uno = createGenerator(unoConfig)

    // 确保输出目录存在，如果存在则先清空
    await fs.rm(outputDir, { recursive: true, force: true })
    await fs.mkdir(outputDir, { recursive: true })

    // 获取所有 Vue 和 TSX 文件
    const files = await globAsync(vueAndTsxPath)

    // 按组件分组处理文件
    const componentFiles = files.reduce((acc, file) => {
      const relativePath = path.relative(compRoot, file)
      const componentName = relativePath.split(path.sep)[0]

      if (!acc[componentName]) {
        acc[componentName] = []
      }
      acc[componentName].push(file)
      return acc
    }, {} as Record<string, string[]>)

    // 处理每个组件的文件
    for (const [componentName, files] of Object.entries(componentFiles)) {
      try {
        let componentCss = ''

        // 处理组件的所有文件
        for (const file of files) {
          const content = await fs.readFile(file, 'utf-8')
          const { css } = await uno.generate(content)
          if (css) {
            componentCss += css + '\n'
          }
        }

        if (componentCss) {
          // 去重处理
          const dedupedCss = deduplicateCSS(componentCss)

          // 压缩 CSS
          const minifiedCss = cleanCSS.minify(dedupedCss).styles

          // 写入压缩后的 CSS
          const outputPath = path.join(outputDir, `${componentName}.css`)
          await fs.writeFile(outputPath, minifiedCss)
          // console.log(`生成压缩后的 UnoCSS (${componentName}):`, outputPath)
        }
      } catch (err) {
        console.error(`处理组件失败 ${componentName}:`, err)
      }
    }

    console.log('UnoCSS 构建完成！')
  } catch (err) {
    console.error('构建出错：', err)
    throw err
  }
} 