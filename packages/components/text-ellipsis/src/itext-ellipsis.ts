import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'
import { makeNumericProp, makeStringProp } from './utils'

export const textEllipsisProps = buildProps({
  rows: makeNumericProp(1),
  dots: makeStringProp('...'),
  content: makeStringProp(''),
  expandText: makeStringProp(''),
  collapseText: makeStringProp(''),
  position: makeStringProp('end'),
})

export const textEllipsisEmits = ['clickAction']

export type TextEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>