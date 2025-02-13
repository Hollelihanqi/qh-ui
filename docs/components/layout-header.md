---
title: LayoutHeader 布局头部
---

# LayoutHeader 布局头部

## 基础用法

:::demo
layout-header/basic
:::

## API

### LayoutHeader 属性

| 属性名       | 说明             | 类型                                 | 可选值 | 默认值 | 备注 |
| ------------ | ---------------- | ------------------------------------ | ------ | ------ | ---- |
| title        | 系统名称         | string                               | -      | ""     |      |
| collapse     | 是否折叠         | boolean                              | -      | false  |      |
| logo         | 系统 logo        | Img                                  | -      | -      |      |
| userInfo     | 用户信息         | {userName: string, userCode: string} | -      |        |      |
| isfullscreen | 全屏按钮是否显示 | boolean                              | -      | true   |      |

### LayoutHeader 事件

| 事件名     | 说明     | 类型     |
| ---------- | -------- | -------- |
| logout     | 退出登录 | Function |
| collapse   | 折叠     | Function |
| fullscreen | 全屏     | Function |

### LayoutHeader 插槽

| 插槽名  | 说明                 |
| ------- | -------------------- |
| default | 折叠按钮区域插槽     |
| left    | 左侧 title 区域插槽  |
| right   | 右侧用户信息区域插槽 |
| logout  | 右侧退出登录区域插槽 |

### LayoutHeader 样式变量

| 变量名                              | 说明                |
| ----------------------------------- | ------------------- |
| --layout-header-text-color          | 文字颜色            |
| --layout-header-background          | 背景色              |
| --layout-header-left-width          | 左侧区域宽度        |
| --layout-header-left-collapse-width | 左侧区域折叠后宽度  |
| --layout-header-left-title-size     | 左侧区域 title 大小 |
