---
title: TareaTag 文本域标签
---

# TareaTag 文本域标签

TareaTag组件用于处理多行文本输入,每行文本可以转换为标签形式展示。

## 基础用法

:::demo
tarea-tag/basic
:::

## API

### TareaTag 属性

| 属性名      | 说明                               | 类型              | 可选值 | 默认值 |
| ----------- | ---------------------------------- | ----------------- | ------ | ------ |
| v-model     | 绑定值                             | Object            | —      | —      |
| placeholder | 输入框占位文本                     | String            | —      | ""     |
| regular     | 验证每行文本的正则表达式或验证函数 | RegExp / Function | —      | null   |
| required    | 是否必填                           | Boolean           | —      | false  |
| maxLength   | 最大输入长度                       | Number            | —      | —      |
| minLength   | 最小输入长度                       | Number            | —      | —      |
| disabled    | 是否禁用                           | Boolean           | —      | false  |

### Events

| 事件名 | 说明           | 回调参数          |
| ------ | -------------- | ----------------- |
| change | 值变化时触发   | (value: string[]) |
| blur   | 失去焦点时触发 | (event: Event)    |
| focus  | 获得焦点时触发 | (event: Event)    |

### Methods

| 方法名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| clear  | 清空输入框       | —    |
| focus  | 使输入框获得焦点 | —    |

### Slots

| 插槽名 | 说明           |
| ------ | -------------- |
| tag    | 自定义标签内容 |
