import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const userSearchProps = buildProps({
  // 在此处定义 props
  // 示例:
  // title: {
  //   type: String,
  //   default: '',
  // },
  // data: {
  //   type: Array as PropType<{ [key: string]: any }[]>,
  //   default: () => [],
  // },
})

export const userSearchEmits = []

export type UserSearchProps = ExtractPropTypes<typeof userSearchProps>
