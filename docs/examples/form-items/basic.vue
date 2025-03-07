<template>
 <el-form :model="form" class="flex flex-wrap" label-width="120px">
    <yto-form-items
      :form-config="formConfig"
      :form="form"
      :item-config="{
        clearable: true,
        formItemWidth: '50%',
      }"
    >
      <template #cascader> 测试卡槽 </template>
      <div>
        <el-button type="primary">测试</el-button>
      </div>
    </yto-form-items>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElButton } from 'element-plus'

const options = [
  {
    value: 'zhinan',
    label: '指南',
  },
  {
    value: 'zujian',
    label: '组件',
  },
  {
    value: 'ziyuan',
    label: '资源',
  },
]
const form = reactive({})
const formConfig = [
  {
    itemType: 'input',
    prop: 'name',
    label: '文本框',
    contentClass: 'test',
    'label-width': '120px',
    formItemBinds: {
      'data-cols': 2,
    }
  },
  {
    itemType: 'cascader',
    prop: 'cascader',
    label: '级联选择',
    placeholder: 'xxx',
    formItemWidth: '50%',
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
    style: { width: '100%' },
    formItemWidth: '100%',
    contentClass: 'test',
    label: '选择框',
    options: options,
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

const test = ref()

</script>

<style scoped lang="scss">
:deep(.test) {
  width: 100%;
  background: red;
}
</style>
