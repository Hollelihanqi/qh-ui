import { isClient } from '@vueuse/core'

export const ifFirefox = () => {
  isClient && /firefox/i.test(window.navigator.userAgent)
}

export {
  isClient
}