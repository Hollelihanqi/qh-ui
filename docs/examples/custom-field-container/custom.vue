<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-07 17:50:54
 * @LastEditTime: 2023-12-13 14:34:12
-->
<template>
  <div class="p-4">
    <yto-custom-field-container :direction="'vertical'" v-model="dataList" @add="onAdd" @delete="onDelete">
      <template #content="{ index }">
        <yto-custom-field-config
          v-model="dataList[index]"
          :fieldConfig="fieldConfig"
          :operatorConfig="operatorConfig"
          :valueConfig="valueConfig"
        ></yto-custom-field-config>
      </template>
      <template #btnAppend>
        <ElButton :icon="Share" link></ElButton>
      </template>
    </yto-custom-field-container>

    <yto-custom-field-container :direction="'vertical'" v-model="dataList" @add="onAdd" @delete="onDelete">
      <template #content="{ index }">
        <yto-custom-field-config
          v-model="dataList[index]"
          :fieldConfig="fieldConfig"
          :operatorConfig="operatorConfig"
          :valueConfig="valueConfig"
        ></yto-custom-field-config>
      </template>
      <template #btn>
        <ElButton class="ml-2" :icon="Share" link></ElButton>
      </template>
    </yto-custom-field-container>
  </div>
</template>
<script setup lang="ts">
import { Share } from '@element-plus/icons-vue'
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
