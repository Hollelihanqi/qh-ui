<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-07 17:50:54
 * @LastEditTime: 2023-12-13 15:32:36
-->
<template>
  <div class="p-4">
    <ElForm :model="dataList" ref="formRef">
      <yto-custom-field-container :direction="'vertical'" v-model="dataList" @add="onAdd" @delete="onDelete">
        <template #content="{ index }">
          <yto-custom-field-config
            v-model="dataList[index]"
            :ruleProp="'rules.' + index + '.label'"
            :rules="() => getParamsRules(dataList[index])"
            :fieldConfig="fieldConfig"
            :operatorConfig="operatorConfig"
            :valueConfig="valueConfig"
          ></yto-custom-field-config>
        </template>
        <template #btnAppend>
          <ElButton :icon="Share" link></ElButton>
        </template>
      </yto-custom-field-container>
      <ElFormItem>
        <ElButton class="my-2" type="primary" @click="onSubmit">submit</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script setup lang="ts">
import { Share } from '@element-plus/icons-vue'
import { ElForm, ElFormItem, ElButton } from 'element-plus'
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
const formRef = ref()
const onSubmit = () => {
  formRef.value?.validate(() => {
    console.log('***验证通过了吗')
  })
}
const getParamsRules = (item: any) => {
  return [
    {
      required: false,
      message: '请输入',
      validator: (rule: any, value: any, callback: any) => {
        const values = Object.values(item)?.filter((e) => e) || []
        if (values.length === 3) {
          callback()
        } else {
          callback(new Error('请输入'))
        }
      },
      trigger: ['blur', 'change'],
    },
  ]
}
</script>
