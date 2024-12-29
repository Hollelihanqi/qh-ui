<template>
  <div class="yto-time-line w-full time-line">
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
<script lang="ts" setup>
import { timeLineProps, timeLineEmits } from './time-line'

defineOptions({
  name: 'TimeLine',
})

const props = defineProps(timeLineProps)
const emit = defineEmits(timeLineEmits)
</script>
