import type { ExtractPropTypes, PropType } from 'vue'

import type FormItems from './form-items.vue'

export const formItemsProps = {
  formConfig: {
    type: Array as PropType<{ [key: string]: any }[]>,
    default: () => {
      return []
    },
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
}

export const formEmits = []

export type FormItemsProps = ExtractPropTypes<typeof formItemsProps>

export type FormItemsInstance = InstanceType<typeof FormItems>