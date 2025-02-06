import { withInstall } from '@yto-custom/utils'

import CustomFieldContainer from './src/custom-field-container.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoCustomFieldContainer: SFCWithInstall<typeof CustomFieldContainer> = withInstall(CustomFieldContainer)
export default YtoCustomFieldContainer

export * from './src/custom-field-container'
export type { CustomFieldContainerInstance } from './src/instance'