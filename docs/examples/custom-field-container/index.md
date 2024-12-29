<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-07 16:01:04
 * @LastEditTime: 2024-03-18 13:23:52
-->

# CustomFieldContainer

基于 CustomFieldConfig 组件实现自定义字段布局。

## 使用场景

- 配置页面得自定义规则配置

### 功能

- 支持单层新增/删除布局
- 支持左侧连接线可配置
- 支持右侧新增删除按钮可配置

## 基本使用

默认横向布局

<demo src="./basic.vue"></demo>

纵向布局
<demo src="./basic2.vue"></demo>
自定义/追加操作按钮
<demo src="./basic3.vue"></demo>

删除按钮一直展示
<demo src="./basic4.vue"></demo>

### CustomFieldContainer 属性

| 属性名      | 说明              | 类型   | 可选值                | 默认值       | 备注           |
| ----------- | ----------------- | ------ | --------------------- | ------------ | -------------- |
| `direction` | 水平/重置方向布局 | string | `vertical/horizontal` | 'horizontal' |                |
| `width`     | 宽度              | string | -                     | '100%'       | 默认撑满父容器 |

### CustomFieldContainer 事件

| 属性名   | 说明     |
| -------- | -------- |
| `add`    | 新增操作 |
| `delete` | 删除操作 |

### CustomFieldContainer 插槽

| 属性名          | 说明                                                          |
| --------------- | ------------------------------------------------------------- |
| `prepend`       | 前置插槽                                                      |
| `content`       | 左侧内容区域，作用域参数 item, index                          |
| `btn`           | 右侧操作按钮作用域参数 item, index                            |
| `btnAppend`     | 右侧操作追加按钮作用域参数 item, index                        |
| `append`        | 后置插槽                                                      |
| `termHiddenDel` | 是否条件隐藏删除按钮（只有一条数据时隐藏删除按钮），默认 true |

### CustomFieldContainer 样式变量

| 属性名            | 说明       |
| ----------------- | ---------- |
| `--field-row-m-y` | 行纵向间距 |
