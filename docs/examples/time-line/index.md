# Timeline 时间线

可视化呈现时间流

### 基础用法

1. 常用样式
   <demo src="./basic2.vue"></demo>

2. 带状态的时间线
   <demo src="./basic.vue"></demo>

3. 自定义
   <demo src="./basic3.vue"></demo>

### 属性

| 属性名         | 说明              | 类型   | 可选值 | 默认值                                                           | 备注 |
| -------------- | ----------------- | ------ | ------ | ---------------------------------------------------------------- | ---- |
| `timeData`     | 时间线的数据      | Array  | -      | true                                                             |      |
| `prependWidth` | 左侧区域宽度      | string | -      | 88px                                                             |      |
| `propsConfig`  | 对应的 props 配置 | Object | -      | "{status: 'status', timestamp: 'timestamp', content: 'content'}" |      |

### 插槽

| 属性名    | 说明       |
| --------- | ---------- |
| `default` | 默认插槽   |
| `prepend` | 前置插槽   |
| `dot`     | 自定义节点 |

### 样式变量

| 变量                          | 说明         |
| ----------------------------- | ------------ |
| ` --time-line-primary`        | 主题色       |
| ` --time-line-primary-light1` | 按钮边框样式 |
| ` --time-line-primary-light2` | 浅色主题背景 |
| ` --time-line-gray`           | 内容块背景色 |
