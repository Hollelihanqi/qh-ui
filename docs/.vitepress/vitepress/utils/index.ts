import { isExternal } from 'vitepress/dist/client/shared'

export * from './colors'

export { isExternal, isActive } from 'vitepress/dist/client/shared'
export { ensureStartingSlash } from 'vitepress/dist/client/theme-default/support/utils'

const endingSlashRE = /\/$/

/**
 * 将字符串转换为 base64 编码
 * @param data 需要编码的字符串
 * @returns base64 编码后的字符串
 */
export function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)))
}

/**
 * 创建一个节流和防抖的组合函数
 * @param fn 需要执行的函数
 * @param delay 延迟时间（毫秒）
 * @returns 包含节流和防抖功能的新函数
 */
export const throttleAndDebounce = (fn: () => any, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let lastRun = 0

  return () => {
    const now = Date.now()

    if (lastRun && now < lastRun + delay) {
      // 如果在节流时间内，则设置防抖定时器
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        lastRun = now
        fn()
      }, delay)
    } else {
      // 如果超过节流时间，立即执行
      lastRun = now
      fn()
    }
  }
}

/**
 * 创建 GitHub 编辑链接
 * @param docsRepo 文档仓库地址
 * @param docsDir 文档目录
 * @param docsBranch 文档分支
 * @param path 文件路径
 * @param folder 文件夹名称，默认为 'examples/'
 * @param ext 文件扩展名，默认为 '.vue'
 * @returns GitHub 编辑链接
 */
export function createGitHubUrl(
  docsRepo: string,
  docsDir: string,
  docsBranch: string,
  path: string,
  folder = 'examples/',
  ext = '.vue',
) {
  // 判断是否为外部仓库链接，如果是则直接使用，否则构建 GitHub 链接
  const base = isExternal(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`
  return `${base.replace(endingSlashRE, '')}/edit/${docsBranch}/${
    docsDir ? `${docsDir.replace(endingSlashRE, '')}/` : ''
  }${folder || ''}${path}${ext || ''}`
}
