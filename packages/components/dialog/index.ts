import Dialog from './src/index.vue'

import { install } from '@yto-custom/utils'

import { creator } from '@yto-custom/utils/create-api/creator'
creator(Dialog, {})

export const YtoDialog: any = install(Dialog)

export * from './src/instance'

export default YtoDialog
