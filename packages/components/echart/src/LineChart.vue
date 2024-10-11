<template>
  <BaseEchart ref="chartRef" :options="chartOptions" v-bind="$attrs"></BaseEchart>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import BaseEchart from './BaseChart.vue'
import { Map } from 'immutable'
import { getLineChartConfig } from './common/chartConfig'
import { getOptiops } from './common/util'
import echartsComposable from './common/echartsComposable'
import { isEmptyFun } from '@yto/utils'

interface Props {
  options?: any
}
const props = withDefaults(defineProps<Props>(), {
  options: () => {
    return {}
  },
})
const chartRef = ref()
const chartOptions = computed(() => {
  const options = getOptiops(Map(getLineChartConfig()).mergeDeep(props.options))
  return dealNodata(options)
})
/**
 * @description:无数据
 * @param {*} options
 * @return {*}
 */
const dealNodata = (options: any) => {
  if (
    isEmptyFun(options.series) ||
    (Array.isArray(options.series) && options.series.every((item: any) => isEmptyFun(item.data)))
  ) {
    options.title.show = true
    options.yAxis.show = false
    options.xAxis.show = false
    options.legend.show = false
    options.tooltip.show = false
  }
  return options
}
const { getEchartInstance } = echartsComposable(chartRef)

defineExpose({
  //对外暴露echart对象
  getEchartInstance,
})
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
