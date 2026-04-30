import { withInstall } from '@hd-custom/utils'

import TimeLine from './src/time-line.vue'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdTimeLine: SFCWithInstall<typeof TimeLine> = withInstall(TimeLine)
export default HdTimeLine

export * from './src/time-line'
export type { TimeLineInstance } from './src/instance'
