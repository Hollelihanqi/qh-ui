import type { vShow } from 'vue'

/// <reference types="@vue/runtime-dom" />

declare global {
  const process: {
    env: {
      NODE_ENV: string
    }
  }
}

declare module '@vue/runtime-core' {

  export interface GlobalComponents {
    Component: (props: { is: Component | string }) => void
  }

  export interface ComponentCustomProperties {
    vShow: typeof vShow
  }
}

declare module '@vue/runtime-dom' {
  export interface GlobalComponents {
    ElFormItem: typeof import('element-plus')['ElFormItem']
    ElInput: typeof import('element-plus')['ElInput']
    ElSelectV2: typeof import('element-plus')['ElSelectV2']
  }
}

export { }
