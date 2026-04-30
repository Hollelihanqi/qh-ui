---
title: TableEditor 表格编辑器
---

# TableEditor 表格编辑器

## 基础用法

:::demo
table-editor/basic
:::

## 表单验证

:::demo
table-editor/valid
:::

## 表单验证-结合hd-form使用

## 只读，禁用，隐藏

:::demo
table-editor/readonly
:::

## API

### Table 属性

| 属性名       | 说明             | 类型      | 可选值 | 默认值 | 备注                             |
| ------------ | ---------------- | --------- | ------ | ------ | -------------------------------- |
| columns      | 表格列配置       | IColumn[] | -      | -      | 必填                             |
| operateWidth | 操作列宽度       | number    | -      | -      | 使用插槽时的操作列宽度           |
| disabled     | 是否禁用         | boolean   | -      | false  | 禁用表内所有编辑功能             |
| readonly     | 是否只读         | boolean   | -      | false  | 表格只读模式                     |
| setProp      | 配置属性         | function  | -      | -      | 触发表单验证的prop配置           |
| setRules     | 表单验证规则     | function  | -      | -      | 表格单元格的验证规则             |
| 其他         | Element Plus属性 | any       | -      | -      | 支持Element Plus Table的所有属性 |

### Table 方法

表格组件支持所有 Element Plus Table 的方法，包括但不限于:

- clearSelection: 用于清空表格的选择状态
- toggleRowSelection: 用于切换某一行的选中状态
- toggleAllSelection: 用于切换所有行的选中状态
- toggleRowExpansion: 用于切换某一行的展开状态
- setCurrentRow: 用于设置某一行为当前行
- clearSort: 用于清空排序状态
- clearFilter: 用于清空过滤状态

更多方法请参考 [Element Plus Table 文档](https://element-plus.org/zh-CN/component/table.html#table-methods)

### IColumn 类型定义

```typescript
interface IColumn {
  // 表单项类型
  itemType:
    | 'input'
    | 'select'
    | 'tree-select'
    | 'date-picker'
    | 'time-picker'
    | 'time-select'
    | 'switch'
    | 'checkbox'
    | 'cascader'
    | 'autocomplete'

  // 表单组件属性配置
  itemProps?: Record<string, any>

  // 列标签
  label?: string

  // 列属性
  prop: string

  // 是否禁用
  disabled?: boolean | ((row: Record<string, any>) => boolean)

  // 是否隐藏
  isHidden?: boolean | ((row: Record<string, any>) => boolean)

  // 只读状态下的文本格式化
  formateText?: (row: Record<string, any>) => string

  // 支持其他 Table-Column 的所有属性
  [key: string]: any
}
```

### itemType 支持的类型

表单项类型支持以下值：

- input
- select
- tree-select
- date-picker
- time-picker
- time-select
- switch
- checkbox
- cascader
- autocomplete

```

```
