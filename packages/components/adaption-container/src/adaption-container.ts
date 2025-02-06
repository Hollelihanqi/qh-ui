import type { ExtractPropTypes } from 'vue'

export const adaptionContainerProps = {
  list: {
    type: Array,
    default: () => [],
  },
  minWidth: {
    type: Number,
    default: 200,
  },
  gap: {
    type: Number,
    default: 10,
  },
  minNum: {
    type: Number,
    default: 1,
  },
  containerMinWidth: {
    type: Number,
    default: 1,
  }

}


export type AdaptionContainerProps = ExtractPropTypes<typeof adaptionContainerProps>
