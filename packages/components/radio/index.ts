import Radio from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoRadio = install(Radio)
export default YtoRadio

export * from './src/interface'
export type RadioInstance = InstanceType<typeof Radio>
