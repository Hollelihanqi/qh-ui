import type { vShow } from 'vue'

declare global {
  const process: {
    env: {
      NODE_ENV: string
    }
  }

  namespace JSX {
    interface IntrinsicAttributes {
      [elemName: string]: any;
    }
  }
}

declare module '@vueuse/core' {
  export function useDebounceFn(fn: (...args: any[]) => void, wait?: number): () => void
  // 添加 isClient 和 isIOS 的类型定义
  export const isClient: boolean
  export const isIOS: boolean
}

declare module 'lodash-unified' {
  export const get: (obj: Record<string, any>, path: Arrayable<string>, defaultValue?: any) => any
  export const set: (obj: Record<string, any>, path: Arrayable<string>, value: any) => any
  export const has: (obj: Record<string, any>, path: Arrayable<string>) => boolean
  export const isNil: (value: any) => boolean
  export const isUndefined: (value: any) => boolean
  export const isNull: (value: any) => boolean
  export const isBoolean: (value: any) => boolean
  export const isString: (value: any) => boolean
  export const isNumber: (value: any) => boolean
  export const fromPairs: (pairs: [string, any][]) => Record<string, any>
}

declare module '@vue/runtime-core' {

  export interface GlobalComponents {
    Component: (props: { is: Component | string }) => void
  }

  export interface ComponentCustomProperties {
    vShow: typeof vShow
  }
}

export { }