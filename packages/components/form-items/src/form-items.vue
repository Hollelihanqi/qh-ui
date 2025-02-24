<template>
  <template v-for="item in formConfig" :key="item.prop">
    <!-- 当需要栅格布局时使用div包裹 -->
    <template v-if="useColWrapper">
      <ElFormItem
        v-bind="item?.formItemBinds"
        :label="item?.label"
        :prop="item?.prop"
        :label-width="item.labelWidth"
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
    <!-- 默认布局模式 -->
    <ElFormItem
      v-else
      v-bind="item?.formItemBinds"
      :label="item?.label"
      :prop="item?.prop"
      :label-width="item.labelWidth"
      :style="getItemStyle(item)"
      class="yto-form-item mx-[10px]"
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

const props = defineProps(formItemsProps)

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

// 样式计算逻辑
const getItemStyle = (item: any) => {
  if (props.useColWrapper) return ''
  return `width:${item.formItemWidth || props.itemConfig?.formItemWidth || '25%'}`
}
</script>
