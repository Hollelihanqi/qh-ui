import type { ExtractPropTypes, PropType } from 'vue'

import type Tabs from './tabs'

export interface TabItemProps {
  label: string
  value: string | number
  labelCount?: string | number | Function
}

export const tabsProps = {
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

export const tabsEmits = ['update:modelValue', 'update:activeIdx', 'change']

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export type TabsInstance = InstanceType<typeof Tabs>