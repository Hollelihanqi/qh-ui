<template>
  <div class="wrapper">
    <yto-c-echart type="line" :options="lineChartOptions"></yto-c-echart>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const lineChartOptions = reactive({
  color: ['#5B8FF9'],
  legend: {
    data: ['销量'],
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  series: [
    {
      name: '销量',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20],
      label: {
        show: true,
        color: '#000',
      },
    },
  ],
})
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
