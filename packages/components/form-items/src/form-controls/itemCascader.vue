<template>
  <ElCascader v-model="form[attrs.prop]" :options="form[attrs.options]"></ElCascader>
</template>

<script lang="ts" setup>
import { ElCascader } from 'element-plus'
import { useAttrs } from 'vue'
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
