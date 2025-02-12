<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-07 17:50:54
 * @LastEditTime: 2023-12-13 10:27:01
-->
<template>
  <div class="p-4">
    <yto-custom-field-config
      optionWidth="80px"
      v-model="formData"
      :fieldConfig="fieldConfig"
      :operatorConfig="operatorConfig"
      @cbChange="cbChange"
    >
      <template #value>
        <el-date-picker
          v-model="formData.params"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="A hh:mm:ss"
          class="flex-1"
          size="small"
        />
      </template>
    </yto-custom-field-config>
  </div>
</template>
<script setup lang="ts">
export interface FieldConfig {
  elType?: string
  props: string
  [key: string]: any
}
const formData = ref<{ [key: string]: any }>({ function: '=' })

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
const cbChange = (props: string, value: string) => {
  console.log('***改变的字段', props)
  console.log('***改变的值', value)
}
</script>
