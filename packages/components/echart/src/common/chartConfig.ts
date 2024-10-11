/***************线图的基础配置----start*****************/
export const getLineChartConfig = () => {
  return {
    title: {
      show: false,
      text: '暂无数据',
      x: 'center',
      y: 'center',
      textStyle: {
        color: '#8c8c8c',
        fontWeight: 'normal',
        fontSize: 14,
      },
    },
    color: [],
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      textStyle: {
        fontSize: 14,
        color: '#fff',
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          show: true,
          type: 'solid',
        },
      },
    },
    legend: {
      show: true,
      data: [],
    },
    grid: {
      left: 50,
      right: '5%',
      top: '10%',
      bottom: 50,
    },
    xAxis: {
      show: true,
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'background: rgba(0, 0, 0, 0.15)',
        },
      },
      data: [],
    },
    yAxis: {
      show: true,
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [],
  }
}
/***************线图的基础配置----end*****************/

/***************柱状图基础配置----start*****************/
export const getBarChartBaseOptions = () => {
  return {
    animation: true,
    title: {
      show: false,
      text: '暂无数据',
      x: 'center',
      y: 'center',
      textStyle: {
        color: '#8c8c8c',
        fontWeight: 'normal',
        fontSize: 14,
      },
    },
    textStyle: {
      fontSize: 14,
      color: '#999',
    },
    tooltip: {
      show: true,
    },
    grid: {
      left: 50,
      right: '5%',
      top: '10%',
      bottom: 50,
    },
    xAxis: {
      show: true,
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#D9D9D9',
        },
      },
      data: [],
    },
    yAxis: {
      show: true,
      name: '',
      type: 'value',
      axisLabel: {
        show: true,
        margin: 15,
        fontSize: 14,
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      axisTick: {
        show: false,
      },

      data: [],
    },
    series: [],
  }
}

/***************柱状图基础配置----end*****************/

/***************饼图图基础配置----start*****************/
export const getPieChartBaseOptions = () => {
  return {
    title: {
      text: '',
      left: 'center',
      top: 10,
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      orient: 'vertical',
      left: 'left',
    },
    series: [],
  }
}

/***************饼图基础配置----end*****************/
