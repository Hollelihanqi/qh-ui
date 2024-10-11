import JsonViewer from './src/Index.vue'

import { install } from '@yto-custom/utils'

export const YtoJsonViewer = install(JsonViewer)
export default YtoJsonViewer

export * from './src/interface'
export type JsonViewerInstance = InstanceType<typeof JsonViewer>
