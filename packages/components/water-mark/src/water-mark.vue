<template>
  <div :id="containerId" class="yto-water-mark water-maker-container">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { waterMarkProps, waterMarkEmits } from './water-mark'
import { addWaterMarker, removeWatermark, guid } from '@yto/utils'

defineOptions({
  name: 'WaterMark',
})

const props = defineProps(waterMarkProps)
const emit = defineEmits(waterMarkEmits)

const containerId = computed(() => {
  return props.id || `watermaker_${guid()}`
})
const initWatermark = () => {
  if (!props.content) return
  removeWatermark(`#${unref(containerId)}`)
  addWaterMarker({
    content: props.content,
    elNode: `#${unref(containerId)}`,
    font: props.font,
    width: props.width,
    height: props.height,
    rotate: props.rotate,
    zIndex: props.zIndex,
    fillStyle: props.fillStyle,
  })
}
watch(
  () => props.content,
  () => {
    initWatermark()
  },
)
onMounted(initWatermark)
</script>
