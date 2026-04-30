import { withInstall } from '@hd-custom/utils'

import Component from './src/component.vue'
import type { SFCWithInstall } from '@hd-custom/utils'

export const ComponentExport: SFCWithInstall<typeof Component> = withInstall(Component)
export default ComponentExport

export * from './component'
export type { ComponentInstance } from './src/instance'
