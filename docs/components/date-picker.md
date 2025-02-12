---
title: DatePicker 日期选择器
---

# DatePicker 日期选择器

## 基础用法

:::demo
date-picker/basic
:::

## 日期时间范围

:::demo
date-picker/range
:::

## API

### DatePicker 属性

| 属性名  | 说明     | 类型                 | 可选值                      | 默认值    |
| ------- | -------- | -------------------- | --------------------------- | --------- |
| `type`  | 类型     | string               | 'daterange'/'datetimerange' | daterange |
| `start` | 开始时间 | Date, number, string | —                           | —         |
| `end`   | 结束时间 | Date, number, string | —                           | —         |

### 事件

| 事件名   | 说明                   | 回调参数                        |
| -------- | ---------------------- | ------------------------------- |
| `change` | 用户确认选定的值时触发 | `(value: [Date, Date]) => void` |

更多事件和方法请参考 Element Plus DatePicker 组件文档。
