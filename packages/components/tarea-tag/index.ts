import { withInstall } from '@yto-custom/utils'
import TareaTag from './src/tarea-tag.vue'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoTareaTag: SFCWithInstall<typeof TareaTag> = withInstall(TareaTag)
export default YtoTareaTag

export * from './src/tarea-tag'