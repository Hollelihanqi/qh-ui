---
title: Dialog 对话框
---

# Dialog 对话框

## 基础用法

:::demo
dialog/basic
:::

## 弹出位置

:::demo
dialog/position
:::

## 按钮地址

:::demo
dialog/btnurl
:::

```vue
<template>
  <el-button type="primary" @click="dialogVisible = true"> 点击打开 Dialog </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="提示"
    :confirmOption="{ txt: '确定' }"
    :cancelOption="{ txt: '取消' }"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <span>这是一段信息</span>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)

const handleConfirm = () => {
  // 确认按钮逻辑
  return true // 返回 true 关闭对话框
}

const handleCancel = () => {
  // 取消按钮逻辑
  return true // 返回 true 关闭对话框
}
</script>
```

## API

组件基于 Element Plus 的 Dialog 组件进行扩展，支持 Element Plus Dialog 的所有属性。

[Element Plus Dialog 文档](https://element-plus.org/zh-CN/component/dialog.html)

### 属性

| 属性名        | 说明         | 类型             | 默认值    |
| ------------- | ------------ | ---------------- | --------- |
| confirmOption | 确认按钮配置 | IbtnProps        | undefined |
| cancelOption  | 取消按钮配置 | IbtnProps        | undefined |
| offset        | 对话框偏移量 | [number, number] | []        |
| draggable     | 是否可拖拽   | boolean          | false     |

### 事件

| 事件名  | 说明               | 回调参数 | 返回值                     |
| ------- | ------------------ | -------- | -------------------------- |
| confirm | 点击确认按钮时触发 | -        | boolean (true: 关闭对话框) |
| cancel  | 点击取消按钮时触发 | -        | boolean (true: 关闭对话框) |

### 类型定义

```ts
interface IbtnProps extends ButtonProps {
  txt: string
  [propName: string]: any
}
```

### confirmOption/cancelOption 配置项

按钮配置继承自 Element Plus 的 Button 组件的所有属性，另外扩展了以下属性：

| 属性名 | 说明     | 类型   | 默认值 |
| ------ | -------- | ------ | ------ |
| txt    | 按钮文本 | string | -      |

## 示例

### 自定义按钮

```vue
<el-dialog
  v-model="visible"
  title="自定义按钮"
  :confirmOption="{
    txt: '确认',
    type: 'primary',
    icon: 'Check',
  }"
  :cancelOption="{
    txt: '取消',
    type: 'info',
  }"
>
  对话框内容
</el-dialog>
```

### 可拖拽对话框

```vue
<el-dialog v-model="visible" title="可拖拽对话框" :draggable="true" :offset="[100, 100]">
  可通过鼠标拖拽移动对话框
</el-dialog>
```
