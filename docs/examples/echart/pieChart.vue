<template>
  <yto-c-echart type="pie" :options="pieChartOptions"></yto-c-echart>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const pieChartOptions = reactive({
  title: {
    text: 'Referer of a Website',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
    },
  ],
})
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
