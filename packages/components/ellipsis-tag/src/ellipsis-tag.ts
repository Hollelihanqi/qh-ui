import type { ExtractPropTypes, PropType } from 'vue'

import type EllipsisTag from './ellipsis-tag.vue'

export interface ResizeInfo {
  width: number
  height: number
}

export const ellipsisTagProps = {
  tags: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  labelKey: {
    type: String,
    default: 'label',
  },
}


export type EllipsisTagProps = ExtractPropTypes<typeof ellipsisTagProps>

export type EllipsisTagInstance = InstanceType<typeof EllipsisTag>