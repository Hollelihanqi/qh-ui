---
title: Table
---

# Table 表格

基于 element-plus：el-table el-pagination 二次封装，支持 element-plus 的所有属性

## 功能

- JSON 数据渲染 Table
- 自带分页功能
- 自动请求 API 获取列表数据
- 列复制
- 列枚举
- 表头自定义内容（'template'、'h 函数','JSX'）
- 列自定义内容（'template'、'h 函数','JSX'）

## 基本使用

:::demo

table/basic

:::

## 自动请求数据

:::demo

table/autoRequestData

:::

## 列枚举

:::demo

table/cellEnum

:::

## 自定义列头

:::demo

table/customColumnHeader

:::

## Table API

### Table 属性

| 属性名                 | 说明                                                                                             | 类型            | 可选值     | 默认值                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------ | --------------- | ---------- | ----------------------------------------- |
| `columns`              | 表头 columns 配置项兼容 Table-column 属性                                                        | Array           | —          | []                                        |
| `tableData`            | 数据源                                                                                           | Array           | —          | []                                        |
| `paginationHide`       | 是否隐藏分页功能                                                                                 | Boolean         | —          | false                                     |
| `paginationHideAuto`   | 当数据大于 `pageSize` 时显示分页，否则不显示分页                                                 | Boolean         | —          | true                                      |
| `paginationOptions`    | 分页组件 props (参考 element-plus)                                                               | Boolean         | —          | {}                                        |
| `layout`               | 分页组件布局，子组件名用逗号分隔                                                                 | String          | —          | "total, sizes, prev, pager, next, jumper" |
| `total`                | 总条目数                                                                                         | Number          | —          | 0                                         |
| `pageSize`             | 分页大小                                                                                         | Number          | —          | 10                                        |
| `pageSizes`            | 每页显示个数选择器的选项设置                                                                     | Array           | —          | [10, 30, 50, 100]                         |
| `currentPage`          | 当前页数                                                                                         | Number          | —          | 1                                         |
| `pageLimit`            | 分页开始游标值                                                                                   | Number          | —          | 1                                         |
| `currentPageKey`       | 传给 API 的默认字段名，paginationHide 为 true 时，不携带此参数                                   | String          | —          | page                                      |
| `pageSizeKey`          | 传给 API 的默认字段名，paginationHide 为 true 时，不携带此参数                                   | String          | —          | size                                      |
| `tableChange`          | 触发分页、排序 调用此方法，接收 actionType 和 value 两个参数，actionType: page、size、sort       | Function        | —          |                                           |
| `requestApi`           | 表格数据自动获取方法，返回一个 Promise                                                           | Function        | —          |                                           |
| `requestAuto`          | 是否立即触发 requestApi ,如果不需要可设置为 false，手动调用 updateTableData 方法更新列表数据     | Boolean         | true/false | true                                      |
| `requestLoadingHide`   | 请求接口时，是否隐藏 Loading                                                                     | Boolean         | true/false | false                                     |
| `tableActionIsCallApi` | 点击分页、排序在有 requestApi 的情况下是否自动调用 requestApi                                    | Boolean         | true/false | true                                      |
| `dataKey`              | 自动调用 requestApi 返回结果后，读取列表数据的 key                                               | String          | —          | items                                     |
| `dataCallback`         | 自动调用 requestApi 返回结果后，可通过此方法对数据进行处理，并返回一个对象。'{total:0,items:[]}' | Function        | —          | —                                         |
| `dataUpdateAfter`      | 表格数据更新之后，在 nextTick 后执行                                                             | Function        | —          | —                                         |
| `requestParams`        | 表格数据获取时，其它参数                                                                         | Object/Function | ()=>{}     | —                                         |
| `headerbgHide`         | 表格 Header 部分是否增加背景                                                                     | Boolean         | —          | —                                         |
| `loading`              | 数据渲染前是否显示 loading,如果传入 `requestApi`,不需要绑定此属性                                | Boolean         | true/false | false                                     |
| `toolBar`              | 表格设置                                                                                         | Boolean         | true/false | false                                     |
| `showHideFields`       | 列显示字段配置,Array?['列字段名']:Object?`showHideFieldsOptions`:null,                           | Object/Array    | --         | null                                      |
| `emptyOptions`         | 空状态配置、查看 `empty` 组件                                                                    | Object          | `{}`       |

### showHideFieldsOptions 属性

| 属性名       | 说明                                     | 类型  | 备注                               |
| ------------ | ---------------------------------------- | ----- | ---------------------------------- |
| `fields`     | 可配置列字段名                           | Array | ["id", "title", "level", "status"] |
| `showFields` | 默认显示列字段名，必须包含在 `fields` 中 | Array | ["id", "title", "level"]           |

### Column 属性

| 属性名         | 说明                                     | 类型          | 备注                 |
| -------------- | ---------------------------------------- | ------------- | -------------------- |
| `hide`         | 隐藏列                                   | `()=>Boolean` |                      |
| `copy`         | 鼠标左键点击后复制列文本                 | Boolean       |                      |
| `enum`         | 字典，可格式化单元格内容                 | Array、Object |                      |
| `formatText`   | 列文本格式化                             | Function      | `formatText(row)`    |
| `render`       | 自定义单元格内容渲染（tsx 语法、h 语法） | Function      | `render:(scope)=>{}` |
| `headerRender` | 自定义单元格内容渲染（tsx 语法、h 语法） | Function      |                      |
| `_children`    | 多级表头                                 | Array         |                      |

### Table 方法

| 属性名            | 说明                                                                                               | 备注 |
| ----------------- | -------------------------------------------------------------------------------------------------- | ---- |
| `updateTableData` | 更新表格数据,调用此方法会执行 requestAPI。此方法可接收一个对象传参 `{...}`                         |
| `resetTableData`  | 重置表格数据 ,调用此方法重置分页并调用 requestAPI。此方法可接收一个对象传参 `{...}`                |      |
| `resetPage`       | 重置表格分页参数                                                                                   |      |
| `updatePage`      | 手动更新分页大小(pageSize)和当前页码(currentPage) `{ currentPage = 1, pageSize = props.pageSize }` |      |
| `getData`         | 获取当前页列表数据                                                                                 |      |
| `setting`         | 调起列选择窗口                                                                                     |      |

### ElTable 实例调用

| 名称              | 说明                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ElTableInstance` | el-table 实例，可以通过外层组件 ref 属性 YtoCTableInstance.value.ElTableInstance.方法名来调用 el-table 的所有方法 |

### Table 插槽

| 名称          | 说明           |
| ------------- | -------------- |
| `tableHeader` | 自定义表头内容 |

### TableColumn 插槽

| 名称                     | 说明                                                      |
| ------------------------ | --------------------------------------------------------- |
| `column.prop`            | 单元格的作用域插槽 作用域参数为 `{ row, column, $index }` |
| `column.prop + "Header"` | 自定义表头的内容 ， 作用域参数为 `{ column, $index }`     |

### Table 事件

| 名称       | 说明                                                                                                                                                                     | 类型     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `on-table` | 表格综合操作回调事件（根据业务会对 type 进行扩展触发类型） page-size、current-page 改变时触发。`(type:string,value:{pageSize,currentPage})=> void`. type：'page'、'size' | Function |
