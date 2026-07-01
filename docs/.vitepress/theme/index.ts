/** @type {import('vitepress').Theme} */

import VPApp, { NotFound, globals } from '../vitepress'
import DefaultTheme from 'vitepress/theme'

// import ElementPlus from 'element-plus'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import 'element-plus/dist/index.css'
// import HdCustom from '@rdeam/hd-ui'
import '@rdeam/hd-ui/theme-chalk/index.css'

import 'virtual:uno.css'
import './style.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'

import '../vitepress/styles/base.scss'
import 'virtual:group-icons.css'

export default {
  extends: DefaultTheme,
  NotFound,
  Layout: VPApp,
  async enhanceApp({ app, router }) {
    // 注入 Element Plus 的 id 计数器，保证 SSR 与客户端 hydrate 时组件 id 一致，消除 [IdInjection] 告警
    app.provide(ID_INJECTION_KEY, { prefix: 0, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
    // app.use(ElementPlus)
    // app.use(HdCustom)
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
    // console.log('import.meta.env.SSR', import.meta.env.SSR)
    if (!import.meta.env.SSR) {
      // @ts-ignore
      const custom = await import('@rdeam/hd-ui').then((m) => m)
      app.use(custom.default)
    }
  },
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     "aside-outline-before": () => h("div", {}, "我是前置内容"),
  //   });
  // },
}
