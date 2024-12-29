import { withInstall } from '@yto-custom/utils'
import Menu from './src/menu'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoMenu: SFCWithInstall<typeof Menu> = withInstall(Menu)
export default YtoMenu

export * from './src/imenu'