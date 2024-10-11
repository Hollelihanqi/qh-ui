<template>
  <ElDatePicker
    v-model="timer"
    class="yto-c-date-picker"
    :type="type"
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]"
  />
</template>
<script lang="ts" setup name="DataPicker">
import { ElDatePicker } from 'element-plus'
type DateModelType = number | string | Date
interface IProps {
  start: DateModelType
  end: DateModelType
  type?: 'daterange' | 'datetimerange'
}
const props = withDefaults(defineProps<IProps>(), {
  start: '',
  end: '',
  type: 'daterange',
})
const emit = defineEmits(['update:start', 'update:end'])
const timer: any = computed({
  get: () => [props.start, props.end],
  set: (val) => {
    emit('update:start', val?.length > 1 ? val[0] : '')
    emit('update:end', val?.length > 1 ? val[1] : '')
  },
})
</script>
<style lang="scss">
.yto-c-date-picker input:nth-of-type(1) {
  /* 在这里添加你的样式 */
  text-align: left !important;
  padding-left: 8px !important;
}
</style>
