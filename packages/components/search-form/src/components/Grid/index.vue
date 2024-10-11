<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="Grid">
import { ref, computed, provide } from 'vue'
import type { BreakPoint } from './interface/index'

type Props = {
  cols?: number | Record<BreakPoint, number> // 列数
  collapsed?: boolean // 是否折叠
  collapsedRows?: number // 折叠时显示的行数
  gap?: [number, number] | number // 网格项之间的间距
}

const props = withDefaults(defineProps<Props>(), {
  cols: () => ({ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }), // 默认列数
  collapsed: false, // 默认不折叠
  collapsedRows: 1, // 默认折叠时显示一行
  gap: 0, // 默认间距为0
})

const breakPoint = ref<BreakPoint>('xl')

// 监听窗口大小变化的回调函数
const resize = (width: number) => {
  if (width < 768) {
    breakPoint.value = 'xs'
  } else if (width >= 768 && width < 992) {
    breakPoint.value = 'sm'
  } else if (width >= 992 && width < 1200) {
    breakPoint.value = 'md'
  } else if (width >= 1200 && width < 1920) {
    breakPoint.value = 'lg'
  } else {
    breakPoint.value = 'xl'
  }
}

// 注入 gap 间距，如果 gap 是一个数组，则取第一个值作为间距值
provide('gap', Array.isArray(props.gap) ? props.gap[0] : props.gap)

// 注入响应式断点，即屏幕大小变化时的断点值
provide('breakPoint', breakPoint)

// 注入要开始折叠的 index，即需要折叠的部分在 fields 数组中的起始位置
// provide("shouldHiddenIndex", hiddenIndex);

// 注入 cols，即当前屏幕大小下的列数
const cols = computed(() => {
  if (typeof props.cols === 'object') return props.cols[breakPoint.value] ?? props.cols
  return props.cols
})

provide('cols', cols)

// 设置间距
const gap = computed(() => {
  if (typeof props.gap === 'number') return `${props.gap}px`
  if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px`
  return 'unset'
})

// 设置 style
const style = computed(() => {
  return {
    display: 'grid',
    gridGap: gap.value,
    gridTemplateColumns: `repeat(${cols.value}, minmax(0, 1fr))`,
  }
})

defineExpose({ breakPoint, resize })
</script>
