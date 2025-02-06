import { toURL, isBoolean, IOptionTabPane, tabPaneAdd } from 'gold-core'
import { useRouter, useRoute } from 'vue-router'
import { Ref, unref } from 'vue'
const routeChange = (listRoute: Ref<IOptionTabPane[]> | IOptionTabPane[], props: any) => {
  const router = useRouter()
  const route = useRoute()
  const { tabsKeyLabel, formatTab } = props
  const getUrl = (path: string) => {
    let href = path
    const buildUrl = (obj: any) =>
      Object.keys(obj).forEach((key) => {
        href += href.includes('?') ? `&${key}=${obj[key]}` : `?${key}=${obj[key]}`
      })
    buildUrl(Object.assign({}, route?.params, route?.query))
    return href
  }
  const findTabItem = (path: string) => {
    const url = getUrl(path)
    return unref(listRoute).find((item: any) => {
      const urlObj = toURL(item.href as string)
      return urlObj.pathname + urlObj.search === url
    })
  }
  const getTabsItem = (path: string, routers = router?.getRoutes()): any => {
    const curRoute: any = routers?.find((item) => item.path === path)
    if (!curRoute) return null
    const href = getUrl(path)
    const tabItem = {
      code: path,
      href,
      label: curRoute.meta ? curRoute.meta[tabsKeyLabel] : curRoute.name,
      mode: 'router',
      closable: curRoute.meta && isBoolean(curRoute.meta.closable) ? curRoute.meta.closable : undefined,
    }
    return formatTab ? formatTab(tabItem) : tabItem
  }
  const openTab = (path: string) => {
    const tabItem: any = findTabItem(path)
    console.log('watch--layout-router.fullPath-tabItem', tabItem)
    if (tabItem?.href) {
      const tmpItem = formatTab ? formatTab(tabItem) : tabItem
      tabPaneAdd(tmpItem.href as string, { ...tmpItem })
      return
    }
    const tmpItem = getTabsItem(path)
    console.log('watch--layout-router.openTab', tmpItem)
    if (tmpItem) tabPaneAdd(tmpItem.href as string, { ...tmpItem })
  }
  return {
    openTab,
  }
}
export default routeChange
