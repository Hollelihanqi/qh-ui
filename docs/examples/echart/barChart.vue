<template>
  <div class="wrapper">
    <yto-echart type="bar" :options="barChartOptions"></yto-echart>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const barChartOptions = reactive({
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
})
</script>
