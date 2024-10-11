import { unref } from 'vue'
const echartsComposable = (chartRef: any) => {
  const getEchartInstance = () => {
    return chartRef ? unref(chartRef).getEchartInstance() : null
  }
  return {
    getEchartInstance,
  }
}

export default echartsComposable
