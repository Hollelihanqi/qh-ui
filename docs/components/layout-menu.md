---
title: LayoutMenu 布局菜单
---

# LayoutMenu 布局菜单

## 基础用法

:::demo
layout-menu/basic
:::

## API

### LayoutMenu 属性

| 属性名            | 说明                   | 类型             | 可选值 | 默认值     | 备注                             |
| ----------------- | ---------------------- | ---------------- | ------ | ---------- | -------------------------------- |
| collapse          | 是否折叠菜单           | boolean          | -      | false      | -                                |
| menus             | 菜单数据               | IOptionTabPane[] | -      | []         | 菜单配置项数组                   |
| width             | 菜单宽度               | string           | —      | "210px"    | 展开时的菜单宽度                 |
| searchable        | 是否可搜索             | boolean          | —      | true       | 是否显示菜单搜索框               |
| title             | 系统名称               | string           | -      | ""         | 显示在菜单顶部的系统名称         |
| logo              | 系统 logo              | string           | —      | -          | 显示在系统名称前的 logo 图片地址 |
| formatMenu        | 菜单项格式化方法       | function         | —      | -          | 自定义菜单项的显示格式           |
| searchPlaceholder | 菜单搜索的 placeholder | string           | —      | '菜单查询' | 搜索框的占位文本                 |
| linkType          | 点击菜单后行为         | string           | —      | 'paneAdd'  | 可自定义点击菜单后的行为         |
| defaultActive     | 默认激活的菜单         | string           | —      | -          | 通过菜单编码指定默认激活项       |

### LayoutMenu 事件

| 事件名      | 说明           | 回调参数                              |
| ----------- | -------------- | ------------------------------------- |
| menu-click  | 点击菜单时触发 | (menu: IOptionTabPane) 被点击的菜单项 |
| menu-change | 菜单切换时触发 | (code: string) 当前激活的菜单编码     |

### LayoutMenu 样式变量

| 属性名                                            | 说明                  |
| ------------------------------------------------- | --------------------- |
| --yto-layout-menu-background                      | 菜单整体背景色        |
| --yto-layout-menu-color-text                      | 菜单文字颜色          |
| --yto-layout-menu-color-text-active               | 激活菜单文字颜色      |
| --yto-layout-menu-background-search               | 搜索框背景色          |
| --yto-layout-menu-background-title                | 顶部标题区域背景色    |
| --yto-layout-menu-color-title                     | 顶部标题文字颜色      |
| --yto-layout-menu-color-triangle                  | 折叠/展开三角图标颜色 |
| --yto-layout-menu-level-1-background-color        | 一级菜单背景色        |
| --yto-layout-menu-level-1-background-color-hover  | 一级菜单悬停背景色    |
| --yto-layout-menu-level-1-background-color-active | 一级菜单选中背景色    |
| --yto-layout-menu-level-1-background-color-expand | 一级菜单展开背景色    |
| --yto-layout-menu-level-1-box-shadow              | 一级菜单阴影样式      |
| --yto-layout-menu-level-2-background-color        | 二级菜单背景色        |
| --yto-layout-menu-level-2-background-color-hover  | 二级菜单悬停背景色    |
| --yto-layout-menu-level-2-background-color-active | 二级菜单选中背景色    |
| --yto-layout-menu-level-2-background-color-expand | 二级菜单展开背景色    |
| --yto-layout-menu-level-3-background-color        | 三级菜单背景色        |
| --yto-layout-menu-level-3-background-color-hover  | 三级菜单悬停背景色    |
| --yto-layout-menu-level-3-background-color-active | 三级菜单选中背景色    |

### 类型定义

```ts
interface IOptionTabPane {
  code?: string // 菜单编码
  target?: string // 打开方式
  mode?: string // 菜单模式
  closable?: boolean // 是否可关闭
  refresh?: boolean // 是否可刷新
  label: string // 菜单名称
  href?: string // 菜单链接
  children?: IOptionTabPane[] // 子菜单
  showIcon?: boolean // 是否显示图标
}
```
