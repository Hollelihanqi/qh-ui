import { withInstall } from '@yto-custom/utils'

import TextEllipsis from './src/text-ellipsis'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoTextEllipsis: SFCWithInstall<typeof TextEllipsis> = withInstall(TextEllipsis)
export default YtoTextEllipsis

export * from './src/itext-ellipsis'