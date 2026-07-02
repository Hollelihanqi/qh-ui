<template>
  <div class="hd-time-line time-line">
    <div v-for="(item, index) in props.timeData" :key="'timer' + index" class="time-line-item">
      <slot name="prepend" :item="item">
        <div v-if="getItemValue(item, 'status')" :style="`width: ${props.prependWidth}`" class="time-line-prepend">
          <div class="time-line-status">{{ getItemValue(item, 'status') }}</div>
        </div>
      </slot>
      <div class="time-border cus-line">
        <div class="time-line-item-main">
          <slot :item="item">
            <div v-if="getItemValue(item, 'timestamp')" class="time-line-item-time">
              {{ getItemValue(item, 'timestamp') }}
            </div>
            <div v-if="getItemValue(item, 'content')" class="time-line-item-content">
              {{ getItemValue(item, 'content') }}
            </div>
          </slot>
        </div>
        <div class="dot">
          <slot name="dot">
            <div class="dot-con">
              <div></div>
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
defineEmits(timeLineEmits)

// 安全地获取item的�?
const getItemValue = (item: any, key: string) => {
  const configKey = props.propsConfig[key] || key
  return item[configKey]
}
</script>
