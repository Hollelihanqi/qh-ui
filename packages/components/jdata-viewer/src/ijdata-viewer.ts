import type { ExtractPropTypes } from 'vue'

export const jdataViewerProps = {
  data: {
    type: [Object, String],
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  copy: {
    type: Boolean,
    default: false,
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
  renderHTag: {
    type: Boolean,
    default: true,
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

export type JdataViewerProps = ExtractPropTypes<typeof jdataViewerProps>
