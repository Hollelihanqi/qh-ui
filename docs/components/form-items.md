# From-item 表单

基于 element-plus：el-form-item 二次封装，支持 el-form-item 的所有属性

### 功能

- JSON 数据渲染 from表单

## 基本使用
:::demo
form-items/basic
:::
## 配合search-container使用
:::demo
form-items/basicSearch
:::

## Attributes

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/form.html)

### item-config属性


| 属性名          | 说明                       | 类型   | 可选值 | 默认值 | 备注 |
| --------------- | -------------------------- | ------ | ------ | ------ | ---- |
| `formItemWidth` | 每项 formItem 宽度         | string | -      | 20%    | \_   |
| `formItemBinds` | 自动 v-bing 到 formItem 上 | object | -      | -      | \_   |

### itemType 支持类型

input select switch radio cascader checkbox
date dateTime inputNumber rate timePicker timeSelect
