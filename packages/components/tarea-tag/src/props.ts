import type { ExtractPropTypes } from 'vue'

export const Props = {
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
}

export type TareaProps = ExtractPropTypes<typeof Props>
