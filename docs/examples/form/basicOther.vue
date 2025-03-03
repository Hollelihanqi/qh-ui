<template>
  <div style="padding: 0 10px">
    <yto-form :form="form" :form-config="formConfig" :span="12"> </yto-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({})
const formConfig = [{ itemType: 'input', prop: 'name', label: '文本框', contentClass: 'test' }]
</script>

<style scoped lang="scss">
:deep(.test) {
  background: red;
  color: red;
  padding: 0 8px;
}
</style>
