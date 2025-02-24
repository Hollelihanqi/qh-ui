import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const formProps = buildProps({
  formConfig: {
    type: Array as PropType<{ [key: string]: any }[]>,
    default: () => [],
  },
  layoutAuto: { type: Boolean, default: false },
  size: {
    type: String,
    default: () => {
      return ''
    },
  },
  span: { type: Number, default: 6 },
  form: {
    type: Object,
    default: () => {
      return {}
    },
  },
  itemConfig: {
    type: Object,
    default: () => {
      return {
        options: [],
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
})

export const formEmits = []

export type FormProps = ExtractPropTypes<typeof formProps>
