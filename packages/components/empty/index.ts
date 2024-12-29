import { withInstall } from '@yto-custom/utils'
import Empty from './src/empty'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoEmpty: SFCWithInstall<typeof Empty> = withInstall(Empty)
export default YtoEmpty

export * from './src/iempty'