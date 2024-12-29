import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from '@yto-custom/utils'

import type StickyContainer from './sticky-container'

export const stickyContainerProps = buildProps({

})

export const stickyContainerEmits = []

export type StickyContainerProps = ExtractPropTypes<typeof stickyContainerProps>

export type StickyContainerInstance = InstanceType<typeof StickyContainer>