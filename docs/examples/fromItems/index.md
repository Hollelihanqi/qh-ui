# FromItems (暂停中...)

基于 element-plus：el-form-item 二次封装，支持 el-form-item 的所有属性

## 基本使用

<demo src="./index.vue"></demo>

### item-config 属性

| 属性名          | 说明                       | 类型   | 可选值 | 默认值 | 备注 |
| --------------- | -------------------------- | ------ | ------ | ------ | ---- |
| `formItemWidth` | 每项 formItem 宽度         | string | -      | 20%    | \_   |
| `formItemBinds` | 自动 v-bing 到 formItem 上 | object | -      | -      | \_   |

其他属性详见 from 属性

### fromConfig 属性

详见 from 属性

### itemType 支持类型

input select switch radio cascader checkbox
date dateTime inputNumber rate timePicker timeSelect
