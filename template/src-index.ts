import { withInstall } from '@yto-custom/utils'

import Component from './src/component.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const YtoComponent: SFCWithInstall<typeof Component> = withInstall(Component)
export default YtoComponent

export * from './component'
export type { ComponentInstance } from './src/instance'