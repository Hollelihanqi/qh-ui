import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const layoutProps = buildProps({
  footer: {
    type: Boolean,
    default: false,
  },
  cacheable: {
    type: Boolean,
    default: false,
  },
  sso: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: 0
  },
  tabsKeyLabel: {
    type: String,
    default: 'title',
  },
  formatTab: {
    type: Function,
    default: null
  },
  routerGoback: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'vertical',
  },
  showTab: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'purple'
  },
  orgMenuList: {
    type: Array,
    default: () => []
  },
})

export const layoutEmits = ['tab-change', 'tab-remove']

export type LayoutProps = ExtractPropTypes<typeof layoutProps>