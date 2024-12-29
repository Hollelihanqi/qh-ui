import { withInstall } from '@yto-custom/utils'
import Table from './src/table.vue'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoTable: SFCWithInstall<typeof Table> = withInstall(Table)
export default YtoTable

export * from './src/table'