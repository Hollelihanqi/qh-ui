## 组件

### 安装

使用快速的，节省磁盘空间的包管理工具 [pnpm](https://pnpm.io/zh) 进行安装

```shell
pnpm add @yto/custom
```

### 更新

```shell
    pnpm up @yto/custom@latest

```

> [!TIP]
> 因为组件库依赖 element-plus 在打包时，未将 element-plus 打包在内，所以需要在 `main.ts` 中引入 element-plus 的样式文件
> `import element-plus/dist/index.css`

### 完整引入

在 `main.ts` 中引入下面内容

```ts
import { createApp } from 'vue'
import App from './App.vue'

import YtoCustom from '@yto/custom'
import '@yto/custom/index.css'

createApp(App).use(YtoCustom).mount('#app')
```

### 按需引入

在 `vite.config.ts` 进行如下配置

> [!TIP]
> 因为 resolveComponent 无法自动引入 css 文件，所有需要手动在 `main.ts` 中引入全量 css 文件
> `import @yto/custom/index.css`

```ts
import { resolveComponent } from '@yto/custom/resolve'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    Components({
      resolvers: [
        // ...
        resolveComponent(),
      ],
      dts: 'src/types/components.d.ts',
    }),
  ],
})
```

## 指令

> [!tip]
> 所有的指令都被迁移至 `@yto/custom/directives` 路径下

### 使用方式

```ts
// 按需使用
import { ResizeElement as vResizeElement } from '@yto/custom/directives'
// 全量注册 directives
import { directives } from '@yto/custom/directives'
app.use(directives)
```
