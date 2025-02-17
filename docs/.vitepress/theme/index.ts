/** @type {import('vitepress').Theme} */
import VPApp, { NotFound, globals } from '../vitepress'
import DefaultTheme from 'vitepress/theme'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import YtoCustom from '@yto/custom'
// import '@yto/custom/theme-chalk/index.css'

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
    app.use(ElementPlus)
    // app.use(YtoCustom)
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })

    // 添加路由守卫
    router.onBeforeRouteChange = (to) => {
      // 防止外部链接使用 router
      if (to.startsWith('http')) {
        window.location.href = to
        return false
      }
    }

    // @ts-ignore
    // if (!import.meta.env.SSR) {
    //   const custom = await import('@yto/custom').then((m) => m)
    //   app.use(custom.default)
    // }
  },
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     "aside-outline-before": () => h("div", {}, "我是前置内容"),
  //   });
  // },
}
