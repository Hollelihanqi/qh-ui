# HD 组件库开发文档

HD 组件库是基于 Element Plus 封装的业务组件库，使用 Vue 3、TypeScript、Vite、pnpm workspace 管理源码、文档、调试工程与内部构建工具。

## 项目结构

```text
hd/
├── dist/                 # 构建输出
├── docs/                 # VitePress 文档站点
├── internal/             # 内部构建工具、常量和 resolver
├── packages/
│   ├── components/       # 组件源码
│   ├── directives/       # 指令源码
│   ├── hooks/            # hooks 源码
│   ├── theme-chalk/      # 主题样式
│   ├── utils/            # 组件库内部工具
│   ├── hd-custom/        # @rdeam/hd-ui 主包入口
│   ├── share/            # @rdeam/hd-ui/share 工具包
│   └── hd-eslint/        # @hd/eslint-config
├── play/                 # 本地调试工程
└── scripts/              # 开发和生成脚本
```

## 常用命令

```bash
pnpm install
pnpm gen-component-import
pnpm build
pnpm play:dev
pnpm docs:dev
```

## 构建说明

`pnpm build` 会先通过 Nx 构建内部工具包和 `@rdeam/hd-ui/share`，再进入 `internal/build2` 执行统一构建链：

1. 清理 `dist/hd-custom`。
2. 使用 Vite 构建组件 ES 模块。
3. 构建 `packages/theme-chalk` 主题样式。
4. 使用 `vue-tsc` 生成类型声明。
5. 构建并复制 `HdCustomResolver`。
6. 复制 `package.json`、`README.md`、`global.d.ts` 等附加文件。

## 前缀配置

组件导出名前缀、Vue 注册名前缀、样式文件名前缀统一配置在 `internal/build-constants/src/pkg.ts`：

- `COMPONENT_EXPORT_PREFIX = 'Hd'`
- `COMPONENT_STYLE_PREFIX = 'hd'`

未来需要改组件名称、导出名称、主题文件名、resolver 解析规则时，优先改这里，再执行：

```bash
pnpm gen-component-import
pnpm build
```

## 发布入口

- 主包：`@rdeam/hd-ui`
- 工具包：`@rdeam/hd-ui/share`
- ESLint 配置：`@hd/eslint-config`

主包构建产物位于 `dist/hd-custom`，主题文件位于 `dist/hd-custom/theme-chalk`。
