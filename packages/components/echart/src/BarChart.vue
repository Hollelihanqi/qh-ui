<template>
  <BaseEchart ref="chartRef" :options="chartOptions" v-bind="$attrs"></BaseEchart>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import BaseEchart from './BaseChart.vue'
import { Map } from 'immutable'
import { getBarChartBaseOptions } from './common/chartConfig'
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
  const options = getOptiops(Map(getBarChartBaseOptions()).mergeDeep(props.options))
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
  }
  return options
}

const { getEchartInstance } = echartsComposable(chartRef)
defineExpose({
  getEchartInstance,
})
</script>
