import { withInstall } from '@yto-custom/utils'

import Sticky from './src/sticky'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoSticky: SFCWithInstall<typeof Sticky> = withInstall(Sticky)
export default YtoSticky

export * from './src/isticky'
export type { StickyInstance } from './src/instance'