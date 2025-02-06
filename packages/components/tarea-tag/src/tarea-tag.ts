import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const tareaTagProps = buildProps({
  modelValue: {
    type: [Array, String],
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  regular: {
    type: [RegExp, Function],
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

export const tareaTagEmits = ['update:modelValue', 'on-updated']

export type TareaTagProps = ExtractPropTypes<typeof tareaTagProps>