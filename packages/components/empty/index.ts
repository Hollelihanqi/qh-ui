import Empty from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoEmpty = install(Empty)
export default YtoEmpty

export * from './src/interface'
export type EmptyInstance = InstanceType<typeof Empty>
