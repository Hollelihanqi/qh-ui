import { withInstall } from '@hd-custom/utils'

import Empty from './src/empty'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdEmpty: SFCWithInstall<typeof Empty> = withInstall(Empty)
export default HdEmpty

export * from './src/iempty'
export type { EmptyInstance } from './src/instance'
