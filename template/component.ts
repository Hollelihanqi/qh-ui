import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const componentProps = buildProps({

})

export const componentEmits = []

export type ComponentProps = ExtractPropTypes<typeof componentProps>