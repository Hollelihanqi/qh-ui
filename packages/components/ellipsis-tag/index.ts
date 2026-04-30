import { withInstall } from '@hd-custom/utils'

import EllipsisTag from './src/ellipsis-tag.vue'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdEllipsisTag: SFCWithInstall<typeof EllipsisTag> = withInstall(EllipsisTag)
export default HdEllipsisTag

export * from './src/ellipsis-tag'
export type { EllipsisTagInstance } from './src/instance'
