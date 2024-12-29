# EllipsisTag

用于实现 tags 过多，超出容器宽度时，自动隐藏部分 tags。

## 使用场景

- 在不同容器中，实现 tags 超出容器宽度时，自动隐藏部分 tags 的效果。

### 功能

- 支持 tagsItem 设置 style

## 基本使用

基本用法
<demo src="./basic.vue"></demo>

### EllipsisTag 属性

| 属性名     | 说明            | 类型   | 可选值 | 默认值 | 备注 |
| ---------- | --------------- | ------ | ------ | ------ | ---- |
| `tags`     | tag 数据        | Array  | 必传   | -      |      |
| `valueKey` | value 的 key 值 | String | -      | value  |      |
| `labelKey` | value 的 key 值 | Number | -      | label  |      |

### EllipsisTagItem 属性

| 属性名  | 说明          | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ------------- | ------ | ------ | ------ | ---- |
| `style` | 单个 tag 样式 | string | -      | -      |      |

### EllipsisTag 插槽

| 属性名     | 说明         |
| ---------- | ------------ |
| `default`  | 默认插槽     |
| `ellipsis` | 省略按钮插槽 |
