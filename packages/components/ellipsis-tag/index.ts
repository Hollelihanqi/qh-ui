import { withInstall } from '@yto-custom/utils'
import EllipsisTag from './src/ellipsis-tag.vue'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoEllipsisTag: SFCWithInstall<typeof EllipsisTag> = withInstall(EllipsisTag)
export default YtoEllipsisTag

export * from './src/ellipsis-tag'