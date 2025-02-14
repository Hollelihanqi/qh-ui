<template>
  <div class="yto-adaption-container" :style="getStyle()">
    <template v-for="(item, _index) in list" :key="_index">
      <div class="adapt-card">
        <slot :info="item"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { adaptionContainerProps } from './adaption-container'

defineOptions({
  name: 'AdaptionContainer',
})

const props = defineProps(adaptionContainerProps)

const getStyle = () => {
  const minWidthPx = `${props.minWidth}px`
  return {
    '--min-width': minWidthPx,
    gap: props.gap + 'px',
    'min-width': props.containerMinWidth
      ? props.containerMinWidth + 'px'
      : props.minNum * props.minWidth + props.gap * props.minNum + 'px',
  }
}
</script>
