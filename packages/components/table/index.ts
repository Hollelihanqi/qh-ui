import { withInstall } from '@hd-custom/utils'

import Table from './src/table.vue'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdTable: SFCWithInstall<typeof Table> = withInstall(Table)
export default HdTable

export * from './src/table'
export type { TableInstance } from './src/instance'
