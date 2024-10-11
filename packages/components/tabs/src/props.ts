import type { ExtractPropTypes, PropType } from 'vue'

export interface TabItemProps {
  label: string
  value: string | number
  labelCount?: string | number | Function
}

export const Props = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  activeIdx: {
    type: Number,
    default: -1,
  },
  tabs: {
    type: Array as PropType<TabItemProps[]>,
    required: true,
    default: () => [],
  },
  tabPx: {
    type: String,
    default: '32px',
  },
  w: {
    type: String,
    default: 'auto',
  },
}

export type TabsProps = ExtractPropTypes<typeof Props>
