import type { ExtractPropTypes, PropType } from 'vue'

type DateModelType = number | string | Date

export const datePickerProps = {
  start: {
    type: [Date, String, Number] as PropType<DateModelType>,
    default: '',
  },
  end: {
    type: [Date, String, Number] as PropType<DateModelType>,
    default: '',
  },
  type: {
    type: String as PropType<'daterange' | 'datetimerange'>,
    default: 'daterange',
  },
}

export const datePickerEmits = ['update:start', 'update:end']

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
