# TareaTag 文本验证

一个自动输入框，将输入的文本按照一定的规则生成 tag

### 功能

- 根据正则判断输入是否合法
- 删除

## 基本使用

<demo src="./basic.vue"></demo>

## Attributes

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/table.html)

## SearchForm 属性

| 属性名        | 说明                                   | 类型             | 可选值 | 默认值 |
| ------------- | -------------------------------------- | ---------------- | ------ | ------ |
| `v-model`     | 数据绑定                               | Object           | —      | --     |
| `placeholder` | 输入框提示语`                          | String           | —      | ""     |
| `regular`     | 正则表达式，用于验证每一条文本是否合法 | RegExp, Function | —      | null   |
| `required`    | 是否必传参数                           | Boolean          | —      | false  |
