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

::: warning

peerDependencies（前置依赖）:

> 版本兼容性：它允许库的作者指定与其库兼容的其他库的版本范围。这对于确保不同库之间的兼容性非常重要，尤其是在使用插件或扩展时。

> 避免重复安装：当一个包依赖于另一个包的特定版本时，使用 peerDependencies 可以避免在项目中重复安装相同的依赖项。例如，如果多个插件都依赖于同一个库，使用 peerDependencies 可以确保只安装一次。

> 明确依赖关系：它使得开发者在使用某个库时，能够清楚地知道需要手动安装哪些依赖项。这对于大型项目或使用多个库的项目尤其重要。

> 适用于插件：在构建插件或扩展时，通常会使用 peerDependencies 来声明对宿主库的依赖，例如 Vue、React 等。这确保了插件与宿主库的版本兼容。


以下依赖项不会被自动安装，需要手动安装，但不是必须要安装，使用到具体的组件时需要安装：

* "@element-plus/icons-vue": "^2.1.0",
* "axios": "^1.3.5",
* "echarts": "^5.4.2",
* "element-plus": "^2.6.1",
* "gold-core": "0.1.17",
* "immutable": "^4.3.4"
