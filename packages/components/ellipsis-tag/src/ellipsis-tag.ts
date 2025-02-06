import type { ExtractPropTypes, PropType } from 'vue'

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