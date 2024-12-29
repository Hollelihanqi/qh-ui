<template>
  <ElRadioGroup v-model="form[attrs['prop']]" v-bind="attrs">
    <ElRadio
      v-for="item in attrs['options']"
      v-bind="item"
      :key="item?.value"
      :label="item?.value"
      :value="item?.value"
      >{{ item?.label }}</ElRadio
    >
  </ElRadioGroup>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ElRadioGroup, ElRadio } from 'element-plus'
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
