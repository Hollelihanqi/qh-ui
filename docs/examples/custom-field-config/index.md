<!--
 * @Description: 模块名称optionWidth
 * @Author: ym
 * @Date: 2023-12-07 16:01:04
 * @LastEditTime: 2023-12-13 15:33:13
-->

# CustomFieldConfig

用于实现自定义字段的配置。

## 使用场景

- 查询头自定义查询条件
- 配置页面得自定义配置

### 功能

- 左侧字段（field）支持输入/选择
- 中间操作符（operator）支持选择
- 右侧字段值（value）支持输入/选择（其他显示方式建议通过插槽实现）
- 支持禁用(考虑单独禁用整体禁用)
- 支持 form 表单校验（可配置）

## 基本使用

基本用法
<demo src="./basic.vue"></demo>

插槽
<demo src="./basic2.vue"></demo>

表单验证
<demo src="./basic3.vue"></demo>

### CustomFieldConfig 属性

| 属性名           | 说明            | 类型         | 可选值 | 默认值 | 备注 |
| ---------------- | --------------- | ------------ | ------ | ------ | ---- |
| `v-model`        | 字段值          | Object       | 必传   | -      |      |
| `fieldConfig`    | 左侧 field 配置 | IFieldConfig | -      | -      |      |
| `operatorConfig` | 中间 field 配置 | IFieldConfig | -      | -      |      |
| `valueConfig`    | 右侧 field 配置 | IFieldConfig | -      | -      |      |
| `disabled`       | 是否禁用        | boolean      | -      | false  |      |
| `rules`          | 表单校验规则    | function     | -      | -      |      |
| `ruleProp`       | 表单校验字段    | String       | -      | -      |      |
| `optionWidth`    | 中间区域宽度    | string       | -      | 100px  |      |

```js
interface IFieldConfig  {
  elType?: 'input' | 'select-v2' // 内置element 元素类型
  props: string // v-model 绑定值对应属性值
  [key: string]: any //  支持 input select-v2 属性透传
}
```

### CustomFieldConfig 插槽

| 属性名     | 说明          |
| ---------- | ------------- |
| `filed`    | 左侧 区域插槽 |
| `operator` | 中间 区域插槽 |
| `value`    | 右侧 区域插槽 |

### CustomFieldConfig 事件

| 属性名     | 说明                               |
| ---------- | ---------------------------------- |
| `cbChange` | （props: string, val: any）=> void |
