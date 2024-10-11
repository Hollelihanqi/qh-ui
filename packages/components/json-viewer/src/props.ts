/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-04-07 16:11:35
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-05-22 09:48:57
 * @FilePath: \yto-engine\packages\yto-custom\src\components\json-viewer\src\props.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { ExtractPropTypes } from 'vue'
export const Props = {
  data: {
    type: [Object],
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  copy: {
    type: Boolean,
    default: true,
  },
  expandDepth: {
    type: Number,
    default: 1,
  },
  theme: {
    type: String,
    default: 'light',
  },
  rootTagStart: {
    type: String,
    default: '{',
  },
  rootTagEnd: {
    type: String,
    default: '}',
  },
  hideSearch: {
    type: Boolean,
    default: false,
  },
  splacholder: {
    type: String,
    default: '请输入 key 或者 value 进行搜索',
  },
}

export type JsonViewerProps = ExtractPropTypes<typeof Props>
