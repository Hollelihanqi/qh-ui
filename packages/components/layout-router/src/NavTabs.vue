<template>
  <!-- 导航标签页容器 -->
  <div class="layout-nav-tabs nav-tabs-w tabs-box h-[40px] w-full relative z-50">
    <!-- Element Plus 标签页组件 -->
    <ElTabs v-model="tabsMenuValue" class="h-full" v-bind="$attrs" type="border-card" @tab-remove="handleTabRemove">
      <template v-for="(item, index) in tabsMenuList" :key="item.href">
        <ElTabPane
          class="overflow-hidden"
          :closable="isBoolean(item.closable) ? item.closable : tabsMenuList.length === 1 ? false : true"
          :name="item.code"
        >
          <template #label>
            <!-- 标签页标题内容 -->
            <div
              class="content flex h-full"
              :class="`${activePreidx === index ? 'active-pre-tab' : ''} ${
                activePreidx + 2 === index ? 'active-next-tab' : ''
              }`"
            >
              <span class="h-full flex items-center label">{{ item.label }}</span>
              <!-- <span
                v-if="isBoolean(item.closable) ? item.closable : tabsMenuList.length === 1 ? false : true"
                class="w-[4px] h-full"
              ></span> -->
            </div>
            <!-- 标签页之间的分隔符 -->
            <div class="divider" v-if="index !== 0"></div>
          </template>
        </ElTabPane>
      </template>
    </ElTabs>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, watch, unref, provide, nextTick } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { EnumSessionKey } from './constants'
import { tabPaneClose, toURL, IOptionTabPane, isBoolean } from 'gold-core'
import { useRouter, useRoute } from 'vue-router'
import useRouteChange from './use-route'

// 定义组件属性接口
interface Props {
  tabsMenuList: IOptionTabPane[]
  tabsKeyLabel: string
  formatTab?: Function
  routerGoback: boolean
}

// 设置属性默认值
const props = withDefaults(defineProps<Props>(), {
  tabsKeyLabel: 'title',
  routerGoback: false,
  tabsMenuList: () => [],
})

// 定义事件
const emit = defineEmits(['tab-remove'])

// 注入激活标签的状态
const tabsMenuValue: any = inject(EnumSessionKey.TabsActivate)
const router = useRouter()
const route = useRoute()

const navigateToTab = (href: string) => {
  const url = toURL(href)
  router.push(url.pathname + url.search)
}

/**
 * 处理标签页关闭事件
 * @param closeCode 要关闭的标签页代码
 */
const handleTabRemove = (closeCode: any) => {
  emit('tab-remove', closeCode)
  tabPaneClose(closeCode)

  if (!props.routerGoback || closeCode !== unref(tabsMenuValue)) return

  const backItem = props.tabsMenuList.find((item: any) => item.back) as IOptionTabPane
  if (!backItem?.href) return

  nextTick(() => {
    navigateToTab(backItem.href as string)
  })
}

// 计算前一个激活标签的索引
const activePreidx = computed(() => {
  const idx = props.tabsMenuList.findIndex((e) => e.code === tabsMenuValue.value)
  return idx > 0 ? idx - 1 : -1
})

const updateTabsState = (newPath?: string, oldPath?: string) => {
  if (!props.routerGoback || !newPath || newPath === '/') return

  props.tabsMenuList.forEach((item: any) => {
    const itemPath = item.href ? toURL(item.href).pathname : ''
    item.current = newPath && itemPath === newPath.split('?')[0]
    item.back = oldPath && itemPath === oldPath.split('?')[0]
  })
}

watch(
  () => tabsMenuValue.value,
  (value) => {
    if (!value) return
    const currentTab = props.tabsMenuList.find((tab) => tab.code === value)
    if (currentTab?.mode === 'router' && currentTab.href) {
      navigateToTab(currentTab.href)
    }
  },
  { immediate: true },
)

// 使用路由变化处理器
const { openTab } = useRouteChange(props.tabsMenuList, props)

// 监听路由变化
watch(
  () => route.fullPath,
  (newVal, oldVal) => {
    updateTabsState(newVal, oldVal)
    if (newVal && newVal !== '/') {
      openTab(route.path)
    }
  },
  { immediate: true },
)

// 提供激活标签的状态给子组件
provide(EnumSessionKey.TabsActivate, tabsMenuValue)
</script>
