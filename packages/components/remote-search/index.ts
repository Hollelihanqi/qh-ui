import { withInstall } from '@hd-custom/utils'

import RemoteSearch from './src/remote-search'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdRemoteSearch: SFCWithInstall<typeof RemoteSearch> = withInstall(RemoteSearch)
export default HdRemoteSearch

export * from './src/iremote-search'

export type { RemoteSearchInstance } from './src/instance'
