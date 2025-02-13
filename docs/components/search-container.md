---
title: SearchContainer 搜索容器
---

# SearchContainer 搜索容器

## 基础用法

:::demo
search-container/basic
:::

## API

### 属性

| 属性名          | 说明               | 类型    | 可选值 | 默认值 | 备注                   |
| --------------- | ------------------ | ------- | ------ | ------ | ---------------------- |
| isUseForm       | 是否使用 form 表单 | Boolean | -      | true   | -                      |
| itemMinWidth    | 每一项的最小宽度   | Number  | -      | 300    | -                      |
| itemMaxWidth    | 每一项的最大宽度   | Number  | -      | -      | -                      |
| customClass     | 自定义 class       | String  | -      | -      | -                      |
| autoLayout      | 开启自动布局       | Boolean | -      | true   | -                      |
| isCollapse      | 是否开启折叠       | Boolean | -      | false  | -                      |
| collapseLine    | 开启折叠的行数     | Number  | -      | 3      | 开启 isCollapse 后生效 |
| defaultCollapse | 默认是否折叠       | Boolean | -      | false  | 开启 isCollapse 后生效 |

### 插槽

| 插槽名    | 说明             |
| --------- | ---------------- |
| default   | 默认插槽         |
| operation | 右侧操作区域插槽 |

### 事件

| 事件名     | 说明               | 类型                      |
| ---------- | ------------------ | ------------------------- |
| resize     | 容器大小变化时触发 | Function 返回每一项的宽度 |
| enterKeyup | enter 键抬起时触发 | Function                  |

### Items 属性

| 属性名    | 说明           | 类型   | 可选值 | 默认值 | 备注                   |
| --------- | -------------- | ------ | ------ | ------ | ---------------------- |
| data-cols | 每一项所占列数 | Number | -      | 1      | 仅开启 autoLayout 有效 |
