import { withInstall } from '@hd-custom/utils'

import Tabs from './src/tabs'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdTabs: SFCWithInstall<typeof Tabs> = withInstall(Tabs)
export default HdTabs

export * from './src/itabs'
export type { TabsInstance } from './src/instance'
