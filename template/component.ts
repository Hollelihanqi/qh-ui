import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

import type Component from './component'

export const componentProps = buildProps({

})

export const componentEmits = []

export type ComponentProps = ExtractPropTypes<typeof componentProps>

export type ComponentInstance = InstanceType<typeof Component>