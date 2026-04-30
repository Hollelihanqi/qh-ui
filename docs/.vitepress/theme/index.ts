/** @type {import('vitepress').Theme} */

import VPApp, { NotFound, globals } from '../vitepress'
import DefaultTheme from 'vitepress/theme'

// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import HdCustom from '@hd/custom'
import '@hd/custom/theme-chalk/index.css'

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
    // app.use(ElementPlus)
    // app.use(HdCustom)
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
    // console.log('import.meta.env.SSR', import.meta.env.SSR)
    if (!import.meta.env.SSR) {
      // @ts-ignore
      const custom = await import('@hd/custom').then((m) => m)
      app.use(custom.default)
    }
  },
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     "aside-outline-before": () => h("div", {}, "我是前置内容"),
  //   });
  // },
}
