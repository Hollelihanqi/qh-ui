import type { ExtractPropTypes, PropType } from 'vue'

import type CustomFieldConfig from './custom-field-config.tsx'

interface IAnyObject {
  [key: string]: any
}

export interface FieldConfig extends IAnyObject {
  elType?: string
  props: string
  options?: IAnyObject[]
  disabled?: boolean
}

export const customFieldConfigProps = {
  modelValue: {
    type: Object,
    required: true,
  },
  fieldConfig: {
    type: Object as PropType<FieldConfig>,
    required: false,
  },
  operatorConfig: {
    type: Object as PropType<FieldConfig>,
    required: false,
  },
  valueConfig: {
    type: Object as PropType<FieldConfig>,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  ruleProp: {
    type: String,
    required: false,
  },
  rules: {
    type: Function,
    required: false,
  },
  optionWidth: {
    type: String,
    required: false,
  },
}

export const customFieldConfigEmits = ['cbChange', 'update:modelValue']

export type CustomFieldConfigProps = ExtractPropTypes<typeof customFieldConfigProps>

export type CustomFieldConfigInstance = InstanceType<typeof CustomFieldConfig>