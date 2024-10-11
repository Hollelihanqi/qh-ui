<template>
  <ElSelectV2 v-model="form[attrs['prop']]" v-bind="attrs" :options="form[attrs['options']]" />
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ElSelectV2 } from 'element-plus'
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
