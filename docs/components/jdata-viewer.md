---
title: JDataViewer JSON数据查看器
---

# JDataViewer JSON数据查看器

## 基础用法

:::demo
jdata-viewer/basic
:::

## API

### JDataViewer 属性

| 属性名       | 说明           | 类型    | 可选值       | 默认值    |
| ------------ | -------------- | ------- | ------------ | --------- |
| data         | JSON 对象      | Object  | —            | {}        |
| expanded     | 是否收起       | Boolean | —            | false     |
| copy         | 复制功能       | Boolean | —            | true      |
| expandDepth  | 默认展开的级数 | Number  | —            | 3         |
| theme        | 主题颜色       | String  | "light/dark" | light     |
| rootTagStart | 根节点名称     | String  | —            | "{"       |
| rootTagEnd   | 根节点名称     | String  | —            | "}"       |
| expandColor  | 展开按钮颜色   | String  | —            | "#824c96" |
