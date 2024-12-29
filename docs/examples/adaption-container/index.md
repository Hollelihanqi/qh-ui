# AdaptionContainer

用于实现 Card 的自适应布局。

## 使用场景

- 在不同电脑分辨路下，实现自适应布局

### 功能

- 支持设置 Card 最小宽度
- 支持设置 Card 单行最少显示个数
- 支持设置 Card 间距
- 支持插槽，用于实现 Card 内部布局

## 基本使用

基本用法
<demo src="./basic.vue"></demo>

### CustomFieldConfig 属性

| 属性名              | 说明             | 类型   | 可选值 | 默认值 | 备注 |
| ------------------- | ---------------- | ------ | ------ | ------ | ---- |
| `list`              | 列表数据         | Array  | 必传   | -      |      |
| `minWidth`          | Card 最小宽度    | Number | -      | 200    |      |
| `gap`               | Card 间距        | Number | -      | 10     |      |
| `minNum`            | 单行最小显示个数 | Number | -      | 1      |      |
| `containerMinWidth` | 容器的最小宽度   | Number | -      | 0      |      |

### CustomFieldConfig 插槽

| 属性名    | 说明     |
| --------- | -------- |
| `default` | 默认插槽 |
