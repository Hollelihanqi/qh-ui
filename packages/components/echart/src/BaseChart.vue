<template>
  <div class="echart-container-w" :style="__style">
    <div ref="echartContainer" v-resize-element="resizeHandler" :style="__style"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, onActivated, onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import { debounceFun } from '@yto/utils'
import { ResizeElement as vResizeElement } from '@yto-custom/directives'
interface Props {
  echartId?: string
  options: object
  height?: string
  width?: string
  showLoading?: boolean
  loadingOptions?: object
}
const props = withDefaults(defineProps<Props>(), {
  echartId: '',
  height: '400px',
  width: '100%',
  showLoading: true,
  loadingOptions: () => {
    return {}
  },
  options: () => {
    return {}
  },
})

const echartContainer = ref()
const __style = computed(() => {
  return {
    height: props.height,
    width: props.width,
  }
})
const emits = defineEmits(['chart-click'])
let myChart: any | null

/**
 * @description: 图形加载动画
 * @param {*}
 * @return {*}
 */
const showLoading = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  props.showLoading &&
    myChart &&
    myChart.showLoading(
      Object.assign(
        {
          text: '正在加载...',
          color: '#2c3cd8',
          textColor: '#2c3cd8',
          zlevel: 0,
        },
        props.loadingOptions,
      ),
    )
}

/**
 * @description: 初始化图形
 * @return {*}
 */
const initChart = () => {
  if (!echartContainer.value) return
  myChart = echarts.init(echartContainer.value)
  myChart.on('click', (params: any) => {
    emits('chart-click', params)
  })
  showLoading()
  setChartOption()
  //窗口大小改变，重新绘图
  // window.addEventListener("resize", resizeHandler);
}

/**
 * @description: 设置图形数据
 * @param {*} options
 * @return {*}
 */
const setChartOption = (options?: any) => {
  myChart?.clear()
  setTimeout(() => {
    //为了解决绘制图形时无动画效果的问题
    myChart?.hideLoading()
    myChart?.setOption(options || props.options)
  }, 350)
}

/**
 * @description: 页面重绘
 * @param {*}
 * @return {*}
 */
const resizeHandler = debounceFun(() => {
  resizeChart()
}, 300)

/**
 * @description: 销毁图形
 * @param {*}
 * @return {*}
 */
const disposeChart = () => {
  myChart?.dispose()
  myChart = null
}

/**
 * @description: 重绘图形
 * @param {*}
 * @return {*}
 */
const resizeChart = () => {
  myChart?.resize()
}

/**
 * @description: 获取图形实例
 * @param {*}
 * @return {*}
 */
const getEchartInstance = () => myChart

watch(
  () => props.options,
  (value) => {
    showLoading()
    setChartOption(value)
  },
  {
    deep: true,
  },
)

onActivated(resizeHandler)
onMounted(initChart)
onUnmounted(disposeChart)

defineExpose({
  getEchartInstance,
})
</script>
