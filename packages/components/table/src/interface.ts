export interface ColumnsItemProps {
  label?: string
  prop?: string
  hide?: (row?: any) => boolean
  [propsName: string]: any
}
export type CanWrite<T> = {
  -readonly [K in keyof T]?: T[K]
}

export interface ShowHideFieldsInterface {
  showHideFields: string[] | { fields: string[]; showFields: string[] }
}

export interface setColumnsProps {
  label: string
  prop: string
  checked: boolean
  disabled: boolean
}

export type { TableProps } from './props'
