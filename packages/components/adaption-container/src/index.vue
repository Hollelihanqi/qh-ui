<template>
  <div class="adaption-container" :style="getStyle()">
    <template v-for="(item, index) in list" :key="index">
      <div class="adapt-card">
        <slot :info="item"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup name="AdaptionContainer">
interface Props {
  list: Array<any>
  minWidth?: number //单个卡片最小宽度
  gap?: number //卡片间距
  minNum?: number // 最少显示几个卡片
  containerMinWidth?: number //容器最小宽度
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  minWidth: 200,
  gap: 10,
  minNum: 1,
  containerMinWidth: 0,
})
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
<style lang="scss" scoped>
.adaption-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--min-width), 1fr));
}
</style>
