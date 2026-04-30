import { withInstall } from '@hd-custom/utils'

import TareaTag from './src/tarea-tag.vue'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdTareaTag: SFCWithInstall<typeof TareaTag> = withInstall(TareaTag)
export default HdTareaTag

export * from './src/tarea-tag'
export type { TareaTagInstance } from './src/instance'
