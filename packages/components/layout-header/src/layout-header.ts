import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const layoutHeaderProps = buildProps({
  title: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    default: '',
  },
  collapse: {
    type: Boolean,
    default: false,
  },
  isfullscreen: {
    type: Boolean,
    default: true,
  },
  userInfo: {
    type: Object,
    default: () => {},
  },
})

export const layoutHeaderEmits = ['logout', 'collapse', 'fullscreen']

export type LayoutHeaderProps = ExtractPropTypes<typeof layoutHeaderProps>