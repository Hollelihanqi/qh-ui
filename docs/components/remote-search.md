---
title: RemoteSearch 远程搜索
---

# RemoteSearch 远程搜索

## 基本使用

:::demo
remote-search/basic
:::

## 自定义模板

:::demo
remote-search/customTemp
:::

## requestApi

:::demo
remote-search/requestApi
:::

## API

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/table.html)

### RemoteSearch 属性

| 属性名         | 说明                                                                                                                                    | 类型             | 可选值             | 默认值  |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | ------- |
| url            | 远程搜索地址                                                                                                                            | String           | —                  | ""      |
| exposeRef      | 组件暴露出的Api引用                                                                                                                     | Object           | —                  | {}      |
| method         | 请求方式                                                                                                                                | String           | —                  | "GET"   |
| isRemoteSearch | 如果只需要请求一次，请设置为 false                                                                                                      | Boolean          | —                  | true    |
| requestApi     | 自定义调用方法，返回一个 Promise，优先级低于 url。不建议这样使用，会出现请求竞态问题                                                    | Function         | —                  | —       |
| requestAuto    | 是否立即请求，如需手动请求，请设置为 false                                                                                              | Boolean          | —                  | true    |
| searchField    | 搜索字段名称                                                                                                                            | String           | —                  | ""      |
| requestHeaders | 请求 Headers                                                                                                                            | Object、Function | —                  | {}      |
| defaultParams  | 静态参数                                                                                                                                | Object           | —                  | {}      |
| requestParams  | 动态参数,会被 watch 进行监听，发生变化后自动触发(已经废弃) requestApi                                                                   | Object           | —                  | {}      |
| resultKey      | 接口返回后，获取列表的 key 名                                                                                                           | String           | —                  | "items" |
| dataCallback   | 接口返回后，回调函数,可对数据进行格式化处理                                                                                             | Function         | —                  | null    |
| valueKey       | 选项的值对应的字段                                                                                                                      | String           | —                  | "id"    |
| labelKey       | 选项的标签对应的字段                                                                                                                    | String           | —                  | "label" |
| modelItem      | 绑定的 value 值是否为当前选择中的数据对象                                                                                               | Boolean          | —                  | false   |
| optTemp        | 自定义下拉模板                                                                                                                          | Function         | h() 函数、jsx 语法 | null    |
| w              | 控件的宽度                                                                                                                              | String           | —                  | "100%"  |
| getInstance    | 获取当前组件实例,此函数接收一个实例对象                                                                                                 | Function         | —                  | —       |
| getExposed     | 获取当前组件通过 defineExpose 和 expose 暴露出的属性。此函数在组件的 onMounted 方法中调用，接收一个对象，可访问 RemoteSearch 提供的方法 | Function         | —                  | —       |

### RemoteSearch 方法

| 方法名       | 说明         |
| ------------ | ------------ |
| getOptions   | 获取下拉列表 |
| clearOptions | 清空下拉列表 |
| setOptions   | 设置下拉列表 |
