<template>
  <component :is="getRenderChart()" ref="chartRef" :options="optins" :width="width" :height="height"></component>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { echartProps, echartEmits } from './echart'
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import BaseChart from './BaseChart.vue'
import PieChart from './PieChart.vue'
import echartsComposable from './common/echartsComposable'

defineOptions({
  name: 'Echart',
})

const props = defineProps(echartProps)
const emit = defineEmits(echartEmits)

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
