<template>
  <el-form-item
    v-for="item in formConfig"
    v-bind="item?.formItemBinds"
    :key="item.prop"
    :label="item?.label"
    :prop="item?.prop"
    :label-width="item.labelWidth"
    :style="formItemStyle(item)"
  >
    <div :class="item.contentClass">
      <template v-if="!$slots[item.prop]">
        <component
          v-if="getComponent(item.itemType)"
          v-bind="getComponentProps(item)"
          :is="getComponent(item.itemType)"
        />
        <span v-else class="text-red-500"> 未知的表单项类型: {{ item.itemType }} </span>
      </template>
      <slot v-else :name="item?.prop" :item="item" />
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { formItemsProps } from './form-items'
import { formProps, formEmits } from './form'
import itemInput from './form-controls/itemInput.vue'
import itemSelect from './form-controls/itemSelect.vue'
import itemSwitch from './form-controls/itemSwitch.vue'
import itemRadio from './form-controls/itemRadio.vue'
import itemCascader from './form-controls/itemCascader.vue'
import itemCheckbox from './form-controls/itemCheckbox.vue'
import itemDate from './form-controls/itemDate.vue'
import itemDateTime from './form-controls/itemDateTime.vue'
import itemInputNumber from './form-controls/itemInputNumber.vue'
import itemRate from './form-controls/itemRate.vue'
import itemTimePicker from './form-controls/itemTimePicker.vue'
import itemTimeSelect from './form-controls/itemTimeSelect.vue'

defineOptions({
  name: 'FormItems',
})

defineProps(formItemsProps)

interface FormComponent {
  [key: string]: Component
}

const types = computed(
  (): FormComponent => ({
    input: itemInput,
    select: itemSelect,
    switch: itemSwitch,
    radio: itemRadio,
    cascader: itemCascader,
    checkbox: itemCheckbox,
    date: itemDate,
    dateTime: itemDateTime,
    inputNumber: itemInputNumber,
    rate: itemRate,
    timePicker: itemTimePicker,
    timeSelect: itemTimeSelect,
  }),
)

const getComponent = (type: string): Component => {
  return types.value[type]
}

const formItemStyle = (item: any) => {
  return `width:${item.formItemWidth || itemConfig.formItemWidth || '25%'}`
}

const getComponentProps = (item: any) => ({
  ...item,
  prop: item?.prop,
  form: props.form,
  options: item?.options || props.itemConfig.options,
  multiple: item?.multiple || false,
  activeColor: item?.activeColor || props.itemConfig.activeColor,
  inactiveColor: item?.inactiveColor || props.itemConfig.inactiveColor,
  activeValue: item?.activeValue || props.itemConfig.activeValue,
  inactiveValue: item?.inactiveValue || props.itemConfig.inactiveValue,
  disabled: item?.disabled || props.itemConfig.disabled,
  clearable: item?.clearable || props.itemConfig.clearable,
})
</script>
