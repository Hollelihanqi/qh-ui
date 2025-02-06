import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const layoutFrameProps = buildProps({
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
  max: Number,
  type: {
    type: String,
    default: 'vertical',
  },
})

export const layoutFrameEmits = []

export type LayoutFrameProps = ExtractPropTypes<typeof layoutFrameProps>