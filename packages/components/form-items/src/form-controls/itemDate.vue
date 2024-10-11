<template>
  <ElDatePicker v-model="form[attrs.prop]" v-bind="attrs"></ElDatePicker>
</template>
<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ElDatePicker } from 'element-plus'
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
