import { withInstall } from '@hd-custom/utils'

import TextEllipsis from './src/text-ellipsis'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdTextEllipsis: SFCWithInstall<typeof TextEllipsis> = withInstall(TextEllipsis)
export default HdTextEllipsis

export * from './src/itext-ellipsis'
