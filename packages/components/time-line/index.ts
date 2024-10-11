import TimeLine from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoTimeLine = install(TimeLine)
export default YtoTimeLine

export * from './src/interface'
export type TimeLineInstance = InstanceType<typeof TimeLine>
