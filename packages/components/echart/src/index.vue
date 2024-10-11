<template>
  <component :is="getRenderChart()" ref="chartRef" :options="optins" :width="width" :height="height"></component>
</template>

<script lang="ts" setup name="Echart">
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import BaseChart from './BaseChart.vue'
import PieChart from './PieChart.vue'
import echartsComposable from './common/echartsComposable'

interface Props {
  type?: 'line' | 'bar' | 'pie' //目前支持3种预定义图形
  optins: any
  width: string
  height: string
}
const props = withDefaults(defineProps<Props>(), {
  type: undefined,
  height: '400px',
  width: '100%',
  optins: () => {
    return {}
  },
})
const chartRef = ref()
const chartMap = new Map<string, any>()
chartMap.set('line', LineChart)
chartMap.set('bar', BarChart)
chartMap.set('pie', PieChart)

const getRenderChart = () => {
  return props.type && chartMap.has(props.type) ? chartMap.get(props.type) : BaseChart
}
const { getEchartInstance } = echartsComposable(chartRef)

defineExpose({
  getEchartInstance,
})
</script>
