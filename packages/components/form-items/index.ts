import { withInstall } from '@yto-custom/utils'

import FormItems from './src/form-items.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoFormItems: SFCWithInstall<typeof FormItems> = withInstall(FormItems)
export default YtoFormItems

export * from './src/form-items'
export type { FormItemsInstance } from './src/instance'
