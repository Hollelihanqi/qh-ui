import { DefineComponent } from 'vue'
import CustomFieldConfig from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoCustomFieldConfig = install(CustomFieldConfig as DefineComponent)

export default YtoCustomFieldConfig

export * from './src/interface'
export type CustomFieldConfig = InstanceType<typeof CustomFieldConfig>
