import { withInstall } from '@yto-custom/utils'

import LayoutFrame from './src/layout-frame.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoLayoutFrame: SFCWithInstall<typeof LayoutFrame> = withInstall(LayoutFrame)
export default YtoLayoutFrame

export * from './src/layout-frame'
export type { LayoutFrameInstance } from './src/instance'