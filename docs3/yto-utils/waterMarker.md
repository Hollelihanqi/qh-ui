# 水印

安装依赖

```
pnpm install  @yto/utils

```

## 导入水印

```typescript
import { addWaterMarker, removeWatermark } from '@yto/utils'
```

### 添加水印

```typescript
addWaterMarker({ content: '张三 2024-1-25' })
```

### 移除水印

```typescript
removeWatermark()
```

### options 配置项

| 属性名      | 说明                  | 类型               | 可选值 | 默认值                | 备注 |
| ----------- | --------------------- | ------------------ | ------ | --------------------- | ---- |
| `width`     | 水印宽度              | Number             | -      | 200                   |      |
| `height`    | 水印高度              | Number             | -      | 100                   |      |
| `content`   | 水印显示文字          | String             | 必传   | -                     |      |
| `elNode`    | 水印挂载元素          | String/HtmlElement | -      | 'document.body'         |      |
| `font`      | 字体样式              | String             | -      | '14px Inter, Avenir'  |      |
| `fillStyle` | 字体填充样式          | String             | -      | 'rgba(0, 0, 0, 0.08)' |      |
| `rotate`    | 文字旋转角度          | Number             | -      | -28                   |      |
| `zIndex`    | 水印元素的 z-index 值 | Number             | -      | '99999'               |      |
