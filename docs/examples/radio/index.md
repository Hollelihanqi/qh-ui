# Radio 单选框

可取消的选择的单选框， 主要用于列表条件过滤

### 功能

- 可取消选项

### 效果图

<demo src="./basic.vue"></demo>

## 示例代码

## Radio 属性

| 属性名      | 说明                          | 类型               | 默认值 |
| ----------- | ----------------------------- | ------------------ | ------ | --- |
| v-model     | 选中项的值                    | any                | []     |
| label       | IOptions 类型时对应的文本字段 | Function           | —      |
| value       | IOptions 类型时对应的值字段   | Boolean            | true   |
| options     | 数据                          | string，IOptions[] |        | —   |
| activeColor | 激活项颜色                    | string             |        | —   |
| disabled    | 是否禁用                      | Boolean            | false  | —   |
