import type { ExtractPropTypes, PropType } from 'vue'
import { SearchFormControlProps } from './interface'

export const Props = {
  searchModel: {
    type: Object,
    default: () => ({}),
  },
  colConfig: {
    type: [Number, Object],
    default: () => ({ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }),
  },
  collapsedRows: {
    type: Number,
    default: 1,
  },
  formControls: {
    type: Array as PropType<SearchFormControlProps[]>,
    default: () => [],
  },
  filterFields: {
    type: Array,
    default: () => [],
  },
  modelDefault: {
    type: Object,
    default: null,
  },
  okpos: {
    type: String,
    default: 'right',
  },
  collapse: {
    type: Boolean,
    default: false,
  },
  isResetParams: {
    type: Boolean,
    default: false,
  },
  afterSearchFun: {
    type: Function,
    default: () => ({}),
  },
  afterResetFun: {
    type: Function,
    default: () => ({}),
  },
  beforeResetFun: {
    type: Function,
    default: () => ({}),
  },
}

export type SearchFormProps = ExtractPropTypes<typeof Props>
