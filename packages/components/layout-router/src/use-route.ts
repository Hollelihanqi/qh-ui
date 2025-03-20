import { toURL, IOptionTabPane, tabPaneAdd } from 'gold-core'
import { useRouter, useRoute } from 'vue-router'
import { Ref, unref } from 'vue'

/**
 * 路由变化处理函数
 * @param listRoute 标签页列表，可以是响应式或普通数组
 * @param props 配置属性
 */
const routeChange = (listRoute: Ref<IOptionTabPane[]> | IOptionTabPane[], props: any) => {
  const router = useRouter()
  const route = useRoute()
  const { tabsKeyLabel, formatTab } = props

  /**
   * 根据路径构建完整的 URL
   * @param path 基础路径
   * @returns 包含查询参数的完整 URL
   */
  const getUrl = (path: string) => {
    // 使用 URLSearchParams 替代手动拼接，更安全且能自动处理编码
    const searchParams = new URLSearchParams()
    const params = { ...route?.params, ...route?.query }

    Object.entries(params).forEach(([key, value]) => {
      if (value != null) {
        searchParams.append(key, String(value))
      }
    })

    const queryString = searchParams.toString()
    return queryString ? `${path}?${queryString}` : path
  }

  /**
   * 在标签列表中查找指定路径的标签项
   * @param path 要查找的路径
   * @returns 找到的标签项或 undefined
   */
  const findTabItem = (path: string) => {
    const url = getUrl(path)
    // 使用 Map 缓存 URL 解析结果，避免重复解析
    const urlCache = new Map()
    return unref(listRoute).find((item: any) => {
      if (!item.href) return false
      let urlObj
      if (urlCache.has(item.href)) {
        urlObj = urlCache.get(item.href)
      } else {
        urlObj = toURL(item.href)
        urlCache.set(item.href, urlObj)
      }
      return urlObj.pathname + urlObj.search === url
    })
  }

  /**
   * 根据路径获取标签页配置信息
   * @param path 路由路径
   * @param routers 路由配置列表
   * @returns 标签页配置对象
   */
  const getTabsItem = (path: string, routers = router?.getRoutes()): any => {
    // 缓存路由查找结果
    const routeCache = new Map()

    const findRoute = (targetPath: string) => {
      if (routeCache.has(targetPath)) {
        return routeCache.get(targetPath)
      }

      const route = routers?.find((item) => item.path === targetPath)
      routeCache.set(targetPath, route)
      return route
    }

    const curRoute = findRoute(path)
    if (!curRoute) return null
    const href = getUrl(path)
    const tabItem = {
      code: path,
      href,
      label: curRoute.meta?.[tabsKeyLabel] ?? curRoute.name,
      mode: 'router',
      closable: curRoute.meta?.closable,
    }
    return formatTab ? formatTab(tabItem) : tabItem
  }

  /**
   * 打开新标签页
   * @param path 要打开的路径
   */
  const openTab = (path: string) => {
    // 提前判断路径是否有效
    if (!path) return

    const tabItem = findTabItem(path)
    if (tabItem?.href) {
      // 复用已有标签
      const finalItem = formatTab ? formatTab(tabItem) : tabItem
      tabPaneAdd(finalItem.href, finalItem)
      return
    }

    // 创建新标签
    const newTabItem = getTabsItem(path)
    if (newTabItem) {
      tabPaneAdd(newTabItem.href, newTabItem)
    } else {
      console.warn(`Failed to create tab for path: ${path}`)
    }
  }

  return {
    openTab,
  }
}

export default routeChange
