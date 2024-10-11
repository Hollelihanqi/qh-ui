<template>
  <div class="nav-tabs-w tabs-box h-[40px] w-full pt-[8px]">
    <ElTabs v-model="tabsMenuValue" class="h-full" v-bind="$attrs" type="border-card" @tab-remove="handleTabRemove">
      <template v-for="(item, index) in tabsMenuList" :key="item.href">
        <ElTabPane
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
        </ElTabPane>
      </template>
    </ElTabs>
  </div>
</template>

<script lang="ts" setup>
import { ElTabs, ElTabPane } from 'element-plus'
import { EnumSessionKey } from '@yto-custom/build-constants'
import { tabPaneClose, tabPaneAdd, toURL, isBoolean } from 'gold-core'
import { useRouter } from 'vue-router'
import { logger } from '@yto-custom/utils'

interface Props {
  tabsMenuList: any[]
  keyLabel: string
  formatTab?: Function
  routerGoback: boolean
}
const props = withDefaults(defineProps<Props>(), {
  keyLabel: 'title',
  routerGoback: false,
  tabsMenuList: () => {
    return []
  },
})
const emit = defineEmits(['tab-remove'])
const tabsMenuValue: any = inject(EnumSessionKey.TabsActivate)
const router = useRouter()
const route = useRoute()
const handleTabRemove = (closeCode: any) => {
  emit('tab-remove', closeCode)
  tabPaneClose(closeCode)
  //只有关闭当前激活的页签，才需要执行此逻辑
  logger('handleTabRemove-1', closeCode, unref(tabsMenuValue), props.routerGoback)
  if (props.routerGoback && closeCode === unref(tabsMenuValue)) {
    const backItem = props.tabsMenuList.find((item: any) => item.back) as any[]
    logger('handleTabRemove', closeCode, props.tabsMenuList, backItem)
    if (!backItem) return
    setTimeout(() => {
      const { href } = backItem as any
      const url = toURL(href as string)
      router.push(url.pathname + url.search)
    }, 0)
  }
}

const activePreidx = computed(() => {
  const idx = props.tabsMenuList.findIndex((e: any) => e.code === tabsMenuValue.value)
  return idx > 0 ? idx - 1 : -1
})
watch(
  () => tabsMenuValue.value,
  (value) => {
    if (!value) return
    const { mode, href } = unref(props.tabsMenuList).find((tab: any) => tab.code === value) || {}
    if (mode === 'router') {
      const url = toURL(href as string)
      logger(url.pathname)
      router.push(url.pathname + url.search)
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
  const curRoute: any = routers.find((item) => item.path === path)
  if (!curRoute) return
  const href = getUrl(path)
  const tabItem = {
    code: path,
    href,
    label: curRoute.meta ? curRoute.meta[props.keyLabel] : curRoute.name,
    mode: 'router',
    closable: curRoute.meta && isBoolean(curRoute.meta.closable) ? curRoute.meta.closable : undefined,
  }
  return props.formatTab ? props.formatTab(tabItem) : tabItem
}
// router.afterEach((to, from) => {
//   try {
//     const path = to.path;
//     const url = getUrl(path, to);
//     const tabItem: any =
//       unref(props.tabsMenuList).find((tab) => {
//         const urlObj = toURL(tab.href as string);
//         return urlObj.pathname + urlObj.search === url;
//       }) || {};
//     const { href } = tabItem;
//     if (tabItem && href) {
//       tabPaneAdd(href as string, { ...tabItem });
//       return;
//     }
//     const tmpItem = getTabsItem(path, to);
//     tmpItem && tabPaneAdd(tmpItem.href as string, { ...tmpItem });
//   } catch (error) {
//     logger("layout-router-afterEach-error", error);
//   }
// });
watch(
  () => route.fullPath,
  (newVal, oldVal) => {
    if (!newVal) return
    const path = route.path
    const url = getUrl(path)
    const tabItem: any = unref(props.tabsMenuList).find((tab: any) => {
      const urlObj = toURL(tab.href as string)
      return urlObj.pathname + urlObj.search === url
    })
    logger('watch--route.fullPath-tabItem', tabItem)
    //记录path切换时的current/back标记
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    props.routerGoback &&
      props.tabsMenuList.forEach((item: any) => {
        item.current = newVal && item.href && toURL(item.href).pathname === newVal.split('?')[0]
        item.back = oldVal && item.href && toURL(item.href).pathname === oldVal.split('?')[0]
      })
    if (tabItem && tabItem.href) {
      const tmpItem = props.formatTab ? props.formatTab(tabItem) : tabItem
      tabPaneAdd(tmpItem.href as string, { ...tmpItem })
      return
    }
    const tmpItem = getTabsItem(path)
    logger('watch--route.fullPath', newVal, oldVal, tmpItem)
    if (tmpItem) tabPaneAdd(tmpItem.href as string, { ...tmpItem })
  },
  {
    immediate: true,
  },
)

provide(EnumSessionKey.TabsActivate, tabsMenuValue)
</script>
<style lang="scss" scoped>
.nav-tabs-w {
  background: var(--yto-layout-nav-background);
  @apply px-[10px];
  :deep(.el-tabs) {
    background: transparent;
    border: none;
    --el-tabs-header-height: 32px;
    .el-tabs__nav-wrap {
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        @apply leading-[var(--el-tabs-header-height)];
      }
    }
  }
  :deep(.el-tabs__header) {
    background: transparent;
    border: none;
  }
  :deep(.el-tabs__content) {
    display: none;
  }
  :deep(.el-tabs__item) {
    margin: 0 !important;
    border: none !important;
    background: var(--yto-layout-nav-background-item);
    background: var(--yto-layout-nav-background);
    padding: 0 16px !important;
    .content {
      height: 100%;

      & .label {
        color: var(--yto-layout-nav-color-text);
      }
    }
    .content.active-pre-tab {
      border-bottom-right-radius: 4px;
    }
    .content.active-next-tab {
      border-bottom-left-radius: 4px;
      &::before {
        display: none;
      }
    }
    .el-icon.is-icon-close {
      margin-left: -12px;
      color: var(--yto-layout-nav-color-text);
      &:hover {
        background: #e2e6e8;
      }
    }
    .content::before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      content: '';
      width: 1px;
      height: 20px;
      background: var(--yto-layout-nav-color-item-divider);
    }
    &:not(.is-active):hover {
      @apply bg-[var(--yto-layout-nav-background-hover)];
    }
    &:first-child {
      .content::before {
        display: none;
      }
    }
    &.is-active {
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      background: var(--yto-layout-nav-background-active);
      & .content::before {
        display: none;
      }
      .content .label {
        color: var(--yto-layout-nav-color-text-active);
      }
    }
  }
}
</style>
