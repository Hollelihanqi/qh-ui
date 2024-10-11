<template>
  <div :id="containerId" class="water-maker-container">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup name="Watermark">
import { addWaterMarker, removeWatermark, guid } from '@yto/utils'
export interface IProps {
  id?: string
  content: string
  width?: number
  height?: number
  rotate?: number
  zIndex?: number
  font?: string
  fillStyle?: string
}
const props = withDefaults(defineProps<IProps>(), {
  content: '',
  width: 200,
  height: 100,
  rotate: -28,
  zIndex: 99999,
  font: '14px Inter, Avenir',
  fillStyle: 'rgba(0, 0, 0, 0.08)',
})
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
<style lang="scss" scoped>
.wraper {
}
</style>
