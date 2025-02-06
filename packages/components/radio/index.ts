import { withInstall } from '@yto-custom/utils'

import Radio from './src/radio.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoRadio: SFCWithInstall<typeof Radio> = withInstall(Radio)
export default YtoRadio

export * from './src/radio'
export type { RadioInstance } from './src/instance'