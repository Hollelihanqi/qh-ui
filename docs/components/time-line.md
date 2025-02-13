---
title: TimeLine 时间线
---

# TimeLine 时间线

## 基础用法

:::demo
time-line/timeLine
:::

## 带状态的时间线

:::demo
time-line/basic
:::

## 自定义节点

:::demo
time-line/custom
:::

## API

### 属性

| 属性名       | 说明             | 类型   | 默认值                                                           |
| ------------ | ---------------- | ------ | ---------------------------------------------------------------- |
| timeData     | 时间线数据       | Array  | []                                                               |
| prependWidth | 左侧区域宽度     | string | '88px'                                                           |
| propsConfig  | 数据字段映射配置 | Object | { status: 'status', timestamp: 'timestamp', content: 'content' } |

### 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 内容默认插槽   |
| prepend | 前置内容插槽   |
| dot     | 自定义节点插槽 |

### 样式变量

| 变量名                     | 说明           |
| -------------------------- | -------------- |
| --time-line-primary        | 主题色         |
| --time-line-primary-light1 | 主题色浅色调-1 |
| --time-line-primary-light2 | 主题色浅色调-2 |
| --time-line-gray           | 灰色背景       |
