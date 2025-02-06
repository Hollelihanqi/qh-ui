## 组件

### 安装

npm 源 https://npm.yto.net.cn/

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

### 按需引入（推荐）

在 `vite.config.ts` 进行如下配置

```ts
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { YtoCustomResolver } from '@yto/custom/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), YtoCustomResolver()],
    }),
  ],
})
```

### 完整引入

在 `main.ts` 中引入下面内容

```ts
import { createApp } from 'vue'
import App from './App.vue'

import YtoCustom from '@yto/custom'
import '@yto/custom/theme-chalk/index.css'

createApp(App).use(YtoCustom).mount('#app')
```

## 指令

> [!tip]
> 所有的指令都被迁移至 `@yto/custom/directives` 路径下

### 使用方式

::: code-group

```ts [xxx.tsx]
import { ResizeElement } from '@yto-custom/directives'
export default defineComponent({
  directives: { ResizeElement },
   setup(props, { emit, expose, slots }) {
    return () => (<div v-resizeElement={handleResize}></div>)
   }
})
```

```vue [xxx.vue]
import { ResizeElement as vResizeElement } from '@yto-custom/directives'

<template>
    <div v-resize-element="resizeHandler"></div>
</template>
```
:::
