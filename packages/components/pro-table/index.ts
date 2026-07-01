import { withInstall } from '@hd-custom/utils'

import ProTable from './src/pro-table.vue'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdProTable: SFCWithInstall<typeof ProTable> = withInstall(ProTable)
export default HdProTable

export * from './src/pro-table'
export type { ProTableInstance } from './src/instance'
