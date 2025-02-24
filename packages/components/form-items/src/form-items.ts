import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const formItemsProps = buildProps({
  formConfig: {
    type: Array as PropType<{ [key: string]: any }[]>,
    default: () => {
      return []
    },
  },
  layoutAuto: { type: Boolean, default: false },
  size: {
    type: String,
    default: '',
  },
  form: {
    type: Object,
    default: () => ({}),
  },
  itemConfig: {
    type: Object,
    default: () => {
      return {
        options: [],
        formItemWidth: '25%',
        contentClass: '',
        disabled: false,
        clearable: true,
        activeColor: '#13ce66',
        inactiveColor: '',
        activeValue: true,
        inactiveValue: false,
      }
    },
  },
  useColWrapper: {
    type: Boolean,
    default: false,
  },
})

export const formItemsEmits = []

export type FormItemsProps = ExtractPropTypes<typeof formItemsProps>
