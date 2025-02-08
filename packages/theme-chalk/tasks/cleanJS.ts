import tinyGlob from 'tiny-glob'
import { rimraf } from 'rimraf'
import { consola } from 'consola'

async function cleanJS() {
  consola.start('开始清理 JS 文件')
  // 使用 tiny-glob 快速查找文件
  const files = await tinyGlob('dist/**/*.js')

  // 使用 rimraf 高效删除
  await rimraf(files)

  consola.success('JS 文件清理完成')
}

cleanJS()
