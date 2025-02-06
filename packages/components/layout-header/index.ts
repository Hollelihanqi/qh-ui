import { withInstall } from '@yto-custom/utils'

import LayoutHeader from './src/layout-header.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoLayoutHeader: SFCWithInstall<typeof LayoutHeader> = withInstall(LayoutHeader)
export default YtoLayoutHeader

export * from './src/layout-header'
export type { LayoutHeaderInstance } from './src/instance'