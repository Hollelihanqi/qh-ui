import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { ensureStartingSlash } from '../utils'

// 侧边栏组合式函数，用于处理侧边栏的显示逻辑
export const useSidebar = () => {
  const route = useRoute()
  const { site, page } = useData()
  // 如果页面数据不存在，返回空侧边栏
  if (!page.value) {
    return {
      sidebars: computed(() => []),
      hasSidebar: computed(() => false),
    }
  }
  // 计算侧边栏内容：如果frontmatter中设置sidebar为false则返回空数组，否则返回主题配置中的侧边栏
  const sidebars = computed(() => {
    if (page.value.frontmatter.sidebar === false) return []
    return site.value.themeConfig.sidebars || []
  })
  return {
    sidebars,
    hasSidebar: computed(() => sidebars.value.length > 0),
  }
}

// 检查是否为有效的侧边栏配置
export function isSideBarConfig(sidebar) {
  return sidebar === false || sidebar === 'auto' || Array.isArray(sidebar)
}

// 检查侧边栏项是否为分组（具有children属性）
export function isSideBarGroup(item) {
  return item.children !== undefined
}

// 检查侧边栏是否为空
export function isSideBarEmpty(sidebar) {
  return Array.isArray(sidebar) ? sidebar.length === 0 : !sidebar
}

// 侧边栏项的类型定义
type SidebarItem = {
  text: string // 显示文本
  link: string // 链接地址
}

// 侧边栏配置的类型定义
type SidebarConfig = SidebarItem[]

// 侧边栏的完整类型定义
type Sidebar =
  | {
      [key: string]: SidebarConfig // 键值对形式的侧边栏配置
    }
  | false // 禁用侧边栏
  | 'auto' // 自动生成侧边栏

// 根据当前路径获取对应的侧边栏配置
export function getSidebarConfig(sidebar: Sidebar, path: string) {
  if (sidebar === false || Array.isArray(sidebar) || sidebar === 'auto') {
    return []
  }

  path = ensureStartingSlash(path)
  // 遍历侧边栏配置，找到匹配当前路径的配置
  for (const dir in sidebar) {
    if (path.startsWith(ensureStartingSlash(`${dir}`))) {
      return sidebar[dir]
    }
  }
  return []
}

// 获取扁平化的侧边栏链接列表
export function getFlatSideBarLinks(sidebar) {
  return sidebar.reduce((links, item) => {
    // 如果项目有链接，添加到结果数组中
    if (item.link) {
      links.push({ text: item.text, link: item.link })
    }
    // 如果是分组，递归处理其子项
    if (isSideBarGroup(item)) {
      links = [...links, ...getFlatSideBarLinks(item.items)]
    }
    return links
  }, [])
}
