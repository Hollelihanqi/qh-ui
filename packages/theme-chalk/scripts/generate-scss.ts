import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compRoot } from '@yto-custom/build-utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputDir = path.resolve(__dirname, '../entries')

// 清除目录
function clearSrcDir(directory: string) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, { recursive: true })
  }
  fs.mkdirSync(directory, { recursive: true })
}

// 处理单个组件
function processComponent(componentPath: string) {
  const componentName = path.basename(componentPath)

  // 创建组件目录
  const componentOutputDir = path.join(outputDir, componentName)
  fs.mkdirSync(componentOutputDir, { recursive: true })

  // 生成 index.ts
  const indexContent = `import 'virtual:uno.css'
import '@yto-custom/components/${componentName}/src/${componentName}.scss'
import '@yto-custom/components/${componentName}'
`
  fs.writeFileSync(path.join(componentOutputDir, 'index.ts'), indexContent)
  return componentName
}

// 主函数
function main() {
  clearSrcDir(outputDir)

  const generatedFiles: string[] = []
  const components = fs.readdirSync(compRoot)
    .map(name => path.join(compRoot, name))
    .filter(p => fs.statSync(p).isDirectory())

  components.forEach(componentPath => {
    const componentName = processComponent(componentPath)
    if (componentName) {
      generatedFiles.push(componentName)
      console.log(`Generated ${componentName}/index.ts`)
    }
  })

  // 生成根目录的 index.ts
  const rootIndexContent = generatedFiles
    .map(name => `import './${name}/index'`)
    .join('\n')
  fs.writeFileSync(path.join(outputDir, 'index.ts'), rootIndexContent)
  console.log('Generated root index.ts')
}

main()
