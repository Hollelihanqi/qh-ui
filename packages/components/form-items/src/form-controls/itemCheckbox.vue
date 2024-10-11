<template>
  <ElCheckboxGroup v-model="form[attrs.prop]" v-bind="attrs">
    <ElCheckbox v-for="item in attrs.options" :key="item.value" v-bind="item" :label="item.value">
      {{ item.label }}
    </ElCheckbox>
  </ElCheckboxGroup>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
const attrs = useAttrs() as any
defineProps({
  form: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
</script>
