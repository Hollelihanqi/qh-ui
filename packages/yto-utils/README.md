# @yto/utils

圆通速递内部工具函数库，提供了一系列常用的工具函数。

## 安装

```bash
pnpm add @yto/utils
```

## 功能模块

### 1. 水印相关 (water-marker)

- `addWaterMarker`: 添加水印
- `removeWatermark`: 移除水印

### 2. 数字处理 (number2utils)

- `formatNumber`: 数字格式化
- `thousandsSeparator`: 添加千分位分隔符
- `isInteger`: 判断是否为整数

### 3. OCR 工具 (ocr)

- `ocrValueMapping`: OCR 值映射处理

### 4. 文件下载 (download)

- `downloadFileStream`: 流式文件下载
- `downloadFileDataCSV`: CSV 文件下载

### 5. 通用工具 (utils)

- `isEmptyFun`: 判断是否为空
- `isFunctionFun`: 判断是否为函数
- `debounceFun`: 防抖函数
- `copyStr`: 复制文本
- `guid`: 生成唯一标识符

### 6. 时间格式化 (duration-formatter)

- `formatDuration`: 时间格式化

### 7. Bridge 通信 (bridge)

- 提供与原生应用的桥接通信功能

## 使用示例

```typescript
import { addWaterMarker, formatNumber, downloadFileStream } from '@yto/utils'

// 添加水印
addWaterMarker({
  text: '圆通速递',
  container: document.body,
})

// 格式化数字
const formattedNum = formatNumber(1234.56)

// 下载文件
downloadFileStream('https://example.com/file.pdf', 'document.pdf')
```

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 构建

```bash
pnpm build
```

### 发布新版本

```bash
pnpm release
```

## 版本历史

详见 [CHANGELOG.md](./CHANGELOG.md)

## 许可证

ISC

## 作者

西安技术平台部用户体验设计-李涵祺 (02393963@yto.net.cn)
