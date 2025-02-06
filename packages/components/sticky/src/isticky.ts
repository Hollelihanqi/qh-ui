import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

export type StickyPosition = 'top' | 'bottom'

export const stickyProps = buildProps({
  zIndex: {
    type: [Number, String],
    default: 100,
  },
  position: {
    type: String as PropType<StickyPosition>,
    default: 'top',
  },
  container: {
    type: Object as PropType<Element>,
  },
  offsetTop: {
    type: [Number, String],
    default: 0,
  },
  offsetBottom: {
    type: [Number, String],
    default: 0,
  },
  inGlobal: {
    type: Boolean,
    default: true,
  },
})

export const stickyEmits = ['scroll', 'change']

export type StickyProps = ExtractPropTypes<typeof stickyProps>