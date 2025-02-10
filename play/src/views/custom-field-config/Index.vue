<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-07 17:50:54
 * @LastEditTime: 2023-12-13 14:16:58
-->
<template>
  <div class="h-[80%] w-[60%] mx-auto mt-8 bg-white">
    <CustomFieldContainer v-model="list" :direction="'vertical'" width="50%" @add="onAdd" @delete="onDelete">
      <template #prepend>{{ '前置' }}</template>
      <template #content="{ index }">
        <yto-custom-field-config
          v-model="list[index]"
          :field-config="fieldConfig"
          :operator-config="operatorConfig"
          :value-config="valueConfig"
          @cb-change="cbChange"
        ></yto-custom-field-config>
      </template>
    </CustomFieldContainer>
    <el-button class="mt-5" @click="onLog">打印</el-button>
  </div>
</template>
<script setup lang="ts">
import CustomFieldContainer from './CustomFieldContainer.vue'
interface IAnyObject {
  [key: string]: any
}
export interface FieldConfig extends IAnyObject {
  elType?: string
  props: string
  options?: IAnyObject[]
  disabled?: boolean
}
const list = ref([{}])
const options = [
  { label: 'test1', value: 'hah' },
  { label: 'test2', value: 'hah' },
  { label: 'test3', value: 'hah' },
  { label: 'test4', value: 'hah' },
  { label: 'test5', value: 'hah' },
  { label: 'test6', value: 'hah' },
]
const getCacheList = () => {
  return [
    { label: '测试', value: 'test' },
    { label: '测试2', value: 'test' },
    { label: '测试4', value: 'test' },
    { label: '测试5', value: 'test' },
    { label: '测试7', value: 'test' },
    { label: '测试8', value: 'test' },
    { label: '测试wer', value: 'test' },
    { label: '测试ww', value: 'test' },
    { label: '测试gg', value: 'test' },
  ]
}
const fieldConfig: FieldConfig = {
  props: 'label',
  elType: 'input',
  placeholder: '请输入',
}
const operatorConfig: FieldConfig = {
  props: 'function',
  elType: 'select-v2',
  options: options,
}
const valueConfig: FieldConfig = {
  props: 'params',
  elType: 'input',
  placeholder: '请输入',
}
const fileValue = ref({ label: 'hahahah', params: 'name', function: '124' })
const cbChange = (label: string, value: string) => {}
const onLog = () => {
  console.log('********************log', list.value)
}
const onDelete = (index: number) => {
  list.value.splice(index, 1)
  console.log('***删除')
}
const onAdd = () => {
  list.value.push({})
  console.log('***add')
}
</script>
