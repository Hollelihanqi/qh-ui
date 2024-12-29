import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

import type TimeLine from './time-line.vue'

export const timeLineProps = buildProps({
  timeData: {
    type: Array as PropType<{ [key: string]: any }[]>,
    default: () => [],
  },
  prependWidth: {
    type: String,
    default: '88px',
  },
  propsConfig: {
    type: Object as PropType<{ [key: string]: any }>,
    default: () => ({ status: 'status', timestamp: 'timestamp', content: 'content' }),
  },
})

export const timeLineEmits = []

export type TimeLineProps = ExtractPropTypes<typeof timeLineProps>

export type TimeLineInstance = InstanceType<typeof TimeLine>