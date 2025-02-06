import path from 'path'
import fs from 'fs/promises'
import glob from 'glob'
import CleanCSS from 'clean-css'

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

// CSS 规则去重处理
function deduplicateCSS(css: string): string {
  // 分割成单独的规则，但保持 @keyframes 规则完整
  const rules: string[] = []
  let currentRule = ''
  let inKeyframes = false

  css.split('}').forEach(part => {
    if (!part.trim()) return

    if (part.includes('@keyframes')) {
      inKeyframes = true
      currentRule = part + '}'
    } else if (inKeyframes) {
      currentRule += part + '}'
      if (part.trim().startsWith('}')) {
        rules.push(currentRule)
        currentRule = ''
        inKeyframes = false
      }
    } else {
      rules.push(part.trim() + '}')
    }
  })

  const uniqueRules = new Set<string>()
  let currentMedia = ''
  const processedRules: string[] = []

  rules.forEach(rule => {
    // 处理 @keyframes
    if (rule.startsWith('@keyframes')) {
      if (!uniqueRules.has(rule)) {
        uniqueRules.add(rule)
        processedRules.push(rule)
      }
      return
    }

    // 处理媒体查询
    if (rule.startsWith('@media')) {
      currentMedia = rule.substring(0, rule.indexOf('{') + 1)
      const mediaContent = rule.substring(rule.indexOf('{') + 1, rule.lastIndexOf('}'))
      processedRules.push(currentMedia)
      // 递归处理媒体查询内的规则
      const dedupedMediaContent = deduplicateCSS(mediaContent)
      processedRules.push(dedupedMediaContent)
      processedRules.push('}')
      currentMedia = ''
      return
    }

    // 处理普通规则
    const normalizedRule = currentMedia ? currentMedia + rule : rule
    if (!uniqueRules.has(normalizedRule)) {
      uniqueRules.add(normalizedRule)
      processedRules.push(rule)
    }
  })

  return processedRules.join('\n')
}

export async function buildGlobalCSS() {
  try {
    // 读取 dist 目录下除了 index.css 以外的所有 CSS 文件
    const cssFiles = (await globAsync(path.join(distDir, '*.css')))
      .filter(file => path.basename(file) !== 'index.css')
    // 读取并合并所有 CSS 内容
    let mergedCSS = ''
    for (const file of cssFiles) {
      const content = await fs.readFile(file, 'utf-8')
      mergedCSS += content + '\n'
    }

    // 去重处理
    const dedupedCSS = deduplicateCSS(mergedCSS)

    // 压缩 CSS
    const minifiedCSS = cleanCSS.minify(dedupedCSS).styles

    // 写入全局 CSS 文件
    const outputPath = path.join(distDir, 'index.css')
    await fs.writeFile(outputPath, minifiedCSS)

    console.log(`已生成全局 CSS 文件: ${outputPath}`)
  } catch (err) {
    console.error('构建全局 CSS 出错：', err)
    throw err
  }
}