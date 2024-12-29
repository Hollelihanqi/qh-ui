/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-24 17:52:24
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-26 16:44:22
 * @FilePath: \yto-engine\docs\docs\.vitepress\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AErts
 */

import { defineConfig } from 'vitepress'
import { applyPlugins } from '@ruabick/md-demo-plugins'

export default defineConfig({
  title: '技术平台部-业务组件库',
  lastUpdated: true,
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com' }],
    sidebar: {
      '/': [
        {
          text: '快速开始',
          link: '/guide/fast',
        },
        {
          text: '组件',
          items: [
            {
              text: 'Table 表格',
              link: '/examples/table/index.md',
            },
            {
              text: 'Menu 菜单',
              link: '/examples/menu/index.md',
            },
            {
              text: 'Chart 图表',
              link: '/examples/echart/index.md',
            },
            {
              text: 'Form 表单',
              link: '/examples/from/index.md',
            },
            {
              text: 'formItems 表单',
              link: '/examples/fromItems/index.md',
            },
            {
              text: 'Dialog 弹框',
              link: '/examples/dialog/index.md',
            },
            {
              text: 'RemoteSearch 远程搜索',
              link: '/examples/remote-search/index.md',
            },
            {
              text: 'SearchForm 用户搜索',
              link: '/examples/user-search/index.md',
            },
            {
              text: 'SearchForm 表格搜索',
              link: '/examples/search-form/index.md',
            },
            {
              text: 'Uploader 大文件上传',
              link: '/examples/uploader/index.md',
            },
            {
              text: 'LayoutHeader ',
              link: '/examples/layout-header/index.md',
            },
            {
              text: 'LayoutMenu',
              link: '/examples/layout-menu/index.md',
            },
            {
              text: 'LayoutRouter',
              link: '/examples/layout-router/index.md',
            },
            {
              text: 'LayoutFrame',
              link: '/examples/layout-frame/index.md',
            },
            {
              text: 'stickyContainer 粘性布局',
              link: '/examples/sticky-container/index.md',
            },
            {
              text: 'Theme',
              link: '/examples/theme/index.md',
            },
            {
              text: 'CustomFieldConfig',
              link: '/examples/custom-field-config/index.md',
            },
            {
              text: 'CustomFieldContainer',
              link: '/examples/custom-field-container/index.md',
            },
            {
              text: 'SearchContainer',
              link: '/examples/search-container/index.md',
            },
            {
              text: 'AdaptionContainer',
              link: '/examples/adaption-container/index.md',
            },
            {
              text: 'EllipsisTag',
              link: '/examples/ellipsis-tag/index.md',
            },
            {
              text: 'TareaTag 文本校验',
              link: '/examples/tarea-tag/index.md',
            },
            {
              text: 'Radio 单选框',
              link: '/examples/radio/index.md',
            },
            {
              text: 'TimeLine 时间线',
              link: '/examples/time-line/index.md',
            },
            {
              text: 'JsonViewer Json查看器',
              link: '/examples/json-viewer/index.md',
            },
            {
              text: 'text-ellipsis 多行文字折叠',
              link: '/examples/text-ellipsis/index.md',
            },
            {
              text: 'empty 空状态',
              link: '/examples/empty/index.md',
            },
            {
              text: 'descriptions 描述列表',
              link: '/examples/descriptions/index.md',
            },
            {
              text: 'tabs 标签组',
              link: '/examples/tabs/index.md',
            },
            {
              text: 'date picker 时间选择组件',
              link: '/examples/date-picker/index.md',
            },
            {
              text: 'watermark 水印',
              link: '/examples/watermark/index.md',
            },
          ],
          collapsed: false,
        },
        {
          text: '指令',
          items: [
            {
              text: '指令',
              link: '/examples/directives/index.md',
            },
          ],
          collapsed: false,
        },
        {
          text: '工具类',
          items: [
            {
              text: '分享',
              link: '/examples/utils/share.md',
            },
            {
              text: '文件下载',
              link: '/examples/utils/download.md',
            },
            {
              text: '水印',
              link: '/examples/utils/waterMarker.md',
            },
            {
              text: '时间',
              link: '/examples/utils/time.md',
            },
            {
              text: '其他方法',
              link: '/examples/utils/other.md',
            },
          ],
          collapsed: false,
        },
        {
          text: '其他',
          items: [
            {
              text: '系统维护统一提示',
              link: '/examples/others/systemMaintenance.md',
            },
            {
              text: 'el-form 状态样式',
              link: '/examples/form-readonly-style/index.md',
            },
          ],
          collapsed: false,
        },
      ],
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },
  /**
   * 自定义 markdown 解析器
   *
   * @see markdown https://vitepress.vuejs.org/config/app-configs#markdown
   */
  markdown: {
    /**
     * 配置 Markdown-it 实例
     *
     * @param { Object } md markdown 实例
     */
    config: (md) => {
      applyPlugins(md)
    },
  },
})
