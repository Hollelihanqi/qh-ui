# eslint 配置

## 安装

```shell
pnpm add @yto/eslint-config -D
```

## 配置 .eslintrc.json

```javascript
{
  "root": true,
  "extends": [
    "@yto/eslint-config",
    "./src/types/.eslintrc-auto-import.json" // 使用unplugin-auto-import插件生成的自动导入文件地址
  ]
}

```

## 三方 插件说明

```text

    @typescript-eslint/eslint-plugin: ESLint 插件，包含了定义好的检测 TypeScript 代码的规范。
    @typescript-eslint/parser: ESLint 的解析器，解析 TypeScript，检查和规范 TypeScript 代码；
    eslint-define-config: 为.eslintrc.js提供defineConfig函数，为eslint.config.js文件提供defineFlatConfig函数。
    eslint-plugin-vue: Vue.js官方ESLint插件
    eslint-plugin-markdown: Markdown内部的Lint JS、JSX、TypeScript等规则
    prettier:代码格式化插件,
    eslint-plugin-prettier：ESLint 插件,将 Prettier 应用到 ESLint 中。它会使用 Prettier 来格式化代码
    eslint-config-prettier：  ESLint 配置规则的包，将禁用与 Prettier 冲突的 ESLint 规则

```
