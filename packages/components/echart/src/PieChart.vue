<template>
  <BaseEchart ref="chartRef" :options="chartOptions" v-bind="$attrs"></BaseEchart>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import BaseEchart from './BaseChart.vue'
import { Map } from 'immutable'
import { getPieChartBaseOptions } from './common/chartConfig'
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
  const options = getOptiops(Map(getPieChartBaseOptions()).mergeDeep(props.options))
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
    options.title.text = '暂无数据'
    if (!options.title.textStyle) {
      options.title.textStyle = {
        color: '#8c8c8c',
        fontWeight: 'normal',
        fontSize: 14,
      }
    }
    // !options.title.textStyle &&
    //   (options.title.textStyle = {
    //     color: '#8c8c8c',
    //     fontWeight: 'normal',
    //     fontSize: 14,
    //   })
  }
  return options
}

const { getEchartInstance } = echartsComposable(chartRef)

defineExpose({
  getEchartInstance,
})
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
