<template>
  <div class="yto-component">
    <!-- 组件内容 -->
  </div>
</template>
<script lang="ts" setup>
import { componentProps, componentEmits } from './component'

defineOptions({
  name: 'Component',
})

const props = defineProps(componentProps)
const emit = defineEmits(componentEmits) 
</script>
