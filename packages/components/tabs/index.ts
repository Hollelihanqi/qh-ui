import Tabs from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoTabs = install(Tabs)
export default YtoTabs

export * from './src/interface'
export type TabsInstance = InstanceType<typeof Tabs>
