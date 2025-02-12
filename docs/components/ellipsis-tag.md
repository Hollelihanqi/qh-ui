---
title: EllipsisTag 省略标签
---

# EllipsisTag 省略标签

## 基础用法

:::demo
ellipsis-tag/basic
:::

## API

### EllipsisTag 属性

| 属性名     | 说明            | 类型   | 可选值 | 默认值 | 备注 |
| ---------- | --------------- | ------ | ------ | ------ | ---- |
| `tags`     | tag 数据        | Array  | 必传   | -      |      |
| `valueKey` | value 的 key 值 | String | -      | value  |      |
| `labelKey` | value 的 key 值 | Number | -      | label  |      |

### EllipsisTagItem 属性

| 属性名  | 说明          | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ------------- | ------ | ------ | ------ | ---- |
| `style` | 单个 tag 样式 | string | -      | -      |      |

### EllipsisTag 插槽

| 属性名     | 说明         |
| ---------- | ------------ |
| `default`  | 默认插槽     |
| `ellipsis` | 省略按钮插槽 |
