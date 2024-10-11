<template>
  <ElSwitch v-bind="attrs" v-model="form[attrs.prop]"></ElSwitch>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ElSwitch } from 'element-plus'
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
