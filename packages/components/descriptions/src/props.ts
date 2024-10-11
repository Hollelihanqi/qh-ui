/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-26 15:33:27
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-26 15:35:13
 * @FilePath: \yto-engine\packages\yto-custom\src\components\descriptions\src\props.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { ExtractPropTypes } from 'vue'

interface LabelProps {
  label: string
  prop?: string
}
export interface ListProps extends LabelProps {
  render?: Function
  span?: number
  enum?: any
  show?: boolean | Function
}

export const Props = {
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
    default: '#262626',
  },
  valueColor: {
    type: String,
    default: '#595959',
  },
  lineHeight: {
    type: String,
    default: '26px',
  },
}

export type DescriptionsProps = ExtractPropTypes<typeof Props>
