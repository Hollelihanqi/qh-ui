<template>
  <ElTimeSelect v-bind="attrs" v-model="form[attrs.prop]" start="08:30" step="00:15" end="18:30"></ElTimeSelect>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ElTimeSelect } from 'element-plus'
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
