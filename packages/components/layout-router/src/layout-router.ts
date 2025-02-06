import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const layoutRouterProps = buildProps({
  footer: {
    type: Boolean,
    default: false
  },
  cacheable: {
    type: Boolean,
    default: false
  },
  sso: {
    type: Boolean,
    default: false
  },
  max: Number,
  tabsKeyLabel: {
    type: String,
    default: 'title'
  },
  formatTab: {
    type: Function,
    default: null
  },
  routerGoback: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'vertical'
  },
  showTab: {
    type: Boolean,
    default: true
  },
  activeMenu: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'purple'
  }
})

export const layoutRouterEmits = ['tab-change', 'tab-remove']

export type LayoutRouterProps = ExtractPropTypes<typeof layoutRouterProps>