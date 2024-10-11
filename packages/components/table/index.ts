import Table from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoTable = install(Table)
export default YtoTable

export * from './src/interface'
export type TableInstance = InstanceType<typeof Table>
