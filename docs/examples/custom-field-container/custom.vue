<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-07 17:50:54
 * @LastEditTime: 2023-12-13 14:34:12
-->
<template>
  <div class="p-4">
    <yto-c-custom-field-container :direction="'vertical'" v-model="dataList" @add="onAdd" @delete="onDelete">
      <template #content="{ index }">
        <yto-c-custom-field-config
          v-model="dataList[index]"
          :fieldConfig="fieldConfig"
          :operatorConfig="operatorConfig"
          :valueConfig="valueConfig"
        ></yto-c-custom-field-config>
      </template>
      <template #btnAppend>
        <el-button :icon="Share" link></el-button>
      </template>
    </yto-c-custom-field-container>

    <yto-c-custom-field-container :direction="'vertical'" v-model="dataList" @add="onAdd" @delete="onDelete">
      <template #content="{ index }">
        <yto-c-custom-field-config
          v-model="dataList[index]"
          :fieldConfig="fieldConfig"
          :operatorConfig="operatorConfig"
          :valueConfig="valueConfig"
        ></yto-c-custom-field-config>
      </template>
      <template #btn>
        <el-button class="ml-2" :icon="Share" link></el-button>
      </template>
    </yto-c-custom-field-container>
  </div>
</template>
<script setup lang="ts">
import { Share } from '@element-plus/icons-vue'
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
