# YTO UI 现代构建系统

这是 YTO UI 组件库的现代构建系统，基于 Vite 重构，专注于输出 ES 模块格式。

## 特点

- 🚀 基于 Vite 的高性能构建
- 📦 专注于 ES 模块格式，完全兼容 Node.js 22+
- 🔄 并行构建流程提高效率
- 📝 TypeScript 类型生成集成
- 🧩 模块化设计，易于维护

## ESM 兼容性处理

构建系统使用了完全的 ESM 模块格式，解决了 Node.js 22+ 的兼容性问题：

1. **`__dirname` 和 `__filename` 替代方案**：

   ```typescript
   import { dirname } from 'path'
   import { fileURLToPath } from 'url'

   const __filename = fileURLToPath(import.meta.url)
   const __dirname = dirname(__filename)
   ```

2. **package.json 设置**：

   ```json
   {
     "type": "module"
   }
   ```

3. **TypeScript 配置**：
   ```json
   {
     "compilerOptions": {
       "module": "ESNext",
       "moduleResolution": "Node"
     }
   }
   ```

## 使用方法

```bash
# 安装依赖
pnpm install

# 执行构建
pnpm build
```

## 构建输出

构建完成后，所有文件会输出到 `dist/yto-custom` 目录，目录结构如下：

```
dist/yto-custom/
├── es/                 # ES 模块
├── types/              # TypeScript 类型定义
├── theme-chalk/        # 主题样式
├── resolvers/          # Vite/Webpack 解析器
├── dist/               # 打包后的 CSS
├── package.json        # 包信息
├── README.md           # 说明文档
└── global.d.ts         # 全局类型定义
```

## 与旧构建系统的区别

相比于基于 Gulp + Rollup 的旧构建系统，本系统有如下优势：

1. **现代化**: 使用 Vite 替代 Gulp + Rollup 组合
2. **性能更佳**: Vite 的优化使构建速度显著提升
3. **简化配置**: 集中的配置文件，易于维护
4. **ESM 原生支持**: 完全兼容 Node.js 22+
5. **并行构建**: 提升构建效率

## 技术栈

- Vite
- TypeScript
- fs-extra
- consola & chalk (日志美化)
