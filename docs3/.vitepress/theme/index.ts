/** @type {import('vitepress').Theme} */

import { h } from "vue";
import VPApp, { NotFound, globals } from "../vitepress";
import DefaultTheme from "vitepress/theme";
// import { define } from '../utils/types'

// import 'uno.css'
import "virtual:uno.css";
import './style.css'

import "../vitepress/styles/base.scss";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import YtoUplus from '@yto/custom'
import '@yto/custom/index.css'

// import type { Theme } from 'vitepress'
export default {
  extends: DefaultTheme,
  NotFound,
  Layout: VPApp,
  async enhanceApp({ app }) {
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp);
    });
    app.use(ElementPlus);
    app.use(YtoUplus);
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
};
