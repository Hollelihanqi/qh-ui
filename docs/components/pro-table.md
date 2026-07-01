---
title: ProTable 高级表格
---

# ProTable 高级表格

::: tip
ProTable 是 `SearchForm + Table` 的组合封装，自动打通查询表单与分页表格的数据流：

- 表单查询会自动重置到第 1 页并触发 `requestApi`
- 表头排序 / 分页变化会自动把当前搜索条件一起带上
- `defaultSort` 在重置时会回归到指定排序
- 空字段会自动过滤掉，避免出现 `name=&department=` 这种无意义参数
  :::

## 基础用法

`form-controls` 透传给内部 `SearchForm`，其他 `Table` 属性（`columns`、`request-api`、`current-page-key` 等）通过 `$attrs` 透传给内部 `HdTable`。

:::demo
pro-table/basic
:::

## API

### ProTable 属性

| 属性名             | 说明                                                                                        | 类型                              | 默认值       |
| ------------------ | ------------------------------------------------------------------------------------------- | --------------------------------- | ------------ |
| searchFormHide     | 隐藏顶部搜索表单                                                                            | `Boolean`                         | `false`      |
| requestApi         | 请求列表数据的函数，签名 `(params) => Promise<{ items, total }>`                            | `Function`                        | `null`       |
| requestAuto        | 是否在挂载时自动请求一次                                                                    | `Boolean`                         | `true`       |
| searchModelFormat  | 对搜索表单取值结果做一次格式化，便于改字段名 / 拆字段                                       | `Function`                        | `null`       |
| otherRequestParams | 额外透传到请求里的参数，函数形式每次发请求时重新求值                                        | `Function \| Object`              | `() => ({})` |
| defaultSort        | 默认排序；重置时表格会回到该状态                                                            | `Function \| { prop, order }`     | `() => ({})` |
| onSearch           | 自定义搜索回调；提供时会接管搜索行为，第二个参数 `getTableList2(params)` 是绕过组件的逃生口 | `(values, getTableList2) => void` | `null`       |

::: tip
ProTable 通过 `v-bind="$attrs"` 把所有未声明属性透传给内部组件，**Table 与 SearchForm 的所有属性都可以直接传**（如 `columns`、`form-controls`、`current-page-key`、`page-size-key`、`page-sizes` 等）。
:::

### ProTable 方法（通过组件实例调用）

| 方法名          | 说明                                              | 参数                                            |
| --------------- | ------------------------------------------------- | ----------------------------------------------- |
| updateTableData | 按当前搜索表单值刷新表格                          | `(extraParams?: Object) => void`                |
| resetTableData  | 重置到 defaultSort 状态，等同于点击查询区"重置"   | `(extraParams?: Object) => void`                |
| resetPage       | 仅重置分页到第 1 页                               | -                                               |
| updatePage      | 修改当前分页                                      | `({ currentPage?: number, pageSize?: number })` |
| getData         | 获取当前页数据数组                                | -                                               |
| resetSearch     | 等同于 `handleReset`，用于外部触发重置            | -                                               |
| tableRef        | 下层 ElTable 实例引用（响应式 ref）；可调原生 API | -                                               |

### 调用示例

```vue
<template>
  <hd-pro-table
    ref="proTableRef"
    :columns="columns"
    :form-controls="searchFormList"
    :request-api="getList"
    current-page-key="pageNum"
    page-size-key="pageSize"
  />
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'

const proTableRef = useTemplateRef<any>('proTableRef')

const reload = () => proTableRef.value?.updateTableData()
const reset = () => proTableRef.value?.resetTableData()
const select = () => proTableRef.value?.tableRef?.clearSelection()
</script>
```

### 内部组件文档

ProTable 直接组合下列两个组件，所有属性 / 插槽都可透传：

- [SearchForm 搜索表单](./search-form.md)
- [Table 表格组件](./table.md)
