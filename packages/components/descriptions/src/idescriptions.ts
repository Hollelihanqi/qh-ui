import type { ExtractPropTypes, PropType } from 'vue'

interface LabelProps {
  label?: string
  prop?: string
}

export interface ListProps extends LabelProps {
  render?: Function
  span?: number
  enum?: any
  show?: boolean | Function
  labelPosition?: 'left' | 'top'
}

export interface DescriptionsListProps extends LabelProps {
  render?: Function
  span?: number
  enum?: any
  show?: boolean | Function
}

export const descriptionsProps = {
  list: {
    type: Array as PropType<ListProps[]>,
    default: () => [],
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  span: {
    type: Number,
    default: 8,
  },
  labelWidth: {
    type: String,
    default: 'auto',
  },
  labelAlign: {
    type: String,
    default: 'left',
  },
  labelPosition: {
    type: String,
    default: 'left',
  },
  labelSuffixHide: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  labelColor: {
    type: String,
    default: '#606266',
  },
  valueColor: {
    type: String,
    default: '#909399',
  },
  lineHeight: {
    type: String,
    default: '26px',
  },
  colAignItemsCenter: {
    type: Boolean,
    default: false,
  },
}

export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>
