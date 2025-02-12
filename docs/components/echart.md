---
title: Echart 图表
---

# Echart 图表

## 折线图

:::demo
echart/lineChart
:::

## 柱状图

:::demo
echart/barChart
:::

## 饼图

:::demo
echart/pieChart
:::

## 其他图形

:::demo
echart/otherChart
:::

## API

[options 完整配置请参考-echarts 文档](https://echarts.apache.org/zh/option.html#title)

### Chart 属性

| 属性名         | 说明                    | 类型    | 可选值       | 默认值 | 备注                                   |
| -------------- | ----------------------- | ------- | ------------ | ------ | -------------------------------------- |
| echartId       | 容器 ID                 | string  | -            | -      | 全局唯一                               |
| type           | 图形类型                | string  | line/bar/pie | -      | 目前仅预定义线图/柱图/饼图三种常用图形 |
| options        | 配置项                  | object  | —            | {}     | —                                      |
| width          | 图形宽度                | string  | —            | 100%   | —                                      |
| height         | 图形高度                | string  | —            | 400px  | —                                      |
| showLoading    | 显示加载 loading        | boolean | true/false   | true   | —                                      |
| loadingOptions | 可扩展的 loading 配置项 | object  |              | {}     | —                                      |

### Chart 方法

| 方法名            | 说明             | 类型         |
| ----------------- | ---------------- | ------------ |
| getEchartInstance | 获取 echart 实例 | () => Echart |

### Chart 事件

| 事件名      | 说明           | 类型                 |
| ----------- | -------------- | -------------------- |
| chart-click | click 点击事件 | 接收一个 params 参数 |
