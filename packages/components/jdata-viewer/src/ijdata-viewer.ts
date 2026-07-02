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
  /**
   * 自定义「值节点」渲染。
   * 签名：(node, defaultRender) => VNodeChild
   * - node: 当前节点对象，包含 key（完整路径，如 'credentialSubject.xxx'）、value、nodeType、isArrayChild 等
   * - defaultRender: 组件内置的默认渲染函数，不接管时调用它走默认逻辑
   * 返回 null/undefined 时也会回退到默认渲染
   */
  valueRender: {
    type: Function,
    default: null,
  },
}

export type JdataViewerProps = ExtractPropTypes<typeof jdataViewerProps>
