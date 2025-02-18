---
title: UserSearch 用户搜索
---

# UserSearch 用户搜索组件

## 基础用法

:::demo
user-search/basic
:::

## API

### UserSearch 属性

该组件继承了 RemoteSearch 的所有属性，下面列出的是特有属性。更多属性请参考 [RemoteSearch 组件文档](./remote-search.md)。

| 属性名      | 说明           | 类型            | 默认值         | 必填 |
| ----------- | -------------- | --------------- | -------------- | ---- |
| v-model     | 绑定值         | string / object | -              | 是   |
| placeholder | 输入框占位文本 | string          | '请输入用户名' | 否   |

### 事件

| 事件名 | 说明                 | 回调参数                  |
| ------ | -------------------- | ------------------------- |
| change | 选中值发生变化时触发 | (value: string \| object) |
| select | 选中某个选项时触发   | (item: object)            |

### 插槽

| 插槽名  | 说明               |
| ------- | ------------------ |
| default | 自定义输入框内容   |
| option  | 自定义选项内容渲染 |
