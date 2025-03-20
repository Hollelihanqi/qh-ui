---
title: SearchForm 搜索表单
---

# SearchForm 搜索表单

## 基础用法

:::demo
search-form/basic
:::

## API

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/table.html)

## SearchForm 属性

| 属性名              | 说明                                      | 类型             | 可选值     | 默认值                                  |
| ------------------- | ----------------------------------------- | ---------------- | ---------- | --------------------------------------- |
| v-model:searchModel | 数据绑定                                  | Object           | —          | null                                    |
| colConfig           | 全局配置不同屏幕下一行所显示的控件个数    | [Number, Object] | —          | `{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }` |
| formControls        | 搜索项配置项，参考 `FormControlsItem`     | Array            | —          | []                                      |
| collapsedRows       | 默认收起行数                              | Number           | —          | 1                                       |
| modelDefault        | 默认值,可以同时支持多个表单项的默认值配置 | Object           | —          | null                                    |
| clearDefaultValue   | 是否在重置的时候清除默认值                | Boolean          | —          | true                                    |
| okpos               | 确认按钮位置                              | String           | right/left | right                                   |
| collapse            | 展开收起,默认收起                         | Boolean          | true/false | false                                   |
| afterSearchFun      | 查询按钮点击后，触发的回调                | Function         | —          | () => ({})                              |
| afterResetFun       | 重置按钮点击后，触发的回调                | Function         | —          | () => ({})                              |
| beforeResetFun      | 重置按钮点击之前，触发的回调              | Function         | —          | () => ({})                              |

### FormControlsItem 属性

| 属性名       | 说明                                                                                               | 类型                                                   | 默认值 |
| ------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------ |
| el           | 表单元素类型：`input`、`select`、`tree-select`、`date-picker`、`time-picker`、`switch`、`checkbox` | String                                                 | -      |
| props        | element-plus 表单元素原生属性                                                                      | Object                                                 | -      |
| label        | 表单项标签文本                                                                                     | String                                                 | -      |
| field        | 搜索字段名称                                                                                       | String                                                 | -      |
| defaultValue | 搜索控件默认值                                                                                     | `String \| Number \| Boolean \| Function \| Array`     | -      |
| formatValue  | 格式化表单值                                                                                       | Function                                               | -      |
| fieldFormat  | 格式化字段名                                                                                       | Function                                               | -      |
| span         | 搜索项所占用的列数，默认为 1 列                                                                    | Number                                                 | 1      |
| offset       | 搜索字段左侧偏移列数                                                                               | Number                                                 | 0      |
| options      | `el` 为 select 时的选项列表                                                                        | `Array<{label: string, value: any}>`                   | []     |
| colConfig    | 响应式布局配置，可覆盖全局配置                                                                     | Number \| Record<'xs'\|'sm'\|'md'\|'lg'\|'xl', number> | -      |
| render       | 自定义渲染函数，支持 JSX                                                                           | Function                                               | -      |
| isRemote     | `el` 为 select 时，是否启用远程搜索                                                                | Boolean                                                | false  |
| remoteProps  | 远程搜索配置，参考 RemoteSearch 组件文档                                                           | Object                                                 | -      |
| hide         | 控制表单项是否隐藏的函数                                                                           | () => boolean                                          | -      |

### SearchForm 事件

| 事件名             | 说明               | 参数                 |
| ------------------ | ------------------ | -------------------- |
| update:searchModel | 表单数据更新时触发 | (value: any) => void |
| on-search          | 点击搜索按钮时触发 | -                    |
| on-reset           | 点击重置按钮时触发 | -                    |

### SearchForm 方法

| 名称            | 说明                                                  | 参数 |
| --------------- | ----------------------------------------------------- | ---- |
| getFormatValues | 获取格式化后的表单值，会应用表单项的 formatValue 函数 | -    |
