一个基于 Element Plus 的综合业务组件库，适用于 vue3 项目当中。

[@hd/custom](https://docs.example.com/)

# 安装

## pnpm

```shell
pnpm add  @hd/custom
```

## 完整引入

在 `main.ts` 中引入下面内容

```ts
import { createApp } from 'vue'
import App from './App.vue'

import HdCustom from '@hd/custom'
import '@hd/custom/styles'

createApp(App).use(HdCustom).mount('#app')
```
