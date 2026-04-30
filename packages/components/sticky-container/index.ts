import { withInstall } from '@hd-custom/utils'

import StickyContainer from './src/sticky-container'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdStickyContainer: SFCWithInstall<typeof StickyContainer> = withInstall(StickyContainer)
export default HdStickyContainer

export * from './src/isticky-container'
export type { StickyContainerInstance } from './src/instance'
