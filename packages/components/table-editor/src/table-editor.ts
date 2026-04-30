import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@hd-custom/utils'

export interface ITableEditorAnyObject {
  [key: string]: any
}

export interface IColumn {
  itemType: IItemType
  label?: string
  prop: string
  disabled?: (row: ITableEditorAnyObject) => boolean | boolean // 是否禁用
  isHidden?: (row: ITableEditorAnyObject) => boolean | boolean // 是否隐藏
  formateText?: (row: ITableEditorAnyObject) => string // 只读状态下格式化文本
  [key: string]: any
}

type IItemType =
  | 'input'
  | 'select'
  | 'tree-select'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch'
  | 'checkbox'
  | 'cascader'
  | 'autocomplete'

export const tableEditorProps = buildProps({
  columns: {
    type: Array as PropType<IColumn[]>,
    required: true,
  },
  setProp: {
    type: Function as PropType<(prop: string, value: any) => string>,
  },
  setRules: {
    type: Function as PropType<(prop: string, value: any) => ITableEditorAnyObject>,
  },
  operateWidth: {
    type: Number,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

export const tableEditorEmits = []

export type TableEditorProps = ExtractPropTypes<typeof tableEditorProps>
