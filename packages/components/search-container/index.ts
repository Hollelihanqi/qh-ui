import { withInstall } from '@yto-custom/utils'

import SearchContainer from './src/search-container.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoSearchContainer: SFCWithInstall<typeof SearchContainer> = withInstall(SearchContainer)
export default YtoSearchContainer

export * from './src/search-container'
export type { SearchContainerInstance } from './src/instance'