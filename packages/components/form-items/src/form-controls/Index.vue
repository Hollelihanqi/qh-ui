<template>
  <component v-bind="item" :is="getComponent(item.itemType)" />
</template>
<script lang="ts" setup>
import itemInput from './itemInput.vue'
import itemSelect from './itemSelect.vue'
import itemSwitch from './itemSwitch.vue'
import itemRadio from './itemRadio.vue'
import itemCascader from './itemCascader.vue'
import itemCheckbox from './itemCheckbox.vue'
import itemDate from './itemDate.vue'
import itemDateTime from './itemDateTime.vue'
import itemInputNumber from './itemInputNumber.vue'
import itemRate from './itemRate.vue'
import itemTimePicker from './itemTimePicker.vue'
import itemTimeSelect from './itemTimeSelect.vue'
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
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
