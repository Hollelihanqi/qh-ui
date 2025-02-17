<template>
  <ElRate v-model="form[attrs?.prop]" v-bind="attrs"></ElRate>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ElRate } from 'element-plus'
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
