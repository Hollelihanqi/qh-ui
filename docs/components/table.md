---
title: Table 表格组件
---

# Table 表格

::: tip
基于 element-plus 的 el-table 和 el-pagination 组件二次封装，支持所有 element-plus 原生属性。
:::

## 基础示例

### 基本使用

:::demo
table/basic
:::

### 自动请求数据

:::demo
table/autoRequestData
:::

### 列枚举

:::demo
table/cellEnum
:::

### 自定义列头

:::demo
table/customColumnHeader
:::

## API 文档

### Table 属性

| 属性名               | 说明                             | 类型              | 默认值                                      |
| -------------------- | -------------------------------- | ----------------- | ------------------------------------------- |
| columns              | 表头配置，兼容 Table-column 属性 | `Array`           | `[]`                                        |
| tableData            | 表格数据源                       | `Array`           | `[]`                                        |
| paginationHide       | 是否隐藏分页                     | `Boolean`         | `false`                                     |
| paginationHideAuto   | 数据量超过 pageSize 时显示分页   | `Boolean`         | `true`                                      |
| paginationOptions    | 分页组件配置，参考 element-plus  | `Object`          | `{}`                                        |
| layout               | 分页组件布局，用逗号分隔         | `String`          | `"total, sizes, prev, pager, next, jumper"` |
| total                | 数据总条数                       | `Number`          | `0`                                         |
| pageSize             | 每页显示条数                     | `Number`          | `10`                                        |
| pageSizes            | 每页条数选择器的选项             | `Array`           | `[10, 30, 50, 100]`                         |
| currentPage          | 当前页码                         | `Number`          | `1`                                         |
| pageLimit            | 分页起始值                       | `Number`          | `1`                                         |
| currentPageKey       | 请求参数中页码的字段名           | `String`          | `"page"`                                    |
| pageSizeKey          | 请求参数中每页条数的字段名       | `String`          | `"size"`                                    |
| requestApi           | 数据请求方法                     | `Function`        | -                                           |
| requestAuto          | 是否自动请求数据                 | `Boolean`         | `true`                                      |
| requestLoadingHide   | 请求时是否隐藏加载状态           | `Boolean`         | `false`                                     |
| tableActionIsCallApi | 分页切换时是否自动请求           | `Boolean`         | `true`                                      |
| dataKey              | 响应数据中列表数据的字段名       | `String`          | `"items"`                                   |
| dataCallback         | 数据处理回调函数                 | `Function`        | -                                           |
| dataUpdateAfter      | 数据更新后的回调函数             | `Function`        | -                                           |
| requestParams        | 额外的请求参数                   | `Object/Function` | -                                           |
| headerbgHide         | 是否隐藏表头背景色               | `Boolean`         | -                                           |
| loading              | 加载状态                         | `Boolean`         | `false`                                     |
| toolBar              | 是否显示表格工具栏               | `Boolean`         | `false`                                     |
| showHideFields       | 列显示配置                       | `Object/Array`    | `null`                                      |
| emptyOptions         | 空状态配置                       | `Object`          | `{}`                                        |

### Table-column 列配置

| 属性名     | 说明             | 类型    | 示例                        |
| ---------- | ---------------- | ------- | --------------------------- |
| fields     | 可配置的列字段   | `Array` | `["id", "title", "status"]` |
| showFields | 默认显示的列字段 | `Array` | `["id", "title"]`           |

### Table-column 属性

| 属性名       | 说明               | 类型             | 备注     |
| ------------ | ------------------ | ---------------- | -------- |
| hide         | 是否隐藏该列       | `()=>Boolean`    | -        |
| copy         | 是否支持点击复制   | `Boolean`        | -        |
| enum         | 枚举字典           | `Array/Object`   | -        |
| formatText   | 文本格式化函数     | `(row)=>string`  | -        |
| render       | 自定义渲染函数     | `(scope)=>VNode` | 支持 JSX |
| headerRender | 自定义表头渲染函数 | `Function`       | 支持 JSX |
| \_children   | 多级表头配置       | `Array`          | -        |

### Table 方法

| 方法名          | 说明           | 参数说明                                    |
| --------------- | -------------- | ------------------------------------------- |
| updateTableData | 更新表格数据   | `object` 类型的参数对象                     |
| resetTableData  | 重置表格数据   | `object` 类型的参数对象                     |
| resetPage       | 重置分页参数   | -                                           |
| updatePage      | 更新分页参数   | `{ currentPage: number, pageSize: number }` |
| getData         | 获取当前页数据 | -                                           |
| setting         | 打开列设置窗口 | -                                           |

### Table 实例

::: tip

通过 `YtoCTableInstance.value.ElTableInstance` 可调用所有 el-table 方法。

:::
 
### Table 插槽

| 名称        | 说明           |
| ----------- | -------------- |
| tableHeader | 自定义表头内容 |

### Table-column 插槽

| 名称                   | 说明       | 作用域参数                |
| ---------------------- | ---------- | ------------------------- |
| column.prop            | 单元格内容 | `{ row, column, $index }` |
| column.prop + "Header" | 表头内容   | `{ column, $index }`      |

### Table 事件

| 事件名   | 说明         | 回调参数                                                                                     |
| -------- | ------------ | -------------------------------------------------------------------------------------------- |
| on-table | 表格操作回调 | `type: string`（操作类型）<br>`value: { pageSize: number, currentPage: number }`（分页信息） |
