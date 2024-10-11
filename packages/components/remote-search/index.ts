import RemoteSearch from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoRemoteSearch = install(RemoteSearch)

export * from './src/interface'
export type RemoteSearchInstance = InstanceType<typeof RemoteSearch>

export default YtoRemoteSearch
