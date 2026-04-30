# HD UI 现代构建系统

`internal/build2` 是当前唯一保留的组件库构建链，负责把源码构建到 `dist/hd-custom`。

## 构建流程

1. 清理输出目录。
2. 构建组件 ES 模块。
3. 构建主题样式并复制到主包产物。
4. 生成 TypeScript 类型声明。
5. 构建并复制 resolver。
6. 复制主包发布所需的附加文件。

## 关键约定

- 主包源码目录：`packages/hd-custom`
- 主包输出目录：`dist/hd-custom`
- 组件导出名前缀：`Hd`
- 样式文件名前缀：`hd`
- resolver 导出：`HdCustomResolver`

这些前缀来自 `internal/build-constants/src/pkg.ts`，不要在构建脚本里硬编码。
