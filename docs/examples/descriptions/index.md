# Descriptions 描述列表

通过配置字段列表 `list` 和数据源 `data` 动态展示描述信息

### 功能

- 字段配置
- 表格形式
- 支持 自定义节点
- 支持 模板插槽

## 基本使用

<demo src="./basic.vue"></demo>

## 边框样式

<demo src="./bordert.vue"></demo>

## Descriptions 属性

| 属性名            | 说明                     | 类型               | 可选值           | 默认值    |
| ----------------- | ------------------------ | ------------------ | ---------------- | --------- |
| `list`            | 字段列表                 | `<ListProps>Array` | —                | `[]`      |
| `data`            | 数据源                   | Object             | —                | `{}`      |
| `span`            | 字段所占宽度，最大 24    | Number             | `1-24`           | `8`       |
| `labelWidth`      | 字段名称宽度             | String             | —                | "auth"    |
| `labelAlign`      | 对齐方式                 | String             | "text-align:xxx" | "left"    |
| `labelSuffixHide` | 是否隐藏字段后面的冒 `:` | Boolean            | true/false       | false     |
| `border`          | 是否有边框               | Boolean            | true/false       | false     |
| `labelColor`      | 字段名称颜色             | String             | —                | "#262626" |
| `valueColor`      | 字段值颜色               | String             | —                | "#595959" |
| `lineHeight`      | 行高                     | String             | —                | "26px"    |

## ListItem 属性

| 属性名   | 说明                  | 类型     | 可选值   | 默认值    |
| -------- | --------------------- | -------- | -------- | --------- |
| `label`  | 字段名称              | String   | —        | —         |
| `prop`   | 字段 key              | String   | —        | —         |
| `render` | 自定义渲染函数        | Function | —        | —         |
| `span`   | 字段所占宽度，最大 24 | Number   | 1-24     | —         |
| `enum`   | 字段枚举值            | Enum     | —        | —         |
| `show`   | 是否显示隐藏字段      | Boolean  | Function | undefined |
