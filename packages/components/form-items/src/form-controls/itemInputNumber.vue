<template>
  <ElInputNumber v-model="form[attrs.prop]" v-bind="attrs" :type="attrs.type || 'datetime'"></ElInputNumber>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ElInputNumber } from 'element-plus'
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
