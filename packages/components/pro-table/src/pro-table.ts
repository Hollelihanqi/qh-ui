import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@hd-custom/utils'

export interface ProTableDefaultSort {
  prop?: string
  order?: 'ascending' | 'descending' | ''
}

export const proTableProps = buildProps({
  // 是否隐藏搜索表单。
  // 仅展示表格时设置为 true 即可。
  searchFormHide: {
    type: Boolean,
    default: false,
  },
  // 请求列表数据的接口函数。
  requestApi: {
    type: Function,
    default: null,
  },
  // 是否在挂载时自动发起一次请求。
  requestAuto: {
    type: Boolean,
    default: true,
  },
  // 对搜索表单的取值结果再做一层格式化，便于改字段名或拆字段。
  searchModelFormat: {
    type: Function,
    default: null,
  },
  // 透传到请求里的额外参数，可以是对象或函数。
  // 函数形式在每次发请求时都会重新求值。
  otherRequestParams: {
    type: [Function, Object] as PropType<Function | Record<string, any>>,
    default: () => ({}),
  },
  // 默认排序，重置时会回到这个排序状态。
  defaultSort: {
    type: [Function, Object] as PropType<Function | ProTableDefaultSort>,
    default: () => ({}),
  },
  // 自定义搜索回调。
  // 提供时会接管搜索行为，第二个参数是“继续走默认请求”的逃生口。
  onSearch: {
    type: Function,
    default: null,
  },
})

export const proTableEmits = []

export type ProTableProps = ExtractPropTypes<typeof proTableProps>
