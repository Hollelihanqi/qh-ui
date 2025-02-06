import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const echartProps = buildProps({
  type: {
    type: String as PropType<'line' | 'bar' | 'pie'>,
    default: undefined,
  },
  optins: {
    type: Object as PropType<any>,
    default: () => { },
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '400px',
  }
})

export const echartEmits = []

export type EchartProps = ExtractPropTypes<typeof echartProps>