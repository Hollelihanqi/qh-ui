import type { ExtractPropTypes, PropType } from 'vue'

interface IAnyObject {
  [key: string]: any
}

export const customFieldContainerProps = {
  modelValue: {
    type: Array as PropType<IAnyObject[]>,
    default: () => [],
  },
  termHiddenDel: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
  width: {
    type: String,
    default: '100%',
  },
}

export const customFieldContainerEmits = ['add', 'delete']

export type CustomFieldContainerProps = ExtractPropTypes<typeof customFieldContainerProps>
