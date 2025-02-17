import { withInstall } from '@yto-custom/utils'

import RemoteSearch from './src/remote-search'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoRemoteSearch: SFCWithInstall<typeof RemoteSearch> = withInstall(RemoteSearch)
export default YtoRemoteSearch

export * from './src/iremote-search'

export type { RemoteSearchInstance } from './src/instance'
