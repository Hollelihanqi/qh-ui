<template>
  <div style="padding: 0 10px">
    <el-form :form="form">
      <yto-form :form="form" :form-config="formConfig" :span="12">
        <template #cascader> 测试卡槽 </template>
        <div>
          <el-button type="primary">测试</el-button>
        </div>
      </yto-form>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElForm, ElButton } from 'element-plus'

const options = [
  {
    value: 'zujian',
    label: '组件',
  },
  {
    value: 'zujian2',
    label: '组件2',
  },
]
const form = reactive({})
const formConfig = [
  { itemType: 'input', prop: 'name', label: '文本框', span: 12 },
  {
    itemType: 'cascader',
    prop: 'cascader',
    label: '级联选择',
    placeholder: 'xxx',
    options: options,
  },
]
</script>

<style scoped></style>
