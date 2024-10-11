import Descriptions from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoDescriptions = install(Descriptions)
export default YtoDescriptions

export * from './src/interface'
export type DescriptionsInstance = InstanceType<typeof Descriptions>
