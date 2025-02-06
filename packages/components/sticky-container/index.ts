import { withInstall } from '@yto-custom/utils'

import StickyContainer from './src/sticky-container'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoStickyContainer: SFCWithInstall<typeof StickyContainer> = withInstall(StickyContainer)
export default YtoStickyContainer

export * from './src/isticky-container'
export type { StickyContainerInstance } from './src/instance'