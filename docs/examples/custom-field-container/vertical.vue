<template>
  <div class="p-4">
    <yto-c-custom-field-container :direction="'vertical'" v-model="dataList" @add="onAdd" @delete="onDelete">
      <template #prepend>
        <div class="w-[1px] my-2 mr-4 bg-primary relative">
          <div
            v-show="dataList.length > 1"
            class="primary absolute z-88 w-[24px] text-center leading-[24px] h-[24px] bg-[#77327f] shadow top-[50%] text-xs tag text-white"
          >
            且
          </div>
        </div>
      </template>
      <template #content="{ index }">
        <yto-c-custom-field-config
          v-model="dataList[index]"
          :fieldConfig="fieldConfig"
          :operatorConfig="operatorConfig"
          :valueConfig="valueConfig"
        ></yto-c-custom-field-config>
      </template>
    </yto-c-custom-field-container>
  </div>
</template>
<script setup lang="ts">
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
.tag {
  transform: translate(-50%, -50%);
}
</style>
