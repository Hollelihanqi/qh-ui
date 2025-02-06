import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const waterMarkProps = buildProps({
  id: {
    type: String,
    default: '',
  },
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
  fillStyle: {
    type: String,
    default: '',
  }
})

export const waterMarkEmits = []

export type WaterMarkProps = ExtractPropTypes<typeof waterMarkProps>