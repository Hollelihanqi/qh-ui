<template>
  <div class="layout-router flex flex-1 overflow-hidden" :class="{ 'flex-col': isVertical }">
    <slot v-if="isVertical" name="header"></slot>
    <slot v-else></slot>
    <div class="flex flex-1 overflow-hidden" :class="isVertical ? 'w-full' : 'flex-col'">
      <slot v-if="isVertical"></slot>
      <slot v-else name="header"></slot>

      <div class="layout-content flex flex-col flex-1 bg-[#F0F1F5] overflow-auto">
        <slot v-if="showTab" name="tab" :tab-data="listRoute">
          <NavTabs
            v-if="showTab"
            :tabs-menu-list="tabList"
            :tabs-key-label="tabsKeyLabel"
            :format-tab="formatTab"
            :router-goback="routerGoback"
            @tab-change="handleTabChange"
            @tab-remove="handleTabRemove"
          ></NavTabs>
        </slot>
        <div class="router-view-container flex-1 px-[10px] pb-[10px] overflow-auto w-full">
          <router-view v-slot="{ Component, route }">
            <keep-alive>
              <component
                :is="Component"
                v-if="route.meta && route.meta.keepAlive"
                :key="route.meta.usePathKey ? route.fullPath : undefined"
              />
            </keep-alive>
            <component
              :is="Component"
              v-if="!(route.meta && route.meta.keepAlive)"
              :key="route.meta.usePathKey ? route.fullPath : undefined"
            />
          </router-view>
        </div>
      </div>
    </div>
    <slot v-if="footer" name="footer"></slot>
  </div>
</template>
<script lang="ts" setup>
import { provide, computed, watch, watchEffect } from 'vue'
import NavTabs from './NavTabs.vue'
import { useFrame } from 'gold-core'
import { layoutRouterProps, layoutRouterEmits } from './layout-router'
import { EnumSessionKey } from './constants'
import useRouteChange from './use-route'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'LayoutRouter',
})

const props = defineProps(layoutRouterProps)
const emit = defineEmits(layoutRouterEmits)

const route = useRoute()
const { listRoute, activate } = useFrame({
  cacheable: props.cacheable as boolean,
  sso: props.sso as boolean,
  max: props.max as number,
})

const tabList = computed(() => {
  const tabs = listRoute.value.filter((item: any) => item.label)
  // 将数组分成不可关闭和可关闭两部分，然后合并
  const unclosableTabs = tabs.filter((item: any) => !item.closable)
  const closableTabs = tabs.filter((item: any) => item.closable)

  return [...unclosableTabs, ...closableTabs]
})
// 是否为垂直布局
const isVertical = computed(() => props.type === 'vertical')
const handleTabChange = (tab: any) => emit('tab-change', tab)
const handleTabRemove = (tabCode: any) => emit('tab-remove', tabCode)
const getTabsList = () => listRoute

const { openTab } = useRouteChange(listRoute, props)
watch(
  () => route.fullPath,
  (newVal, oldVal) => {
    console.log('watch--layout-router.fullPath-showTab', !newVal, props.showTab, props.activeMenu)
    if (!newVal || props.showTab || !props.activeMenu) return
    console.log('watch--layout-router.fullPath-showTab-false', newVal, oldVal)
    openTab(route.path)
  },
  {
    immediate: true,
  },
)

watchEffect(() => {
  document.body.setAttribute('layout-theme', props.theme)
})
provide(EnumSessionKey.TabsActivate, activate)
defineExpose({ getTabsList })
</script>
