<template>
  <div class="layout-frame flex flex-1 overflow-hidden" :class="{ 'flex-col': isVertical }">
    <slot v-if="isVertical" name="header"></slot>
    <slot v-else></slot>
    <div class="flex flex-1 overflow-hidden w-full" :class="{ 'flex-col': !isVertical }">
      <slot v-if="isVertical"></slot>
      <slot v-else name="header"></slot>
      <ElTabs
        v-model="activate"
        class="flex flex-col flex-1 bg-white overflow-hidden"
        type="border-card"
        @tab-remove="tabPaneClose"
      >
        <template v-for="{ href, code, label, closable } in listRoute" :key="href">
          <ElTabPane
            class="flex-1 bg-[#f0f1f5] px-[10px] pb-[10px] overflow-hidden"
            :closable="isBoolean(closable) ? closable : listRoute.length === 1 ? false : true"
            :label="label"
            :name="code"
          >
            <iframe
              :id="code"
              scrolling="auto"
              allowfullscreen="true"
              frameborder="0"
              class="w-full h-full"
              :name="code"
              :src="href"
            ></iframe>
          </ElTabPane>
        </template>
      </ElTabs>
    </div>
    <slot v-if="footer" name="footer"></slot>
  </div>
</template>
<script lang="ts" setup>
import { computed, provide } from 'vue'
import { layoutFrameProps, layoutFrameEmits } from './layout-frame'
import { useFrame, tabPaneClose, isBoolean } from 'gold-core'
import { ElTabs, ElTabPane } from 'element-plus'
import { EnumSessionKey } from './constants'
defineOptions({
  name: 'LayoutFrame',
})

const props = defineProps(layoutFrameProps)
const emit = defineEmits(layoutFrameEmits)

// 是否为垂直布局
const isVertical = computed(() => props.type === 'vertical')
const { listRoute, activate } = useFrame({
  cacheable: props.cacheable as boolean,
  sso: props.sso as boolean,
  max: props.max as number,
})

provide(EnumSessionKey.TabsActivate, activate)
</script>
