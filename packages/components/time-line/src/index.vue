<template>
  <div class="w-full time-line">
    <div v-for="(item, index) in props.timeData" :key="'timer' + index" class="flex w-full time-line-item">
      <slot name="prepend" :item="item">
        <div
          v-if="item[propsConfig.status || 'status']"
          :style="`width: ${props.prependWidth}`"
          class="relative -top-1 flex justify-end"
        >
          <div class="time-line-status">{{ item[propsConfig.status || 'status'] }}</div>
        </div>
      </slot>
      <div class="relative ml-4 flex-1 border-l-1 time-border cus-line">
        <div class="min-h-[32px] px-4 relative -top-1">
          <slot :item="item">
            <div v-if="item[propsConfig.timestamp || 'timestamp']" class="mb-2">
              {{ item[propsConfig.timestamp || 'timestamp'] }}
            </div>
            <div v-if="item[propsConfig.content || 'content']" class="time-line-item-content">
              {{ item[propsConfig.content || 'content'] }}
            </div>
          </slot>
        </div>
        <div class="dot">
          <slot name="dot">
            <div class="w-[16px] h-[16px] dot-con rounded-full flex items-center justify-center">
              <div class="w-[8px] h-[8px] rounded-full"></div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="TimeLine">
export interface IProps {
  timeData: { [key: string]: any }
  prependWidth?: string
  propsConfig?: { [key: string]: any }
}

const props = withDefaults(defineProps<IProps>(), {
  prependWidth: '88px',
  propsConfig: () => ({ status: 'status', timestamp: 'timestamp', content: 'content' }),
})
</script>
<style lang="scss" scoped>
.time-line {
  --time-line-primary: #824c96;
  --time-line-primary-light1: #eee2f3;
  --time-line-primary-light2: #f2edf4;
  --time-line-gray: #fbfbfb;
  .dot {
    @apply absolute top-0 left-0 flex items-center justify-center;
    transform: translateX(-50%);
    .dot-con {
      background-color: var(--time-line-primary-light1);
      > div {
        background-color: var(--time-line-primary);
      }
    }
  }
  .time-line-item {
    &:last-child {
      .cus-line {
        border: none;
      }
    }
  }
  .time-line-item-content {
    @apply py-4 text-[#666] text-[14px] px-4 rounded mb-4;
    line-height: 26px;
    background-color: var(--time-line-gray);
  }
  .time-line-status {
    @apply py-1 w-[80px] text-[14px] rounded-full border-1 text-center;
    height: fit-content;
    color: var(--time-line-primary);
    border-color: var(--time-line-primary-light1);
    background-color: var(--time-line-primary-light2);
  }
  .time-border {
    border-color: var(--time-line-primary);
  }
}
</style>
