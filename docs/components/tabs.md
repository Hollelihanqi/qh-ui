---
title: Tabs 标签页
---

# Tabs 标签页

## 基础用法

:::demo
tabs/basic
:::

## API

### Tabs 属性

| 属性名     | 说明                  | 类型           | 可选值 | 默认值 |
| ---------- | --------------------- | -------------- | ------ | ------ |
| modelValue | v-model 当前选择中值  | String、Number | —      | —      |
| activeIdx  | 当前选择中 tab 的索引 | Number         | —      | —      |
| tabs       | tabs 列表             | Array          | —      | —      |
| tabPx      | tabItem 左右内边距    | String         | —      | 32px   |
| w          | tabItem 宽度          | String         | —      | auto   |

### TabItem 属性

| 属性名     | 说明                              | 类型           |
| ---------- | --------------------------------- | -------------- |
| label      | 标签名称                          | String         |
| value      | 当前选择中 tab 的值               | String、Number |
| labelCount | 副标签，支持 ref()、()=>xxx.value | ref、Function  |

### Tabs 插槽

| 插槽名 | 说明     |
| ------ | -------- |
| right  | 右侧内容 |
