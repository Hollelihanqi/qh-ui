---
title: WaterMark 水印
---

# WaterMark 水印

## 基础用法

:::demo
water-mark/basic
:::

## API

### WaterMark 属性

| 属性名    | 说明                  | 类型   | 必填 | 默认值                |
| --------- | --------------------- | ------ | ---- | --------------------- |
| width     | 水印宽度              | number | 否   | 200                   |
| height    | 水印高度              | number | 否   | 100                   |
| content   | 水印显示文字          | string | 是   | -                     |
| font      | 字体样式              | string | 否   | '14px Inter, Avenir'  |
| fillStyle | 字体填充样式          | string | 否   | 'rgba(0, 0, 0, 0.08)' |
| rotate    | 文字旋转角度          | number | 否   | -28                   |
| zIndex    | 水印元素的 z-index 值 | string | 否   | '99999'               |
