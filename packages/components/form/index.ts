import form from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoForm = install(form)

export type FormInstance = InstanceType<typeof form>

export default YtoForm
