import { withInstall } from '@yto-custom/utils'

import LayoutRouter from './src/layout-router.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoLayoutRouter: SFCWithInstall<typeof LayoutRouter> = withInstall(LayoutRouter)
export default YtoLayoutRouter

export * from './src/layout-router'
export type { LayoutRouterInstance } from './src/instance'