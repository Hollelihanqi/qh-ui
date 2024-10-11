import { InputProps, ElSelect, SwitchProps, TimePickerDefaultProps, CheckboxProps, ElDatePicker } from 'element-plus'
import { TimeSelectProps } from 'element-plus/es/components/time-select/src/time-select'
import { YtoRemoteSearch } from '@yto-custom/components/remote-search'

export type RemoteSelectProps = Partial<typeof YtoRemoteSearch.__defaults>
type ElDatePickerProps = typeof ElDatePicker.props
type ElSelectProps = typeof ElSelect.props
interface _SelectProps {
  remoteProps?: RemoteSelectProps
}

type FormEl = {
  input: Partial<InputProps>
  select: _SelectProps
  'tree-select': ElSelectProps
  'date-picker': ElDatePickerProps
  'time-picker': TimePickerDefaultProps
  'time-select': TimeSelectProps
  switch: SwitchProps
  checkbox: CheckboxProps
}

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Responsive = {
  span?: number
  offset?: number
}

export interface SelectOptionsProps {
  label: string
  value: any
}
interface SearchProps<T extends keyof FormEl> {
  el?: T
  props?: FormEl[T]
  label?: string
  field?: string // 搜索字段名称
  defaultValue?: string | number | boolean | Function | any[] // 搜索项默认值
  formatValue?: Function
  span?: number // 搜索项所占用的列数，默认为1列
  offset?: number // 搜索字段左侧偏移列数
  options?: SelectOptionsProps[]
  colConfig?: number | Record<BreakPoint, number>
  xs?: Responsive
  sm?: Responsive
  md?: Responsive
  lg?: Responsive
  xl?: Responsive
  render?: Function
  isRemote?: boolean
  remoteProps?: any
  hide?: () => boolean
}

type El = keyof FormEl

export type SearchFormControlProps = SearchProps<El>

export type { SearchFormProps } from './props'
