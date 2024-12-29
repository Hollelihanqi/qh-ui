import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

import type SearchContainer from './search-container.vue'

export const searchContainerProps = buildProps({
  isUseForm: {
    type: Boolean,
    default: true,
  },
  itemMinWidth: {
    type: Number,
    default: 300,
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
})

export const searchContainerEmits = ['resize', 'enterKeyup']

export type SearchContainerProps = ExtractPropTypes<typeof searchContainerProps>

export type SearchContainerInstance = InstanceType<typeof SearchContainer>