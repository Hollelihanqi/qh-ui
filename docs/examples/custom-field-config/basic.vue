<template>
  <div class="p-4">
    <yto-custom-field-config
      v-model="formData"
      :field-config="fieldConfig"
      :operator-config="operatorConfig"
      :value-config="valueConfig"
      @cb-change="cbChange"
    ></yto-custom-field-config>
  </div>
</template>
<script setup lang="ts">
interface FieldConfig {
  elType?: string
  props: string
  [key: string]: any
}
const formData = ref({ function: '=' })

const fieldConfig: FieldConfig = {
  props: 'label',
  elType: 'input',
  placeholder: '请输入',
}
const operatorConfig: FieldConfig = {
  props: 'function',
  elType: 'select-v2',
  options: [
    { label: '等于', value: '=' },
    { label: '大于', value: '>' },
    { label: '小于', value: '<' },
  ],
}
const valueConfig: FieldConfig = {
  props: 'params',
  elType: 'input',
  placeholder: '请输入',
}
const cbChange = (props: string, value: string) => {
  console.log('***改变的字段', props)
  console.log('***改变的值', value)
}
</script>
