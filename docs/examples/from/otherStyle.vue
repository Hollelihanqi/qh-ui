<template>
  <div style="padding: 0 10px">
    <yto-c-form :form="form" :form-config="formConfig" :span="12"> </yto-c-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElForm } from 'element-plus'

const form = reactive({})
const formConfig = [{ itemType: 'input', prop: 'name', label: '文本框', contentClass: 'test' }]
</script>

<style scoped lang="scss">
:deep(.test) {
  width: 100%;
  background: red;
}
</style>
