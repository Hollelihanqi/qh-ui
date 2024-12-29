<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-05-10 10:28:54
 * @LastEditTime: 2024-03-20 13:27:01
-->

# search-container

搜索布局容器

### 功能

- 左右布局，右侧操作区域自适应

## 基本使用

<demo src="./basic.vue"></demo>

### 属性

| 属性名            | 说明               | 类型    | 可选值 | 默认值 | 备注                    |
| ----------------- | ------------------ | ------- | ------ | ------ | ----------------------- |
| `isUseForm`       | 是否使用 form 表单 | Boolean | -      | true   |                         |
| `itemMinWidth`    | 每一项的最小宽度   | Number  | -      | 300    |                         |
| `itemMaxWidth`    | 每一项的最大宽度   | Number  | -      | --     |                         |
| `customClass`     | 自定义 class       | String  | -      | -      |                         |
| `autoLayout`      | 开启自动布局       | Boolean | -      | true   |                         |
| `isCollapse`      | 是否开启折叠       | Boolean | -      | false  |                         |
| `collapseLine`    | 开启折叠的行数     | number  | -      | 3      | 开启 `isCollapse`后生效 |
| `defaultCollapse` | 默认是否折叠       | Boolean | -      | false  | 开启 `isCollapse`后生效 |

### 插槽

| 属性名      | 说明             |
| ----------- | ---------------- |
| `default`   | 默认插槽         |
| `operation` | 右侧操作区域插槽 |

### 事件

| 事件名       | 说明               | 类型                      |
| ------------ | ------------------ | ------------------------- |
| `resize`     | 容易大小变化时触发 | Function 返回每一项的宽度 |
| `enterKeyup` | enter 键抬起时触发 | Function                  |

### Items 属性

| 属性名      | 说明           | 类型   | 可选值 | 默认值 | 备注                   |
| ----------- | -------------- | ------ | ------ | ------ | ---------------------- |
| `data-cols` | 每一项所占列数 | Number | -      | 1      | 仅开启`autoLayout`有效 |
