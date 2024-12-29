一个基于 Element Plus 的综合业务组件库，适用于 vue3 项目当中。

[@yto/custom](http://10.130.136.69:7200/)

# 安装

## pnpm

```shell
pnpm add  @yto/custom
```

## 完整引入

在 `main.ts` 中引入下面内容

```ts
import { createApp } from 'vue'
import App from './App.vue'

import YtoCustom from '@yto/custom'
import '@yto/custom/styles'

createApp(App).use(YtoCustom).mount('#app')
```
