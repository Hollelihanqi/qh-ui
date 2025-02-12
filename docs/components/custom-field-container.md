---
title: CustomFieldContainer 自定义字段容器
---

# CustomFieldContainer 自定义字段容器

## 基础用法

:::demo
custom-field-container/basic
:::

## 纵向布局

:::demo
custom-field-container/vertical
:::

## 自定义/追加操作按钮

:::demo
custom-field-container/custom
:::

## 删除按钮一直展示

:::demo
custom-field-container/delete
:::

## API

### CustomFieldContainer 属性

| 属性名      | 说明              | 类型   | 可选值                | 默认值       | 备注           |
| ----------- | ----------------- | ------ | --------------------- | ------------ | -------------- |
| `direction` | 水平/垂直方向布局 | string | `vertical/horizontal` | 'horizontal' | -              |
| `width`     | 宽度              | string | -                     | '100%'       | 默认撑满父容器 |

### CustomFieldContainer 事件

| 事件名   | 说明     |
| -------- | -------- |
| `add`    | 新增操作 |
| `delete` | 删除操作 |

### CustomFieldContainer 插槽

| 插槽名          | 说明                                                          |
| --------------- | ------------------------------------------------------------- |
| `prepend`       | 前置插槽                                                      |
| `content`       | 左侧内容区域，作用域参数 item, index                          |
| `btn`           | 右侧操作按钮，作用域参数 item, index                          |
| `btnAppend`     | 右侧操作追加按钮，作用域参数 item, index                      |
| `append`        | 后置插槽                                                      |
| `termHiddenDel` | 是否条件隐藏删除按钮（只有一条数据时隐藏删除按钮），默认 true |

### CustomFieldContainer 样式变量

| 变量名            | 说明       |
| ----------------- | ---------- |
| `--field-row-m-y` | 行纵向间距 |
