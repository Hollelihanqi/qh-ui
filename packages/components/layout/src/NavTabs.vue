<template>
  <div
    class="yto-nav-tabs nav-tabs-w tabs-box w-full pt-[8px]"
    :class="activeItem?.mode === LAYOUT_MODE.Router ? 'nav-tabs-router' : 'nav-tabs-frame'"
  >
    <el-tabs v-model="tabsMenuValue" class="h-full" v-bind="$attrs" type="border-card" @tab-remove="handleTabRemove">
      <template v-for="(item, index) in tabsMenuList" :key="item.href">
        <el-tab-pane
          class="overflow-hidden"
          :closable="isBoolean(item.closable) ? item.closable : tabsMenuList.length === 1 ? false : true"
          :name="item.code"
        >
          <template #label>
            <div
              class="content flex h-full"
              :class="`${activePreidx === index ? 'active-pre-tab' : ''} ${
                activePreidx + 2 === index ? 'active-next-tab' : ''
              }`"
            >
              <span class="h-full flex items-center label">{{ item.label }}</span>
              <span
                v-if="isBoolean(item.closable) ? item.closable : tabsMenuList.length === 1 ? false : true"
                class="w-[16px] h-full"
              ></span>
            </div>
          </template>
          <slot :info="item"></slot>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, withDefaults, watch, unref, provide } from 'vue'
import { EnumSessionKey, LAYOUT_MODE } from './constants'
import { tabPaneClose, tabPaneAdd, toURL, IOptionTabPane, isBoolean } from 'gold-core'
import { useRouter, useRoute } from 'vue-router'
import { logger } from '@yto-custom/utils'

defineOptions({
  name: 'NavTabs',
})

interface Props {
  tabsMenuList: IOptionTabPane[]
  keyLabel: string
  formatTab?: Function
  routerGoback: boolean
  orgMenuList: any[]
}
const props = withDefaults(defineProps<Props>(), {
  keyLabel: 'title',
  routerGoback: false,
  tabsMenuList: () => {
    return []
  },
  orgMenuList: () => {
    return []
  },
})
const emit = defineEmits(['tab-remove'])
const tabsMenuValue: any = inject(EnumSessionKey.TabsActivate)
const activeItem = computed(
  () => props.tabsMenuList.find((item) => item.code === unref(tabsMenuValue)) as IOptionTabPane,
)
const router = useRouter()
const route = useRoute()
const handleTabRemove = (closeCode: any) => {
  emit('tab-remove', closeCode)
  tabPaneClose(closeCode)
  //只有关闭当前激活的页签，才需要执行此逻辑
  logger('handleTabRemove-1', closeCode, unref(tabsMenuValue), props.routerGoback)
  if (props.routerGoback && closeCode === unref(tabsMenuValue)) {
    const backItem = props.tabsMenuList.find((item: any) => item.back) as IOptionTabPane
    logger('handleTabRemove', closeCode, props.tabsMenuList, backItem)
    if (!backItem) return
    setTimeout(() => {
      const { href, mode, code } = backItem
      const url = toURL(href as string)
      if (mode === LAYOUT_MODE.Router) {
        router.push(url.pathname + url.search)
      } else {
        router.push(buildCodePath(code))
      }
    }, 0)
  }
}

const activePreidx = computed(() => {
  const idx = props.tabsMenuList.findIndex((e: IOptionTabPane) => e.code === tabsMenuValue.value)
  return idx > 0 ? idx - 1 : -1
})
const buildCodePath = (code?: string) => (code?.startsWith('/') ? code : `/${code}`)

watch(
  () => tabsMenuValue.value,
  (value) => {
    if (!value) return
    const { mode, href, code } = unref(props.tabsMenuList).find((tab: any) => tab.code === value) || {}
    logger('watch--tabsMenuValue.value', href)
    const url = toURL(href as string)
    if (mode === LAYOUT_MODE.Router) {
      router.push(url.pathname + url.search)
    } else {
      // router.push("/iframe");
      router.push(buildCodePath(code))
    }
  },
  {
    immediate: true,
  },
)
const getUrl = (path: string) => {
  let href = path
  const buildUrl = (obj: any) =>
    Object.keys(obj).forEach((key) => {
      href += href.includes('?') ? `&${key}=${obj[key]}` : `?${key}=${obj[key]}`
    })
  buildUrl(Object.assign({}, route.params, route.query))
  return href
}
const getTabsItem = (path: string): any => {
  const routers = router.getRoutes()
  const curRoute = routers.find((item) => item.path === path)
  if (!curRoute) return
  const href = getUrl(path)
  const tabItem = {
    code: path,
    href,
    label: curRoute.meta ? curRoute.meta[props.keyLabel] : curRoute.name,
    mode: LAYOUT_MODE.Router,
    closable: curRoute.meta && isBoolean(curRoute.meta.closable) ? curRoute.meta.closable : undefined,
  }
  return props.formatTab ? props.formatTab(tabItem) : tabItem
}
const routerPathChange = () => {
  const path = route.path
  const url = getUrl(path)
  const tabItem = unref(props.tabsMenuList).find((tab: any) => {
    const urlObj = toURL(tab.href as string)
    return urlObj.pathname + urlObj.search === url
  }) as IOptionTabPane
  logger('watch--route.fullPath-tabItem', tabItem)
  if (tabItem && tabItem.href) {
    const tmpItem = props.formatTab ? props.formatTab(tabItem) : tabItem
    tabPaneAdd(tmpItem.href as string, { ...tmpItem })
    return
  }
  const tmpItem = getTabsItem(path)
  logger('watch--route.fullPath', tmpItem)
  if (tmpItem) tabPaneAdd(tmpItem.href as string, { ...tmpItem })
}
const framePathChange = (activeItem: IOptionTabPane) => {
  logger('framePathChange', activeItem)
  if (activeItem.href) tabPaneAdd(activeItem.href, { ...activeItem })
}
const matchesPath = (item: any, path: string): boolean => {
  const urlObj: any = item.href ? toURL(item.href as string) : {}
  return buildCodePath(item.code) === path || urlObj.pathname === path
}
const findItemRecursive = (list: any[], path: string): any => {
  for (const item of list) {
    if (matchesPath(item, path)) return item
    if (item?.children?.length) {
      const foundItem = findItemRecursive(item.children, path)
      if (foundItem) return foundItem
    }
  }
  return null
}
const findActiveTabItem = (path: string) => {
  const { tabsMenuList, orgMenuList } = props
  let item = tabsMenuList.find((item: IOptionTabPane) => matchesPath(item, path)) as IOptionTabPane
  if (!item) {
    item = findItemRecursive(orgMenuList, path)
  }
  return item
}
watch(
  () => route.fullPath,
  (newVal, oldVal) => {
    if (!newVal) return
    const activeItem = findActiveTabItem(route.path)
    logger('watch--route.fullPath', newVal, oldVal, activeItem?.mode)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    activeItem?.mode === LAYOUT_MODE.Frame ? framePathChange(activeItem) : routerPathChange()
    //记录path切换时的current/back标记
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    props.routerGoback &&
      props.tabsMenuList.forEach((item: any) => {
        item.current = newVal && item.href && toURL(item.href).pathname === newVal.split('?')[0]
        item.back = oldVal && item.href && toURL(item.href).pathname === oldVal.split('?')[0]
      })
  },
  {
    immediate: true,
  },
)

provide(EnumSessionKey.TabsActivate, tabsMenuValue)
</script>
