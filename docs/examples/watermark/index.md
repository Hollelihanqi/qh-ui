# watermark 水印组件

基于 canvas 实现的水印组件

## 基础用法

<demo src="./basic.vue"></demo>

## Attributes

| 属性名      | 说明                  | 类型   | 可选值 | 默认值                | 备注 |
| ----------- | --------------------- | ------ | ------ | --------------------- | ---- |
| `width`     | 水印宽度              | Number | -      | 200                   |      |
| `height`    | 水印高度              | Number | -      | 100                   |      |
| `content`   | 水印显示文字          | String | 必传   | -                     |      |
| `font`      | 字体样式              | String | -      | '14px Inter, Avenir'  |      |
| `fillStyle` | 字体填充样式          | String | -      | 'rgba(0, 0, 0, 0.08)' |      |
| `rotate`    | 文字旋转角度          | Number | -      | -28                   |      |
| `zIndex`    | 水印元素的 z-index 值 | String | -      | '99999'               |      |
