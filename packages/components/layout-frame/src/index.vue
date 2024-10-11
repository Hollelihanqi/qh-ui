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
<script lang="ts" setup name="LayoutFrame">
import { provide } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { useFrame, tabPaneClose, isBoolean } from 'gold-core'
import { EnumSessionKey } from '@yto-custom/build-constants'

const props = defineProps({
  footer: Boolean,
  cacheable: Boolean,
  sso: Boolean,
  max: Number,
  type: {
    type: String,
    default: 'vertical',
  },
})
// 是否为垂直布局
const isVertical = computed(() => props.type === 'vertical')
const { listRoute, activate } = useFrame({
  cacheable: props.cacheable as boolean,
  sso: props.sso as boolean,
  max: props.max as number,
})

provide(EnumSessionKey.TabsActivate, activate)
</script>

<style scoped lang="scss">
.layout-frame {
  --layout-frame-bg: white;
  --nav-tabs-bg: #e2e6e8;
  --nav-tabs-active-bg: white;
  --nav-tabs-text-color: #151719;
  iframe {
    background-color: var(--layout-frame-bg);
  }
  :deep(.el-tabs) {
    --el-tabs-header-height: 31px;
    @apply border-none;
    .el-tabs__header {
      @apply px-[10px] pt-[10px];

      background-color: var(--nav-tabs-bg);
      .el-tabs__item {
        @apply rounded-t-[4px]  border-none text-[#151719];
        &.is-active {
          color: var(--nav-tabs-text-color);
          .is-icon-close {
            color: #151719;
            &:hover {
              color: white;
            }
          }
        }

        &.is-active {
          background-color: var(nav-tabs-active-bg);
        }
        &:nth-child(2):not(.is-active).is-closable:hover {
          @apply pl-[20px];
        }
      }
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        height: var(--el-tabs-header-height);
        line-height: var(--el-tabs-header-height);
      }
    }
    .el-tabs__content {
      display: flex;
      padding: 0;
      flex: 1 1 0%;
      overflow: hidden;
    }
  }
}
</style>
