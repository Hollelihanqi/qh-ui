import { withInstall } from '@yto-custom/utils'

import LayoutMenu from './src/layout-menu.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoLayoutMenu: SFCWithInstall<typeof LayoutMenu> = withInstall(LayoutMenu)
export default YtoLayoutMenu

export * from './src/layout-menu'
export type { LayoutMenuInstance } from './src/instance'