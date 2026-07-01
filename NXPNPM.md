# PNPM Monorepo 与 Nx 集成指南

本文档详细说明了如何在项目中集成和使用 PNPM Workspace 与 Nx 构建工具，以实现高效的 monorepo 管理。

## 目录结构

```
.
├── packages/          # 核心包目录
│   ├── hd-custom/   # 自定义组件库
│   └── share/    # 工具库
├── play/             # 组件演示项目
├── docs/             # 文档站点
├── internal/         # 内部工具和构建脚本
├── pnpm-workspace.yaml  # PNPM workspace 配置
├── nx.json           # Nx 配置文件
├── package.json      # 根项目配置
└── .npmrc           # NPM 配置文件
```

## PNPM Workspace 配置

### pnpm-workspace.yaml

```yaml
packages:
  - packages/* # 所有核心包
  - play # 组件演示项目
  - docs # 文档站点
  - internal/* # 内部工具
```

这个配置定义了 monorepo 的工作空间结构，指定哪些目录被视为工作空间的一部分。

### .npmrc 配置

```ini
# 工作空间配置
recursive-install=true              # 递归安装依赖
workspace-concurrency=10            # 工作空间并发数
child-concurrency=10               # 子进程并发数
network-concurrency=20             # 网络请求并发数
ignore-workspace-root-check=true   # 忽略工作空间根目录检查
git-checks=false                   # 禁用 Git 检查

# 镜像配置
@hd:registry=https://registry.npmjs.org/
registry=https://registry.npmmirror.com/

# Node.js 配置
node-options=--experimental-specifier-resolution=node
```

这些配置优化了依赖安装性能并设置了适当的 registry。

## Nx 配置

### nx.json

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"], // 构建时依赖关系处理
      "cache": true // 启用构建缓存
    }
  },
  "defaultBase": "master", // 默认基准分支
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "!{projectRoot}/**/node_modules/**/*"],
    "production": ["default"]
  }
}
```

这个配置定义了：

- 构建任务的依赖关系
- 构建缓存策略
- 文件监听范围

### 项目级别的 project.json

以 hd-custom 包为例：

```json
{
  "name": "hd-custom",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/hd-custom",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm build"
      }
    },
    "version": {
      "executor": "@jscutlery/semver:version",
      "options": {
        "preset": "conventional",
        "trackDeps": true,
        "push": true,
        "postTargets": ["hd-custom:npm"]
      }
    },
    "npm": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm publish --access public",
        "cwd": "dist/hd-custom"
      }
    }
  }
}
```

## 依赖管理

### 工作空间依赖

在 package.json 中使用 workspace 协议来引用内部包：

```json
{
  "dependencies": {
    "@hd-custom/utils": "workspace:*",
    "@hd-custom/components": "workspace:^"
  }
}
```

- `workspace:*`: 允许任意版本
- `workspace:^`: 遵循语义化版本

## 常用命令

### 依赖安装

```bash
# 安装所有依赖
pnpm install

# 在特定包中安装依赖
pnpm add <package> --filter <workspace-name>
```

### 构建命令

```bash
# 构建所有包
nx run-many -t build

# 构建特定包
nx build hd-custom

# 构建依赖图中受影响的包
nx affected -t build
```

### 发布命令

```bash
# 发布包
nx publish hd-custom

# 版本更新
nx version hd-custom
```

## 为什么选择这种配置？

1. **PNPM 的优势**
   - 高效的依赖存储
   - 严格的依赖管理
   - 快速的安装速度
   - 工作空间支持

2. **Nx 的优势**
   - 智能构建缓存
   - 增量构建
   - 依赖图分析
   - 任务编排

3. **组合优势**
   - PNPM 处理依赖管理
   - Nx 处理构建和任务流程
   - 两者优势互补，提供完整的 monorepo 解决方案

## 最佳实践

1. **依赖管理**
   - 使用 workspace 协议引用内部包
   - 明确指定外部依赖版本
   - 使用 peerDependencies 声明框架依赖

2. **构建优化**
   - 利用 Nx 缓存加速构建
   - 配置合适的依赖关系
   - 使用 affected 命令进行增量构建

3. **版本控制**
   - 使用 conventional commits
   - 配置 @jscutlery/semver 自动化版本管理
   - 保持 changelog 更新

4. **CI/CD 集成**
   - 配置 Nx 缓存
   - 使用 affected 命令优化 CI 流程
   - 自动化发布流程

## 注意事项

1. 确保 .npmrc 中配置了正确的 registry
2. 注意包之间的依赖关系，避免循环依赖
3. 合理使用 Nx 缓存，避免不必要的重复构建
4. 遵循 conventional commits 规范，便于自动化版本管理
5. 定期清理构建缓存，避免占用过多磁盘空间

## 构建依赖与打包关系

### 工作空间结构设计

1. **核心包设计**

```
packages/
├── hd-custom/        # 组件库主包
├── share/         # 工具库
├── theme-chalk/       # 主题样式包
└── internal/          # 内部工具包
    ├── build/         # 主构建系统，基于 Gulp 的构建流程
    ├── build-constants/ # 构建常量定义，提供构建过程中使用的常量值
    ├── build-utils/   # 构建工具函数，提供构建脚本使用的工具方法
    ├── resolvers/     # 组件解析器，用于自动导入组件
    └── metadata/      # 组件元数据，用于文档生成和类型提示
```

2. **内部工具包说明**

- **build**: 核心构建系统
  - 包含基于 Gulp 的任务定义
  - 管理整个构建流程
  - 处理文件转换、打包和输出
  - 是构建系统的"内层"控制中心

- **build-constants**: 构建常量
  - 定义包名、路径等常量
  - 提供构建配置参数
  - 确保构建过程中的一致性
  - 集中管理可配置项

- **build-utils**: 构建工具函数
  - 提供文件处理函数
  - 包含路径解析工具
  - 提供日志和错误处理
  - 封装常用的构建操作

- **resolvers**: 组件解析器
  - 实现组件的自动导入
  - 支持 IDE 智能提示
  - 与打包工具集成
  - 优化开发体验

- **metadata**: 元数据处理
  - 收集组件信息
  - 生成 API 文档数据
  - 支持类型生成
  - 辅助文档站点构建

3. **依赖关系图**

```
hd-custom
  ├── share
  ├── theme-chalk
  └── internal/*
      ├── build → 依赖其他所有内部包
      ├── build-constants
      ├── build-utils → 依赖 build-constants
      ├── resolvers
      └── metadata → 依赖 build-utils
```

### 依赖管理详解

1. **工作空间依赖声明**

```json
// packages/hd-custom/package.json
{
  "name": "@hd-custom/components",
  "version": "1.0.0",
  "dependencies": {
    "@hd-custom/utils": "workspace:*", // 工作空间依赖，任意版本
    "@hd-custom/theme-chalk": "workspace:^" // 工作空间依赖，遵循语义化版本
  },
  "peerDependencies": {
    "vue": "^3.5.13" // 外部依赖声明
  },
  "devDependencies": {
    "@types/node": "^18.18.5", // 开发依赖
    "vite": "^5.4.10" // 构建工具依赖
  }
}
```

2. **依赖类型说明**

- `workspace:*`：允许使用工作空间中的任意版本，适用于开发阶段
- `workspace:^`：遵循语义化版本，适用于稳定版本
- `peerDependencies`：声明框架依赖，避免重复安装
- `devDependencies`：仅在开发和构建时使用的依赖

### 构建流程详解

1. **构建顺序控制**

```json
// nx.json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"], // 确保依赖项先构建
      "cache": true // 启用构建缓存
    }
  },
  "namedInputs": {
    "default": [
      "{projectRoot}/**/*", // 监听所有源文件
      "!{projectRoot}/**/node_modules/**/*",
      "!{projectRoot}/dist/**/*" // 排除构建产物
    ],
    "production": [
      "default",
      "!{projectRoot}/**/*.spec.ts" // 排除测试文件
    ]
  }
}
```

2. **预构建配置详解**

```json
// root package.json
{
  "scripts": {
    "prebuild": "npx nx run-many -t build -p share,internal-build-constants,internal-build-utils,internal-resolvers",
    "build": "pnpm run -C internal/build2 build",
    "utils:build": "pnpm run -C packages/share build",
    "build:theme": "pnpm run -C packages/theme-chalk build"
  }
}
```

构建流程说明：

1. `prebuild` 首先构建基础依赖：
   - share：基础工具库
   - internal-build-constants：构建常量
   - internal-build-utils：构建工具
   - internal-resolvers：依赖解析器

2. 主构建流程：

   ```bash
   # 1. 构建工具库（并行）
   pnpm run utils:build

   # 2. 构建主题（依赖工具库）
   pnpm run build:theme

   # 3. 构建组件库（依赖上述所有）
   pnpm run build
   ```

### 项目级构建配置

1. **组件库构建配置**

```json
// packages/hd-custom/project.json
{
  "name": "hd-custom",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm build",
        "outputs": [
          "dist/hd-custom", // 主构建产物
          "dist/types" // 类型文件
        ],
        "cwd": "packages/hd-custom" // 执行目录
      },
      "dependsOn": [
        "^build", // 依赖其他包的构建
        "build:theme", // 依赖主题构建
        {
          "projects": "dependencies", // 自动识别依赖项
          "target": "build"
        }
      ],
      "inputs": [
        "production", // 使用生产环境配置
        "{workspaceRoot}/tsconfig.json" // 全局 TypeScript 配置
      ]
    }
  }
}
```

2. **工具库构建配置**

```json
// packages/share/project.json
{
  "name": "share",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "vite build",
        "outputs": ["dist/share"],
        "cwd": "packages/share"
      }
    }
  }
}
```

### 缓存机制详解

1. **缓存配置完整示例**

```json
// nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test", "lint"],
        "cacheDirectory": ".nx/cache",
        "parallel": 3,
        "remoteCache": {
          "url": "http://nx-cache.internal",
          "timeout": 30000
        }
      }
    }
  }
}
```

2. **缓存工作原理**

- **输入哈希**：

  ```json
  "inputs": [
    "{projectRoot}/src/**/*",     // 源文件
    "{projectRoot}/package.json", // 项目配置
    "{workspaceRoot}/tsconfig.json" // 共享配置
  ]
  ```

  Nx 会计算这些文件的组合哈希值

- **缓存键生成**：

  ```
  cache-key = hash(inputs + command + dependencies-outputs)
  ```

- **缓存存储**：
  ```
  .nx/cache/
  ├── file-hashes/      # 文件哈希缓存
  ├── run/              # 运行结果缓存
  └── terminalOutputs/  # 终端输出缓存
  ```

3. **缓存生命周期**

```bash
# 开发流程中的缓存使用
1. 检查输入文件哈希值
2. 检查依赖项构建状态
3. 查找缓存命中
4. 如未命中，执行构建并缓存
5. 如命中，直接恢复缓存

# 缓存维护命令
nx reset                 # 清除所有缓存
nx reset hd-custom     # 清除特定项目缓存
nx clean                # 清除构建产物
```

### 性能优化策略

1. **并行构建优化**

```bash
# 最大化并行构建
nx run-many -t build -p share,hd-custom --parallel=3

# 使用 affected 只构建变更
nx affected -t build --parallel
```

2. **依赖优化**

```json
{
  "dependsOn": [
    {
      "projects": "dependencies",
      "target": "build",
      "params": "forward" // 转发构建参数
    }
  ]
}
```

3. **缓存优化**

- 精确定义 `inputs` 和 `outputs`
- 使用 `nx graph` 分析依赖
- 配置远程缓存共享
- 定期清理过期缓存

4. **常见性能问题解决**

```bash
# 分析构建性能
nx print-affected --select=tasks

# 查看依赖图
nx graph

# 验证缓存配置
nx build hd-custom --skip-nx-cache=false --verbose
```

## 两层构建系统

本项目采用了两层构建系统的架构，结合了 Nx 和 Gulp 的优势：

### 构建系统架构

1. **外层**: Nx 用于任务编排和缓存
   - 提供高层次的任务编排
   - 管理构建缓存
   - 处理项目间的依赖关系

2. **内层**: Gulp 用于具体构建流程控制
   - 管理具体的构建步骤
   - 控制文件转换和处理
   - 处理细粒度的依赖关系

### 构建流程说明

当执行 `pnpm build` (即 `nx build internal-build`) 时：

1. Nx 首先检查缓存，如果有命中则直接使用缓存结果
2. 如果没有缓存命中，Nx 启动 internal-build 项目的构建
3. internal-build 项目通过 Gulp 执行一系列任务：
   - 清理构建目录
   - 构建基础工具库
   - 构建主题样式
   - 生成类型定义
   - 构建组件库
   - 复制和整合构建产物

### 两层构建的优势

1. **结合两者优势**
   - Nx 提供高效的缓存和增量构建
   - Gulp 提供灵活的构建流程控制

2. **平滑过渡**
   - 保留现有的构建逻辑
   - 逐步引入 Nx 的功能
   - 降低迁移风险

3. **最佳实践**
   - 使用 Nx 管理大型任务和缓存
   - 使用 Gulp 处理细节和复杂流程
   - 两者优势互补

### 使用方式

```bash
# 执行完整构建
pnpm build

# 清理构建产物
pnpm clean

# 构建特定包
pnpm utils:build
pnpm build:theme
```
