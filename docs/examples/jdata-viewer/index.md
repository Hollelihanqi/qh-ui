<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-04-07 16:15:45
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-05-22 09:52:49
 * @FilePath: \yto-engine\docs\examples\json-viewer\index.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# JsonViewer 数据预览器

基于原生 HTML、JS、CSS

### 功能

- 复制
- 主题配置

## 基本使用

<demo src="./basic.vue"></demo>

### JsonViewer 属性

| 属性名         | 说明           | 类型    | 可选值       | 默认值   |
| -------------- | -------------- | ------- | ------------ | -------- |
| `data`         | JSON 对象      | Object  | —            | {}       |
| `expanded`     | 是否收起       | Boolean | —            | false    |
| `copy`         | 复制功能       | Boolean | —            | true     |
| `expandDepth`  | 默认展开的级数 | Number  | —            | 3        |
| `theme`        | 主题颜色       | String  | "light/dark" | light    |
| `rootTagStart` | 根节点名称     | String  | —            | "{"      |
| `rootTagEnd`   | 根节点名称     | String  | —            | "}"      |
| `expandColor`  | 展开按钮颜色   | String  | —            | "#824c96 |
