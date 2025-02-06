import { withInstall } from '@yto-custom/utils'

import Descriptions from './src/descriptions'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoDescriptions: SFCWithInstall<typeof Descriptions> = withInstall(Descriptions)
export default YtoDescriptions

export * from './src/idescriptions'
export type { DescriptionsInstance } from './src/instance'