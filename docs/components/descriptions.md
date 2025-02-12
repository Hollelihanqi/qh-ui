---
title: Descriptions 描述列表
---

# Descriptions 描述列表

## 基础用法

:::demo
descriptions/basic
:::

## 边框样式

:::demo
descriptions/border
:::

## API

### Descriptions 属性

| 属性名          | 说明                       | 类型             | 可选值           | 默认值    |
| --------------- | -------------------------- | ---------------- | ---------------- | --------- |
| list            | 字段列表                   | <ListProps>Array | —                | []        |
| data            | 数据源                     | Object           | —                | {}        |
| span            | 字段所占宽度，最大 24      | Number           | 1-24             | 8         |
| labelWidth      | 字段名称宽度               | String           | —                | "auto"    |
| labelAlign      | 对齐方式                   | String           | "text-align:xxx" | "left"    |
| labelSuffixHide | 是否隐藏字段后面的冒号 `:` | Boolean          | true/false       | false     |
| border          | 是否有边框                 | Boolean          | true/false       | false     |
| labelColor      | 字段名称颜色               | String           | —                | "#262626" |
| valueColor      | 字段值颜色                 | String           | —                | "#595959" |
| lineHeight      | 行高                       | String           | —                | "26px"    |

### ListItem 属性

| 属性名 | 说明                  | 类型             | 可选值 | 默认值    |
| ------ | --------------------- | ---------------- | ------ | --------- |
| label  | 字段名称              | String           | —      | —         |
| prop   | 字段 key              | String           | —      | —         |
| render | 自定义渲染函数        | Function         | —      | —         |
| span   | 字段所占宽度，最大 24 | Number           | 1-24   | —         |
| enum   | 字段枚举值            | Enum             | —      | —         |
| show   | 是否显示隐藏字段      | Boolean/Function | —      | undefined |
