import { resolve } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { compRoot } from '@yto-custom/build-utils'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 添加删除目录的工具函数
function removeDir(dir: string) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir)
    files.forEach((file) => {
      const filePath = resolve(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        removeDir(filePath)
      } else {
        fs.unlinkSync(filePath)
      }
    })
    fs.rmdirSync(dir)
  }
}

function generateComponentEntry() {
  const components = fs.readdirSync(compRoot).filter((name) => {
    const componentDir = resolve(compRoot, name)
    return fs.statSync(componentDir).isDirectory()
  })

  // 创建存放入口文件的目录
  const entriesDir = resolve(__dirname, './entries')

  // 清空并重新创建 entries 目录
  removeDir(entriesDir)
  fs.mkdirSync(entriesDir)

  components.forEach((name) => {
    const componentDir = resolve(compRoot, name)
    const camelCaseName = name.replace(/-(\w)/g, (_, c) => c.toUpperCase())

    // 读取 style/index.ts 文件内容
    const styleIndexPath = resolve(componentDir, 'style/index.ts')
    let styleContent = ''
    if (fs.existsSync(styleIndexPath)) {
      styleContent = fs.readFileSync(styleIndexPath, 'utf-8')
    }

    // 查找组件文件
    const possibleExtensions = ['.vue', '.tsx']
    let componentFile = ''
    let componentExt = ''

    for (const ext of possibleExtensions) {
      const filePath = resolve(componentDir, `src/${name}${ext}`)
      if (fs.existsSync(filePath)) {
        componentFile = filePath
        componentExt = ext
        break
      }
    }

    if (componentFile) {
      // 生成入口文件内容
      const entryContent = `
${styleContent}
import ${camelCaseName} from '@yto-custom/components/${name}/src/${name}${componentExt === '.tsx' ? '' : componentExt}'

export { ${camelCaseName} }
`
      // 写入组件对应的入口文件
      const componentEntryPath = resolve(entriesDir, `${name}/index.ts`)

      // 确保组件入口文件目录存在
      const componentEntryDir = resolve(entriesDir, name)
      if (!fs.existsSync(componentEntryDir)) {
        fs.mkdirSync(componentEntryDir)
      }

      fs.writeFileSync(componentEntryPath, entryContent.trim())
    }
  })

  // 生成主入口文件，导出所有组件
  const mainEntryContent = components
    .map((name) => {
      // const camelCaseName = name.replace(/-(\w)/g, (_, c) => c.toUpperCase())
      return `export * from './entries/${name}'`
    })
    .join('\n')

  const mainEntryPath = resolve(__dirname, './entry.ts')
  fs.writeFileSync(mainEntryPath, mainEntryContent)

  return mainEntryPath
}

generateComponentEntry()
