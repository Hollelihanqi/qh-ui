import { defineConfig } from 'vitepress'
import { mdPlugin } from './plugins'
import type { UserConfig } from 'vitepress'
import { nav } from './nav'
import { sidebars } from './sidebars'

// https://vitepress.dev/reference/site-config
const config: UserConfig = {
  title: "技术平台部",
  description: "技术平台部，业务组件库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLinks: true,
    nav,
    sidebars,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    headers: {
      level: [2, 3, 4, 5, 6],
    },
    config: (md) => mdPlugin(md),
  },
}

export default config
