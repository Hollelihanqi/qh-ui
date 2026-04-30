import { withInstall } from '@hd-custom/utils'

import SearchForm from './src/search-form'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdSearchForm: SFCWithInstall<typeof SearchForm> = withInstall(SearchForm)
export default HdSearchForm

export * from './src/isearch-form'
export type { SearchFormInstance } from './src/instance'
