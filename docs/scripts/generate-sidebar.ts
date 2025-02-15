import fs from 'fs'
import { promises as fsPromises } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'
import { consola } from 'consola'
import { exit } from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置项
interface Config {
  docsDir: string // 文档目录
  outputFile: string // 输出文件
  include: string[] // 包含的文件
}

// 基础配置

const config: Config = {
  docsDir: path.resolve(__dirname, '../'),
  outputFile: path.resolve(__dirname, '../.vitepress/config/sidebarscg.json'),
  include: ['guide', 'components', 'others', 'yto-utils'],
}

interface SidebarItem {
  text: string
  link: string
}

interface SidebarGroup {
  text: string
  items: SidebarItem[]
}

interface SidebarConfig {
  [key: string]: SidebarGroup
}

/// 获取目录下的 md 文件
async function getMdFiles(dir: string): Promise<string[]> {
  if (!fs.existsSync(dir)) {
    return []
  }
  try {
    const files = await fsPromises.readdir(dir)
    return files.filter((file) => file.endsWith('.md'))
  } catch (error) {
    consola.error(`读取目录失败：${dir}`, error)
    return []
  }
}

// 从 md 文件中提取 title
async function getTitle(filePath: string): Promise<string> {
  try {
    const content = await fsPromises.readFile(filePath, 'utf-8')
    const { data } = matter(content)
    return data.title || path.basename(filePath, '.md')
  } catch (error) {
    console.error(`读取文件失败：${filePath}`, error)
    return path.basename(filePath, '.md')
  }
}

// 获取目录的 title（从 index.md）
async function getDirTitle(dirPath: string): Promise<string> {
  const indexPath = path.join(dirPath, 'index.md')
  if (fs.existsSync(indexPath)) {
    const content = await fsPromises.readFile(indexPath, 'utf-8')
    const { data } = matter(content)
    return data.title || path.basename(dirPath)
  }
  return path.basename(dirPath)
}

// 生成 sidebar 配置
async function genreateSidebar(): Promise<SidebarConfig> {
  const sidebar: SidebarConfig = {}

  // 按顺序处理每个目录
  for (const dir of config.include) {
    const dirPath = path.join(config.docsDir, dir)
    try {
      // 检查目录是否存在
      await fsPromises.access(dirPath)
    } catch (error) {
      consola.warn(`目录不存在：${dir}`)
      continue
    }

    const mdFiles = await getMdFiles(dirPath)
    const validFiles = mdFiles.filter((file) => file !== 'index.md')
    if (validFiles.length > 0) {
      const items = await Promise.all(
        validFiles.map(async (file) => ({
          text: await getTitle(path.join(dirPath, file)),
          link: `/${path.basename(file, '.md')}`,
        })),
      )

      sidebar[`${dir}`] = {
        text: await getDirTitle(dirPath),
        items: items.sort((a, b) => a.text.localeCompare(b.text)),
      }
    }
  }

  return sidebar
}

// 创建输出目录（如果不存在）
async function ensureOutputDir() {
  const outputDir = path.dirname(config.outputFile)
  try {
    await fsPromises.access(outputDir)
  } catch (error) {
    await fsPromises.mkdir(outputDir, { recursive: true })
  }
}

// 主函数

async function main() {
  try {
    consola.start('开始生成侧边栏配置...')

    // 确保输出目录存在
    await ensureOutputDir()

    // 生成配置
    const sidebarConfig = await genreateSidebar()

    // 写入文件
    await fsPromises.writeFile(config.outputFile, JSON.stringify(sidebarConfig, null, 2), 'utf-8')
    consola.success('侧边栏配置生成成功')
  } catch (error) {
    consola.error('生成侧边栏配置失败', error)
    exit(1)
  }
}

// 运行脚本
; (async () => {
  await main()
})()
