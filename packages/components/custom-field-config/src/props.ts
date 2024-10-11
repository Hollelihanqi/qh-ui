import type { ExtractPropTypes, PropType } from 'vue'

export interface IAnyObject {
  [key: string]: any
}

export interface FieldConfig extends IAnyObject {
  elType?: string
  props: string
  options?: IAnyObject[]
  disabled?: boolean
}
export const Props = {
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

export type CustomFieldConfigProps = ExtractPropTypes<typeof Props>
