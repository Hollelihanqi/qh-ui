import { withInstall } from '@yto-custom/utils'
import CustomFieldConfig from './src/custom-field-config'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoCustomFieldConfig: SFCWithInstall<typeof CustomFieldConfig> = withInstall(CustomFieldConfig)
export default YtoCustomFieldConfig

export * from './src/icustom-field-config'