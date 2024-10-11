<template>
  <ElForm v-bind="$attrs" ref="myForm" :model="form">
    <div v-if="layoutAuto" class="dis-flex flex-wrap">
      <ElFormItem
        v-for="item in formConfig"
        v-bind="item?.formItemBinds"
        :key="item.prop"
        :label="item?.label"
        :prop="item?.prop"
        :label-width="item.labelWidth"
        class="mx-[10px]"
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
          <slot v-if="$slots[item.prop]" :name="item?.prop" />
        </div>
      </ElFormItem>
      <div
        v-if="$slots.default"
        class="flex-1 dis-flex flex-align-item-center flex-justify-end"
        style="padding-right: 20px"
      >
        <slot />
      </div>
    </div>

    <ElRow v-if="!layoutAuto" class="dis-flex pad-tb-5">
      <ElCol
        v-for="(item, index) in formConfig"
        :key="index"
        class="pad-tb-5"
        :span="item.span || span"
        style="padding: 0 10px"
      >
        <ElFormItem :label="item?.label" :prop="item?.prop" :label-width="item.labelWidth" v-bind="item?.formItemBinds">
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
            <slot v-if="$slots[item.prop]" :name="item?.prop" />
          </div>
        </ElFormItem>
      </ElCol>
      <div
        v-if="$slots.default"
        class="flex-1 dis-flex flex-align-item-center flex-justify-end"
        style="padding-right: 20px"
      >
        <slot />
      </div>
    </ElRow>
  </ElForm>
</template>

<script lang="ts" setup name="Form">
import { ElForm, ElFormItem, ElRow, ElCol } from 'element-plus'
import itemInput from '../../form-items/src/form-controls/itemInput.vue'
import itemSelect from '../../form-items/src/form-controls/itemSelect.vue'
import itemSwitch from '../../form-items/src/form-controls/itemSwitch.vue'
import itemRadio from '../../form-items/src/form-controls/itemRadio.vue'
import itemCascader from '../../form-items/src/form-controls/itemCascader.vue'
import itemCheckbox from '../../form-items/src/form-controls/itemCheckbox.vue'
import itemDate from '../../form-items/src/form-controls/itemDate.vue'
import itemDateTime from '../../form-items/src/form-controls/itemDateTime.vue'
import itemInputNumber from '../../form-items/src/form-controls/itemInputNumber.vue'
import itemRate from '../../form-items/src/form-controls/itemRate.vue'
import itemTimePicker from '../../form-items/src/form-controls/itemTimePicker.vue'
import itemTimeSelect from '../../form-items/src/form-controls/itemTimeSelect.vue'
import { PropType, ref } from 'vue'
interface Obj {
  [key: string]: any
}
const types: Obj = {
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
defineProps({
  formConfig: {
    type: Array as PropType<{ [key: string]: any }[]>,
    default: () => {
      return []
    },
  },
  layoutAuto: { type: Boolean, default: false },
  size: {
    type: String,
    default: () => {
      return ''
    },
  },
  span: { type: Number, default: 6 },
  form: {
    type: Object,
    default: () => {
      return {}
    },
  },
  itemConfig: {
    type: Object,
    default: () => {
      return {
        options: [],
        contentClass: '',
        disabled: false,
        clearable: true,
        activeColor: '#13ce66',
        inactiveColor: '',
        activeValue: true,
        inactiveValue: false,
      }
    },
  },
})

const myForm = ref()
defineExpose({
  myForm,
})
</script>
<style lang="scss" scoped>
.dis-flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.flex-align-item-center {
  align-items: center;
}
.flex-justify-end {
  justify-content: flex-end;
}
.pad-tb-5 {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
