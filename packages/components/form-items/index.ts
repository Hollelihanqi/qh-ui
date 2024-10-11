import FormItems from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoFormItems = install(FormItems)
export default YtoFormItems

export type FormItemInstance = InstanceType<typeof FormItems>
