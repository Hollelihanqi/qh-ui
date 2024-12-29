import { withInstall } from '@yto-custom/utils'
import WaterMark from './src/water-mark.vue'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoWaterMark: SFCWithInstall<typeof WaterMark> = withInstall(WaterMark)
export default YtoWaterMark

export * from './src/water-mark'