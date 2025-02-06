<template>
  <el-date-picker
    v-model="timer"
    class="yto-date-picker yto-c-date-picker"
    :type="type"
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]"
  />
</template>
<script lang="ts" setup>
import { ElDatePicker } from 'element-plus'
import { computed } from 'vue'
import { datePickerProps, datePickerEmits } from './date-picker'

defineOptions({
  name: 'DatePicker',
})

const props = defineProps(datePickerProps)

const emit = defineEmits(datePickerEmits)

const timer: any = computed({
  get: () => [props.start, props.end],
  set: (val) => {
    emit('update:start', val?.length > 1 ? val[0] : '')
    emit('update:end', val?.length > 1 ? val[1] : '')
  },
})
</script>
