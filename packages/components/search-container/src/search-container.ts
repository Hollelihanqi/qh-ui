import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const searchContainerProps = buildProps({
  isUseForm: {
    type: Boolean,
    default: true,
  },
  itemMinWidth: {
    type: Number,
    default: 300,
  },
  itemMaxWidth: {
    type: Number,
    default: 0,
  },
  autoLayout: {
    type: Boolean,
    default: true,
  },
  isCollapse: {
    type: Boolean,
    default: false,
  },
  defaultCollapse: {
    type: Boolean,
    default: false,
  },
  collapseLine: {
    type: Number,
    default: 3,
  },
  customClass: {
    type: String,
    default: '',
  },
})

export const searchContainerEmits = ['resize', 'enterKeyup']

export type SearchContainerProps = ExtractPropTypes<typeof searchContainerProps>
