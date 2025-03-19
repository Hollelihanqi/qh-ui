# YTO 组件库开发文档

## 项目概述

YTO 组件库是基于 Element-Plus 进行封装的业务组件库，旨在提供符合业务需求的组件和常用 Element-Plus 组件的二次封装。该项目使用 Vue 3、TypeScript 和 Vite 构建，采用 monorepo 结构管理多个包。

## 开发环境设置

### 系统要求

- Node.js >= 18
- pnpm (推荐使用最新版本)

### 安装依赖

```bash
pnpm install
```

## 项目结构

```
yto/
├── dist/                  # 构建输出目录
├── docs/                  # 文档站点
├── internal/              # 内部构建工具和配置
├── packages/              # 组件和工具包
│   ├── components/        # 组件源码
│   ├── directives/        # 指令源码
│   ├── hooks/             # Hooks 源码
│   ├── theme-chalk/       # 主题样式
│   ├── utils/             # 工具函数
│   ├── yto-custom/        # 主包入口
│   ├── yto-utils/         # 工具包
│   └── yto-eslint/        # ESLint 配置
├── play/                  # 开发调试环境
├── scripts/               # 开发和构建脚本
└── template/              # 组件模板
```

## 脚本命令说明

以下是 `package.json` 中定义的所有脚本命令的详细说明：

### 组件开发相关

#### `pnpm gc`

创建新组件。执行此命令会启动交互式脚本，引导你创建一个新组件，包括生成组件目录结构、样式文件和基本代码模板。

```bash
pnpm gc
```

#### `pnpm rc`

删除组件。执行此命令会启动交互式脚本，引导你删除一个现有组件及其相关文件。

```bash
pnpm rc
```

#### `pnpm watch:components`

监视组件目录变化，自动更新组件索引文件。当你添加或删除组件时，此命令会自动更新 `packages/components/index.ts` 和 `packages/yto-custom/component.ts` 文件。

```bash
pnpm watch:components
```

#### `pnpm gen-component-import`

生成组件导入文件。此命令会扫描 `packages/components` 目录，并生成相应的导入语句到索引文件中。

```bash
pnpm gen-component-import
```

### 构建相关

#### `pnpm build`

构建整个组件库。此命令会执行完整的构建过程，包括编译 TypeScript、打包组件、生成类型定义和复制必要文件。

```bash
pnpm build
```

#### `pnpm build:utils`

构建工具包。此命令会单独构建 `packages/yto-utils` 包。

```bash
pnpm build:utils
```

#### `pnpm clean`

清理构建输出。此命令会删除 `dist` 目录中的所有文件。

```bash
pnpm clean
```

#### `pnpm clean:dist`

清理 dist 目录。与 `clean` 命令相同，用于删除 `dist` 目录中的所有文件。

```bash
pnpm clean:dist
```

### 开发环境相关

#### `pnpm play:dev`

启动开发调试环境。此命令会启动 `play` 目录中的开发服务器，用于调试和测试组件。

```bash
pnpm play:dev
```

#### `pnpm docs:dev`

启动文档开发服务器。此命令会启动 VitePress 开发服务器，用于预览和开发文档站点。

```bash
pnpm docs:dev
```

#### `pnpm docs:build`

构建文档站点。此命令会使用 VitePress 构建静态文档站点。

```bash
pnpm docs:build
```

#### `pnpm docs:preview`

预览构建后的文档站点。此命令会启动一个本地服务器来预览构建后的文档站点。

```bash
pnpm docs:preview
```

#### `pnpm dev:all`

同时启动开发环境和文档站点。此命令会并行启动 `play` 开发服务器和文档开发服务器。

```bash
pnpm dev:all
```

### 代码质量相关

#### `pnpm lint`

运行 ESLint 检查代码。此命令会使用 ESLint 检查代码中的潜在问题。

```bash
pnpm lint
```

#### `pnpm lint:fix`

运行 ESLint 并自动修复问题。此命令会使用 ESLint 检查代码并尝试自动修复可修复的问题。

```bash
pnpm lint:fix
```

#### `pnpm prettier:check`

检查代码格式。此命令会使用 Prettier 检查代码格式是否符合规范，但不会修改文件。

```bash
pnpm prettier:check
```

#### `pnpm prettier:write`

格式化代码。此命令会使用 Prettier 格式化所有代码文件。

```bash
pnpm prettier:write
```

#### `pnpm format`

格式化代码。与 `prettier:write` 命令相同，用于格式化所有代码文件。

```bash
pnpm format
```

### 发布相关

#### `pnpm release:ui`

发布组件库。此命令会执行完整的发布流程，包括版本更新、构建和发布到 npm。

```bash
pnpm release:ui
```

#### `pnpm release:utils`

发布工具包。此命令会发布 `packages/yto-utils` 包。

```bash
pnpm release:utils
```

#### `pnpm commit`

提交代码。此命令会添加所有更改的文件，使用 git-cz 引导你创建符合规范的提交信息，然后推送到远程仓库。

```bash
pnpm commit
```

## 组件开发规范

### 组件创建

- 进入 packages/components 目录
- 创建组件目录 xxx (小写开头，例如：table)
- 组件目录结构
  - xxx/index.ts 组件主入口
  - xxx/src 组件核心代码
  - xxx/src/index.vue 组件代码入口
  - xxx/src/types.ts 组件类型声明

### 组件命名

使用大驼峰命名：例如 `Menu`

```vue
<script lang="ts" setup name="Menu"></script>

<!-- 或者 -->
<script>
export default defineComponent({
  name: 'Menu',
})
</script>
```

### 组件依赖安装

为了防止依赖包版本不一致，又避免组件库打包过于大，一般会在构建配置中将某些依赖排除在外。如果你的组件需要使用这些依赖，请将它们安装到 peerDependencies 配置下：

```bash
pnpm add --save-peer <package-name>
```

安装 workspace 下的包：

```bash
pnpm add <package-name> --workspace
```

## 构建流程

组件库的构建流程主要包括以下步骤：

1. 清理 dist 目录
2. 编译 TypeScript 代码
3. 使用 Rollup 打包组件
4. 生成类型定义文件
5. 复制主题样式和其他必要文件
6. 生成最终的 package.json

构建后的文件结构如下：

```
dist/
└── yto-custom/
    ├── es/                # ES 模块
    ├── theme-chalk/       # 样式文件
    ├── resolvers/         # 组件解析器
    ├── global.d.ts        # 全局类型定义
    ├── package.json       # 包配置
    └── README.md          # 说明文档
```

## 发布流程

发布新版本前，请确保：

1. 所有测试通过
2. 文档已更新
3. 版本号已更新

然后执行以下命令发布：

```bash
pnpm release:ui
```

## 常见问题

### 构建失败

如果构建失败，请尝试以下步骤：

1. 清理缓存：`pnpm clean:cache`
2. 清理构建输出：`pnpm clean`
3. 重新安装依赖：`pnpm install`
4. 重新构建：`pnpm build`

### 组件不显示

如果组件在开发环境中不显示，请检查：

1. 组件是否已正确导出
2. 组件名称是否正确
3. 样式是否已正确导入

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 仓库
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

请确保你的代码符合项目的代码风格，并通过所有测试。
