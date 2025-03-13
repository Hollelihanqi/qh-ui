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

## 自定义标签渲染

可以通过以下三种方式自定义标签的渲染：

1. 使用具名插槽（优先级最高）
2. 使用 labelRender 函数（优先级第二）
3. 使用默认的标签渲染（优先级最低）

:::demo
descriptions/custom-label
:::

## API

### Descriptions 属性

| 属性名             | 说明                     | 类型               | 可选值           | 默认值    |
| ------------------ | ------------------------ | ------------------ | ---------------- | --------- |
| list               | 字段列表                 | `<ListProps>Array` | —                | `[]`      |
| data               | 数据源                   | Object             | —                | `{}`      |
| span               | 字段所占宽度，最大 24    | Number             | `1-24`           | `8`       |
| labelWidth         | 字段名称宽度             | String             | —                | "auto"    |
| labelAlign         | 对齐方式                 | String             | "text-align:xxx" | "left"    |
| labelSuffixHide    | 是否隐藏字段后面的冒 `:` | Boolean            | true/false       | false     |
| border             | 是否有边框               | Boolean            | true/false       | false     |
| labelColor         | 字段名称颜色             | String             | —                | "#606266" |
| valueColor         | 字段值颜色               | String             | —                | "#909399" |
| lineHeight         | 行高                     | String             | —                | "26px"    |
| colAignItemsCenter | 列是否垂直居中对齐       | Boolean            | true/false       | false     |

### ListItem 属性

| 属性名        | 说明                  | 类型             | 可选值   | 默认值    |
| ------------- | --------------------- | ---------------- | -------- | --------- |
| label         | 字段名称              | String           | —        | —         |
| prop          | 字段 key              | String           | —        | —         |
| render        | 自定义内容渲染函数    | Function(item)   | —        | —         |
| labelRender   | 自定义标签渲染函数    | Function(item)   | —        | —         |
| span          | 字段所占宽度，最大 24 | Number           | 1-24     | —         |
| enum          | 字段枚举值            | Object           | —        | —         |
| show          | 是否显示隐藏字段      | Boolean/Function | —        | undefined |
| labelPosition | 标签位置              | String           | left/top | —         |

### Descriptions 插槽

| 插槽名       | 说明                                | 作用域参数 |
| ------------ | ----------------------------------- | ---------- |
| `{prop}`     | 自定义内容渲染插槽，prop 为字段 key | item       |
| label-{prop} | 自定义标签渲染插槽，prop 为字段 key | item       |

### 示例

```vue
<template>
  <Descriptions :data="data" :list="list">
    <!-- 使用插槽自定义标签 -->
    <template #label-name="{ label }">
      <span style="color: red">{{ label }}</span>
    </template>

    <!-- 使用插槽自定义内容 -->
    <template #age="{ prop }">
      <span>{{ data[prop] }} 岁</span>
    </template>
  </Descriptions>
</template>

<script setup>
const data = {
  name: '张三',
  age: 18,
  gender: '男',
}

const list = [
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    label: '性别',
    prop: 'gender',
    // 使用 labelRender 自定义标签
    labelRender: (item) => <span style="color: blue">{item.label}</span>,
  },
]
</script>
```
