import type { ExtractPropTypes } from 'vue'

export const Props = {
  size: {
    type: String,
    default: 'small',
  },
  largeSize: {
    type: Object,
    default: () => ({ width: '240px', height: '120px' }),
  },
  smallSize: {
    type: Object,
    default: () => ({ width: '120px', height: '60px' }),
  },
  miniSize: {
    type: Object,
    default: () => ({ width: '80px', height: '40px' }),
  },
  desc: {
    type: String,
    default: '暂无数据',
  },
  hidesc: {
    type: Boolean,
    default: false,
  },
}

export type EmptyProps = ExtractPropTypes<typeof Props>
