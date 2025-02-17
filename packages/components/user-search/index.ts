import { withInstall } from '@yto-custom/utils'

import UserSearch from './src/user-search'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoUserSearch: SFCWithInstall<typeof UserSearch> = withInstall(UserSearch)
export default YtoUserSearch

export * from './src/iuser-search'
export type { UserSearchInstance } from './src/instance'
