<template>
  <ElInput v-bind="attrs" v-model="form[attrs.prop]" />
</template>
<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ElInput } from 'element-plus'
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
