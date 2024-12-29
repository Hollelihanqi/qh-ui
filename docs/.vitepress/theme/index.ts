/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-27 16:45:39
 * @LastEditors: weichunpei
 * @LastEditTime: 2024-01-12 16:50:50
 * @FilePath: \yto-engine\docs\.vitepress\theme\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DefaultTheme from 'vitepress/theme'
import DemoBlock from '@ruabick/vitepress-demo-block'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@ruabick/vitepress-demo-block/dist/style.css'
import './style.css'
import '@yto/custom/styles'
import './var.css'
import 'virtual:windi.css'
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.component('demo', DemoBlock)
    app.use(ElementPlus)
    // @ts-ignore
    if (import.meta.env.SSR) return
    const custom = await import('@yto/custom').then((m) => m)
    app.use(custom.default).use(custom.directives)
  },
}
