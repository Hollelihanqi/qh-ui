# @hd-custom/share

组件库内部工具函数，跟随 `@hd/custom` 一起构建和发布，不作为独立 npm 包发布。

## 当前模块

### 通用工具

- `isEmptyFun`: 判断是否为空
- `isFunctionFun`: 判断是否为函数
- `debounceFun`: 防抖函数
- `copyStr`: 复制文本
- `guid`: 生成唯一标识符

### OCR 工具

- `ocrValueMapping`: OCR 值映射处理

## 使用方式

对外使用时从组件库子路径导入：

```ts
import { debounceFun, ocrValueMapping } from '@hd/custom/share'
```
