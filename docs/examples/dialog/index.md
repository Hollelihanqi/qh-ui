# Dialog 弹出框

基于 element-plus：dialog 二次封装，支持 el-dialog 的所有属性

## 基本使用

<demo src="./basic.vue"></demo>

## 弹出位置

<demo src="./basic2.vue"></demo>

## 按钮地址

<demo src="./basic3.vue"></demo>

## Attributes

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/menu.html)

### 自定义 dialog 属性

| 属性名          | 说明     | 类型              | 可选值 | 默认值                   | 备注                                                    |
| --------------- | -------- | ----------------- | ------ | ------------------------ | ------------------------------------------------------- |
| `confirmOption` | 确认按钮 | Object, undefined | —      | undefined                | IbtnProps, 默认显示确认按钮， 支持 el-button 的所有属性 |
| `cancelOption`  | 取消按钮 | Object, undefined | —      | undefined                | IbtnProps， 默认取消按钮，支持 el-button 的所有属性     |
| `offset`        | 弹出位置 | array             | —      | [], elementPlus 弹出位置 | [marginLeft, marginTop]                                 |
| `draggable`     | 拖动     | boolean           | —      | false                    |                                                         |

### 回调方法

| 属性名     | 说明         | 类型     | 可选值 | 默认值    | 备注                             |
| ---------- | ------------ | -------- | ------ | --------- | -------------------------------- |
| `@confirm` | 确认按钮回调 | function | —      | undefined | 返回值：true/false, 弹框显示隐藏 |
| `@cancel`  | 取消按钮回调 | function | —      | undefined | 返回值：true/false, 弹框显示隐藏 |

### Interface

```ts
interface IbtnProps extends ButtonProps {
  txt: string
  [propName: string]: any
}
```
