import { withInstall } from '@yto-custom/utils'

import Form from './src/form.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoForm: SFCWithInstall<typeof Form> = withInstall(Form)
export default YtoForm

export * from './src/form'
export type { FormInstance } from './src/instance'
