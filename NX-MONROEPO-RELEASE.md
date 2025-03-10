# Nx Monorepo 发布指南

本文档详细说明如何在 monorepo 项目中使用 Nx 进行包的发布管理，基于 `@yto/custom` UI 组件库项目实践。

## 目录

- [项目结构](#项目结构)
- [前提条件](#前提条件)
- [配置文件说明](#配置文件说明)
- [发布流程](#发布流程)
- [常见问题](#常见问题)
- [最佳实践](#最佳实践)

## 项目结构

```bash
yto-test-ui/
├── packages/
│   ├── yto-custom/          # 主要发布包
│   ├── theme-chalk/         # 样式包
│   └── yto-utils/          # 工具包
├── internal/
│   ├── build/              # 构建脚本
│   ├── build-constants/    # 构建常量
│   ├── build-utils/        # 构建工具
│   └── resolvers/         # 解析器
├── nx.json                 # Nx 配置
└── package.json           # 项目配置
```

### 包说明

1. **@yto/custom**

   - 主要的 UI 组件库包
   - 当前版本：2.0.0-beta.x
   - 发布目录：dist/yto-custom

2. **theme-chalk**

   - UI 组件的样式包
   - 构建配置：vite.module.config.ts 和 vite.global.config.ts
   - 输出优化配置已添加

3. **yto-utils**
   - 工具函数包
   - 被主包依赖
   - 需要在主包构建前构建

## 前提条件

- Node.js >= 18
- pnpm >= 8
- nx >= 20.5.0
- git

## 构建系统

### 1. 构建依赖关系

```mermaid
graph TD
    A[yto-utils] --> D[@yto/custom]
    B[build-constants] --> D
    C[build-utils] --> D
    E[resolvers] --> D
```

这就是为什么我们的 prebuild 脚本会首先构建这些依赖：

```json
{
  "prebuild": "npx nx run-many -t build -p yto-utils,internal-build-constants,internal-build-utils,internal-resolvers"
}
```

### 2. 缓存机制

当前项目使用了 Nx 的缓存机制，在 nx.json 中配置：

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "cache": true,
      "inputs": ["production", "^production"]
    }
  },
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "!{projectRoot}/**/node_modules/**/*"],
    "production": [
      "default",
      "!{projectRoot}/**/*.test.ts",
      "!{projectRoot}/**/*.spec.ts",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/.eslintrc.json"
    ]
  }
}
```

缓存命中时会显示：

```bash
✔ nx run yto-utils:build [existing outputs match the cache, left as is]
```

### 3. 构建优化

theme-chalk 的构建输出优化（vite.module.config.ts）：

```js
{
  build: {
    reportCompressedSize: false,
    cssTarget: false
  }
}
```

## 发布配置详解

### 1. nx.json 发布配置

```json
{
  "release": {
    "projectsRelationship": "independent",
    "releaseTagPattern": "v{version}",
    "changelog": {
      "workspaceChangelog": true,
      "projectChangelogs": true,
      "changelogPath": "CHANGELOG.md",
      "format": {
        "commitMessage": true,
        "types": [
          { "type": "feat", "section": "Features" },
          { "type": "fix", "section": "Bug Fixes" },
          { "type": "chore", "section": "Chores" },
          { "type": "docs", "section": "Documentation" },
          { "type": "style", "section": "Styles" },
          { "type": "refactor", "section": "Code Refactoring" },
          { "type": "perf", "section": "Performance Improvements" },
          { "type": "test", "section": "Tests" }
        ]
      }
    },
    "version": {
      "git": {
        "commitMessage": "chore(release): publish v${version}",
        "push": true,
        "tag": true
      }
    }
  }
}
```

这个配置专门针对 `@yto/custom` 包的发布，确保：

- 版本独立管理
- 自动创建规范的 git tag
- 自动生成变更日志
  - 支持工作区和项目级别的 changelog
  - 根据提交类型自动分类
  - 保存到 CHANGELOG.md 文件
- 自动提交和推送

### Changelog 生成说明

变更日志会根据 git commit 信息自动生成，支持以下类型：

- `feat`: 新功能
- `fix`: Bug 修复
- `chore`: 构建/工具链/依赖等修改
- `docs`: 文档更新
- `style`: 代码格式修改
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关

为了确保 changelog 正确生成，提交信息必须遵循 Conventional Commits 规范：

```bash
<type>(<scope>): <description>

[optional body]

[optional footer]
```

例如：

```bash
feat(button): add size prop to Button component
fix(input): resolve input blur event not firing
docs(readme): update installation instructions
```

### 2. 发布脚本解析

```json
{
  "scripts": {
    "check-git": "git diff-index --quiet HEAD || (echo '发现未提交的代码改动，请先执行 pnpm commit 提交代码' && exit 1)",
    "update-version": "npx nx release version --projects=@yto/custom",
    "commit-version": "git add packages/yto-custom/package.json && git commit -m \"chore(release): update package version\" || true",
    "build-after-version": "pnpm build",
    "publish-custom": "cd dist/yto-custom && npm publish",
    "push-tags": "git push origin --tags && git push",
    "release:ui": "pnpm check-git && pnpm update-version && pnpm commit-version && pnpm build-after-version && pnpm publish-custom && pnpm push-tags"
  }
}
```

脚本执行顺序说明：

1. `check-git`: 确保工作区干净
2. `update-version`: 使用 nx 更新版本号
3. `commit-version`: 提交版本更新（主要是 package.json 的变更）
4. `build-after-version`: 执行完整构建流程
   - 首先执行 prebuild 构建依赖
   - 然后构建主包
5. `publish-custom`: 发布构建产物
6. `push-tags`: 推送 tag 和代码

## 发布流程

### 1. 准备工作

```bash
# 确认 npm registry
npm config get registry
# 应该输出: https://npm.yto.net.cn/

# 确认登录状态
npm whoami

# 提交所有更改
pnpm commit
```

### 2. 执行发布

```bash
pnpm release:ui
```

### 3. 版本号管理

当前项目使用 beta 版本号，如：2.0.0-beta.15

版本号递增规则：

- beta 版本：2.0.0-beta.x 递增 x
- 正式版本：2.0.0 遵循语义化版本规范

## 常见问题

### 1. 发布失败处理

如果发布过程中出现错误：

```bash
# 清理缓存
pnpm clean:cache

# 重新构建
pnpm build

# 重试发布
pnpm release:ui
```

### 2. 版本号冲突

如果遇到版本号冲突：

```bash
# 查看当前 tag
git tag

# 删除有问题的 tag
git tag -d <tag-name>
git push origin :refs/tags/<tag-name>
```

### 3. 未提交的更改

如果提示有未提交的更改：

```bash
# 查看状态
git status

# 提交更改
pnpm commit
```

## 最佳实践

1. **提交规范**

   - 使用 commitizen 规范提交信息
   - 保持提交粒度合适
   - 确保提交信息清晰明了

2. **版本管理**

   - Beta 版本：2.0.0-beta.x
   - 正式版本：2.0.0
   - 每次发布前确认版本号递增正确

3. **构建优化**

   - 利用 Nx 的缓存机制提升构建效率
   - 适当配置 `reportCompressedSize` 和 `cssTarget` 控制构建输出
   - 定期清理缓存避免构建问题

4. **发布检查清单**
   - [ ] 所有代码已提交
   - [ ] 测试已通过
   - [ ] 文档已更新
   - [ ] 版本号符合预期
   - [ ] npm registry 配置正确

## 注意事项

1. 确保 npm registry 配置正确：

```bash
npm config set registry https://npm.yto.net.cn/
```

2. 确保有发布权限：

```bash
npm whoami
```

3. 保持工作目录干净：

```bash
git status
```

4. 定期检查并清理缓存：

```bash
pnpm clean:cache
```

## 相关命令参考

```bash
# 查看项目缓存状态
npx nx show projects --with-target build

# 查看受影响的项目
npx nx show projects --affected

# 清理构建缓存
pnpm clean:cache

# 构建并查看详细日志
pnpm build:verbose
```

## 配置优化建议

1. **缓存配置**

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "cache": true,
      "inputs": ["production", "^production"]
    }
  }
}
```

2. **构建输出优化**

```js
{
  build: {
    reportCompressedSize: false,
    cssTarget: false
  }
}
```

## 构建输出说明

构建完成后的目录结构：

```bash
dist/yto-custom/
├── es/                    # ES 模块
├── theme-chalk/           # 样式文件
├── resolvers/            # 解析器
├── package.json          # 包配置
└── README.md            # 说明文档
```

## 更新历史

| 日期       | 版本  | 更新内容                                      |
| ---------- | ----- | --------------------------------------------- |
| 2024-03-xx | 1.0.0 | 初始版本，基于 @yto/custom 2.0.0-beta.15 实践 |

## 参考资料

- [Nx 官方文档](https://nx.dev/)
- [语义化版本](https://semver.org/lang/zh-CN/)
- [Commitizen](https://github.com/commitizen/cz-cli)
