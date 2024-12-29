<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2024-05-17 14:32:55
 * @LastEditTime: 2024-05-17 14:55:48
-->

# Date picker 时间范围组件

基于 element-plus：date-picker 二次封装，支持所有属性

## 日期范围

<demo src="./basic.vue"></demo>

## 日期时间范围

<demo src="./basic2.vue"></demo>

## Attributes

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/date-picker.html)

### 自定义 dialog 属性

| 属性名  | 说明     | 类型                 | 可选值                       | 默认值    | 备注               |
| ------- | -------- | -------------------- | ---------------------------- | --------- | ------------------ |
| `type`  | 类型     | string               | 'daterange'/ 'datetimerange' | daterange |                    |
| `start` | 开始时间 | Date, number, string | —                            | \_        | 双向绑定的开始时间 |
| `end`   | 结束时间 | Date, number, string | —                            | \_        | 双向绑定的结束时间 |

### 回调方法

参考 element DatePicker 组件的使用
