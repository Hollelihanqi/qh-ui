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
            :tabs-menu-list="listRoute"
            :key-label="tabsKeyLabel"
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
<script lang="ts" setup name="LayoutRouter">
import { provide } from 'vue'
import { useFrame } from 'gold-core'
import { EnumSessionKey } from '@yto-custom/build-constants'
import NavTabs from './NavTabs.vue'

const props = defineProps({
  footer: Boolean,
  cacheable: Boolean,
  sso: Boolean,
  max: Number,
  tabsKeyLabel: {
    type: String,
    default: '',
  },
  formatTab: Function,
  routerGoback: Boolean,
  type: {
    type: String,
    default: 'vertical',
  },
  showTab: {
    type: Boolean,
    default: true,
  },
  theme: { type: String, default: 'purple' },
})

const { listRoute, activate } = useFrame({
  cacheable: props.cacheable as boolean,
  sso: props.sso as boolean,
  max: props.max as number,
})
// 是否为垂直布局
const isVertical = computed(() => props.type === 'vertical')
const emit = defineEmits(['tab-change', 'tab-remove'])
const handleTabChange = (tab: any) => emit('tab-change', tab)
const handleTabRemove = (tabCode: any) => emit('tab-remove', tabCode)
const getTabsList = () => listRoute

watchEffect(() => {
  document.body.setAttribute('layout-theme', props.theme)
})
provide(EnumSessionKey.TabsActivate, activate)
defineExpose({ getTabsList })
</script>

<style lang="scss">
@import '../../../theme-chalk/layout-theme/purple/color.scss';
@import '../../../theme-chalk/layout-theme/blue/color.scss';
</style>
