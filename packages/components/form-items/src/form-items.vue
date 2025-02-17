<template>
  <ElFormItem
    v-for="item in formConfig"
    v-bind="item?.formItemBinds"
    :key="item.prop"
    :label="item?.label"
    :prop="item?.prop"
    :label-width="item.labelWidth"
    :style="`width:${item.formItemWidth || itemConfig.formItemWidth || '25%'}`"
    class="yto-form-item"
  >
    <div :class="item.contentClass">
      <component
        v-bind="item"
        :is="getComponent(item.itemType)"
        v-if="!$slots[item.prop]"
        :prop="item?.prop"
        :form="form"
        :options="item?.options || itemConfig.options"
        :multiple="item?.multiple || false"
        :active-color="item?.activeColor || itemConfig.activeColor"
        :inactive-color="item?.inactiveColor || itemConfig.inactiveColor"
        :active-value="item?.activeValue || itemConfig.activeValue"
        :inactive-value="item?.inactiveValue || itemConfig.inactiveValue"
        :disabled="item?.disabled || itemConfig.disabled"
        :clearable="item?.clearable || itemConfig.clearable"
      />
      <slot v-if="$slots[item.prop]" :name="item?.prop" :item="item" />
    </div>
  </ElFormItem>
</template>

<script lang="ts" setup>
import { ElFormItem } from 'element-plus'
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
import { formItemsProps } from './form-items'

defineOptions({
  name: 'FormItems',
})

defineProps(formItemsProps)

const types = {
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
}

const getComponent = (type: string) => {
  return types[type]
}
</script>
