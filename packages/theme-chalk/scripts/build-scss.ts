import path from 'node:path'
import fs from 'node:fs/promises'
import * as sass from 'sass'
import glob from 'fast-glob'
import { createGenerator } from '@unocss/core'
import presetWind from '@unocss/preset-wind'
import { presetAttributify } from '@unocss/preset-attributify'
import { compRoot } from '@yto-custom/build-utils'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function buildScss() {
  // 1. 扫描所有组件目录
  const componentDirs = await glob('*', {
    cwd: compRoot,
    onlyDirectories: true
  })

  // 创建 dist 目录
  const distDir = path.resolve(__dirname, '../dist')
  await fs.mkdir(distDir, { recursive: true })

  // 修改 SASS 选项配置
  const sassOptions = {
    loadPaths: [
      path.resolve(__dirname, '..'),
      path.resolve(__dirname, '../src'),
      compRoot
    ],
    importers: [{
      // 添加自定义导入器来处理相对路径
      findFileUrl(url) {
        if (url.startsWith('.')) {
          return new URL(
            `file://${path.resolve(__dirname, '../src', url)}`
          )
        }
        return null
      }
    }]
  }

  // 创建 UnoCSS 生成器
  const uno = createGenerator({
    presets: [
      presetWind({
        preflight: false
      }),
      presetAttributify()
    ]
  })

  const cssFiles: string[] = []

  // 2. 处理每个组件
  for (const component of componentDirs) {
    // 查找组件的主 SCSS 文件
    const scssFiles = await glob([
      `${component}/src/**/*.scss`,
      `${component}/src/*.scss`
    ], {
      cwd: compRoot
    })

    if (scssFiles.length === 0) continue

    for (const scssFile of scssFiles) {
      const scssContent = await fs.readFile(
        path.resolve(compRoot, scssFile),
        'utf-8'
      )

      // 1. 先处理 SCSS 中的 UnoCSS 语法
      const { css: unoInScss } = await uno.generate(scssContent)

      // 2. 将处理后的 UnoCSS 内容写入临时文件
      const tempScssPath = path.resolve(distDir, `${component}-temp.scss`)
      await fs.writeFile(
        tempScssPath,
        `${scssContent}\n${unoInScss}`
      )

      // 3. 编译包含 UnoCSS 的 SCSS
      const result = sass.compile(tempScssPath, sassOptions)

      // 4. 删除临时文件
      await fs.unlink(tempScssPath)

      // 生成组件 CSS 文件
      const cssFileName = `${component}.css`
      await fs.writeFile(
        path.resolve(distDir, cssFileName),
        result.css
      )

      cssFiles.push(cssFileName)
    }

    // 处理组件中的 Vue/TSX 文件中的 UnoCSS
    const componentFiles = await glob([
      `${component}/src/**/*.{vue,tsx}`,
      `${component}/src/*.{vue,tsx}`
    ], {
      cwd: compRoot
    })

    if (componentFiles.length > 0) {
      const componentContent = await Promise.all(
        componentFiles.map(file =>
          fs.readFile(
            path.resolve(compRoot, file),
            'utf-8'
          )
        )
      )

      // 生成组件的 UnoCSS
      const { css: unoCss } = await uno.generate(componentContent.join('\n'))

      // 如果有 UnoCSS 内容，追加到组件的 CSS 文件中
      if (unoCss) {
        const cssPath = path.resolve(distDir, `${component}.css`)
        const existingCss = await fs.readFile(cssPath, 'utf-8')
        await fs.writeFile(
          cssPath,
          `${existingCss}\n${unoCss}`
        )
      }
    }
  }

  // 3. 生成主入口文件
  const indexContent = cssFiles
    .map(file => `@import './${file}';`)
    .join('\n')

  await fs.writeFile(
    path.resolve(distDir, 'index.css'),
    indexContent
  )
}

buildScss().catch(console.error)