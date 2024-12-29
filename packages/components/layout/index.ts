import { withInstall } from '@yto-custom/utils'
import Layout from './src/layout.vue'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoLayout: SFCWithInstall<typeof Layout> = withInstall(Layout)
export default YtoLayout

export * from './src/layout'