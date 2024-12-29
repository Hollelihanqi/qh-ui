# BaseTable 表格

基于 element-plus：el-table el-pagination el-form 二次封装，支持 element-plus 的所有属性

### 功能

- 表格内容自适应屏幕宽高，溢出内容表格内部滚动（flex 布局）
- 表格搜索、重置、分页查询 Hooks 封装
- 表格数据操作 Hooks 封装 （单条数据删除、批量删除、重置密码、状态切换等操作）
- 表格数据多选 Hooks 封装 （支持现跨页勾选数据）
- 表格数据导入组件、导出 Hooks 封装
- 表格搜索区域使用 Grid 布局重构，支持自定义响应式配置
- 表格分页组件封装（Pagination）
- 表格数据刷新、列显隐、列排序、搜索区域显隐设置(待扩展)
- 表格数据打印功能（可勾选行数据、隐藏列打印）
- 表格配置支持多级 prop（示例 ==> prop: user.detail.name）
- 单元格内容格式化、tag 标签显示（有字典 enum 会根据字典 enum 自动格式化）
- 支持多级表头、表头内容自定义渲染（支持作用域插槽、tsx 语法、h 函数）
- 支持单元格内容自定义渲染（支持作用域插槽、tsx 语法、h 函数）

## 效果图

<demo src="./basic.vue"></demo>

## 示例代码

## Table 属性（TableProps）

> 使用 `v-bind="$attrs"` 通过属性透传将 **ProTable** 组件属性全部透传到 **el-table**

| 属性名         | 说明                             | 类型     | 默认值                                  |
| -------------- | -------------------------------- | -------- | --------------------------------------- |
| `columns`      | 表格列                           | Array    | []                                      |
| `requestApi`   | 获取表格数据的请求 API           | Function | —                                       |
| `requestAuto`  | 是否自动执行请求 API             | Boolean  | true                                    |
| `dataCallback` | 返回数据的回调函数               | Function | —                                       |
| `pagination`   | 是否显示分页组件                 | Boolean  | true                                    |
| `initParam`    | 表格请求的初始化参数             | Object   | {}                                      |
| `rowKey`       | String                           | String   | 'id'                                    |
| `searchCol`    | 表格搜索项每列占比配置           | Object   | `{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }` |
| `title`        | 表格标题，目前只在打印的时候用到 | String   | {}                                      |

## Column 属性（ColumnProps）

> 使用 `v-bind="column"` 通过属性透传将每一项 **column** 属性全部透传到 **el-table-column** 上，支持 **el-table-column** 的所有 **Props** 属性。在此基础上，扩展了以下 **Props：**

| 属性名         | 说明                                                 | 类型               | 默认值 |
| -------------- | ---------------------------------------------------- | ------------------ | ------ |
| `search`       | 搜索项配置                                           | SearchProps        | —      |
| `enum`         | 字典，可格式化单元格内容，还可以作为搜索框的下拉选项 | Object \| Function | —      |
| `headerRender` | 自定义表头内容渲染（tsx 语法、h 语法）               | Function           | —      |
| `render`       | 自定义单元格内容渲染（tsx 语法、h 语法）             | Function           | —      |
| `_children`    | 多级表头                                             | ColumnProps        | —      |

## 搜索项 配置（SearchProps）

> 使用 `v-bind="column.search.props“` 通过属性透传将 **search.props** 属性全部透传到每一项搜索组件上，支持 **input、select、tree-select、date-packer、time-picker、time-select、switch** 大部分属性，扩展了以下 **Props：**

| 属性名         | 说明                                                                                                                                                     | 类型   | 默认值 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ |
| `el`           | 当前项搜索框的类型，支持：input、input-number、select、select-v2、tree-select、cascader、date-packer、time-picker、time-select、switch、slider、checkbox | String | —      |
| `props`        | 根据 element plus 官方文档来传递，该属性所有值会透传到组件                                                                                               | Object | —      |
| `defaultValue` | 搜索项默认值                                                                                                                                             | —      | —      |
| `key`          | 当搜索项 key 不为 prop 属性时，可通过 key 指定                                                                                                           | String | —      |
| `span`         | 搜索项所占用的列数，默认为 1 列                                                                                                                          | Number | 1      |
| `offset`       | 搜索字段左侧偏移列数                                                                                                                                     | Number | —      |

## Table 事件

> 根据 **ElementPlus Table** 文档在 **Table** 组件上绑定事件即可，组件会通过 **$attrs** 透传给 **el-table**。
>
> [el-table 事件文档链接](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)

## Table 方法

> **Table** 组件暴露了 **el-table** 实例和一些组件内部的参数和方法：
>
> [el-table 方法文档链接](https://element-plus.org/zh-CN/component/table.html#table-%E6%96%B9%E6%B3%95)

|     方法名      |                                 描述                                  |
| :-------------: | :-------------------------------------------------------------------: |
|     element     | `el-table` 实例，可以通过`element.方法名`来调用 `el-table` 的所有方法 |
|    tableData    |                         当前页面所展示的数据                          |
|   searchParam   |                      所有的搜索参数，不包含分页                       |
|    pageable     |                          当前表格的分页数据                           |
|  getTableList   |               获取、刷新表格数据的方法（携带所有参数）                |
|      reset      |               重置表格查询参数，相当于点击重置搜索按钮                |
| clearSelection  | 清空表格所选择的数据，除此方法之外还可使用 `element.clearSelection()` |
|     enumMap     |              当前表格使用的所有字典数据（Map 数据结构）               |
|   isSelected    |                           表格是否选中数据                            |
|  selectedList   |                          表格选中的数据列表                           |
| selectedListIds |                        表格选中的数据列表的 id                        |

## Table 插槽

|          插槽名          |                                                                  描述                                                                   |
| :----------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
|            —             |                                          默认插槽，支持直接在 Table 中写 el-table-column 标签                                           |
|       tableHeader        |                                         自定义表格头部左侧区域的插槽，一般情况该区域放操作按钮                                          |
|          append          | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 |
|          empty           |                                                      当表格数据为空时自定义的内容                                                       |
|        pagination        |                                                              分页组件插槽                                                               |
|      `column.prop`       |                                                           单元格的作用域插槽                                                            |
| `column.prop` + "Header" |                                                            表头的作用域插槽                                                             |
