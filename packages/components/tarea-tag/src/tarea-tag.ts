import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

import type TareaTag from './tarea-tag.vue'

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

export type TareaTagInstance = InstanceType<typeof TareaTag>