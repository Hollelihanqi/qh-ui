---
title: AdaptionContainer 适配容器组件
---

# CustomFieldConfig 自定义字段配置

## 基础用法

:::demo
adaption-container/basic
:::

## API

### CustomFieldConfig 属性

| 属性名            | 说明             | 类型   | 可选值 | 默认值 | 备注 |
| ----------------- | ---------------- | ------ | ------ | ------ | ---- |
| list              | 列表数据         | Array  | 必传   | -      |      |
| minWidth          | Card 最小宽度    | Number | -      | 200    |      |
| gap               | Card 间距        | Number | -      | 10     |      |
| minNum            | 单行最小显示个数 | Number | -      | 1      |      |
| containerMinWidth | 容器的最小宽度   | Number | -      | 0      |      |

### CustomFieldConfig 插槽

| 属性名  | 说明     |
| ------- | -------- |
| default | 默认插槽 |
