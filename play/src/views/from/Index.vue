<template>
  <div class="view-w">
  <yto-form
      :form="form"
      :form-config="formConfig"
      :span="6"
      :item-config="{
      clearable: true,
    }"
  >
    <template #cascader> 测试卡槽 </template>
    <div>
      <el-button type="primary">测试</el-button>
    </div>
  </yto-form>
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
  {
    itemType: 'input',
    prop: 'name',
    label: '文本框',
    formItemBinds: {
      class: 'testClass',
      id: 'testId',
    },
  },
  {
    itemType: 'cascader',
    slot: true,
    prop: 'cascader',
    label: '级联选择',
    placeholder: 'xxx',
    options: options,
  },
  {
    itemType: 'checkbox',
    prop: 'checkbox',
    label: '选择框',
    options: options,
  },
  {
    itemType: 'select',
    prop: 'select',
    label: '选择框',
    options: options,
    inputWidth: 1000,
  },
  { itemType: 'switch', prop: 'switch', label: '单选' },
  {
    itemType: 'timePicker',
    prop: 'timePicker',
    label: '时间选择',
  },
  {
    itemType: 'timeSelect',
    prop: 'timeSelect',
    label: '时间区间',
  },
]
</script>
<style scoped></style>
