import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const layoutMenuProps = buildProps({
  keyLabel: {
    type: String,
    default: '',
  },
  keyIcon: {
    type: String,
    default: '',
  },
  keyHref: {
    type: String,
    default: '',
  },
  keySession: {
    type: String,
    default: '',
  },
  collapse: {
    type: Boolean,
    default: false,
  },
  menus: {
    type: Array,
    default: () => [],
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  searchPlaceholder: {
    type: String,
    default: '菜单查询',
  },
  // width: {
  //   type: String,
  //   default: '210px',
  // },
  title: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    default: '',
  },
  linkType: {
    type: String,
    default: 'paneAdd',
  },
  formatMenu: {
    type: Function,
    default: null,
  },
  defaultActive: {
    type: String,
    default: '',
  },
})

export const layoutMenuEmits = ['menuClick', 'update:collapse']

export type LayoutMenuProps = ExtractPropTypes<typeof layoutMenuProps>
