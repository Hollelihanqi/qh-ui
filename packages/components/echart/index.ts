import { withInstall } from '@yto-custom/utils'

import Echart from './src/echart.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoEchart: SFCWithInstall<typeof Echart> = withInstall(Echart)
export default YtoEchart

export * from './src/echart'
export type { EchartInstance } from './src/instance'