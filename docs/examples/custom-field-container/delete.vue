<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-07 17:50:54
 * @LastEditTime: 2023-12-25 14:31:29
-->
<template>
  <div class="p-4">
    <yto-custom-field-container v-model="dataList" width="50%" :term-hidden-del="false" @add="onAdd" @delete="onDelete">
      <template #prepend>{{ '前置插槽' }}</template>
      <template #content="{ index }">
        <yto-custom-field-config
          v-model="dataList[index]"
          :field-config="fieldConfig"
          :operator-config="operatorConfig"
          :value-config="valueConfig"
        ></yto-custom-field-config>
      </template>
      <template #append>
        <div class="flex-1 w-0 flex items-center justify-end min-w-[180px]">
          <ElButton size="small">重置</ElButton>
          <ElButton size="small" type="primary">搜索</ElButton>
        </div>
      </template>
    </yto-custom-field-container>
  </div>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
const dataList = ref([{}])

interface FieldConfig {
  elType?: string
  props: string
  [key: string]: any
}
const fieldConfig: FieldConfig = {
  props: 'label',
  elType: 'input',
  placeholder: '请输入',
}
const operatorConfig: FieldConfig = {
  props: 'function',
  elType: 'select-v2',
  options: [{ label: '等于', value: '=' }],
}
const valueConfig: FieldConfig = {
  props: 'params',
  elType: 'input',
  placeholder: '请输入',
}
const onAdd = () => {
  dataList.value.push({})
}
const onDelete = (index: number) => {
  dataList.value.splice(index, 1)
}
</script>
<style lang="scss" scoped>
.custom-field-container {
  --field-row-m-y: 8px !important;
}
</style>
