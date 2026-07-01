import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@hd-custom/utils'

/**
 * 外部注入的请求器。组件不再内置 axios 实例，url 模式下必须由调用方传入自己的 request，
 * 以走各自工程的拦截器（鉴权 / 代理前缀 / 业务码解包 / 加密等）。
 * 仅要求实现 request 方法；返回值约定为已解包的业务数据。
 */
export type RemoteRequester = {
  request: (config: Record<string, any>) => Promise<any>
}

export const remoteSearchProps = buildProps({
  url: {
    type: String,
    default: '',
  },
  exposeRef: {
    type: Object,
    default: null,
  },
  method: {
    type: String,
    default: 'GET',
  },
  isRemoteSearch: {
    type: Boolean,
    default: true,
  },
  requestApi: {
    type: Function,
    default: null,
  },
  requestAuto: {
    type: Boolean,
    default: true,
  },
  searchField: {
    type: String,
    default: '',
  },
  requestParams: {
    type: Object,
    default: () => ({}),
  },
  defaultParams: {
    type: Object,
    default: () => ({}),
  },
  requestHeaders: {
    type: [Object, Function],
    default: () => ({}),
  },
  resultKey: {
    type: String,
    default: 'items',
  },
  dataCallback: {
    type: [Function],
    required: false,
    default: null,
  },
  valueKey: {
    type: String,
    default: 'id',
  },
  labelKey: {
    type: String,
    default: 'label',
  },
  modelItem: {
    type: Boolean,
    default: false,
  },
  optTemp: {
    type: [Function, Object],
    default: null,
  },
  w: {
    type: String,
    default: '100%',
  },
  getInstance: {
    type: Function,
    default: null,
  },
  getExposed: {
    type: Function,
    default: null,
  },
  stag: {
    type: String,
    default: 'select',
  },
  defaultFirstOption: {
    type: Boolean,
    default: false,
  },
  // 外部请求器：url 模式必传（requestApi 模式不经过它）。
  requester: {
    type: [Function, Object],
    default: null,
  },
})

export const remoteSearchEmits = ['after-remote']

export type RemoteSearchProps = ExtractPropTypes<typeof remoteSearchProps>
