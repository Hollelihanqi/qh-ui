import { compRoot } from '@yto-custom/build-utils'
import fs from 'fs'
import path from 'path'

// 目标目录
const outputIndexFile = path.join(compRoot, 'index.ts')

// 读取 components 目录下的所有子目录
const directories = fs
  .readdirSync(compRoot, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

// 筛选出包含 index.ts 的子目录
const componentDirs = directories.filter((dir) => {
  const indexPath = path.join(compRoot, dir, 'index.ts')
  return fs.existsSync(indexPath)
})

// 生成新的 index.ts 文件内容
const indexContent = componentDirs.map((dir) => `export * from './${dir}'`).join('\n')

// 写入新的 index.ts 文件
fs.writeFileSync(outputIndexFile, indexContent)

console.log('components/index.ts 文件已生成：')
