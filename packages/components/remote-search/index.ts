import { withInstall, withNoopInstall } from '@yto-custom/utils'

import RemoteSearch from './src/remote-search'
import UserSearch from './src/user-search'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoRemoteSearch: SFCWithInstall<typeof RemoteSearch> & {
  UserSearch: typeof UserSearch
} = withInstall(RemoteSearch, {
  UserSearch,
})

export const YtoUserSearch: SFCWithInstall<typeof UserSearch> = withNoopInstall(UserSearch)

export default YtoRemoteSearch

export * from './src/iremote-search'

export type { RemoteSearchInstance, UserSearchInstance } from './src/instance'
