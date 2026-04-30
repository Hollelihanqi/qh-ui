import { withInstall } from '@hd-custom/utils'

import Descriptions from './src/descriptions'
import type { SFCWithInstall } from '@hd-custom/utils'

export const HdDescriptions: SFCWithInstall<typeof Descriptions> = withInstall(Descriptions)
export default HdDescriptions

export * from './src/idescriptions'
export type { DescriptionsInstance } from './src/instance'
