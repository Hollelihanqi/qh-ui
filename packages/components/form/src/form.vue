<template>
  <el-form v-bind="$attrs" ref="myForm" :model="form" class="yto-form">
    <div v-if="layoutAuto" class="dis-flex flex-wrap">
      <form-items
        :form-config="formConfig"
        :form="form"
        :item-config="itemConfig"
      >
        <template v-for="slot in Object.keys($slots)" #[slot]="slotProps">
          <slot :name="slot" v-bind="slotProps" />
        </template>
      </form-items>
      
      <div
        v-if="$slots.default"
        class="flex-1 dis-flex flex-align-item-center flex-justify-end"
        style="padding-right: 20px"
      >
        <slot />
      </div>
    </div>

    <el-row v-if="!layoutAuto" class="dis-flex pad-tb-5">
      <el-col
        v-for="(item, index) in formConfig"
        :key="index"
        class="pad-tb-5"
        :span="item.span || span"
        style="padding: 0 10px"
      >
        <form-items
          :form-config="[item]"
          :form="form"
          :item-config="itemConfig"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="slotProps">
            <slot :name="slot" v-bind="slotProps" />
          </template>
        </form-items>
      </el-col>
      
      <div
        v-if="$slots.default"
        class="flex-1 dis-flex flex-align-item-center flex-justify-end"
        style="padding-right: 20px"
      >
        <slot />
      </div>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
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
  name: 'Form',
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const types: Record<string, Component> = {
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
const getComponent = (type: string): Component => {
  return types[type]
}

const myForm = ref()
defineExpose({
  myForm,
})
</script>
