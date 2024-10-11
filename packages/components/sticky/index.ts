import Sticky from './src/index'

import { install } from '@yto-custom/utils'

export const YtoSticky: any = install(Sticky)
export default YtoSticky

export type StickyInstance = InstanceType<typeof YtoSticky>
