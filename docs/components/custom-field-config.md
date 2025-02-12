---
title: CustomFieldConfig 自定义字段配置
---

# CustomFieldConfig 自定义字段配置

## 基础用法

:::demo
custom-field-config/basic
:::

## 插槽用法

:::demo
custom-field-config/bslot
:::

## 验证用法

:::demo
custom-field-config/valid
:::

## API

### CustomFieldConfig 属性

| 属性名         | 说明           | 类型           | 必填 | 默认值  |
| -------------- | -------------- | -------------- | ---- | ------- |
| v-model        | 字段值         | `Object`       | 是   | -       |
| fieldConfig    | 左侧字段配置   | `IFieldConfig` | 否   | -       |
| operatorConfig | 中间操作符配置 | `IFieldConfig` | 否   | -       |
| valueConfig    | 右侧值配置     | `IFieldConfig` | 否   | -       |
| disabled       | 是否禁用       | `boolean`      | 否   | `false` |
| rules          | 表单校验规则   | `Function`     | 否   | -       |
| ruleProp       | 表单校验字段名 | `string`       | 否   | -       |
| optionWidth    | 中间区域宽度   | `string`       | 否   | '100px' |

### IFieldConfig 类型定义

```ts
interface IFieldConfig {
  /**
   * 内置 Element Plus 元素类型
   */
  elType?: 'input' | 'select-v2'

  /**
   * v-model 绑定值对应的属性名
   */
  props: string

  /**
   * 支持 ElInput、ElSelectV2 的所有属性透传
   */
  [key: string]: any
}
```

### CustomFieldConfig 插槽

| 插槽名   | 说明                 | 作用域参数 |
| -------- | -------------------- | ---------- |
| field    | 自定义左侧字段区域   | -          |
| operator | 自定义中间操作符区域 | -          |
| value    | 自定义右侧值区域     | -          |

### CustomFieldConfig 事件

| 事件名   | 说明                   | 类型                                 |
| -------- | ---------------------- | ------------------------------------ |
| cbChange | 当任意字段值变化时触发 | `(prop: string, value: any) => void` |
