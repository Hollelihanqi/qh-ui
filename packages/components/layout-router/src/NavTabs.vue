<template>
  <div class="layout-nav-tabs nav-tabs-w tabs-box h-[40px] w-full relative z-50">
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
              <!-- <span
                v-if="isBoolean(item.closable) ? item.closable : tabsMenuList.length === 1 ? false : true"
                class="w-[4px] h-full"
              ></span> -->
            </div>
            <div class="divider" v-if="index !== 0"></div>
          </template>
        </ElTabPane>
      </template>
    </ElTabs>
  </div>
</template>

<script lang="ts" setup>
import { ElTabs, ElTabPane } from 'element-plus'
import { EnumSessionKey } from './constants'
import { tabPaneClose, toURL, IOptionTabPane, isBoolean } from 'gold-core'
import { useRouter, useRoute } from 'vue-router'
import useRouteChange from './use-route'
import { inject, computed, watch, unref, provide } from 'vue'

interface Props {
  tabsMenuList: IOptionTabPane[]
  tabsKeyLabel: string
  formatTab?: Function
  routerGoback: boolean
}
const props = withDefaults(defineProps<Props>(), {
  tabsKeyLabel: 'title',
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
  console.log('handleTabRemove-1', closeCode, unref(tabsMenuValue), props.routerGoback)
  if (props.routerGoback && closeCode === unref(tabsMenuValue)) {
    const backItem = props.tabsMenuList.find((item: any) => item.back) as IOptionTabPane
    console.log('handleTabRemove', closeCode, props.tabsMenuList, backItem)
    if (!backItem) return
    setTimeout(() => {
      const { href } = backItem
      const url = toURL(href as string)
      router.push(url.pathname + url.search)
    }, 0)
  }
}

const activePreidx = computed(() => {
  const idx = props.tabsMenuList.findIndex((e: IOptionTabPane) => e.code === tabsMenuValue.value)
  return idx > 0 ? idx - 1 : -1
})
watch(
  () => tabsMenuValue.value,
  (value) => {
    if (!value) return
    const { mode, href } = unref(props.tabsMenuList).find((tab: any) => tab.code === value) || {}
    if (mode === 'router') {
      const url = toURL(href as string)
      router.push(url.pathname + url.search)
    }
  },
  {
    immediate: true,
  },
)
const { openTab } = useRouteChange(props.tabsMenuList, props)
watch(
  () => route.fullPath,
  (newVal, oldVal) => {
    if (!newVal) return
    //记录path切换时的current/back标记
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    props.routerGoback &&
      props.tabsMenuList.forEach((item: any) => {
        item.current = newVal && item.href && toURL(item.href).pathname === newVal.split('?')[0]
        item.back = oldVal && item.href && toURL(item.href).pathname === oldVal.split('?')[0]
      })
    console.log('watch--layout-router.fullPath', newVal, oldVal)
    openTab(route.path)
  },
  {
    immediate: true,
  },
)

provide(EnumSessionKey.TabsActivate, tabsMenuValue)
</script>
