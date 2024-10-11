<template>
  <div class="echart-container" :style="{ height, width }">
    <div :id="containerId" v-resize-element="resizeHandler" :style="{ height, width }"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { guid, debounceFun } from '@yto/utils'
import { ResizeElement as vResizeElement } from '@yto-custom/directives'
import { logger } from '@yto-custom/utils'
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
const emits = defineEmits(['chart-click'])
let myChart: any | null

const containerId = computed(() => {
  return props.echartId || `baseChart_${guid()}`
})

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
  const container: any = document.querySelector(`#${containerId.value}`)
  myChart = echarts.init(container)
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
    logger('setChartOption', options || props.options)
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
