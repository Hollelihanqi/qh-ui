import { withInstall, creator } from '@yto-custom/utils'
import Dialog from './src/dialog.vue'

creator(Dialog, {})

import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoDialog: SFCWithInstall<typeof Dialog> = withInstall(Dialog)
export default YtoDialog

export * from './src/dialog'