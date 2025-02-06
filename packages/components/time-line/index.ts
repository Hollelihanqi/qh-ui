import { withInstall } from '@yto-custom/utils'

import TimeLine from './src/time-line.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoTimeLine: SFCWithInstall<typeof TimeLine> = withInstall(TimeLine)
export default YtoTimeLine

export * from './src/time-line'
export type { TimeLineInstance } from './src/instance'
