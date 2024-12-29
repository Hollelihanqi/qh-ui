<template>
  <div class="yto-layout layout-router flex flex-1 overflow-hidden" :class="{ 'flex-col': isVertical }">
    <slot v-if="isVertical" name="header"></slot>
    <slot v-else></slot>
    <div class="flex flex-1 overflow-hidden" :class="isVertical ? 'w-full' : 'flex-col'">
      <slot v-if="isVertical"></slot>
      <slot v-else name="header"></slot>
      <div class="layout-content flex flex-col flex-1 bg-[#F0F1F5] overflow-auto">
        <slot v-if="showTab" name="tab" :tab-data="listRoute">
          <NavTabs
            v-if="showTab"
            :org-menu-list="orgMenuList"
            :tabs-menu-list="listRoute"
            :key-label="tabsKeyLabel"
            :format-tab="formatTab"
            :router-goback="routerGoback"
            @tab-change="handleTabChange"
            @tab-remove="handleTabRemove"
          >
            <template #default="{ info }">
              <iframe
                v-if="info.mode == LAYOUT_MODE.Frame && !isInIframe()"
                :id="info.code"
                scrolling="auto"
                allowfullscreen="true"
                frameborder="0"
                class="w-full h-full"
                :name="info.code"
                :src="info.href"
              ></iframe>
            </template>
          </NavTabs>
        </slot>
        <div
          v-show="isInIframe() || activeItem?.mode === LAYOUT_MODE.Router"
          class="router-view-container flex-1 px-[10px] pb-[10px] overflow-auto w-full"
        >
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
import { layoutProps, layoutEmits } from './layout'
import { provide, unref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useFrame } from 'gold-core'
import { EnumSessionKey, LAYOUT_MODE } from './constants'
import NavTabs from './NavTabs.vue'

defineOptions({
  name: 'Layout',
})

const props = defineProps(layoutProps)
const emit = defineEmits(layoutEmits)

const route = useRoute()
const { listRoute, activate } = useFrame({
  cacheable: props.cacheable as boolean,
  sso: props.sso as boolean,
  max: props.max as number,
})
const isInIframe = (): boolean => window.self !== window.top

const activeItem = computed(() =>
  listRoute.value.find((item) => item.code === unref(activate) || item.code === route.path),
)
// 是否为垂直布局
const isVertical = computed(() => props.type === 'vertical')
const handleTabChange = (tab: any) => emit('tab-change', tab)
const handleTabRemove = (tabCode: any) => emit('tab-remove', tabCode)
const getTabsList = () => listRoute

watchEffect(() => {
  document.body.setAttribute('layout-theme', props.theme)
})
provide(EnumSessionKey.TabsActivate, activate)
defineExpose({ getTabsList })
</script>
