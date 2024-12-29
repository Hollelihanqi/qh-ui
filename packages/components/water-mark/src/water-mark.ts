import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

import type WaterMark from './water-mark.vue'

export const waterMarkProps = buildProps({
  content: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 200,
  },
  height: {
    type: Number,
    default: 100,
  },
  rotate: {
    type: Number,
    default: -28,
  },
  zIndex: {
    type: Number,
    default: 99999,
  },
  font: {
    type: String,
    default: '14px Inter, Avenir',
  },
})

export const waterMarkEmits = []

export type WaterMarkProps = ExtractPropTypes<typeof waterMarkProps>

export type WaterMarkInstance = InstanceType<typeof WaterMark>