import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

import type Radio from './radio.vue'

export interface RadioOptionProp {
  label: string
  value: any
  [key: string]: any
}

export const radioProps = buildProps({
  options: {
    type: Array as PropType<RadioOptionProp[]>,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: 'value',
  },
  label: {
    type: String,
    default: 'label',
  },
  cancel: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

export const radioEmits = ['update:modelValue', 'change']

export type RadioProps = ExtractPropTypes<typeof radioProps>

export type RadioInstance = InstanceType<typeof Radio>