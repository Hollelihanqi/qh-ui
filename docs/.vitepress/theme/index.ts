/** @type {import('vitepress').Theme} */
import VPApp, { NotFound, globals } from "../vitepress";
import DefaultTheme from "vitepress/theme";

import "virtual:uno.css";
import './style.css'

import "../vitepress/styles/base.scss";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import '@yto/custom/theme-chalk/index.css'

// import type { Theme } from 'vitepress'


export default {
  extends: DefaultTheme,
  NotFound,
  Layout: VPApp,
  async enhanceApp({ app }) {
    app.use(ElementPlus);
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp);
    });
    // @ts-ignore
    if (!import.meta.env.SSR) {
      const custom = await import('@yto/custom').then((m) => m)
      app.use(custom.default)
    }
  },
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     "aside-outline-before": () => h("div", {}, "我是前置内容"),
  //   });
  // },
};
