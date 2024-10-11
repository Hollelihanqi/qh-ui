<template>
  <ElTimePicker v-bind="attrs" v-model="form[attrs.prop]"></ElTimePicker>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ElTimePicker } from 'element-plus'
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
