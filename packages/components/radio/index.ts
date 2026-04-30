import { withInstall } from '@hd-custom/utils'

import Radio from './src/radio.vue'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdRadio: SFCWithInstall<typeof Radio> = withInstall(Radio)
export default HdRadio

export * from './src/radio'
export type { RadioInstance } from './src/instance'
