import { withInstall } from '@yto-custom/utils'
import SearchForm from './src/search-form'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoSearchForm: SFCWithInstall<typeof SearchForm> = withInstall(SearchForm)
export default YtoSearchForm

export * from './src/isearch-form'