import myEslintConfig from '@hd/eslint-config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取 .eslintrc-auto-import.json 文件
// const autoImportPath = path.resolve(__dirname, 'packages/play/.eslintrc-auto-import.json')
// const autoImportConfig = JSON.parse(fs.readFileSync(autoImportPath, 'utf8'))

export default [
  ...myEslintConfig,
  {
    languageOptions: {
      globals: {
        // ...autoImportConfig.globals, // 合并自动导入的 globals
      },
    },
  },
  {
    ignores: [
      'play/*',
      'eslint.config.js',
      'docs/*',
      'template/*',
      'packages/hd-eslint/*',
      'internal/*',
      'packages/utils/*',
      'packages/share/*',
    ],
  },
]
