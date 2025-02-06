import { withInstall } from '@yto-custom/utils'

import Tabs from './src/tabs'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoTabs: SFCWithInstall<typeof Tabs> = withInstall(Tabs)
export default YtoTabs

export * from './src/itabs'
export type { TabsInstance } from './src/instance'